import {
  CategoriesDataType,
  CategoriesTranslateDataType,
  FilialDataType,
  FilialTranslateDataType,
  LocaleType,
  MenuDataType,
  MenuTranslateDataType,
  SettingDataType,
  SettingTranslateDataType
} from '@/src/types';
import { i18n } from '../../i18n-config';
import { Metadata } from 'next';
import { fetchCategoryData, fetchCategoryTranslateData, fetchFilialData, fetchFilialTranslateData, fetchMenuData, fetchMenuTranslateData, fetchSettingData, fetchSettingTranslateData } from '@/src/utils';
import { Setting } from '@/src/class';
import { RootLayout, StyledComponentsRegistry } from '@/src/layout';
import { getTranslate } from '@/get-translate';
import { Suspense } from 'react';

const fetchData = async (): Promise<{
  settingData: SettingDataType[] | undefined;
  settingTranslateData: SettingTranslateDataType[] | undefined;
  menuData: MenuDataType[] | undefined;
  menuTranslateData: MenuTranslateDataType[] | undefined;
  categoryData: CategoriesDataType[] | undefined;
  categoryTranslateData: CategoriesTranslateDataType[] | undefined;
  filialData:  FilialDataType[] | undefined;
  filialTranslateData: FilialTranslateDataType[] | undefined;
}> => {
  try {
    const [
      settingData,
      settingTranslateData,
      menuData,
      menuTranslateData,
      categoryData,
      categoryTranslateData,
      filialData,
      filialTranslateData
    ] = await Promise.all([
      fetchSettingData(),
      fetchSettingTranslateData(),
      fetchMenuData(),
      fetchMenuTranslateData(),
      fetchCategoryData(),
      fetchCategoryTranslateData(),
      fetchFilialData(),
      fetchFilialTranslateData()
    ]);

    return {
      settingData,
      settingTranslateData,
      menuData,
      menuTranslateData,
      categoryData,
      categoryTranslateData,
      filialData,
      filialTranslateData
    };
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  try {
    const { settingData, settingTranslateData } = await fetchData();

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
        };
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return {
    title: 'Sobsan'
  };
}

export default async function Root({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: LocaleType };
}) {
  try {
    const {
      settingData,
      settingTranslateData,
      menuData,
      menuTranslateData,
      categoryData,
      categoryTranslateData,
      filialData,
      filialTranslateData
    } = await fetchData();

    const t = await getTranslate(lang);
    const titleDictionary = t.title;

    if (
      settingData &&
      settingTranslateData &&
      menuData &&
      menuTranslateData &&
      categoryData &&
      categoryTranslateData &&
      filialData &&
      filialTranslateData
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
      );
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return (
    <html lang={lang}>
      <body>Error</body>
    </html>
  );
}
