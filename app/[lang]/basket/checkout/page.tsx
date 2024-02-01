import React from "react";
import { getTranslate } from "@/get-translate";
import { LocaleType } from "@/src/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AccountPageLayout } from "@/src/layout";
import CheckoutPageLayout from "@/src/layout/basket/CheckoutPageLayout";


export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.order}`;
        return {
            title: pageTitle
        };
    } catch (error) {
        return {
            title: `Sobsan | ${error}`
        };
    }
};


const CheckoutPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const generalDictionary = t.general;
        const formDictionary = t.form;
        return (
            <CheckoutPageLayout
                activeLocale={lang}
                formDictionary={formDictionary}
                generalDictionary={generalDictionary}
                titleDictionary={titleDictionary}
            />
        )
    } catch (error) {
        console.error('Error:', error);
        redirect(`/${lang}/404`);
    }
}

export default CheckoutPage;