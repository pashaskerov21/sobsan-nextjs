import { BrandDataType, LocaleType, ProductDataType, ProductTranslateDataType } from "../types";

class Product {
    private productData: ProductDataType[];
    private productTranslateData: ProductTranslateDataType[];

    constructor(productData: ProductDataType[], productTranslateData: ProductTranslateDataType[]) {
        this.productData = productData;
        this.productTranslateData = productTranslateData;
    }
    public getTranslate(id: number, activeLocale: LocaleType, key: "title" | "description" | "url") {
        const activeTranslateData: ProductTranslateDataType | undefined = this.productTranslateData.find((data) => data.product_id === id && data.lang === activeLocale);
        let translate = "";
        if (activeTranslateData) {
            switch (key) {
                case "title":
                    translate = activeTranslateData.title;
                case "description":
                    translate = activeTranslateData.description;
                case "url": 
                    translate = `/${activeLocale}/products/${encodeURIComponent(activeTranslateData.title.toLocaleLowerCase())}`
                default:
                    translate = activeTranslateData.title;
            }
        }
        return translate;
    }
    public getPopularProducts(productData: ProductDataType[]) {
        const filteredProducts: ProductDataType[] | [] = productData.filter((data) => data.popular);
        return filteredProducts;
    }
    public getNewProducts(productData: ProductDataType[]) {
        const filteredProducts: ProductDataType[] | [] = productData.filter((data) => data.new);
        return filteredProducts;
    }
    public getOfferProducts(productData: ProductDataType[]) {
        const filteredProducts: ProductDataType[] | [] = productData.filter((data) => data.offer);
        return filteredProducts;
    }
    public getURL(id: number, activeLocale: LocaleType) {
        const activeTranslateData: ProductTranslateDataType | undefined = this.productTranslateData.find((data) => data.product_id === id && data.lang === activeLocale);
        let url = `/${activeLocale}/products/`
        if (activeTranslateData) {
            url = `/${activeLocale}/products/${encodeURIComponent(activeTranslateData.title.toLocaleLowerCase())}`
        }
        return url;
    }
    public getBrand(activeProductData: ProductDataType, brandData: BrandDataType[]) {
        const brand: BrandDataType | undefined = brandData.find((data) => data.id === activeProductData.brand_id);
        return brand;
    }
}
export default Product;