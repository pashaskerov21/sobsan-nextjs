import { LocaleType, MenuDataType, MenuTranslateDataType } from "../types";

class Menu {
    private menuData: MenuDataType[];
    private menuTranslateData: MenuTranslateDataType[];
    
    constructor(menuData: MenuDataType[],menuTranslateData: MenuTranslateDataType[]){
        this.menuData = menuData
        this.menuTranslateData = menuTranslateData;
    }

    public getTranslate(id:number, activeLocale:LocaleType){
        const activeTranslateData: MenuTranslateDataType | undefined = this.menuTranslateData.find((data) => data.menu_id === id && data.lang === activeLocale);
        return activeTranslateData;
    }
}

export default Menu;