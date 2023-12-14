import { SettingDataType } from "../data"

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
    activeLocale: string,
    pageTitleData: PageTitleDataType,
    titleDictionary: { [key: string]: string },
}
