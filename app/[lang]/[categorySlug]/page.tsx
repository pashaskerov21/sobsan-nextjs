import React from 'react'
import { getTranslate } from '@/get-translate';
import { Category } from '@/src/class';
import { CategoryPageLayout } from '@/src/layout';
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LocaleType, ProductAttributeRelationDataType, ProductCategoryRelationDataType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import { fetchAttributeData, fetchAttributeGroupData, fetchAttributeGroupTranslateData, fetchAttributeTranslateData, fetchBrandData, fetchBrandTranslateData, fetchCategoryData, fetchCategoryTranslateData, fetchProductAttributeRelationData, fetchProductCategoryRelationData, fetchProductData, fetchProductTranslateData } from '@/src/utils';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const fetchData = async (): Promise<{
    categoryData: CategoriesDataType[] | undefined;
    categoryTranslateData: CategoriesTranslateDataType[] | undefined;
    productData: ProductDataType[] | undefined,
    productTranslateData: ProductTranslateDataType[] | undefined,
    brandData: BrandDataType[] | undefined,
    brandTranslateData: BrandTranslateDataType[] | undefined,
    attributeGroupData: AttributeGroupDataType[] | undefined,
    attributeGroupTranslateData: AttributeGroupTranslateDataType[] | undefined,
    attributeData: AttributeDataType[] | undefined,
    attributeTranslateData: AttributeTranslateDataType[] | undefined,
    productCategoryRelationData: ProductCategoryRelationDataType[] | undefined,
    productAttributeRelationData: ProductAttributeRelationDataType[] | undefined,
}> => {
    try {
        const [
            categoryData,
            categoryTranslateData,
            productData,
            productTranslateData,
            brandData,
            brandTranslateData,
            attributeGroupData,
            attributeGroupTranslateData,
            attributeData,
            attributeTranslateData,
            productCategoryRelationData,
            productAttributeRelationData,
        ] = await Promise.all([
            fetchCategoryData(),
            fetchCategoryTranslateData(),
            fetchProductData(),
            fetchProductTranslateData(),
            fetchBrandData(),
            fetchBrandTranslateData(),
            fetchAttributeGroupData(),
            fetchAttributeGroupTranslateData(),
            fetchAttributeData(),
            fetchAttributeTranslateData(),
            fetchProductCategoryRelationData(),
            fetchProductAttributeRelationData(),
        ]);

        return {
            categoryData,
            categoryTranslateData,
            productData,
            productTranslateData,
            brandData,
            brandTranslateData,
            attributeGroupData,
            attributeGroupTranslateData,
            attributeData,
            attributeTranslateData,
            productCategoryRelationData,
            productAttributeRelationData,
        };
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

export async function generateMetadata({ params: { lang, categorySlug } }: { params: { lang: LocaleType, categorySlug: string } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const { categoryData, categoryTranslateData } = await fetchData();
        const titleDictionary = t.title;
        let pageTitle = `${titleDictionary.sobsan}`;
        let pageKeywords = '';
        if (categoryData && categoryTranslateData) {
            const category = new Category(categoryData, categoryTranslateData);
            const activeCategoryData = category.getCategoryBySlug(categorySlug, lang);
            if (activeCategoryData) {
                const categoryTitle = category.getTranslate(activeCategoryData.id, lang, "title");
                const result = categoryTitle.charAt(0).toLocaleUpperCase() + categoryTitle.slice(1);
                pageTitle = `${titleDictionary.sobsan} | ${result}`;
                pageKeywords = `Sobsan ${category.getTranslate(activeCategoryData.id, 'az', "title")}, Sobsan ${category.getTranslate(activeCategoryData.id, 'en', "title")}, Собсан ${category.getTranslate(activeCategoryData.id, 'ru', "title")}`
            }
        }
        return {
            title: pageTitle,
            keywords: pageKeywords,
            openGraph: {
                title: pageTitle,
            }
        }
    } catch (error) {
        return {
            title: `Sobsan | ${error}`
        };
    }
};

const CategoryPage = async ({ params: { lang, categorySlug } }: { params: { lang: LocaleType, categorySlug: string } }) => {
    try {
        const {
            brandData,
            brandTranslateData,
            categoryData,
            categoryTranslateData,
            productData,
            productTranslateData,
            attributeData,
            attributeGroupData,
            attributeGroupTranslateData,
            attributeTranslateData,
            productCategoryRelationData,
            productAttributeRelationData } = await fetchData();
        const t = await getTranslate(lang);
        const generalDictionary = t.general;
        const titleDictionary = t.title;
        if (
            brandData &&
            brandTranslateData &&
            categoryData &&
            categoryTranslateData &&
            productData &&
            productTranslateData &&
            attributeData &&
            attributeGroupData &&
            attributeGroupTranslateData &&
            attributeTranslateData &&
            productCategoryRelationData &&
            productAttributeRelationData
        ) {
            const category = new Category(categoryData, categoryTranslateData);
            const activeCategoryData: CategoriesDataType | undefined = category.getCategoryBySlug(categorySlug, lang);
            if (activeCategoryData) {
                return (
                    <CategoryPageLayout
                        activeCategoryData={activeCategoryData}
                        activeLocale={lang}
                        categoryData={categoryData}
                        categoryTranslateData={categoryTranslateData}
                        brandData={brandData}
                        brandTranslateData={brandTranslateData}
                        attributeData={attributeData}
                        attributeGroupData={attributeGroupData}
                        attributeGroupTranslateData={attributeGroupTranslateData}
                        attributeTranslateData={attributeTranslateData}
                        productCategoryRelationData={productCategoryRelationData}
                        productData={productData}
                        productTranslateData={productTranslateData}
                        productAttributeRelationData={productAttributeRelationData}
                        titleDictionary={titleDictionary}
                        generalDictionary={generalDictionary}
                    />
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

export async function generateStaticParams() {
    try {
        const categoryTranslateData:CategoriesTranslateDataType[] = await fetchCategoryTranslateData();

        return categoryTranslateData.map((data) => ({
            lang: data.lang,
            categorySlug: data.title.toLocaleLowerCase()
        }))
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default CategoryPage
