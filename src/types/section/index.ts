import {
    CatalogDataType,
    CatalogTranslateDataType,
    CategoriesDataType,
    CategoriesTranslateDataType,
    ColorDataType,
    ColorTranslateDataType,
    LocaleType
} from "..";

export type CatalogSectionProps = {
    loading: boolean,
    activeLocale: LocaleType,
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    catalogData: CatalogDataType[],
    catalogTranslateData: CatalogTranslateDataType[],
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
    textDictionary: { [key: string]: string },
}