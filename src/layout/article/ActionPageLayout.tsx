'use client'
import React from 'react'
import { Menu } from '@/src/class';
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { ActionPageLayoutProps, LocaleStateType, PageTitleDataType } from '@/src/types'
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
    const [loading, setLoading] = React.useState<boolean>(true);

    const menu = new Menu(menuData, menuTranslateData);
    const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);
    const pageTitleData: PageTitleDataType = menu.getPageTitleData(path, activeLocale);

    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);
    React.useEffect(() => {
        setLoading(false);
    }, []);
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
