import { CatalogDataType, CatalogTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, ColorDataType, ColorTranslateDataType, FilialDataType, FilialTranslateDataType, LocaleType, MenuDataType, MenuTranslateDataType, SettingTranslateDataType } from "..";

export type SettingTranslationProps = {
    translationType: "title" | "description" | "address" | "copyright",
    activeLocale: LocaleType,
    settingTranslateData: SettingTranslateDataType[],
}
export type MenuTranslationProps = {
    translationType: "link" | "title",
    activeLocale: LocaleType,
    activeMenuData: MenuDataType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    className?: string,
    path: string,
};
export type CategoryTranslationProps = {
    translationType: "link" | "title",
    activeLocale: LocaleType,
    activeCategoryData: CategoriesDataType,
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    className?: string,
};
export type FilialTranslationProps = {
    translationType: "title" | "address",
    activeLocale: LocaleType,
    activeFilialData: FilialDataType,
    filialTranslateData: FilialTranslateDataType[],
}
export type CatalogTransLationProps = {
    translationType: "title",
    activeLocale: LocaleType,
    activeCatalogData: CatalogDataType,
    catalogData: CatalogDataType[],
    catalogTranslateData: CatalogTranslateDataType[],
}
export type ColorTranslationProps = {
    activeLocale: LocaleType,
    activeColorData: ColorDataType,
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
}