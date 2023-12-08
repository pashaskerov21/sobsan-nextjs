import { SettingDataType } from "../data"

export type SiteToolbarProps = {
    settingData: SettingDataType,
    titleDictionary: { [key: string]: string },
}
export type ThemeButtonProps = {
    theme: string,
    toggleTheme: () => void,
}