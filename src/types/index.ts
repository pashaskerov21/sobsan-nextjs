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
    BasketDataType,
    WishlistDataType,
    ComparisonDataType,
    ProductFilterDataType,
    AccountDataType,
    UserDataType,
    OrderDataType,
} from './data';

import {
    RootLayoutProps,
    CatalogPageLayoutProps,
    AboutPageLayoutProps,
    ColorSystemPageLayoutProps,
    ActionPageLayoutProps,
    GalleryPageLayoutProps,
    NewsPageLayoutProps,
    ContactPageLayoutProps,
    PaymentDeliveryPageLayoutProps,
    WarrantyConditionPageLayoutProps,
    HomePageLayoutProps,
} from './layout';

import {
    BreadcrumbType,
    PageTitleDataType,
    LoadingType,
} from './components';

import {
    HeaderStateType,
    HeaderProps,
    TopNavbarProps,
    BottomNavbarProps,
    PageLinksProps,
    CategoryProps,
    SearchProps,
    FooterProps,
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
    BasketDataType,
    WishlistDataType,
    ComparisonDataType,
    ProductFilterDataType,
    AccountDataType,
    UserDataType,
    OrderDataType,

    RootLayoutProps,
    CatalogPageLayoutProps,
    AboutPageLayoutProps,
    ColorSystemPageLayoutProps,
    ActionPageLayoutProps,
    GalleryPageLayoutProps,
    NewsPageLayoutProps,
    ContactPageLayoutProps,
    PaymentDeliveryPageLayoutProps,
    WarrantyConditionPageLayoutProps,
    HomePageLayoutProps,

    BreadcrumbType,
    PageTitleDataType,
    LoadingType,

    HeaderStateType,
    HeaderProps,
    TopNavbarProps,
    BottomNavbarProps,
    PageLinksProps,
    CategoryProps,
    SearchProps,
    FooterProps,

    LocaleStateType,
    RootStateType,
}
