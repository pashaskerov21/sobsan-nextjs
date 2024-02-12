import React from 'react'
import { getTranslate } from '@/get-translate';
import { ArticleDataType, ArticleTranslateDataType, LocaleType } from '@/src/types';
import { fetchArticleData, fetchArticleTranslateData } from '@/src/utils';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { MasterPageLayout } from '@/src/layout';

const fetchData = async (): Promise<{
  articleData: ArticleDataType[] | undefined,
  articleTranslateData: ArticleTranslateDataType[] | undefined,
}> => {
  try {
    const [
      articleData,
      articleTranslateData
    ] = await Promise.all([

      fetchArticleData(),
      fetchArticleTranslateData(),
    ]);
    return { articleData, articleTranslateData }
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  try {
    const t = await getTranslate(lang);
    const titleDictionary = t.title;
    const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.masters_union}`;
    return {
      title: pageTitle
    };
  } catch (error) {
    return {
      title: `Sobsan | ${error}`
    };
  }
}

const MasterPage = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
  try {
    const t = await getTranslate(lang);
    const titleDictionary = t.title;
    const generalDictionary = t.general;
    const formDictionary = t.form;
    const { articleData, articleTranslateData } = await fetchData();
    if (articleData && articleTranslateData) {
      return (
        <MasterPageLayout
          activeLocale={lang}
          articleData={articleData}
          articleTranslateData={articleTranslateData}
          formDictionary={formDictionary}
          generalDictionary={generalDictionary}
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

export default MasterPage
