import { getTranslate } from '@/get-translate';
import { LocaleType } from '@/src/types';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  const t = await getTranslate(lang);
  const titleDictionary = t.title;
  const pageTitle = `${titleDictionary.sobsan} | 404`;
  return {
    title: pageTitle
  };
}

const Page404 = () => {
  return (
    <React.Fragment>
        404
    </React.Fragment>
  )
}

export default Page404
