import { Setting } from '@/src/class';
import { SettingTranslateDataType, SettingTranslationProps } from '@/src/types'
import React from 'react'

const SettingTranslation: React.FC<SettingTranslationProps> = ({
    activeLocale,
    settingTranslateData,
    translationType,
}) => {
    const setting = new Setting(settingTranslateData);
    const activeTranslate: SettingTranslateDataType | undefined = setting.getTranslate(1, activeLocale);
    if (activeTranslate) {
        switch (translationType) {
            case "title":
                return (
                    <React.Fragment>
                        {activeTranslate.title}
                    </React.Fragment>
                )
            case "address":
                return (
                    <React.Fragment>
                        {activeTranslate.address}
                    </React.Fragment>
                )
            case "description":
                return (
                    <React.Fragment>
                        {activeTranslate.description}
                    </React.Fragment>
                )
            case "copyright":
                return (
                    <React.Fragment>
                        {activeTranslate.copyright}
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment></React.Fragment>
                )
        }
    } else {
        return (
            <React.Fragment></React.Fragment>
        )
    }
}

export default React.memo(SettingTranslation)
