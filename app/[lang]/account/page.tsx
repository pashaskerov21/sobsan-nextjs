import React from "react";
import { getTranslate } from "@/get-translate";
import { LocaleType, ProductDataType, ProductTranslateDataType } from "@/src/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AccountPageLayout } from "@/src/layout";
import { fetchProductData, fetchProductTranslateData } from "@/src/utils";

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
}

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.private_cabinet}`;
        return {
            title: pageTitle,
            openGraph: {
                title: pageTitle,
            }
        };
    } catch (error) {
        return {
            title: `Sobsan | ${error}`
        };
    }
};


const AccountPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const generalDictionary = t.general;
        const formDictionary = t.form;
        const { productData, productTranslateData } = await fetchData()
        if (productData && productTranslateData) {
            return (
                <AccountPageLayout
                    activeLocale={lang}
                    formDictionary={formDictionary}
                    generalDictionary={generalDictionary}
                    titleDictionary={titleDictionary}
                    productData={productData}
                    productTranslateData={productTranslateData}
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

export default AccountPage;