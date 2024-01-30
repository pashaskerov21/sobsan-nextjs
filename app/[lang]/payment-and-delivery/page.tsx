import React, { Suspense } from 'react'
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslate } from '@/get-translate';
import { ArticleDataType, ArticleTranslateDataType, LocaleType, MenuDataType, MenuTranslateDataType } from '@/src/types';
import { fetchArticleData, fetchArticleTranslateData, fetchMenuData, fetchMenuTranslateData } from '@/src/utils';
import { PaymentDeliveryPageLayout } from '@/src/layout';

const fetchData = async (): Promise<{
  menuData: MenuDataType[] | undefined;
  menuTranslateData: MenuTranslateDataType[] | undefined;
  articleData: ArticleDataType[] | undefined,
  articleTranslateData: ArticleTranslateDataType[] | undefined,
}> => {
  try {
    const [
      menuData,
      menuTranslateData,
      articleData,
      articleTranslateData
    ] = await Promise.all([
      fetchMenuData(),
      fetchMenuTranslateData(),
      fetchArticleData(),
      fetchArticleTranslateData(),
    ]);
    return { articleData, articleTranslateData, menuData, menuTranslateData }
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  try {
    const t = await getTranslate(lang);
    const titleDictionary = t.title;
    const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.payment_delivery}`;
    return {
      title: pageTitle
    };
  } catch (error) {
    return {
      title: `Sobsan | ${error}`
    };
  }
}

const PaymentDeliveryPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
  try {
    const t = await getTranslate(lang);
    const titleDictionary = t.title;
    const { articleData, articleTranslateData, menuData, menuTranslateData } = await fetchData();
    if (
      articleData
      && articleTranslateData
      && menuData
      && menuTranslateData
    ) {
      return (
        <React.Fragment>
          <PaymentDeliveryPageLayout
            activeLocale={lang}
            articleData={articleData}
            articleTranslateData={articleTranslateData}
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

export default PaymentDeliveryPage
