import { ColorDataType, ColorTranslateDataType, LocaleType } from "../types";

class Color {
    private colorData: ColorDataType[];
    private colorTranslateData: ColorTranslateDataType[];

    constructor(colorData: ColorDataType[],colorTranslateData: ColorTranslateDataType[]){
        this.colorData = colorData;
        this.colorTranslateData = colorTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType){
        const activeTranslate: ColorTranslateDataType | undefined = this.colorTranslateData.find((data) => data.lang === activeLocale && data.color_id === id);
        return activeTranslate
    }
    public getMainColors(){
        const mainColors: ColorDataType[] | [] = this.colorData.filter((data) => data.parent_id === 0);
        return mainColors;
    }
    public getAltColors(id: number){
        const altColors: ColorDataType[] | [] = this.colorData.filter((data) => data.parent_id === id);
        return altColors;
    }
}

export default Color;