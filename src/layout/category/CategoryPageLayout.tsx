'use client'
import React from 'react'
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleStateType, LocaleType, PageTitleDataType } from '@/src/types'
import { useDispatch } from 'react-redux';
import { Category } from '@/src/class';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';
import { ProductsSection } from '@/src/sections';

type LayoutProps = {
    activeLocale: LocaleType,
    activeCategoryData: CategoriesDataType,
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[],
    attributeGroupData: AttributeGroupDataType[],
    attributeGroupTranslateData: AttributeGroupTranslateDataType[],
    attributeData: AttributeDataType[],
    attributeTranslateData: AttributeTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
}

const CategoryPageLayout: React.FC<LayoutProps> = ({
    activeCategoryData,
    activeLocale,
    attributeData,
    attributeGroupData,
    attributeGroupTranslateData,
    attributeTranslateData,
    brandData,
    brandTranslateData,
    categoryData,
    categoryTranslateData,
    titleDictionary,
    generalDictionary,
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
            <ProductsSection
                loading={loading}
                activeLocale={activeLocale}
                categoryData={categoryData}
                categoryTranslateData={categoryTranslateData}
                activeCategoryData={activeCategoryData}
                brandData={brandData}
                brandTranslateData={brandTranslateData}
                attributeData={attributeData}
                attributeGroupData={attributeGroupData}
                attributeGroupTranslateData={attributeGroupTranslateData}
                attributeTranslateData={attributeTranslateData}
                titleDictionary={titleDictionary}
                generalDictionary={generalDictionary}
            />
        </React.Fragment>
    )
}

export default React.memo(CategoryPageLayout);
