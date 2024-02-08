'use client'
import React, { Fragment } from 'react'
import { updateLocaleSlug } from '@/src/redux/actions';
import { useDispatch } from 'react-redux';
import { PageTitle } from '@/src/components';
import { Menu } from '@/src/class';
import { CatalogSection } from '@/src/sections';
import {
    CatalogDataType,
    CatalogTranslateDataType,
    CategoriesDataType,
    CategoriesTranslateDataType,
    ColorDataType, 
    ColorTranslateDataType, 
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
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    catalogData: CatalogDataType[],
    catalogTranslateData: CatalogTranslateDataType[],
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
    titleDictionary: { [key: string]: string },
    textDictionary: { [key: string]: string },
}

const CatalogPageLayout: React.FC<LayoutProps> = ({
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

    const path = 'catalogs';
    const dispatch = useDispatch();

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
            <CatalogSection
                loading={loading}
                activeLocale={activeLocale}
                catalogData={catalogData}
                catalogTranslateData={catalogTranslateData}
                categoryData={categoryData}
                categoryTranslateData={categoryTranslateData}
                colorData={colorData}
                colorTranslateData={colorTranslateData}
                titleDictionary={titleDictionary}
                textDictionary={textDictionary}
            />
        </Fragment>
    )
}

export default React.memo(CatalogPageLayout)
