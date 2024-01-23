'use client'
import React from 'react'
import { Menu } from '@/src/class';
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { ActionPageLayoutProps, LoadingType, LocaleStateType, PageTitleDataType } from '@/src/types'
import { PageTitle } from '@/src/components';

const ActionPageLayout: React.FC<ActionPageLayoutProps> = ({
    activeLocale,
    articleData,
    articleTranslateData,
    menuData,
    menuTranslateData,
    titleDictionary,
}) => {
    const path = 'actions';
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

export default React.memo(ActionPageLayout)
