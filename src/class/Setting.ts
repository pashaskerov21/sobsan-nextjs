import { LocaleType, SettingTranslateDataType } from "../types";

class Setting {
    private settingTranslateData: SettingTranslateDataType[];

    constructor(settingTranslateData: SettingTranslateDataType[]) {
        this.settingTranslateData = settingTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType, key: "title" | "description" | "address_office" | "address_factory" | "copyright") {
        const activeTranslateData: SettingTranslateDataType | undefined = this.settingTranslateData.find((data) => data.setting_id === id && data.lang === activeLocale);
        let translate = "";
        if (activeTranslateData) {
            switch (key) {
                case "title":
                    return translate = activeTranslateData.title;
                case "description":
                    return translate = activeTranslateData.description;
                case "address_office":
                    return translate = activeTranslateData.address_office;
                case "address_factory":
                    return translate = activeTranslateData.address_factory;
                case "copyright":
                    return translate = activeTranslateData.copyright;
                default:
                    return translate = "";
            }
        }
        return translate;
    }
}

export default Setting;