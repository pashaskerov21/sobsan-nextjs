import { CategoriesDataType, CategoriesTranslateDataType, FilialDataType, FilialTranslateDataType, LocaleType, MenuDataType, MenuTranslateDataType, SettingDataType, SettingTranslateDataType } from '@/src/types'
import { i18n } from '../../i18n-config'
import { Metadata } from 'next'
import { fetchCategoryData, fetchCategoryTranslateData, fetchFilialData, fetchFilialTranslateData, fetchMenuData, fetchMenuTranslateData, fetchSettingData, fetchSettingTranslateData } from '@/src/utils';
import { Setting } from '@/src/class';
import { RootLayout, StyledComponentsRegistry } from '@/src/layout';
import { getTranslate } from '@/get-translate';
import { Suspense } from 'react';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params: { lang }, }: { params: { lang: LocaleType } }): Promise<Metadata> {
  const [
    settingData,
    settingTranslateData]: [
      SettingDataType[] | undefined,
      SettingTranslateDataType[] | undefined] = await Promise.all([
        fetchSettingData(),
        fetchSettingTranslateData()]);
  if (settingData && settingTranslateData) {
    const setting = new Setting(settingTranslateData);
    const activeTranslate: SettingTranslateDataType | undefined = setting.getTranslate(1, lang);
    if (activeTranslate) {
      return {
        title: activeTranslate.title,
        description: activeTranslate.description,
        icons: {
          icon: settingData[0].logo
        }
      }
    } else {
      return {
        title: 'Sobsan'
      }
    }

  } else {
    return {
      title: 'Sobsan'
    }
  }
}


export default async function Root({ children, params: { lang }, }: { children: React.ReactNode, params: { lang: LocaleType } }) {
  const [
    settingData,
    settingTranslateData,
    menuData,
    menuTranslateData,
    categoryData,
    categoryTranslateData,
    filialData,
    filialTranslateData,]: [
      SettingDataType[] | undefined,
      SettingTranslateDataType[] | undefined,
      MenuDataType[] | undefined,
      MenuTranslateDataType[] | undefined,
      CategoriesDataType[] | undefined,
      CategoriesTranslateDataType[] | undefined,
      FilialDataType[] | undefined,
      FilialTranslateDataType[] | undefined] = await Promise.all([
        fetchSettingData(),
        fetchSettingTranslateData(),
        fetchMenuData(),
        fetchMenuTranslateData(),
        fetchCategoryData(),
        fetchCategoryTranslateData(),
        fetchFilialData(),
        fetchFilialTranslateData(),]);


  const t = await getTranslate(lang);
  const titleDictionary = t.title;
  if (
    settingData
    && settingTranslateData
    && menuData
    && menuTranslateData
    && categoryData
    && categoryTranslateData
    && filialData
    && filialTranslateData
  ) {
    return (
      <html lang={lang}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css" />
          <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </head>
        <StyledComponentsRegistry>
          <Suspense fallback={<div className='preloader'></div>}>
            <RootLayout
              activeLocale={lang}
              categoryData={categoryData}
              categoryTranslateData={categoryTranslateData}
              menuData={menuData}
              menuTranslateData={menuTranslateData}
              settingData={settingData[0]}
              settingTranslateData={settingTranslateData}
              filialData={filialData}
              filialTranslateData={filialTranslateData}
              titleDictionary={titleDictionary}>
              {children}
            </RootLayout>
          </Suspense>
        </StyledComponentsRegistry>
      </html>
    )

  } else {
    <html lang={lang}>
      <body>error</body>
    </html>
  }
}
