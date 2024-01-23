import { AttributeDataType, AttributeTranslateDataType, LocaleType } from "../types";

class Attribute {
    private attributeData: AttributeDataType[];
    private attributeTranslateData: AttributeTranslateDataType[];
    constructor(attributeData: AttributeDataType[], attributeTranslateData: AttributeTranslateDataType[]) {
        this.attributeData = attributeData;
        this.attributeTranslateData = attributeTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType, key: "title") {
        const activeTranslateData: AttributeTranslateDataType | undefined = this.attributeTranslateData.find((data) => data.attr_id === id && data.lang === activeLocale);
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
    public getGroup()
}

export default Attribute;