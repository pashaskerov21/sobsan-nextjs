import { CategoriesDataType, CategoriesTranslateDataType, LocaleType, MenuDataType, MenuTranslateDataType, SettingDataType, SettingTranslateDataType } from ".."

export type RootLayoutProps = {
    children: React.ReactNode,
    activeLocale: LocaleType,
    settingData: SettingDataType,
    settingTranslateData: SettingTranslateDataType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    titleDictionary: { [key: string]: string },
}