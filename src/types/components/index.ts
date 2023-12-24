import { LocaleType } from "..";
import { CatalogDataType, CatalogTranslateDataType, ColorDataType, ColorTranslateDataType, SettingDataType } from "../data"

export type SiteToolbarProps = {
    settingData: SettingDataType,
    titleDictionary: { [key: string]: string },
}
export type ThemeButtonProps = {
    theme: string,
    toggleTheme: () => void,
}
export type SocialMediaProps = {
    className: string,
    settingData: SettingDataType,
};
export type BreadcrumbType = {
    id: number;
    name?: string;
    path: string;
};
export type PageTitleDataType = {
    title: string,
    breadcrumbs: BreadcrumbType[],
}
export type PageTitleProps = {
    activeLocale: LocaleType,
    pageTitleData: PageTitleDataType,
    titleDictionary: { [key: string]: string },
}
export type CatalogAccordionProps = {
    activeLocale: LocaleType,
    activeCategoryID: number,
    catalogData: CatalogDataType[],
    catalogTranslateData: CatalogTranslateDataType[],
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
    textDictionary: { [key: string]: string },
}
export type CatalogColorProps = {
    activeLocale: LocaleType,
    activeCatalogID: number,
    catalogData: CatalogDataType[],
    catalogTranslateData: CatalogTranslateDataType[],
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
}