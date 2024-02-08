import { ArticleDataType, ArticleTranslateDataType, LocaleType } from "../types";

class Article {
    private articleData: ArticleDataType[];
    private articleTranslateData: ArticleTranslateDataType[];
    constructor(articleData: ArticleDataType[], articleTranslateData: ArticleTranslateDataType[]) {
        this.articleData = articleData;
        this.articleTranslateData = articleTranslateData;
    }

    public getArticle(type: number) {
        const result: ArticleDataType[] = this.articleData.filter((data) => data.type === type);
        return result;
    }
    public getTranslate(id: number, activeLocale: LocaleType, key: "title" | "text") {
        const activeTranslateData: ArticleTranslateDataType | undefined = this.articleTranslateData.find((data) => data.article_id === id && data.lang === activeLocale);
        let translate = "";
        if (activeTranslateData) {
            switch (key) {
                case "title":
                    return translate = activeTranslateData.title;
                case "text":
                    return translate = activeTranslateData.text;
                default:
                    return translate = "";
            }
        }
        return translate;
    }
}

export default Article;