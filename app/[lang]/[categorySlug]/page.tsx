import { getTranslate } from '@/get-translate';
import { Category } from '@/src/class';
import { CategoryPageLayout } from '@/src/layout';
import { BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LocaleType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import { fetchBrandData, fetchBrandTranslateData, fetchCategoryData, fetchCategoryTranslateData, fetchProductData, fetchProductTranslateData } from '@/src/utils';
import { redirect } from 'next/navigation';
import React from 'react'

const fetchData = async (): Promise<{
    categoryData: CategoriesDataType[] | undefined;
    categoryTranslateData: CategoriesTranslateDataType[] | undefined;
    productData: ProductDataType[] | undefined,
    productTranslateData: ProductTranslateDataType[] | undefined,
    brandData: BrandDataType[] | undefined,
    brandTranslateData: BrandTranslateDataType[] | undefined
}> => {
    try {
        const [
            categoryData,
            categoryTranslateData,
            productData,
            productTranslateData,
            brandData,
            brandTranslateData,
        ] = await Promise.all([
            fetchCategoryData(),
            fetchCategoryTranslateData(),
            fetchProductData(),
            fetchProductTranslateData(),
            fetchBrandData(),
            fetchBrandTranslateData(),
        ]);

        return {
            categoryData,
            categoryTranslateData,
            productData,
            productTranslateData,
            brandData,
            brandTranslateData,
        };
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}


const CategoryPage = async ({ params: { lang, categorySlug } }: { params: { lang: LocaleType, categorySlug: string } }) => {
    try {
        const { brandData, brandTranslateData, categoryData, categoryTranslateData, productData, productTranslateData } = await fetchData();
        const t = await getTranslate(lang);
        const generalDictionary = t.general;
        const titleDictionary = t.title;
        if (
            brandData &&
            brandTranslateData &&
            categoryData &&
            categoryTranslateData &&
            productData &&
            productTranslateData
        ) {
            const category = new Category(categoryData, categoryTranslateData);
            const activeCategoryData = category.getCategoryBySlug(categorySlug, lang);
            if (activeCategoryData) {
                return (
                    <React.Fragment>
                        <CategoryPageLayout
                            activeCategoryData={activeCategoryData}
                            activeLocale={lang}
                            categoryData={categoryData}
                            categoryTranslateData={categoryTranslateData}
                            titleDictionary={titleDictionary}
                        />
                    </React.Fragment>
                )
            } else {
                redirect(`/${lang}/404`)
            }
        } else {
            redirect(`/${lang}/404`)
        }
    } catch (error) {
        console.log(error)
    }
    redirect(`/${lang}/404`);
}

export default CategoryPage
