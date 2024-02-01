import React, { Suspense } from 'react'
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslate } from '@/get-translate';
import { GalleryDataType, LocaleType, MenuDataType, MenuTranslateDataType } from '@/src/types';
import { fetchGalleryData, fetchMenuData, fetchMenuTranslateData } from '@/src/utils';
import { GalleryPageLayout } from '@/src/layout';

const fetchData = async (): Promise<{
    menuData: MenuDataType[] | undefined;
    menuTranslateData: MenuTranslateDataType[] | undefined;
    galleryData: GalleryDataType[] | undefined,
}> => {
    try {
        const [
            menuData,
            menuTranslateData,
            galleryData
        ] = await Promise.all([
            fetchMenuData(),
            fetchMenuTranslateData(),
            fetchGalleryData(),
        ]);
        return { galleryData, menuData, menuTranslateData }
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.gallery}`;
        return {
            title: pageTitle
        };
    } catch (error) {
        return {
            title: `Sobsan | ${error}`
        };
    }
}

const GalleryPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const titleDictionary = t.title;
        const { galleryData, menuData, menuTranslateData } = await fetchData();
        if (galleryData && menuData && menuTranslateData) {
            return (
                <GalleryPageLayout
                    activeLocale={lang}
                    galleryData={galleryData}
                    menuData={menuData}
                    menuTranslateData={menuTranslateData}
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

export default GalleryPage
