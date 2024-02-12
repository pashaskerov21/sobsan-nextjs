'use client'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';
import { ArticleDataType, ArticleTranslateDataType, LoadingType, LocaleStateType, LocaleType, PageTitleDataType } from '@/src/types';
import { i18n } from '@/i18n-config';
import { MasterSection, RoomSuggestionSection } from '@/src/sections';

type LayoutProps = {
    activeLocale: LocaleType,
    articleData: ArticleDataType[],
    articleTranslateData: ArticleTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

const MasterPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    titleDictionary,
    generalDictionary,
    articleData,
    articleTranslateData,
    formDictionary,
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

    const path = 'masters_union';
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: path,
        }
    });
    const pageTitleData: PageTitleDataType = {
        title: titleDictionary["masters_union"],
        breadcrumbs: [
            {
                id: 1,
                path: `/${activeLocale}/${path}`,
                name: titleDictionary["masters_union"],
            }
        ]
    }

    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);

    return (
        <Fragment>
            <PageTitle
                loading={loading}
                activeLocale={activeLocale}
                pageTitleData={pageTitleData}
                titleDictionary={titleDictionary}
            />
            <MasterSection
                activeLocale={activeLocale}
                articleData={articleData}
                articleTranslateData={articleTranslateData}
                formDictionary={formDictionary}
                generalDictionary={generalDictionary}
                titleDictionary={titleDictionary}
                loading={loading}
            />
        </Fragment>
    )
}

export default React.memo(MasterPageLayout)
