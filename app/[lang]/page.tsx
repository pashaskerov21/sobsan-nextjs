import React, { Fragment } from "react"
import { getTranslate } from "@/get-translate";
import { HomePageLayout } from "@/src/layout";
import { BannerDataType, BrandDataType, BrandTranslateDataType, GalleryDataType, LocaleType, MenuDataType, MenuTranslateDataType, ProductBannerDataType, ProductBannerTranslateDataType, ProductDataType, ProductTranslateDataType, RoomDataType, RoomTranslateDataType } from "@/src/types";
import { fetchBannerData, fetchBrandData, fetchBrandTranslateData, fetchGalleryData, fetchMenuData, fetchMenuTranslateData, fetchProductBannerData, fetchProductBannerTranslateData, fetchProductData, fetchProductTranslateData, fetchRoomData, fetchRoomTranslateData } from "@/src/utils";

const fetchData = async (): Promise<{
  menuData: MenuDataType[] | undefined;
  menuTranslateData: MenuTranslateDataType[] | undefined;
  bannerData: BannerDataType[] | undefined;
  productBannerData: ProductBannerDataType[] | undefined;
  productBannerTranslateData: ProductBannerTranslateDataType[] | undefined,
  productData: ProductDataType[] | undefined,
  productTranslateData: ProductTranslateDataType[] | undefined,
  brandData: BrandDataType[] | undefined,
  brandTranslateData: BrandTranslateDataType[] | undefined,
  roomData: RoomDataType[] | undefined,
  roomTranslateData: RoomTranslateDataType[] | [],
  galleryData: GalleryDataType[] | undefined,
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
      roomData,
      roomTranslateData,
      galleryData,
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
      fetchRoomData(),
      fetchRoomTranslateData(),
      fetchGalleryData(),
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
      roomData,
      roomTranslateData,
      galleryData,
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
      roomData,
      roomTranslateData,
      galleryData,
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
      && roomData
      && roomTranslateData
      && galleryData
    ) {
      return (
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
          roomData={roomData}
          roomTranslateData={roomTranslateData}
          galleryData={galleryData}
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
export default HomePage