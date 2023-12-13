import { getTranslate } from '@/get-translate';
import { CatalogPageLayout } from '@/src/layout';
import { CatalogDataType, CatalogTranslateDataType, ColorDataType, ColorTranslateDataType, LocaleType } from '@/src/types';
import { fetchCatalogData, fetchCatalogTranslateData, fetchColorData, fetchColorTranslateData } from '@/src/utils';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const fetchData = async (): Promise<{
  catalogData: CatalogDataType[] | undefined;
  catalogTranslateData: CatalogTranslateDataType[] | undefined;
  colorData: ColorDataType[] | undefined;
  colorTranslateData: ColorTranslateDataType[] | undefined;
}> => {
  try {
    const [
      catalogData,
      catalogTranslateData,
      colorData,
      colorTranslateData
    ] = await Promise.all([
      fetchCatalogData(),
      fetchCatalogTranslateData(),
      fetchColorData(),
      fetchColorTranslateData()
    ]);
    return { catalogData, catalogTranslateData, colorData, colorTranslateData };
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  const t = await getTranslate(lang);
  const titleDictionary = t.title;
  const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.catalogs}`;
  return {
    title: pageTitle
  };
}

const CatalogsPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
  try {
    const { catalogData, catalogTranslateData, colorData, colorTranslateData } = await fetchData();
    const t = await getTranslate(lang);
    const titleDictionary = t.title;

    if (catalogData && catalogTranslateData && colorData && colorTranslateData) {
      return (
        <React.Fragment>
          <Suspense fallback={<div className='preloader'></div>}>
            <CatalogPageLayout
              activeLocale={lang}
              catalogData={catalogData}
              catalogTranslateData={catalogTranslateData}
              colorData={colorData}
              colorTranslateData={colorTranslateData}
              titleDictionary={titleDictionary}
            />
          </Suspense>
        </React.Fragment>
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
