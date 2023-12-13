import React from 'react'
import { Filial } from '@/src/class';
import { FilialTranslateDataType, FilialTranslationProps } from '@/src/types'

const FilialTranslation: React.FC<FilialTranslationProps> = ({
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
