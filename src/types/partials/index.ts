import { CategoriesDataType, CategoriesTranslateDataType, LocaleType, MenuDataType, MenuTranslateDataType, SettingDataType, SettingTranslateDataType } from ".."

export type HeaderStateType = {
    fixed: boolean,
    menuShow: boolean,
    searchShow: boolean,
};
export type HeaderProps = {
    activeLocale: LocaleType,
    theme: string,
    toggleTheme: () => void,
    settingData: SettingDataType,
    settingTranslateData: SettingTranslateDataType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    titleDictionary: { [key: string]: string },
};
export type TopNavbarProps = {
    headerState: HeaderStateType,
    theme: string,
    toggleTheme: () => void,
    toggleMenu: () => void,
    toggleSearch: () => void,
    activeLocale: LocaleType,
    settingData: SettingDataType,
    settingTranslateData: SettingTranslateDataType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    titleDictionary: { [key: string]: string },
};
export type BottomNavbarProps = {
    headerState: HeaderStateType,
    theme: string,
    toggleTheme: () => void,
    toggleMenu: () => void,
    toggleSearch: () => void,
    activeLocale: LocaleType,
    settingData: SettingDataType,
    settingTranslateData: SettingTranslateDataType,
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
export type PageLinkTranslateProps = {
    activeLocale: LocaleType,
    menuID: number,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
};
export type CategoryProps = {
    activeLocale: LocaleType,
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
}
export type CategoryTranslateProps = {
    activeLocale: LocaleType,
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    categoryID: number,
}