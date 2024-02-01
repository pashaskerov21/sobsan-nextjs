import React from "react";
import { getTranslate } from "@/get-translate";
import { Product } from "@/src/class";
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CatalogDataType, CatalogTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, ColorDataType, ColorTranslateDataType, LocaleType, ProductAttributeRelationDataType, ProductCategoryRelationDataType, ProductColorRelationDataType, ProductDataType, ProductTranslateDataType, ProductWeightRelationDataType, WeightDataType } from "@/src/types";
import { fetchAttributeData, fetchAttributeGroupData, fetchAttributeGroupTranslateData, fetchAttributeTranslateData, fetchBrandData, fetchBrandTranslateData, fetchCatalogData, fetchCatalogTranslateData, fetchCategoryData, fetchCategoryTranslateData, fetchColorData, fetchColorTranslateData, fetchProductAttributeRelationData, fetchProductCategoryRelationData, fetchProductColorRelationData, fetchProductData, fetchProductTranslateData, fetchProductWeightRelationData, fetchWeightData } from "@/src/utils";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { ProductDetailPageLayout } from "@/src/layout";

const fetchData = async (): Promise<{
    productData: ProductDataType[] | undefined,
    productTranslateData: ProductTranslateDataType[] | undefined,
    categoryData: CategoriesDataType[] | undefined;
    categoryTranslateData: CategoriesTranslateDataType[] | undefined;
    brandData: BrandDataType[] | undefined,
    brandTranslateData: BrandTranslateDataType[] | undefined,
    attributeGroupData: AttributeGroupDataType[] | undefined,
    attributeGroupTranslateData: AttributeGroupTranslateDataType[] | undefined,
    attributeData: AttributeDataType[] | undefined,
    attributeTranslateData: AttributeTranslateDataType[] | undefined,
    productCategoryRelationData: ProductCategoryRelationDataType[] | undefined,
    productAttributeRelationData: ProductAttributeRelationDataType[] | undefined,
    weightData: WeightDataType[] | undefined,
    productWeightRelationData: ProductWeightRelationDataType[] | undefined,
    colorData: ColorDataType[] | undefined,
    colorTranslateData: ColorTranslateDataType[] | undefined,
    productColorRelationData: ProductColorRelationDataType[] | undefined,
    catalogData: CatalogDataType[] | undefined;
    catalogTranslateData: CatalogTranslateDataType[] | undefined;
}> => {
    try {
        const [
            productData,
            productTranslateData,
            categoryData,
            categoryTranslateData,
            brandData,
            brandTranslateData,
            attributeGroupData,
            attributeGroupTranslateData,
            attributeData,
            attributeTranslateData,
            productCategoryRelationData,
            productAttributeRelationData,
            weightData,
            productWeightRelationData,
            colorData,
            colorTranslateData,
            productColorRelationData,
            catalogData,
            catalogTranslateData,
        ] = await Promise.all([
            fetchProductData(),
            fetchProductTranslateData(),
            fetchCategoryData(),
            fetchCategoryTranslateData(),
            fetchBrandData(),
            fetchBrandTranslateData(),
            fetchAttributeGroupData(),
            fetchAttributeGroupTranslateData(),
            fetchAttributeData(),
            fetchAttributeTranslateData(),
            fetchProductCategoryRelationData(),
            fetchProductAttributeRelationData(),
            fetchWeightData(),
            fetchProductWeightRelationData(),
            fetchColorData(),
            fetchColorTranslateData(),
            fetchProductColorRelationData(),
            fetchCatalogData(),
            fetchCatalogTranslateData(),
        ]);

        return {
            productData,
            productTranslateData,
            categoryData,
            categoryTranslateData,
            brandData,
            brandTranslateData,
            attributeGroupData,
            attributeGroupTranslateData,
            attributeData,
            attributeTranslateData,
            productCategoryRelationData,
            productAttributeRelationData,
            weightData,
            productWeightRelationData,
            colorData,
            colorTranslateData,
            productColorRelationData,
            catalogData,
            catalogTranslateData,
        };
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

export async function generateMetadata({ params: { lang, productSlug } }: { params: { lang: LocaleType, productSlug: string } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const { productData, productTranslateData } = await fetchData();
        let pageTitle = `${titleDictionary.sobsan}`;
        if (productData && productTranslateData) {
            const product = new Product(productData, productTranslateData);
            const activeProductData: ProductDataType | undefined = product.getProductBySlug(productSlug, lang);
            if (activeProductData) {
                const productTitle = product.getTranslate(activeProductData.id, lang, "title");
                const result = productTitle.charAt(0).toLocaleUpperCase() + productTitle.slice(1).toLocaleLowerCase();
                pageTitle = `${titleDictionary.sobsan} | ${result}`;
            }
        }
        return {
            title: pageTitle
        }
    } catch (error) {
        return {
            title: `Sobsan | ${error}`
        };
    }
}



const ProductPage = async ({ params: { lang, productSlug } }: { params: { lang: LocaleType, productSlug: string } }) => {
    try {
        const {
            productData,
            productTranslateData,
            categoryData,
            categoryTranslateData,
            brandData,
            brandTranslateData,
            attributeGroupData,
            attributeGroupTranslateData,
            attributeData,
            attributeTranslateData,
            productCategoryRelationData,
            productAttributeRelationData,
            weightData,
            productWeightRelationData,
            colorData,
            colorTranslateData,
            productColorRelationData,
            catalogData,
            catalogTranslateData,
        } = await fetchData();
        const t = await getTranslate(lang);
        const generalDictionary = t.general;
        const titleDictionary = t.title;
        const textDictionary = t.text;
        if (
            productData &&
            productTranslateData &&
            categoryData &&
            categoryTranslateData &&
            brandData &&
            brandTranslateData &&
            attributeGroupData &&
            attributeGroupTranslateData &&
            attributeData &&
            attributeTranslateData &&
            productCategoryRelationData &&
            productAttributeRelationData &&
            weightData &&
            productWeightRelationData &&
            colorData &&
            colorTranslateData &&
            productColorRelationData &&
            catalogData &&
            catalogTranslateData
        ) {
            const product = new Product(productData, productTranslateData);
            const activeProductData: ProductDataType | undefined = product.getProductBySlug(productSlug, lang);
            if (activeProductData) {
                return (
                    <ProductDetailPageLayout
                        activeLocale={lang}
                        activeProductData={activeProductData}
                        generalDictionary={generalDictionary}
                        productData={productData}
                        productTranslateData={productTranslateData}
                        categoryData={categoryData}
                        categoryTranslateData={categoryTranslateData}
                        brandData={brandData}
                        brandTranslateData={brandTranslateData}
                        attributeGroupData={attributeGroupData}
                        attributeGroupTranslateData={attributeGroupTranslateData}
                        attributeData={attributeData}
                        attributeTranslateData={attributeTranslateData}
                        productCategoryRelationData={productCategoryRelationData}
                        productAttributeRelationData={productAttributeRelationData}
                        productWeightRelationData={productWeightRelationData}
                        colorData={colorData}
                        colorTranslateData={colorTranslateData}
                        productColorRelationData={productColorRelationData}
                        weightData={weightData}
                        catalogData={catalogData}
                        catalogTranslateData={catalogTranslateData}
                        titleDictionary={titleDictionary}
                        textDictionary={textDictionary}
                    />
                )
            } else {
                redirect(`/${lang}/404`);
            }
        } else {
            redirect(`/${lang}/404`);
        }
    } catch (error) {
        console.log(error)
    }
    redirect(`/${lang}/404`);
}

export default ProductPage;