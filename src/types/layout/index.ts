import { CategoriesDataType, CategoriesTranslateDataType, FilialDataType, FilialTranslateDataType, LocaleType, MenuDataType, MenuTranslateDataType, SettingDataType, SettingTranslateDataType } from ".."

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
}