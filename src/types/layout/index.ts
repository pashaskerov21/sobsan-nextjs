import {
    ArticleDataType, 
    ArticleTranslateDataType, 
    CatalogDataType, 
    CatalogTranslateDataType, 
    CategoriesDataType, 
    CategoriesTranslateDataType, 
    ColorDataType, 
    ColorTranslateDataType, 
    FilialDataType, 
    FilialTranslateDataType, 
    GalleryDataType, 
    LocaleType, 
    MenuDataType, 
    MenuTranslateDataType, 
    SettingDataType, 
    SettingTranslateDataType
} from ".."

export type RootLayoutProps = {
    children: React.ReactNode,
    activeLocale: LocaleType,
    settingData: SettingDataType,
    settingTranslateData: SettingTranslateDataType[],
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    filialData: FilialDataType[],
    filialTranslateData: FilialTranslateDataType[],
    titleDictionary: { [key: string]: string },
};
export type CatalogPageLayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    catalogData: CatalogDataType[],
    catalogTranslateData: CatalogTranslateDataType[],
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
    titleDictionary: { [key: string]: string },
    textDictionary: { [key: string]: string },
};
export type AboutPageLayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    articleData: ArticleDataType[],
    articleTranslateData: ArticleTranslateDataType[],
    titleDictionary: { [key: string]: string },
};
export type ColorSystemPageLayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    articleData: ArticleDataType[],
    articleTranslateData: ArticleTranslateDataType[],
    titleDictionary: { [key: string]: string },
};
export type ActionPageLayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    articleData: ArticleDataType[],
    articleTranslateData: ArticleTranslateDataType[],
    titleDictionary: { [key: string]: string },
};
export type NewsPageLayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    articleData: ArticleDataType[],
    articleTranslateData: ArticleTranslateDataType[],
    titleDictionary: { [key: string]: string },
};
export type GalleryPageLayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    galleryData: GalleryDataType[],
    titleDictionary: { [key: string]: string },
};
export type PaymentDeliveryPageLayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    articleData: ArticleDataType[],
    articleTranslateData: ArticleTranslateDataType[],
    titleDictionary: { [key: string]: string },
}
export type WarrantyConditionPageLayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    articleData: ArticleDataType[],
    articleTranslateData: ArticleTranslateDataType[],
    titleDictionary: { [key: string]: string },
}
export type ContactPageLayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    settingData: SettingDataType,
    settingTranslateData: SettingTranslateDataType[],
    titleDictionary: { [key: string]: string },
}