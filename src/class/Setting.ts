import { LocaleType, SettingDataType, SettingTranslateDataType } from "../types";

class Setting {
    private settingData: SettingDataType[];
    private settingTranslateData: SettingTranslateDataType[];
    
    constructor(settingData: SettingDataType[],settingTranslateData: SettingTranslateDataType[]){
        this.settingData = settingData;
        this.settingTranslateData = settingTranslateData;
    }

    public getTranslate(id:number, activeLocale:LocaleType){
        const activeTranslateData: SettingTranslateDataType | undefined = this.settingTranslateData.find((data) => data.setting_id === id && data.lang === activeLocale);
        return activeTranslateData;
    }
}

export default Setting;