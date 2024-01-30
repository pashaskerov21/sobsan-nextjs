import React from "react";
import { getTranslate } from "@/get-translate";
import { LocaleType } from "@/src/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { RegisterPageLayout } from "@/src/layout";

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.registration}`;
        return {
            title: pageTitle
        };
    } catch (error) {
        return {
            title: `Sobsan | ${error}`
        };
    }
};


const RegisterPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const generalDictionary = t.general;
        return (
            <React.Fragment>
                <RegisterPageLayout
                    activeLocale={lang}
                    generalDictionary={generalDictionary}
                    titleDictionary={titleDictionary}
                />
            </React.Fragment>
        )
    } catch (error) {
        console.error('Error:', error);
        redirect(`/${lang}/404`);
    }
}

export default RegisterPage;