import React from 'react'
import { Filial } from '@/src/class';
import { FilialDataType, FilialTranslateDataType, LocaleType } from '@/src/types'

type TranslationProps = {
    translationType: "title" | "address",
    activeLocale: LocaleType,
    activeFilialData: FilialDataType,
    filialTranslateData: FilialTranslateDataType[],
}

const FilialTranslation: React.FC<TranslationProps> = ({
    activeFilialData,
    activeLocale,
    filialTranslateData,
    translationType,
}) => {
    const filial = new Filial(filialTranslateData);
    const activeTranslateData: FilialTranslateDataType | undefined = filial.getTranslate(activeFilialData.id, activeLocale);

    if (activeTranslateData) {
        switch (translationType) {
            case "title":
                return (
                    <React.Fragment>
                        {activeTranslateData.title}
                    </React.Fragment>
                )
            case "address":
                return (
                    <React.Fragment>
                        {activeTranslateData.address}
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

export default React.memo(FilialTranslation)
