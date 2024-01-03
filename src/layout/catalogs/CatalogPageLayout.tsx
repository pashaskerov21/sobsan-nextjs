'use client'
import React from 'react'
import { updateLocaleSlug } from '@/src/redux/actions';
import { CatalogPageLayoutProps, LoadingType, LocaleStateType, PageTitleDataType } from '@/src/types'
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
                loading={loading}
                activeLocale={activeLocale}
                pageTitleData={pageTitleData}
                titleDictionary={titleDictionary}
            />
            <CatalogSection
                loading={loading}
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
