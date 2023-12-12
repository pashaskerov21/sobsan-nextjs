import { i18n } from "../../i18n-config";

type LocaleType = (typeof i18n)['locales'][number];
import {
    ArticleDataType,
    ArticleTranslateDataType,
    AttributeDataType,
    AttributeGroupDataType,
    AttributeGroupTranslateDataType,
    AttributeTranslateDataType,
    BannerDataType,
    BrandDataType,
    BrandTranslateDataType,
    CatalogDataType,
    CatalogTranslateDataType,
    CategoriesDataType,
    CategoriesTranslateDataType,
    ColorDataType,
    ColorTranslateDataType,
    FilialDataType,
    FilialTranslateDataType,
    GalleryDataType,
    MasterImagesDataType,
    MenuDataType,
    MenuTranslateDataType,
    PartnerDataType,
    ProductAttributeRelationDataType,
    ProductBannerDataType,
    ProductBannerTranslateDataType,
    ProductCategoryRelationDataType,
    ProductColorRelationDataType,
    ProductDataType,
    ProductTranslateDataType,
    ProductWeightRelationDataType,
    RoomDataType,
    RoomTranslateDataType,
    SettingDataType,
    SettingTranslateDataType,
    WeightDataType,
} from './data';

import {
    RootLayoutProps,
} from './layout';

import {
    SiteToolbarProps,
    ThemeButtonProps,
    SocialMediaProps,
} from './components';

import {
    HeaderStateType,
    HeaderProps,
    TopNavbarProps,
    BottomNavbarProps,
    PageLinksProps,
    PageLinkTranslateProps,
    CategoryProps,
    CategoryTranslateProps,
    SearchProps,
} from './partials'

import {
    LocaleStateType,
    RootStateType,
} from './redux'

export type {
    LocaleType,

    ArticleDataType,
    ArticleTranslateDataType,
    AttributeDataType,
    AttributeGroupDataType,
    AttributeGroupTranslateDataType,
    AttributeTranslateDataType,
    BannerDataType,
    BrandDataType,
    BrandTranslateDataType,
    CatalogDataType,
    CatalogTranslateDataType,
    CategoriesDataType,
    CategoriesTranslateDataType,
    ColorDataType,
    ColorTranslateDataType,
    FilialDataType,
    FilialTranslateDataType,
    GalleryDataType,
    MasterImagesDataType,
    MenuDataType,
    MenuTranslateDataType,
    PartnerDataType,
    ProductAttributeRelationDataType,
    ProductBannerDataType,
    ProductBannerTranslateDataType,
    ProductCategoryRelationDataType,
    ProductColorRelationDataType,
    ProductDataType,
    ProductTranslateDataType,
    ProductWeightRelationDataType,
    RoomDataType,
    RoomTranslateDataType,
    SettingDataType,
    SettingTranslateDataType,
    WeightDataType,

    RootLayoutProps,

    SiteToolbarProps,
    ThemeButtonProps,
    SocialMediaProps,

    HeaderStateType,
    HeaderProps,
    TopNavbarProps,
    BottomNavbarProps,
    PageLinksProps,
    PageLinkTranslateProps,
    CategoryProps,
    CategoryTranslateProps,
    SearchProps,

    LocaleStateType,
    RootStateType,
}
