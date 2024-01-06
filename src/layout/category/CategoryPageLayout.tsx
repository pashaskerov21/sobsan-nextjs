'use client'
import React from 'react'
import { CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleStateType, LocaleType, PageTitleDataType } from '@/src/types'
import { useDispatch } from 'react-redux';
import { Category } from '@/src/class';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';

type LayoutProps = {
    activeLocale: LocaleType,
    activeCategoryData: CategoriesDataType,
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    titleDictionary: { [key: string]: string },
}

const CategoryPageLayout: React.FC<LayoutProps> = ({
    activeCategoryData,
    activeLocale,
    categoryData,
    categoryTranslateData,
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
    const dispatch = useDispatch();

    const category = new Category(categoryData, categoryTranslateData);
    const localeSlugs: LocaleStateType[] = category.getLocaleSlugs(activeCategoryData.id);
    const pageTitleData: PageTitleDataType = category.getPageTitleData(activeCategoryData.id, activeLocale);


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

export default React.memo(CategoryPageLayout);
