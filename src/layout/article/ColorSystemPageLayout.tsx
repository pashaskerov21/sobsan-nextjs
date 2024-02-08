'use client'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { Menu } from '@/src/class';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';
import {
    ArticleDataType,
    ArticleTranslateDataType,
    LoadingType,
    LocaleStateType,
    LocaleType,
    MenuDataType,
    MenuTranslateDataType,
    PageTitleDataType
} from '@/src/types'

type LayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    articleData: ArticleDataType[],
    articleTranslateData: ArticleTranslateDataType[],
    titleDictionary: { [key: string]: string },
}

const ColorSystemPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    articleData,
    articleTranslateData,
    menuData,
    menuTranslateData,
    titleDictionary,
}) => {
    const path = 'coloring-system';
    const dispatch = useDispatch();
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


    const menu = new Menu(menuData, menuTranslateData);
    const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);
    const pageTitleData: PageTitleDataType = menu.getPageTitleData(path, activeLocale);


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
        </Fragment>
    )
}

export default React.memo(ColorSystemPageLayout)
