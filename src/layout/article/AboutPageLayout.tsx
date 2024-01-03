'use client'
import React from 'react'
import { Menu } from '@/src/class';
import { AboutPageLayoutProps, LoadingType, LocaleStateType, PageTitleDataType } from '@/src/types';
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';

const AboutPageLayout: React.FC<AboutPageLayoutProps> = ({
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
        }, 1000);
        setTimeout(() => {
            setLoading((prev) => {
                return {
                    ...prev,
                    lazy: false,
                }
            });
        }, 2000);
    }, []);

    const path = 'about';
    const dispatch = useDispatch();

    const menu = new Menu(menuData, menuTranslateData);
    const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);
    const pageTitleData: PageTitleDataType = menu.getPageTitleData(path, activeLocale);

    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);
    return (
        <React.Fragment>
            <PageTitle
                loading={loading}
                activeLocale={activeLocale}
                pageTitleData={pageTitleData}
                titleDictionary={titleDictionary}
            />
        </React.Fragment>
    )
}

export default React.memo(AboutPageLayout)
