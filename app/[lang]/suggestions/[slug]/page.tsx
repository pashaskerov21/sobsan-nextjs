import React, { Fragment } from "react"
import { getTranslate } from "@/get-translate";
import { fetchRoomData, fetchRoomTranslateData } from "@/src/utils";
import { LocaleType, RoomDataType, RoomTranslateDataType } from "@/src/types";
import { Metadata } from "next";
import { SuggestionInnerPageLayout, SuggestionPageLayout } from "@/src/layout";
import { Suggestion } from "@/src/class";
import { redirect } from "next/navigation";

const fetchData = async (): Promise<{

  roomData: RoomDataType[] | undefined,
  roomTranslateData: RoomTranslateDataType[] | []
}> => {
  try {
    const [
      roomData,
      roomTranslateData,
    ] = await Promise.all([
      fetchRoomData(),
      fetchRoomTranslateData(),
    ]);

    return {
      roomData,
      roomTranslateData,
    };
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function generateMetadata({ params: { lang, slug } }: { params: { lang: LocaleType, slug: string } }): Promise<Metadata> {
  try {
    const t = await getTranslate(lang);
    const { roomData, roomTranslateData } = await fetchData();
    const titleDictionary = t.title;
    let pageTitle = `${titleDictionary.sobsan}`;
    if (roomData && roomTranslateData) {
      const suggestion = new Suggestion(roomData, roomTranslateData);
      const activeData = suggestion.getSuggestionBySlug(slug, lang);
      if (activeData) {
        const title = suggestion.getTranslate(activeData.id, lang, "title");
        const result = title.charAt(0).toLocaleUpperCase() + title.slice(1);
        pageTitle = `${titleDictionary.sobsan} | ${result}`;
      }
    }
    return {
      title: pageTitle,
      openGraph: {
        title: pageTitle,
      }
    }
  } catch (error) {
    return {
      title: `Sobsan | ${error}`
    };
  }
};

const SuggestionInnerPage = async ({ params: { lang, slug } }: { params: { lang: LocaleType, slug: string } }) => {
  try {
    const {
      roomData,
      roomTranslateData,
    } = await fetchData();

    const t = await getTranslate(lang);
    const generalDictionary = t.general;
    const titleDictionary = t.title;

    if (roomData && roomTranslateData) {
      const suggestion = new Suggestion(roomData, roomTranslateData);
      const activeData = suggestion.getSuggestionBySlug(slug, lang);
      if (activeData) {
        return (
          <SuggestionInnerPageLayout
            activeData={activeData}
            activeLocale={lang}
            generalDictionary={generalDictionary}
            roomData={roomData}
            roomTranslateData={roomTranslateData}
            titleDictionary={titleDictionary}
          />
        )
      } else {
        redirect(`/${lang}/404`)
      }
    } else {
      redirect(`/${lang}/404`)
    }

  } catch (error) {
    console.error('Error:', error);
  }

  return (
    <Fragment></Fragment>
  )
}
export default SuggestionInnerPage