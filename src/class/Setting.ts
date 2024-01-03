import { LocaleType, SettingTranslateDataType } from "../types";

class Setting {
    private settingTranslateData: SettingTranslateDataType[];

    constructor(settingTranslateData: SettingTranslateDataType[]) {
        this.settingTranslateData = settingTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType, key: "title" | "description" | "address" | "copyright") {
        const activeTranslateData: SettingTranslateDataType | undefined = this.settingTranslateData.find((data) => data.setting_id === id && data.lang === activeLocale);
        let translate = "";
        if (activeTranslateData) {
            switch (key) {
                case "title":
                    translate = activeTranslateData.title;
                case "description":
                    translate = activeTranslateData.description;
                case "address":
                    translate = activeTranslateData.address;
                case "copyright":
                    translate = activeTranslateData.copyright;
                default:
                    translate = activeTranslateData.title;
            }
        }
        return translate;
    }
}

export default Setting;