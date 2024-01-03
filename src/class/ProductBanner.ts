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
                    return translate = activeTranslateData.title;
                case "text":
                    return translate = activeTranslateData.text;
                case "url":
                    return translate = activeTranslateData.url;
                default:
                    return translate = "";
            }
        }
        return translate;
    }
}

export default ProductBanner;