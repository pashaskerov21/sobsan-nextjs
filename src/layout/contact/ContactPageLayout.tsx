'use client'
import React from 'react'
import { Menu } from '@/src/class';
import { PageTitle } from '@/src/components';
import { updateLocaleSlug } from '@/src/redux/actions';
import { ContactPageLayoutProps, LocaleStateType, PageTitleDataType } from '@/src/types'
import { useDispatch } from 'react-redux';

const ContactPageLayout: React.FC<ContactPageLayoutProps> = ({
    activeLocale,
    menuData,
    menuTranslateData,
    settingData,
    settingTranslateData,
    titleDictionary,
}) => {
    const path = 'contact';
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState<boolean>(true);
    React.useEffect(() => {
        setLoading(false);
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

export default React.memo(ContactPageLayout)
