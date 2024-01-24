'use client'
import React from 'react'
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, ComparisonDataType, LoadingType, LocaleStateType, LocaleType, PageTitleDataType, ProductAttributeRelationDataType, ProductCategoryRelationDataType, ProductDataType, ProductTranslateDataType, ProductWeightRelationDataType, WeightDataType, WishlistDataType } from '@/src/types'
import { useDispatch } from 'react-redux'
import { Product } from '@/src/class'
import { updateLocaleSlug } from '@/src/redux/actions'
import { ProductPageTitle } from '@/src/components'
import { ProductDetailSection } from '@/src/sections'
import { useLocalStorage } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid';


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
    weightData: WeightDataType[],
    productWeightRelationData: ProductWeightRelationDataType[],
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
    productWeightRelationData,
    weightData,
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


    // product button functions
    const [wishlistStorage, setWishlistStorage] = useLocalStorage<WishlistDataType[] | []>("wishlist", []);
    const [comparisonStorage, setComparisonStorage] = useLocalStorage<ComparisonDataType[] | []>("comparison", []);
    const wishlistData: WishlistDataType = {
        id: uuidv4(),
        user: null,
        product: activeProductData.id,
    };
    const comparisonData: ComparisonDataType = {
        id: uuidv4(),
        user: null,
        product: activeProductData.id,
    };
    const isWishlist = wishlistStorage.find((data) => data.product === activeProductData.id);
    const isComparison = comparisonStorage.find((data) => data.product === activeProductData.id);
    const [productState, setProductState] = React.useState<{
        wishlist: boolean,
        comparison: boolean,
    }>({
        wishlist: false,
        comparison: false,
    });
    React.useEffect(() => {
        setProductState({
            comparison: isComparison ? true : false,
            wishlist: isWishlist ? true : false,
        })
    }, [isComparison, isWishlist]);


    const handleFavoritetButton = React.useCallback(() => {
        if (isWishlist) {
            const filteredData = wishlistStorage.filter((data) => data.product !== activeProductData.id);
            setWishlistStorage([...filteredData]);
        } else {
            setWishlistStorage([...wishlistStorage, wishlistData]);
        };
    }, [wishlistStorage, setWishlistStorage, isWishlist]);
    const handleComparisonButton = React.useCallback(() => {
        if (isComparison) {
            const filteredData = comparisonStorage.filter((data) => data.product !== activeProductData.id);
            setComparisonStorage([...filteredData]);
        } else {
            setComparisonStorage([...comparisonStorage, comparisonData])
        };
    }, [comparisonStorage, setComparisonStorage, isComparison]);
    return (
        <React.Fragment>
            <ProductPageTitle
                loading={loading}
                activeLocale={activeLocale}
                pageTitleData={pageTitleData}
                titleDictionary={titleDictionary}
                productState={productState}
                handleFavoritetButton={handleFavoritetButton}
                handleComparisonButton={handleComparisonButton}
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
                productWeightRelationData={productWeightRelationData}
                weightData={weightData}
                titleDictionary={titleDictionary}
            />
        </React.Fragment>
    )
}

export default React.memo(ProductDetailPageLayout)
