import { getTranslate } from "@/get-translate";
import { HomePageLayout } from "@/src/layout";
import { BannerDataType, BrandDataType, BrandTranslateDataType, LocaleType, MenuDataType, MenuTranslateDataType, ProductBannerDataType, ProductBannerTranslateDataType, ProductDataType, ProductTranslateDataType } from "@/src/types";
import { fetchBannerData, fetchBrandData, fetchBrandTranslateData, fetchMenuData, fetchMenuTranslateData, fetchProductBannerData, fetchProductBannerTranslateData, fetchProductData, fetchProductTranslateData } from "@/src/utils";
import React, { Suspense } from "react"

const fetchData = async (): Promise<{
  menuData: MenuDataType[] | undefined;
  menuTranslateData: MenuTranslateDataType[] | undefined;
  bannerData: BannerDataType[] | undefined;
  productBannerData: ProductBannerDataType[] | undefined;
  productBannerTranslateData: ProductBannerTranslateDataType[] | undefined,
  productData: ProductDataType[] | undefined,
  productTranslateData: ProductTranslateDataType[] | undefined,
  brandData: BrandDataType[] | undefined,
  brandTranslateData: BrandTranslateDataType[] | undefined
}> => {
  try {
    const [
      menuData,
      menuTranslateData,
      bannerData,
      productBannerData,
      productBannerTranslateData,
      productData,
      productTranslateData,
      brandData,
      brandTranslateData,
    ] = await Promise.all([
      fetchMenuData(),
      fetchMenuTranslateData(),
      fetchBannerData(),
      fetchProductBannerData(),
      fetchProductBannerTranslateData(),
      fetchProductData(),
      fetchProductTranslateData(),
      fetchBrandData(),
      fetchBrandTranslateData(),
    ]);

    return {
      menuData,
      menuTranslateData,
      bannerData,
      productBannerData,
      productBannerTranslateData,
      productData,
      productTranslateData,
      brandData,
      brandTranslateData,
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
      productData,
      productTranslateData,
      brandData,
      brandTranslateData,
    } = await fetchData();

    const t = await getTranslate(lang);
    const generalDictionary = t.general;
    const titleDictionary = t.title;

    if (
      menuData
      && menuTranslateData
      && bannerData
      && productBannerData
      && productBannerTranslateData
      && productData
      && productTranslateData
      && brandData
      && brandTranslateData
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
            productData={productData}
            productTranslateData={productTranslateData}
            brandData={brandData}
            brandTranslateData={brandTranslateData}
            generalDictionary={generalDictionary}
            titleDictionary={titleDictionary}
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