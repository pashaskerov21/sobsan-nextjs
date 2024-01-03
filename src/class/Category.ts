import { CategoriesDataType, CategoriesTranslateDataType, LocaleType } from "../types";

class Category {
    private categoryData: CategoriesDataType[];
    private categoryTranslateData: CategoriesTranslateDataType[];

    constructor(categoryData: CategoriesDataType[], categoryTranslateData: CategoriesTranslateDataType[]) {
        this.categoryData = categoryData;
        this.categoryTranslateData = categoryTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType, key: "title" | "url") {
        const activeTranslateData: CategoriesTranslateDataType | undefined = this.categoryTranslateData.find((data) => data.category_id === id && data.lang === activeLocale);
        let translate = ""
        if (activeTranslateData) {
            switch (key) {
                case "title":
                    return translate = activeTranslateData.title;
                case "url":
                    return translate = `/${activeLocale}/categories/${encodeURIComponent(activeTranslateData.title.toLocaleLowerCase())}`
                default:
                    return translate = "";
            }
        }
        return translate;
    }
    public getMainCategoryData() {
        const mainCategoryData: CategoriesDataType[] | [] = this.categoryData.filter((data) => data.parent_id === 0);
        return mainCategoryData;
    }
    public getAltCategoryData(id: number) {
        const altCategoryData: CategoriesDataType[] | [] = this.categoryData.filter((data) => data.parent_id === id);
        return altCategoryData;
    }
}

export default Category;