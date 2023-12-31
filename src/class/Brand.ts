import { BrandTranslateDataType, LocaleType } from "../types";

class Brand {
    private brandTranslateData: BrandTranslateDataType[];
    constructor(brandTranslateData: BrandTranslateDataType[]) {
        this.brandTranslateData = brandTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType, key: "title") {
        const activeTranslateData: BrandTranslateDataType | undefined = this.brandTranslateData.find((data) => data.brand_id === id && data.lang === activeLocale);
        let translate = "";
        if (activeTranslateData) {
            switch (key) {
                case "title":
                    return translate = activeTranslateData.title;
                default:
                    return translate = "";
            }
        }
        return translate;
    }
}

export default Brand;