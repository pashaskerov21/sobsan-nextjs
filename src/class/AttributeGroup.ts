import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, LocaleType } from "../types";

class AttributeGroup {
    private attributeGroupData: AttributeGroupDataType[];
    private attributeGroupTranslateData: AttributeGroupTranslateDataType[];
    constructor(attributeGroupData: AttributeGroupDataType[], attributeGroupTranslateData: AttributeGroupTranslateDataType[]) {
        this.attributeGroupData = attributeGroupData;
        this.attributeGroupTranslateData = attributeGroupTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType, key: "title") {
        const activeTranslateData: AttributeGroupTranslateDataType | undefined = this.attributeGroupTranslateData.find((data) => data.group_id === id && data.lang === activeLocale);
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
    public getAttributes(id: number, attributeData: AttributeDataType[]){
        const attributes: AttributeDataType[] | [] = attributeData.filter((data) => data.group_id === id);
        return attributes;
    }
}

export default AttributeGroup;