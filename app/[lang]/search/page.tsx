import React from 'react'
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslate } from '@/get-translate';
import { BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LocaleType, MenuDataType, MenuTranslateDataType, ProductDataType, ProductTranslateDataType } from '@/src/types';
import { SearchPageLayout } from '@/src/layout';
import { fetchBrandData, fetchBrandTranslateData, fetchCategoryData, fetchCategoryTranslateData, fetchMenuData, fetchMenuTranslateData, fetchProductData, fetchProductTranslateData } from '@/src/utils';

const fetchData = async (): Promise<{
    productData: ProductDataType[] | undefined,
    productTranslateData: ProductTranslateDataType[] | undefined,
    brandData: BrandDataType[] | undefined,
    brandTranslateData: BrandTranslateDataType[] | undefined,
    menuData: MenuDataType[] | undefined,
    menuTranslateData: MenuTranslateDataType[] | undefined,
    categoryData: CategoriesDataType[] | undefined;
    categoryTranslateData: CategoriesTranslateDataType[] | undefined;
}> => {
    try {
        const [
            productData,
            productTranslateData,
            brandData,
            brandTranslateData,
            menuData,
            menuTranslateData,
            categoryData,
            categoryTranslateData,
        ] = await Promise.all([
            fetchProductData(),
            fetchProductTranslateData(),
            fetchBrandData(),
            fetchBrandTranslateData(),
            fetchMenuData(),
            fetchMenuTranslateData(),
            fetchCategoryData(),
            fetchCategoryTranslateData(),
        ]);

        return {
            productData,
            productTranslateData,
            brandData,
            brandTranslateData,
            menuData,
            menuTranslateData,
            categoryData,
            categoryTranslateData,
        };
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.search}`;
        return {
            title: pageTitle
        };
    } catch (error) {
        return {
            title: `Sobsan | ${error}`
        };
    }
}

const SearchPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const generalDictionary = t.general;
        const {
            productData,
            productTranslateData,
            brandData,
            brandTranslateData,
            menuData,
            menuTranslateData,
            categoryData,
            categoryTranslateData, } = await fetchData();
        if (
            productData
            && productTranslateData
            && brandData
            && brandTranslateData
            && menuData
            && menuTranslateData
            && categoryData
            && categoryTranslateData
        ) {
            return (
                <SearchPageLayout
                    activeLocale={lang}
                    brandData={brandData}
                    brandTranslateData={brandTranslateData}
                    generalDictionary={generalDictionary}
                    productData={productData}
                    productTranslateData={productTranslateData}
                    titleDictionary={titleDictionary}
                    menuData={menuData}
                    menuTranslateData={menuTranslateData}
                    categoryData={categoryData}
                    categoryTranslateData={categoryTranslateData}
                />
            )
        } else {
            redirect(`/${lang}/404`);
        }
    } catch (error) {
        console.error('Error:', error);
        redirect(`/${lang}/404`);
    }
}

export default SearchPage
