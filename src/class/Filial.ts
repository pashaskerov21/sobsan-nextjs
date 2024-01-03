import { FilialTranslateDataType, LocaleType } from "../types";

class Filial {
    private filialTranslateData: FilialTranslateDataType[];

    constructor(filialTranslateData: FilialTranslateDataType[]) {
        this.filialTranslateData = filialTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType, key: "title" | "address") {
        const activeTranslateData: FilialTranslateDataType | undefined = this.filialTranslateData.find((data) => data.filial_id === id && data.lang === activeLocale);
        let translate = "";
        if (activeTranslateData) {
            switch (key) {
                case "title":
                    return translate = activeTranslateData.title;
                case "address":
                    return translate = activeTranslateData.address;
                default:
                    return translate = "";
            }
        }
        return translate;
    }
}

export default Filial;