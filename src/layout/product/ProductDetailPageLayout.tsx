'use client'
import React from 'react'
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleStateType, LocaleType, PageTitleDataType, ProductAttributeRelationDataType, ProductCategoryRelationDataType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import { useDispatch } from 'react-redux'
import { Product } from '@/src/class'
import { updateLocaleSlug } from '@/src/redux/actions'
import { PageTitle } from '@/src/components'
import { ProductDetailSection } from '@/src/sections'

type LayoutProps = {
    activeLocale: LocaleType,
    activeProductData: ProductDataType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[],
    attributeGroupData: AttributeGroupDataType[],
    attributeGroupTranslateData: AttributeGroupTranslateDataType[],
    attributeData: AttributeDataType[],
    attributeTranslateData: AttributeTranslateDataType[],
    productCategoryRelationData: ProductCategoryRelationDataType[],
    productAttributeRelationData: ProductAttributeRelationDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
}

const ProductDetailPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    activeProductData,
    attributeData,
    attributeGroupData,
    attributeGroupTranslateData,
    attributeTranslateData,
    brandData,
    brandTranslateData,
    categoryData,
    categoryTranslateData,
    generalDictionary,
    productAttributeRelationData,
    productCategoryRelationData,
    productData,
    productTranslateData,
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
    const product = new Product(productData, productTranslateData);
    const localeSlugs: LocaleStateType[] = product.getLocaleSlugs(activeProductData.id);
    const pageTitleData: PageTitleDataType = product.getPageTitleData(activeProductData.id, activeLocale);

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
            <ProductDetailSection
                activeLocale={activeLocale}
                activeProductData={activeProductData}
                attributeData={attributeData}
                attributeGroupData={attributeGroupData}
                attributeGroupTranslateData={attributeGroupTranslateData}
                attributeTranslateData={attributeTranslateData}
                brandData={brandData}
                brandTranslateData={brandTranslateData}
                categoryData={categoryData}
                categoryTranslateData={categoryTranslateData}
                generalDictionary={generalDictionary}
                loading={loading}
                productAttributeRelationData={productAttributeRelationData}
                productCategoryRelationData={productCategoryRelationData}
                productData={productData}
                productTranslateData={productTranslateData}
                titleDictionary={titleDictionary}
            />
        </React.Fragment>
    )
}

export default React.memo(ProductDetailPageLayout)
