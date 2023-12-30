import { HomePageLayout } from "@/src/layout";
import { BannerDataType, LocaleType, MenuDataType, MenuTranslateDataType } from "@/src/types";
import { fetchBannerData, fetchMenuData, fetchMenuTranslateData } from "@/src/utils";
import React, { Suspense } from "react"

const fetchData = async (): Promise<{
  menuData: MenuDataType[] | undefined;
  menuTranslateData: MenuTranslateDataType[] | undefined;
  bannerData: BannerDataType[] | undefined;
}> => {
  try {
    const [
      menuData,
      menuTranslateData,
      bannerData,
    ] = await Promise.all([
      fetchMenuData(),
      fetchMenuTranslateData(),
      fetchBannerData(),
    ]);

    return {
      menuData,
      menuTranslateData,
      bannerData
    };
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}



const HomePage = async ({ params: { lang } }: { params: { lang: LocaleType }; }) => {
  try {
    const {
      menuData,
      menuTranslateData,
      bannerData,
    } = await fetchData();

    if (
      menuData
      && menuTranslateData
      && bannerData
    ) {
      return (
        <React.Fragment>
          <HomePageLayout
            activeLocale={lang}
            bannerData={bannerData}
            menuData={menuData}
            menuTranslateData={menuTranslateData}
          />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment></React.Fragment>
      )
    }

  } catch (error) {
    console.error('Error:', error);
  }

  return (
    <React.Fragment></React.Fragment>
  )
}
export default HomePage