import { i18n } from "@/i18n-config";
import { LocaleStateType, LocaleType, PageTitleDataType, RoomDataType, RoomTranslateDataType } from "../types";

class Suggestion {
    private roomData: RoomDataType[];
    private roomTranslateData: RoomTranslateDataType[];
    constructor(roomData: RoomDataType[], roomTranslateData: RoomTranslateDataType[]) {
        this.roomData = roomData;
        this.roomTranslateData = roomTranslateData;
    }

    public getTranslate(id: number, activeLocale: LocaleType, key: "title" | "text" | "url") {
        const activeTranslateData: RoomTranslateDataType | undefined = this.roomTranslateData.find((data) => data.room_id === id && data.lang === activeLocale);
        let translate = "";
        if (activeTranslateData) {
            switch (key) {
                case "title":
                    return translate = activeTranslateData.title;
                case "text":
                    return translate = activeTranslateData.text
                case "url":
                    return translate = `/${activeLocale}/suggestions/${encodeURIComponent(activeTranslateData.title.toLocaleLowerCase())}`
                default:
                    return translate = "";
            }
        }
        return translate;
    }
    public getSuggestionBySlug(slug: string, activeLocale: LocaleType) {
        const activeTranslateData: RoomTranslateDataType | undefined = this.roomTranslateData.find((data) => data.lang === activeLocale && data.title.trim().toLocaleLowerCase() === decodeURIComponent(slug.trim().toLocaleLowerCase()));
        let activeData: RoomDataType | undefined;
        if (activeTranslateData) {
            activeData = this.roomData.find((data) => data.id === activeTranslateData.room_id);
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
        const activeTranslateData: RoomTranslateDataType[] | [] = this.roomTranslateData.filter((data) => data.room_id === id);
        if (activeTranslateData.length === i18n.locales.length) {
            localeSlugs = activeTranslateData.map((data) => {
                return {
                    locale: data.lang,
                    slug: `suggestions/${encodeURIComponent(data.title.toLocaleLowerCase())}`,
                }
            });
        };
        return localeSlugs;
    }
    public getPageTitleData(id: number, activeLocale: LocaleType, parentTitle: string,) {
        let pageData: PageTitleDataType = {
            title: "",
            breadcrumbs: [
                {
                    id: 1,
                    path: `/${activeLocale}/suggestions`,
                    name: parentTitle,
                },
                {
                    id: 2,
                    path: `/${activeLocale}/suggestions`,
                    name: '',
                }
            ]
        }
        const activeTranslateData: RoomTranslateDataType | undefined = this.roomTranslateData.find((data) => data.room_id === id && data.lang === activeLocale);
        if (activeTranslateData) {
            pageData = {
                title: activeTranslateData.title,
                breadcrumbs: [
                    {
                        id: 1,
                        path: `/${activeLocale}/suggestions`,
                        name: parentTitle,
                    },
                    {
                        id: 2,
                        path: `/${activeLocale}/suggestions/${encodeURIComponent(activeTranslateData.title.toLocaleLowerCase())}`,
                        name: activeTranslateData.title,
                    }
                ]
            }
        }

        return pageData;
    }
}

export default Suggestion;