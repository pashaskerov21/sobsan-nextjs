import { i18n } from "@/i18n-config";
import { CategoriesDataType, CategoriesTranslateDataType, LocaleStateType, LocaleType, PageTitleDataType, ProductCategoryRelationDataType, ProductDataType } from "../types";

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
                    return translate = `/${activeLocale}/${encodeURIComponent(activeTranslateData.title.toLocaleLowerCase())}`
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
    public getCategoryBySlug(slug: string, activeLocale: LocaleType) {
        const activeTranslateData: CategoriesTranslateDataType | undefined = this.categoryTranslateData.find((data) => data.lang === activeLocale && data.title.trim().toLocaleLowerCase() === decodeURIComponent(slug.trim().toLocaleLowerCase()));
        let activeData: CategoriesDataType | undefined;
        if (activeTranslateData) {
            activeData = this.categoryData.find((data) => data.id === activeTranslateData.category_id);
        }
        return activeData;
    }
    public getLocaleSlugs(id: number) {
        let localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
            return {
                locale: locale,
                slug: ""
            }
        });

        const activeTranslateData: CategoriesTranslateDataType[] | [] = this.categoryTranslateData.filter((data) => data.category_id === id);
        if (activeTranslateData.length === i18n.locales.length) {
            localeSlugs = activeTranslateData.map((data) => {
                return {
                    locale: data.lang,
                    slug: encodeURIComponent(data.title.toLocaleLowerCase()),
                }
            });
        };
        return localeSlugs;
    }
    public getPageTitleData(id: number, activeLocale: LocaleType) {
        let pageData: PageTitleDataType = {
            title: "",
            breadcrumbs: [
                {
                    id: 1,
                    path: `/${activeLocale}`,
                    name: '',
                }
            ]
        }
        const activeTranslateData: CategoriesTranslateDataType | undefined = this.categoryTranslateData.find((data) => data.category_id === id && data.lang === activeLocale);
        if (activeTranslateData) {
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
    public getProducts(activeCategoryID: number, productCategoryRelationData: ProductCategoryRelationDataType[], productData: ProductDataType[]) {
        const relations: ProductCategoryRelationDataType[] = productCategoryRelationData.filter((data) => data.category_id === activeCategoryID);
        const products: ProductDataType[] = relations.map((r_data) =>
            productData.find((p_data) => p_data.id === r_data.product_id)).
            filter((product) => product !== undefined) as ProductDataType[];
        return products;
    }
}

export default Category;