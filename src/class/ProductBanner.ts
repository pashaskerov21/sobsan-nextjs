import { LocaleType, ProductBannerTranslateDataType } from "../types";

class ProductBanner {
    private productBannerTranslateData: ProductBannerTranslateDataType[];

    constructor(productBannerTranslateData: ProductBannerTranslateDataType[]){
        this.productBannerTranslateData = productBannerTranslateData;
    }

    public getTranslate(id: number, activeLocale:LocaleType){
        const activeTranslateData: ProductBannerTranslateDataType | undefined = this.productBannerTranslateData.find((data) => data.content_id === id && data.lang === activeLocale);
        return activeTranslateData;
    }
}

export default ProductBanner;