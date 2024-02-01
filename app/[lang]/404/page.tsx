import { getTranslate } from '@/get-translate';
import { Page404Layout } from '@/src/layout';
import { LocaleType } from '@/src/types';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  try {
    const t = await getTranslate(lang);
    const titleDictionary = t.title;
    const pageTitle = `${titleDictionary.sobsan} | 404`;
    return {
      title: pageTitle
    };
  } catch (error) {
    return {
      title: `Sobsan | ${error}`
    };
  }
}

const Page404 = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
  const t = await getTranslate(lang);
  const titleDictionary = t.title;
  const generalDictionary = t.general;
  return (
    <Page404Layout
      activeLocale={lang}
      titleDictionary={titleDictionary}
      generalDictionary={generalDictionary}
    />
  )
}

export default Page404
