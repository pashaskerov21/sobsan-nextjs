import { getTranslate } from "@/get-translate";
import { HomePageLayout } from "@/src/layout";
import { BannerDataType, LocaleType, MenuDataType, MenuTranslateDataType, ProductBannerDataType, ProductBannerTranslateDataType } from "@/src/types";
import { fetchBannerData, fetchMenuData, fetchMenuTranslateData, fetchProductBannerData, fetchProductBannerTranslateData } from "@/src/utils";
import React, { Suspense } from "react"

const fetchData = async (): Promise<{
  menuData: MenuDataType[] | undefined;
  menuTranslateData: MenuTranslateDataType[] | undefined;
  bannerData: BannerDataType[] | undefined;
  productBannerData: ProductBannerDataType[] | undefined;
  productBannerTranslateData: ProductBannerTranslateDataType[] | undefined,
}> => {
  try {
    const [
      menuData,
      menuTranslateData,
      bannerData,
      productBannerData,
      productBannerTranslateData
    ] = await Promise.all([
      fetchMenuData(),
      fetchMenuTranslateData(),
      fetchBannerData(),
      fetchProductBannerData(),
      fetchProductBannerTranslateData(),
    ]);

    return {
      menuData,
      menuTranslateData,
      bannerData,
      productBannerData,
      productBannerTranslateData,
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
      productBannerData,
      productBannerTranslateData,
    } = await fetchData();

    const t = await getTranslate(lang);
    const generalDictionary = t.general;

    if (
      menuData
      && menuTranslateData
      && bannerData
      && productBannerData
      && productBannerTranslateData
    ) {
      return (
        <React.Fragment>
          <HomePageLayout
            activeLocale={lang}
            bannerData={bannerData}
            menuData={menuData}
            menuTranslateData={menuTranslateData}
            productBannerData={productBannerData}
            productBannerTranslateData={productBannerTranslateData}
            generalDictionary={generalDictionary}

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