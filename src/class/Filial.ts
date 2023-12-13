import { FilialTranslateDataType, LocaleType } from "../types";

class Filial {
    private filialTranslateData: FilialTranslateDataType[];

    constructor(filialTranslateData: FilialTranslateDataType[]){
        this.filialTranslateData = filialTranslateData;
    }

    public getTranslate(id: number, activeLocale:LocaleType){
        const activeTranslateData: FilialTranslateDataType | undefined = this.filialTranslateData.find((data) => data.filial_id === id && data.lang === activeLocale);
        return activeTranslateData;
    }
}

export default Filial;