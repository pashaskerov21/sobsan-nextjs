'use client'
import React from 'react'
import { updateLocaleSlug } from '@/src/redux/actions';
import {  CatalogPageLayoutProps, LocaleStateType, PageTitleDataType } from '@/src/types'
import { useDispatch } from 'react-redux';
import { PageTitle } from '@/src/components';
import { Menu } from '@/src/class';

const CatalogPageLayout: React.FC<CatalogPageLayoutProps> = ({
    activeLocale,
    menuData,
    menuTranslateData,
    catalogData,
    catalogTranslateData,
    colorData,
    colorTranslateData,
    titleDictionary,
}) => {
    const path = 'catalogs';
    const dispatch = useDispatch();
    
    const menu = new Menu(menuData, menuTranslateData);
    const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);
    const pageTitleData:PageTitleDataType = menu.getPageTitleData(path, activeLocale);


    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);

    return (
        <React.Fragment>
            <PageTitle
                activeLocale={activeLocale}
                pageTitleData={pageTitleData}
                titleDictionary={titleDictionary}
            />
        </React.Fragment>
    )
}

export default React.memo(CatalogPageLayout)
