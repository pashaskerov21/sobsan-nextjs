import { CategoriesDataType, CategoriesTranslateDataType, FilialDataType, FilialTranslateDataType, LocaleType, MenuDataType, MenuTranslateDataType, SettingDataType, SettingTranslateDataType } from ".."

export type HeaderStateType = {
    fixed: boolean,
    menuShow: boolean,
    searchShow: boolean,
};
export type HeaderProps = {
    loading: boolean,
    activeLocale: LocaleType,
    theme: string,
    toggleTheme: () => void,
    settingData: SettingDataType,
    settingTranslateData: SettingTranslateDataType[],
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    titleDictionary: { [key: string]: string },
};
export type TopNavbarProps = {
    loading: boolean,
    headerState: HeaderStateType,
    theme: string,
    toggleTheme: () => void,
    toggleMenu: () => void,
    toggleSearch: () => void,
    activeLocale: LocaleType,
    settingData: SettingDataType,
    settingTranslateData: SettingTranslateDataType[],
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    titleDictionary: { [key: string]: string },
};
export type BottomNavbarProps = {
    loading: boolean,
    headerState: HeaderStateType,
    theme: string,
    toggleTheme: () => void,
    toggleMenu: () => void,
    toggleSearch: () => void,
    activeLocale: LocaleType,
    settingData: SettingDataType,
    settingTranslateData: SettingTranslateDataType[],
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    titleDictionary: { [key: string]: string },
};
export type PageLinksProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    className: string,
}
export type CategoryProps = {
    loading: boolean,
    activeLocale: LocaleType,
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
};

export type SearchProps = {
    headerState: HeaderStateType,
    toggleSearch: () => void,
    titleDictionary: { [key: string]: string },
};
export type FooterProps = {
    loading: boolean,
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