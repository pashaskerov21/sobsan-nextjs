import { LocaleType, SettingTranslateDataType } from "../types";

class Setting {
    private settingTranslateData: SettingTranslateDataType[];
    
    constructor(settingTranslateData: SettingTranslateDataType[]){
        this.settingTranslateData = settingTranslateData;
    }

    public getTranslate(id:number, activeLocale:LocaleType){
        const activeTranslateData: SettingTranslateDataType | undefined = this.settingTranslateData.find((data) => data.setting_id === id && data.lang === activeLocale);
        return activeTranslateData;
    }
}

export default Setting;