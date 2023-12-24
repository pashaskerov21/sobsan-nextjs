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
    CatalogPageLayoutProps,
    AboutPageLayoutProps,
    ColorSystemPageLayoutProps,
    ActionPageLayoutProps,
    GalleryPageLayoutProps,
    NewsPageLayoutProps,
    ContactPageLayoutProps,
    PaymentDeliveryPageLayoutProps,
    WarrantyConditionPageLayoutProps,
} from './layout';

import {
    SiteToolbarProps,
    ThemeButtonProps,
    SocialMediaProps,
    BreadcrumbType,
    PageTitleDataType,
    PageTitleProps,
    CatalogAccordionProps,
    CatalogColorProps,
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

import {
    CategoryTranslationProps,
    MenuTranslationProps,
    FilialTranslationProps,
    SettingTranslationProps,
    CatalogTransLationProps,
    ColorTranslationProps
} from './translate'

import {
    CatalogSectionProps,
} from './section'

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
    CatalogPageLayoutProps,
    AboutPageLayoutProps,
    ColorSystemPageLayoutProps,
    ActionPageLayoutProps,
    GalleryPageLayoutProps,
    NewsPageLayoutProps,
    ContactPageLayoutProps,
    PaymentDeliveryPageLayoutProps,
    WarrantyConditionPageLayoutProps,

    SiteToolbarProps,
    ThemeButtonProps,
    SocialMediaProps,
    BreadcrumbType,
    PageTitleDataType,
    PageTitleProps,
    CatalogAccordionProps,
    CatalogColorProps,

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

    CategoryTranslationProps,
    MenuTranslationProps,
    FilialTranslationProps,
    SettingTranslationProps,
    CatalogTransLationProps,
    ColorTranslationProps,

    CatalogSectionProps,
}
