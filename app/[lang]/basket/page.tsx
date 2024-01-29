import React from "react";
import { getTranslate } from "@/get-translate";
import { BrandDataType, BrandTranslateDataType, ColorDataType, ColorTranslateDataType, LocaleType, ProductDataType, ProductTranslateDataType } from "@/src/types";
import { fetchBrandData, fetchBrandTranslateData, fetchColorData, fetchColorTranslateData, fetchProductData, fetchProductTranslateData } from "@/src/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { BasketPageLayout } from "@/src/layout";

const fetchData = async (): Promise<{
    productData: ProductDataType[] | undefined,
    productTranslateData: ProductTranslateDataType[] | undefined,
    brandTranslateData: BrandTranslateDataType[] | undefined,
    colorData: ColorDataType[] | undefined,
    colorTranslateData: ColorTranslateDataType[] | undefined,
}> => {
    try {
        const [
            productData,
            productTranslateData,
            brandTranslateData,
            colorData,
            colorTranslateData,
        ] = await Promise.all([
            fetchProductData(),
            fetchProductTranslateData(),
            fetchBrandTranslateData(),
            fetchColorData(),
            fetchColorTranslateData(),
        ]);

        return {
            productData,
            productTranslateData,
            brandTranslateData,
            colorData,
            colorTranslateData,
        };
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    const t = await getTranslate(lang);
    const titleDictionary = t.title;
    const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.basket}`;
    return {
        title: pageTitle
    };
}


const BasketPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const generalDictionary = t.general;
        const {
            productData,
            productTranslateData,
            brandTranslateData,
            colorData,
            colorTranslateData, } = await fetchData();
        if (
            productData
            && productTranslateData
            && brandTranslateData
            && colorData
            && colorTranslateData
        ) {
            return (
                <React.Fragment>
                    <BasketPageLayout
                        activeLocale={lang}
                        productData={productData}
                        productTranslateData={productTranslateData}
                        brandTranslateData={brandTranslateData}
                        colorData={colorData}
                        colorTranslateData={colorTranslateData}
                        titleDictionary={titleDictionary}
                        generalDictionary={generalDictionary}
                    />
                </React.Fragment>
            )
        } else {
            redirect(`/${lang}/404`);
        }
    } catch (error) {
        console.error('Error:', error);
        redirect(`/${lang}/404`);
    }
}

export default BasketPage
