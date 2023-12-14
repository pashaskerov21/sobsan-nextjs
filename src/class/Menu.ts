import { i18n } from "@/i18n-config";
import { LocaleStateType, LocaleType, MenuDataType, MenuTranslateDataType, PageTitleDataType } from "../types";

class Menu {
    private menuData: MenuDataType[];
    private menuTranslateData: MenuTranslateDataType[];

    constructor(menuData: MenuDataType[], menuTranslateData: MenuTranslateDataType[]) {
        this.menuData = menuData
        this.menuTranslateData = menuTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType) {
        const activeTranslateData: MenuTranslateDataType | undefined = this.menuTranslateData.find((data) => data.menu_id === id && data.lang === activeLocale);
        return activeTranslateData;
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
}

export default Menu;