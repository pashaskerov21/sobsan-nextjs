import React from 'react'
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslate } from '@/get-translate';
import { BrandDataType, BrandTranslateDataType, LocaleType, ProductDataType, ProductTranslateDataType } from '@/src/types';
import { SearchPageLayout } from '@/src/layout';
import { fetchBrandData, fetchBrandTranslateData, fetchProductData, fetchProductTranslateData } from '@/src/utils';

const fetchData = async (): Promise<{
    productData: ProductDataType[] | undefined,
    productTranslateData: ProductTranslateDataType[] | undefined,
    brandData: BrandDataType[] | undefined,
    brandTranslateData: BrandTranslateDataType[] | undefined,
}> => {
    try {
        const [
            productData,
            productTranslateData,
            brandData,
            brandTranslateData,
        ] = await Promise.all([
            fetchProductData(),
            fetchProductTranslateData(),
            fetchBrandData(),
            fetchBrandTranslateData(),
        ]);

        return {
            productData,
            productTranslateData,
            brandData,
            brandTranslateData,
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
            brandTranslateData } = await fetchData();
        if (
            productData
            && productTranslateData
            && brandData
            && brandTranslateData
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
