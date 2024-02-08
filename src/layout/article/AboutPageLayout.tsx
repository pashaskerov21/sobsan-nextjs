'use client'
import React, { Fragment } from 'react'
import { Article, Menu } from '@/src/class';
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle, Skeleton } from '@/src/components';
import {
    ArticleDataType,
    ArticleTranslateDataType,
    LoadingType,
    LocaleStateType,
    LocaleType,
    MenuDataType,
    MenuTranslateDataType,
    PageTitleDataType
} from '@/src/types';
import { ArticleContainer, Container, Section } from '@/src/styles';
import Image from 'next/image';

type LayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    articleData: ArticleDataType[],
    articleTranslateData: ArticleTranslateDataType[],
    titleDictionary: { [key: string]: string },
}

const AboutPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    articleData,
    articleTranslateData,
    menuData,
    menuTranslateData,
    titleDictionary,
}) => {
    const [loading, setLoading] = React.useState<LoadingType>({
        standart: true,
        lazy: true,
    });
    React.useEffect(() => {
        setTimeout(() => {
            setLoading((prev) => {
                return {
                    ...prev,
                    standart: false,
                }
            });
        }, 500);
        setTimeout(() => {
            setLoading((prev) => {
                return {
                    ...prev,
                    lazy: false,
                }
            });
        }, 1000);
    }, []);

    const path = 'about';
    const dispatch = useDispatch();

    const menu = new Menu(menuData, menuTranslateData);
    const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);
    const pageTitleData: PageTitleDataType = menu.getPageTitleData(path, activeLocale);

    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);

    const article = new Article(articleData, articleTranslateData);
    const activeArticleData: ArticleDataType[] = article.getArticle(1);
    return (
        <Fragment>
            <PageTitle
                loading={loading}
                activeLocale={activeLocale}
                pageTitleData={pageTitleData}
                titleDictionary={titleDictionary}
            />
            <Section $py={20}>
                <Container>
                    <ArticleContainer>
                        {
                            activeArticleData.map((data) => (
                                <div className={`article__row ${data.image !== null ? 'two__column' : ''}`} key={`article-1-${data.id}`}>
                                    <div className="article__row__column">
                                        {
                                            loading.standart ? <Skeleton width='100%' height='250px' /> : (
                                                <div className="article__text" dangerouslySetInnerHTML={{ __html: article.getTranslate(data.id, activeLocale, "text") }} />
                                            )
                                        }
                                    </div>
                                    {
                                        data.image !== null && (
                                            <div className="article__row__column">
                                                {
                                                    loading.lazy ? <Skeleton width='100%' height='400px' /> : <Image src={data.image} width={1000} height={1000} alt='' priority={true} />
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </ArticleContainer>
                </Container>
            </Section>
        </Fragment>
    )
}

export default React.memo(AboutPageLayout)
