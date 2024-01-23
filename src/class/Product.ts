import { i18n } from "@/i18n-config";
import { BrandDataType, LocaleStateType, LocaleType, PageTitleDataType, ProductDataType, ProductTranslateDataType } from "../types";
import { ProductAttributeRelationDataType, ProductFilterDataType } from "../types/data";

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
                    return translate = `/${activeLocale}/product/${encodeURIComponent(activeTranslateData.title.toLocaleLowerCase())}`
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
        let url = `/${activeLocale}/product/`
        if (activeTranslateData) {
            url = `/${activeLocale}/product/${encodeURIComponent(activeTranslateData.title.toLocaleLowerCase())}`
        }
        return url;
    }
    public getBrand(activeProductData: ProductDataType, brandData: BrandDataType[]) {
        const brand: BrandDataType | undefined = brandData.find((data) => data.id === activeProductData.brand_id);
        return brand;
    }
    public getMaxPrice(productData: ProductDataType[]) {
        let price = 0;
        if (productData.length > 0) {
            const product = productData.reduce((maxProduct, currentProduct) => {
                return currentProduct.price > maxProduct.price ? currentProduct : maxProduct;
            }, productData[0]);
            price = product.price;
        }
        return price;
    }
    public techFilterization(filterData: ProductFilterDataType, productData: ProductDataType[], productAttributeRelationData: ProductAttributeRelationDataType[]) {
        let filteredProducts: ProductDataType[] | [] = productData;
        if (filterData.brand !== 0) {
            filteredProducts = filteredProducts.filter((data) => data.brand_id === filterData.brand);
        }
        if (filterData.price.max > 0) {
            filteredProducts = filteredProducts.filter((data) => filterData.price.min! <= data.price && data.price <= filterData.price.max!);
        }
        if (filterData.attributeIDs.length > 0) {
            const filteredProductIds: number[] = [];

            filterData.attributeIDs.forEach((attrId) => {
                const matchingRelations = productAttributeRelationData.filter((par_data) => par_data.attr_id === attrId);
                const matchingProductIds = matchingRelations.map((relation) => relation.product_id);
                filteredProductIds.push(...matchingProductIds);
            });

            filteredProducts = filteredProducts.filter((product) => filteredProductIds.includes(product.id));
        }

        return filteredProducts;
    }

    public sortFilterization(filterType: 'cheaptoexp' | 'exptocheap' | 'a-z' | 'z-a', productData: ProductDataType[],) {
        switch (filterType) {
            case "cheaptoexp":
                return productData.sort((a, b) => a.price - b.price);
            case "exptocheap":
                return productData.sort((a, b) => b.price - a.price);
            case 'a-z':
                return productData.sort((a, b) => a.activeTitle.localeCompare(b.activeTitle));
            case 'z-a':
                return productData.sort((a, b) => b.activeTitle.localeCompare(a.activeTitle));
            default:
                return productData;
        }
    }
    public getProductBySlug(slug: string,activeLocale: LocaleType){
        const activeTranslateData: ProductTranslateDataType | undefined = this.productTranslateData.find((data) => data.lang === activeLocale && data.title.toLocaleLowerCase() === decodeURIComponent(slug.toLocaleLowerCase()));
        let activeData: ProductDataType | undefined;
        if(activeTranslateData){
            activeData = this.productData.find((data) => data.id === activeTranslateData.product_id);
        }
        return activeData
    };
    public getLocaleSlugs(id: number){
        let localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
            return {
                locale: locale,
                slug: ""
            }
        });

        const activeTranslateData: ProductTranslateDataType[] | [] = this.productTranslateData.filter((data) => data.product_id === id);
        if(activeTranslateData.length === i18n.locales.length){
            localeSlugs = activeTranslateData.map((data) => {
                return {
                    locale: data.lang,
                    slug: encodeURIComponent(data.title.toLocaleLowerCase()),
                }
            });
        };
        return localeSlugs;
    };
    public getPageTitleData(id: number, activeLocale: LocaleType){
        let pageData: PageTitleDataType = {
            title: "",
            breadcrumbs: [
                {
                    id: 1,
                    path: `/${activeLocale}`,
                    name: '',
                }
            ]
        };
        const activeTranslateData: ProductTranslateDataType | undefined = this.productTranslateData.find((data) => data.product_id === id && data.lang === activeLocale);
        
        if(activeTranslateData){
            pageData = {
                title: activeTranslateData.title,
                breadcrumbs: [
                    {
                        id: 1,
                        path: encodeURIComponent(activeTranslateData.title.toLocaleLowerCase()),
                        name: activeTranslateData.title,
                    }
                ]
            }
        }
        
        return pageData;
    }
}
export default Product;