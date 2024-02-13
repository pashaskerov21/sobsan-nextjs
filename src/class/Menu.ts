import { i18n } from "@/i18n-config";
import { LocaleStateType, LocaleType, MenuDataType, MenuTranslateDataType, PageTitleDataType } from "../types";

class Menu {
    private menuData: MenuDataType[];
    private menuTranslateData: MenuTranslateDataType[];

    constructor(menuData: MenuDataType[], menuTranslateData: MenuTranslateDataType[]) {
        this.menuData = menuData
        this.menuTranslateData = menuTranslateData;
    }

    public getTranslate(activeData: MenuDataType, activeLocale: LocaleType, key: "title" | "url") {
        const activeTranslateData: MenuTranslateDataType | undefined = this.menuTranslateData.find((data) => data.menu_id === activeData.id && data.lang === activeLocale);
        let translate = ""
        if (activeTranslateData) {
            switch (key) {
                case "title":
                    return translate = activeTranslateData.title;
                case "url":
                    if (activeData.parent_id === 0) {
                        return translate = `/${activeLocale}/${activeData.path}`;
                    } else {
                        const parentData: MenuDataType | undefined = this.menuData.find((data) => data.id === activeData.parent_id);
                        if (parentData) {
                            return translate = `/${activeLocale}/${parentData.path}/${activeData.path}`;
                        } else {
                            return translate = `/${activeLocale}/${activeData.path}`;
                        }
                    }
                default:
                    return translate = "";
            }
        }
        return translate;
    }
    public getMainMenuData() {
        const mainMenuData: MenuDataType[] | [] = this.menuData.filter((data) => data.parent_id === 0);
        return mainMenuData;
    }
    public getAltMenuData(id: number) {
        const altMenuData: MenuDataType[] | [] = this.menuData.filter((data) => data.parent_id === id);
        return altMenuData;
    }
    public getPageTitleData(path: string, activeLocale: string) {
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
        const activeData: MenuDataType | undefined = this.menuData.find((data) => path.includes(data.path));
        if (activeData) {
            const activeTranslateData: MenuTranslateDataType | undefined = this.menuTranslateData.find((data) => data.lang === activeLocale && data.menu_id === activeData.id);
            if (activeTranslateData) {
                pageData = {
                    title: activeTranslateData.title,
                    breadcrumbs: [
                        {
                            id: 1,
                            path: `/${activeLocale}/${activeData.path}`,
                            name: activeTranslateData.title,
                        },
                    ]
                }
                if (activeData.parent_id !== 0) {
                    const parentData: MenuDataType | undefined = this.menuData.find((data) => data.id === activeData.parent_id);
                    if (parentData) {
                        const parentTranslateData: MenuTranslateDataType | undefined = this.menuTranslateData.find((data) => data.lang === activeLocale && data.menu_id === parentData.id);
                        if (parentTranslateData) {
                            pageData = {
                                title: activeTranslateData.title,
                                breadcrumbs: [
                                    {
                                        id: 1,
                                        path: `/${activeLocale}/${parentData.path}`,
                                        name: parentTranslateData.title,
                                    },
                                    {
                                        id: 2,
                                        path: `/${activeLocale}/${parentData.path}/${activeData.path}`,
                                        name: activeTranslateData.title,
                                    },
                                ]
                            }
                        }
                    }
                }


            }
        }

        return pageData;
    }
    public getLocaleSlugs(path: string) {
        let localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
            return {
                locale: locale,
                slug: ""
            }
        });
        const activeData: MenuDataType | undefined = this.menuData.find((data) => path.includes(data.path));
        if (activeData) {
            localeSlugs = i18n.locales.map((locale) => {
                return {
                    locale: locale,
                    slug: activeData.path,
                }
            });
            if (activeData.parent_id !== 0) {
                const parentData: MenuDataType | undefined = this.menuData.find((data) => data.id === activeData.parent_id);
                if (parentData) {
                    localeSlugs = i18n.locales.map((locale) => {
                        return {
                            locale: locale,
                            slug: `${parentData.path}/${activeData.path}`,
                        }
                    });
                }
            }
        }

        return localeSlugs;
    }
    public search(value: string, activeLocale: LocaleType) {
        let result: MenuDataType | undefined;
        const searchResult = decodeURIComponent(value.trim().toLocaleLowerCase());
        const translateData: MenuTranslateDataType | undefined = this.menuTranslateData.find((data) => data.lang === activeLocale && data.title.trim().toLocaleLowerCase().includes(searchResult));

        if (translateData) {
            result = this.menuData.find((data) => data.id === translateData.menu_id);
        }
        return result;
    }
}

export default Menu;