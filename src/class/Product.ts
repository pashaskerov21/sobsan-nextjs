import { BrandDataType, LocaleType, ProductDataType, ProductTranslateDataType } from "../types";
import { ProductFilterDataType } from "../types/data";

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
                    return translate = activeTranslateData.title;
                case "description":
                    return translate = activeTranslateData.description;
                case "url": 
                    return translate = `/${activeLocale}/products/${encodeURIComponent(activeTranslateData.title.toLocaleLowerCase())}`
                default:
                    return translate = "";
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
    public getMaxPrice(productData:ProductDataType[]){
        let price = 0;
        if(productData.length > 0){
            const product = productData.reduce((maxProduct, currentProduct) => {
                return currentProduct.price > maxProduct.price ? currentProduct : maxProduct;
            }, productData[0]);
            price = product.price;
        }
        return price;
    }
    public filterization(filterData: ProductFilterDataType, productData: ProductDataType[]){
        let filteredProducts:ProductDataType[] | [] = productData;
        if(filterData.brand !== 0){
            filteredProducts = filteredProducts.filter((data) => data.brand_id === filterData.brand);
        }else if(filterData.price.max > 0){
            filteredProducts = filteredProducts.filter((data) => filterData.price.min! <= data.price && data.price <= filterData.price.max!);
        }

        return filteredProducts;
    }
}
export default Product;