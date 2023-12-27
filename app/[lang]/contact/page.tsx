import React, { Suspense } from 'react'
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslate } from '@/get-translate';
import { LocaleType, MenuDataType, MenuTranslateDataType, SettingDataType, SettingTranslateDataType } from '@/src/types';
import { fetchMenuData, fetchMenuTranslateData, fetchSettingData, fetchSettingTranslateData } from '@/src/utils';
import { ContactPageLayout } from '@/src/layout';

const fetchData = async (): Promise<{
  settingData: SettingDataType[] | undefined;
  settingTranslateData: SettingTranslateDataType[] | undefined;
  menuData: MenuDataType[] | undefined;
  menuTranslateData: MenuTranslateDataType[] | undefined;
}> => {
  try {
    const [
      menuData,
      menuTranslateData,
      settingData,
      settingTranslateData
    ] = await Promise.all([
      fetchMenuData(),
      fetchMenuTranslateData(),
      fetchSettingData(),
      fetchSettingTranslateData(),
    ]);
    return { settingData, settingTranslateData, menuData, menuTranslateData }
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  const t = await getTranslate(lang);
  const titleDictionary = t.title;
  const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.contact}`;
  return {
    title: pageTitle
  };
}

const ContactPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
  try {
    const t = await getTranslate(lang);
    const titleDictionary = t.title;
    const { settingData, settingTranslateData, menuData, menuTranslateData } = await fetchData();
    if (
      settingData
      && settingTranslateData
      && menuData
      && menuTranslateData
    ) {
      return (
        <React.Fragment>
            <ContactPageLayout
              activeLocale={lang}
              settingData={settingData[0]}
              settingTranslateData={settingTranslateData}
              menuData={menuData}
              menuTranslateData={menuTranslateData}
              titleDictionary={titleDictionary}
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

export default ContactPage
