import React from "react";
import { getTranslate } from "@/get-translate";
import { LocaleType, SettingDataType } from "@/src/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginPageLayout } from "@/src/layout";
import { fetchSettingData } from "@/src/utils";

const fetchData = async (): Promise<{
    settingData: SettingDataType[] | undefined;
}> => {
    try {
        const [settingData] = await Promise.all([fetchSettingData()]);
        return {
            settingData,
        };
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}


export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.login}`;
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


const LoginPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const generalDictionary = t.general;
        const formDictionary = t.form;
        const { settingData } = await fetchData();
        if (settingData) {
            return (
                <LoginPageLayout
                    activeLocale={lang}
                    settingData={settingData[0]}
                    generalDictionary={generalDictionary}
                    titleDictionary={titleDictionary}
                    formDictionary={formDictionary}
                />
            )
        } else {
            return (
                <React.Fragment></React.Fragment>
            )
        }
    } catch (error) {
        console.error('Error:', error);
        redirect(`/${lang}/404`);
    }
}

export default LoginPage;