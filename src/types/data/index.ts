import { LocaleType } from "..";

export type ArticleDataType = {
    id: number,
    type: number,
    image: string | null,
};
export type ArticleTranslateDataType = {
    id: number,
    article_id: number,
    lang: LocaleType,
    title: string,
    text: string,
};
export type AttributeGroupDataType = {
    id: number,
};
export type AttributeGroupTranslateDataType = {
    id: number,
    group_id: number,
    lang: LocaleType,
    title: string,
};
export type AttributeDataType = {
    id: number,
    group_id: number,
};
export type AttributeTranslateDataType = {
    id: number,
    attr_id: number,
    lang: LocaleType,
    title: string,
};
export type BannerDataType = {
    id: number,
    image: string,
};
export type BrandDataType = {
    id: number,
    image: string,
};
export type BrandTranslateDataType = {
    id: number,
    brand_id: number,
    lang: LocaleType,
    title: string,
};
export type CatalogDataType = {
    id: number,
    category_id: number
};
export type CatalogTranslateDataType = {
    id: number,
    catalog_id: number,
    lang: LocaleType,
    title: string,
};
export type CategoriesDataType = {
    id: number,
    cover_img: string | null;
    parent_id: number,
};
export type CategoriesTranslateDataType = {
    id: number,
    lang: LocaleType,
    category_id: number,
    title: string,
};
export type ColorDataType = {
    id: number,
    catalog_id: number,
    parent_id: number,
    code: string | null,
    image: string | null,
    simple_color: boolean,
    color_code: string | null,
};
export type ColorTranslateDataType = {
    id: number,
    color_id: number,
    lang: LocaleType,
    title: string,
};
export type FilialDataType = {
    id: number,
    phone: string,
    map: string,
};
export type FilialTranslateDataType = {
    id: number,
    filial_id: number,
    lang: LocaleType,
    title: string,
    address: string,
};
export type GalleryDataType = {
    id: number,
    type: number,
    image: string,
    url: string,
};
export type MasterImagesDataType = {
    id: number,
    image: string,
};
export type MenuDataType = {
    id: number,
    parent_id: number,
    path: string,
};
export type MenuTranslateDataType = {
    id: number,
    lang: LocaleType,
    menu_id: number,
    title: string,
};
export type PartnerDataType = {
    id: number,
    image: string,
    url: string,
};
export type ProductAttributeRelationDataType = {
    id: number,
    product_id: number,
    attr_id: number,
};
export type ProductBannerDataType = {
    id: number,
    image: string,
};
export type ProductBannerTranslateDataType = {
    id: number,
    content_id: number,
    lang: LocaleType,
    title: string,
    url: string,
    text: string,
};
export type ProductCategoryRelationDataType = {
    id: number,
    product_id: number,
    category_id: number,
};
export type ProductColorRelationDataType = {
    id: number,
    product_id: number,
    color_id: number,
};
export type ProductDataType = {
    id: number,
    image: string,
    code: string,
    price: number,
    stock: number,
    new: boolean,
    offer: boolean,
    popular: boolean,
    discount: number,
    catalog_id: number,
    brand_id: number,
};
export type ProductTranslateDataType = {
    id: number,
    product_id: number,
    lang: LocaleType,
    title: string,
    description: string,
    about: string,
    properties: string,
    application_areas: string,
    application: string,
    consumption: string,
    storage: string,
    safety: string,
    note: string,
};
export type ProductWeightRelationDataType = {
    id: number,
    product_id: number,
    weight_id: number,
};
export type RoomDataType = {
    id: number,
    image: string,
};
export type RoomTranslateDataType = {
    id: number,
    room_id: number,
    lang: LocaleType,
    title: string,
    text: string,
};
export type SettingDataType = {
    id: number,
    theme: string,
    mail: string,
    phone: string,
    hotline: string,
    facebook: string,
    instagram: string,
    linkedin: string,
    twitter: string,
    youtube: string,
    logo: string,
    master_logo: string,
};
export type SettingTranslateDataType = {
    id: number,
    lang: LocaleType,
    setting_id: number,
    title: string,
    description: string,
    address: string,
    copyright: string,
};
export type WeightDataType = {
    id: number,
    title: string,
};

export type BasketDataType = {
    id: string | number,
    user: string | number | null,
    product: number,
}
export type WishlistDataType = {
    id: string | number,
    user: string | number | null,
    product: number,
}
export type ComparisonDataType = {
    id: string | number,
    user: string | number | null,
    product: number,
};

export type ProductFilterDataType = {
    price: {
        min: number,
        max: number,
    },
    brand: number,
};