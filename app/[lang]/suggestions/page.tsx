import React, { Fragment } from "react"
import { getTranslate } from "@/get-translate";
import { fetchRoomData, fetchRoomTranslateData } from "@/src/utils";
import { LocaleType, RoomDataType, RoomTranslateDataType } from "@/src/types";
import { Metadata } from "next";
import { SuggestionPageLayout } from "@/src/layout";

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

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  try {
    const t = await getTranslate(lang);
    const titleDictionary = t.title;
    const pageTitle = `${titleDictionary.sobsan} | ${titleDictionary.coloring_suggestion}`;
    return {
      title: pageTitle
    };
  } catch (error) {
    return {
      title: `Sobsan | ${error}`
    };
  }
}

const SuggestionPage = async ({ params: { lang } }: { params: { lang: LocaleType }; }) => {
  try {
    const {
      roomData,
      roomTranslateData,
    } = await fetchData();

    const t = await getTranslate(lang);
    const generalDictionary = t.general;
    const titleDictionary = t.title;

    if (roomData && roomTranslateData
    ) {
      return (
        <SuggestionPageLayout
          activeLocale={lang}
          generalDictionary={generalDictionary}
          roomData={roomData}
          roomTranslateData={roomTranslateData}
          titleDictionary={titleDictionary}
        />
      )
    } else {
      return (
        <Fragment></Fragment>
      )
    }

  } catch (error) {
    console.error('Error:', error);
  }

  return (
    <Fragment></Fragment>
  )
}
export default SuggestionPage