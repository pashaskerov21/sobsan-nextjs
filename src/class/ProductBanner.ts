import { LocaleType, ProductBannerTranslateDataType } from "../types";

class ProductBanner {
    private productBannerTranslateData: ProductBannerTranslateDataType[];

    constructor(productBannerTranslateData: ProductBannerTranslateDataType[]) {
        this.productBannerTranslateData = productBannerTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType, key: "title" | "text" | "url") {
        const activeTranslateData: ProductBannerTranslateDataType | undefined = this.productBannerTranslateData.find((data) => data.content_id === id && data.lang === activeLocale);
        let translate = "";
        if (activeTranslateData) {
            switch (key) {
                case "title":
                    translate = activeTranslateData.title;
                case "text":
                    translate = activeTranslateData.text;
                case "url":
                    translate = activeTranslateData.url;
                default:
                    translate = activeTranslateData.title;
            }
        }
        return translate;
    }
}

export default ProductBanner;