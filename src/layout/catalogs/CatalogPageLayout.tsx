'use client'
import React from 'react'
import { updateLocaleSlug } from '@/src/redux/actions';
import { CatalogPageLayoutProps, LocaleStateType, PageTitleDataType } from '@/src/types'
import { useDispatch } from 'react-redux';
import { PageTitle } from '@/src/components';
import { Menu } from '@/src/class';
import { CatalogSection } from '@/src/sections';

const CatalogPageLayout: React.FC<CatalogPageLayoutProps> = ({
    activeLocale,
    menuData,
    menuTranslateData,
    categoryData,
    categoryTranslateData,
    catalogData,
    catalogTranslateData,
    colorData,
    colorTranslateData,
    titleDictionary,
    textDictionary,
}) => {
    const path = 'catalogs';
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
                activeLocale={activeLocale}
                pageTitleData={pageTitleData}
                titleDictionary={titleDictionary}
            />
            <CatalogSection
                activeLocale={activeLocale}
                catalogData={catalogData}
                catalogTranslateData={catalogTranslateData}
                categoryData={categoryData}
                categoryTranslateData={categoryTranslateData}
                colorData={colorData}
                colorTranslateData={colorTranslateData}
                textDictionary={textDictionary}
            />
        </React.Fragment>
    )
}

export default React.memo(CatalogPageLayout)
