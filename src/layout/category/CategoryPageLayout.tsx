'use client'
import React, { Fragment } from 'react'
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleStateType, LocaleType, PageTitleDataType, ProductAttributeRelationDataType, ProductCategoryRelationDataType, ProductDataType, ProductTranslateDataType } from '@/src/types'
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
    productCategoryRelationData: ProductCategoryRelationDataType[],
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    productAttributeRelationData: ProductAttributeRelationDataType[],
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
    productCategoryRelationData,
    productData,
    productTranslateData,
    productAttributeRelationData,
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
    const dispatch = useDispatch();

    const category = new Category(categoryData, categoryTranslateData);
    const localeSlugs: LocaleStateType[] = category.getLocaleSlugs(activeCategoryData.id);
    const pageTitleData: PageTitleDataType = category.getPageTitleData(activeCategoryData.id, activeLocale);

    const categoryProducts = category.getProducts(activeCategoryData.id, productCategoryRelationData, productData);

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
                categoryProducts={categoryProducts}
                productTranslateData={productTranslateData}
                productAttributeRelationData={productAttributeRelationData}
                titleDictionary={titleDictionary}
                generalDictionary={generalDictionary}
            />
        </Fragment>
    )
}

export default React.memo(CategoryPageLayout);
