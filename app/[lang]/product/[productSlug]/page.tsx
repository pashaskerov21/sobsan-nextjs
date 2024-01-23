import React from "react";
import { getTranslate } from "@/get-translate";
import { Product } from "@/src/class";
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LocaleType, ProductAttributeRelationDataType, ProductCategoryRelationDataType, ProductDataType, ProductTranslateDataType } from "@/src/types";
import { fetchAttributeData, fetchAttributeGroupData, fetchAttributeGroupTranslateData, fetchAttributeTranslateData, fetchBrandData, fetchBrandTranslateData, fetchCategoryData, fetchCategoryTranslateData, fetchProductAttributeRelationData, fetchProductCategoryRelationData, fetchProductData, fetchProductTranslateData } from "@/src/utils";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { ProductDetailPageLayout } from "@/src/layout";

const fetchData = async (): Promise<{
    productData: ProductDataType[] | undefined,
    productTranslateData: ProductTranslateDataType[] | undefined,
}> => {
    try {
        const [
            productData,
            productTranslateData,
        ] = await Promise.all([
            fetchProductData(),
            fetchProductTranslateData(),
        ]);

        return {
            productData,
            productTranslateData,
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
        } = await fetchData();
        const t = await getTranslate(lang);
        const generalDictionary = t.general;
        const titleDictionary = t.title;
        if (
            productData &&
            productTranslateData
        ) {
            const product = new Product(productData, productTranslateData);
            const activeProductData: ProductDataType | undefined = product.getProductBySlug(productSlug, lang);
            // return(
            //     <React.Fragment>
            //         {decodeURIComponent(productSlug.toLocaleLowerCase())} - {activeProductData ? 'true' : 'false'}
            //     </React.Fragment>
            // )
            if (activeProductData) {
                return (
                    <React.Fragment>
                        <ProductDetailPageLayout
                            activeLocale={lang}
                            activeProductData={activeProductData}
                            generalDictionary={generalDictionary}
                            productData={productData}
                            productTranslateData={productTranslateData}
                            titleDictionary={titleDictionary}
                        />
                    </React.Fragment>
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