import { CatalogDataType, CatalogTranslateDataType, ColorDataType, LocaleType } from "../types";

class Catalog {
    private catalogData: CatalogDataType[];
    private catalogTranslateData: CatalogTranslateDataType[];

    constructor(catalogData: CatalogDataType[], catalogTranslateData: CatalogTranslateDataType[]) {
        this.catalogData = catalogData;
        this.catalogTranslateData = catalogTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType, key: "title") {
        const activeTranslate: CatalogTranslateDataType | undefined = this.catalogTranslateData.find((data) => data.lang === activeLocale && data.catalog_id === id);
        let translate = "";
        if (activeTranslate) {
            switch (key) {
                case "title":
                    return translate = activeTranslate.title;
                default:
                    return translate = "";
            }
        }
        return translate;
    }
    public getColors(id: number, colorData: ColorDataType[]) {
        const colors: ColorDataType[] | [] = colorData.filter((data) => data.catalog_id === id);
        return colors;
    }
    public filterCatalogsByCategory(categoryID: number) {
        const catalogs: CatalogDataType[] | [] = this.catalogData.filter((data) => data.category_id === categoryID);
        return catalogs;
    }
}

export default Catalog;