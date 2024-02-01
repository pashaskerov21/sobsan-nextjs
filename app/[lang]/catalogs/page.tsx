import React, { Suspense } from 'react';
import { getTranslate } from '@/get-translate';
import { CatalogPageLayout } from '@/src/layout';
import { CatalogDataType, CatalogTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, ColorDataType, ColorTranslateDataType, LocaleType, MenuDataType, MenuTranslateDataType } from '@/src/types';
import { fetchCatalogData, fetchCatalogTranslateData, fetchCategoryData, fetchCategoryTranslateData, fetchColorData, fetchColorTranslateData, fetchMenuData, fetchMenuTranslateData } from '@/src/utils';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const fetchData = async (): Promise<{
  menuData: MenuDataType[] | undefined;
  menuTranslateData: MenuTranslateDataType[] | undefined;
  categoryData: CategoriesDataType[] | undefined;
  categoryTranslateData: CategoriesTranslateDataType[] | undefined;
  catalogData: CatalogDataType[] | undefined;
  catalogTranslateData: CatalogTranslateDataType[] | undefined;
  colorData: ColorDataType[] | undefined;
  colorTranslateData: ColorTranslateDataType[] | undefined;
}> => {
  try {
    const [
      menuData,
      menuTranslateData,
      categoryData,
      categoryTranslateData,
      catalogData,
      catalogTranslateData,
      colorData,
      colorTranslateData
    ] = await Promise.all([
      fetchMenuData(),
      fetchMenuTranslateData(),
      fetchCategoryData(),
      fetchCategoryTranslateData(),
      fetchCatalogData(),
      fetchCatalogTranslateData(),
      fetchColorData(),
      fetchColorTranslateData()
    ]);
    return { menuData, menuTranslateData, categoryData, categoryTranslateData, catalogData, catalogTranslateData, colorData, colorTranslateData };
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  try {
    const t = await getTranslate(lang);
    const titleDictionary = t.title;
    const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.catalogs}`;
    return {
      title: pageTitle
    };
  } catch (error) {
    return {
      title: `Sobsan | ${error}`
    };
  }
}

const CatalogsPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
  try {
    const t = await getTranslate(lang);
    const titleDictionary = t.title;
    const textDictionary = t.text;
    const { menuData, menuTranslateData, categoryData, categoryTranslateData, catalogData, catalogTranslateData, colorData, colorTranslateData } = await fetchData();
    if (
      menuData
      && menuTranslateData
      && categoryData
      && categoryTranslateData
      && catalogData
      && catalogTranslateData
      && colorData
      && colorTranslateData) {
      return (
        <CatalogPageLayout
          activeLocale={lang}
          menuData={menuData}
          menuTranslateData={menuTranslateData}
          categoryData={categoryData}
          categoryTranslateData={categoryTranslateData}
          catalogData={catalogData}
          catalogTranslateData={catalogTranslateData}
          colorData={colorData}
          colorTranslateData={colorTranslateData}
          titleDictionary={titleDictionary}
          textDictionary={textDictionary}
        />
      );
    } else {
      redirect(`/${lang}/404`);
    }
  } catch (error) {
    console.error('Error:', error);
    redirect(`/${lang}/404`);
  }
};

export default CatalogsPage;
