'use client'
import React from 'react'
import Image from 'next/image'
import { ProductGrid, ProductLeftFilters, ProductPagination, ProductSortFilters, Skeleton } from '@/src/components'
import { Container, Section } from '@/src/styles'
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleType, ProductCategoryRelationDataType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import { CategoryCoverImage, ProductGeneralContainer } from './style';
import { FaFilter } from "react-icons/fa";
import { FaList, FaTableCellsLarge } from "react-icons/fa6";
import { useLocalStorage } from 'usehooks-ts'

type SectionProps = {
    loading: LoadingType,
    activeLocale: LocaleType,
    activeCategoryData?: CategoriesDataType,
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[],
    attributeGroupData: AttributeGroupDataType[],
    attributeGroupTranslateData: AttributeGroupTranslateDataType[],
    attributeData: AttributeDataType[],
    attributeTranslateData: AttributeTranslateDataType[],
    categoryProducts: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
}

const ProductsSection: React.FC<SectionProps> = ({
    activeLocale,
    attributeData,
    attributeGroupData,
    attributeGroupTranslateData,
    attributeTranslateData,
    brandData,
    brandTranslateData,
    categoryData,
    categoryTranslateData,
    loading,
    titleDictionary,
    activeCategoryData,
    generalDictionary,
    categoryProducts,
    productTranslateData,
}) => {
    const body = document.querySelector('body');
    const [filterShow, setFilterShow] = React.useState<boolean>(false);
    const [productsLayout, setProductsLayout] = React.useState<"grid" | "list">('grid');
    const openFilters = React.useCallback(() => {
        if (window.innerWidth < 1200) {
            setFilterShow(true);
            if (body) {
                body.style.overflow = "hidden";
            }
        }
    }, [filterShow]);
    const closeFilters = React.useCallback(() => {
        if (window.innerWidth < 1200) {
            setFilterShow(false);
            if (body) {
                body.style.overflow = "visible";
            }
        }
    }, [filterShow]);
    const changeProductLayout = React.useCallback((value: 'list' | 'grid') => {
        setProductsLayout(value);
    }, [productsLayout]);

    const [productState, setProductState] = React.useState<{
        filtered: ProductDataType[] | [],
        finalResult: ProductDataType[] | []
    }>({
        filtered: categoryProducts,
        finalResult: [],
    });

    const [paginationState] = useLocalStorage("pagination", {
        currentPage: 1,
        productCount: 12,
    });

    const indexOfLastProduct = paginationState.currentPage * paginationState.productCount;
    const indexOfFirstProduct = indexOfLastProduct - paginationState.productCount;
    React.useEffect(() => {
        setProductState((prev) => {
            return {
                ...prev,
                finalResult: prev.filtered.slice(indexOfFirstProduct, indexOfLastProduct),
            }
        });
    }, [indexOfFirstProduct, indexOfLastProduct])

    return (
        <Section $py={20}>
            <Container>
                {
                    activeCategoryData && activeCategoryData.cover_img && (
                        <React.Fragment>
                            {loading.lazy ? (
                                <React.Fragment></React.Fragment>
                            ) : (
                                <CategoryCoverImage>
                                    <Image src={activeCategoryData.cover_img} width={1000} height={100} alt='' />
                                </CategoryCoverImage>
                            )}
                        </React.Fragment>
                    )
                }
                <ProductGeneralContainer>
                    {
                        loading.standart ? (
                            <Skeleton className='d-lg-none' width='100%' height='54px' radius='10px' />
                        ) : (
                            <div className="show-filters-btn d-lg-none" onClick={openFilters}>
                                <FaFilter />
                                <span>{generalDictionary.filters}</span>
                            </div>
                        )
                    }
                    <ProductLeftFilters
                        activeLocale={activeLocale}
                        categoryData={categoryData}
                        categoryTranslateData={categoryTranslateData}
                        loading={loading}
                        activeCategoryData={activeCategoryData}
                        brandData={brandData}
                        brandTranslateData={brandTranslateData}
                        attributeData={attributeData}
                        attributeGroupData={attributeGroupData}
                        attributeGroupTranslateData={attributeGroupTranslateData}
                        attributeTranslateData={attributeTranslateData}
                        filterShow={filterShow}
                        closeFilters={closeFilters}
                        titleDictionary={titleDictionary}
                        generalDictionary={generalDictionary}
                    />
                    <div className="container-right">
                        <div className="right-top">
                            <ProductSortFilters
                                loading={loading}
                                generalDictionary={generalDictionary}
                            />
                            <div className="layout-buttons">
                                {
                                    loading.standart ? (
                                        <React.Fragment>
                                            <Skeleton width='36px' height='36px' radius='5px' />
                                            <Skeleton width='36px' height='36px' radius='5px' />
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <div className={`layout-button ${productsLayout === 'list' ? 'active' : ''}`} onClick={() => changeProductLayout('list')}><FaList /></div>
                                            <div className={`layout-button ${productsLayout === 'grid' ? 'active' : ''}`} onClick={() => changeProductLayout('grid')}><FaTableCellsLarge /></div>
                                        </React.Fragment>
                                    )
                                }
                            </div>
                        </div>
                        <ProductGrid
                            loading={loading}
                            activeLocale={activeLocale}
                            productData={productState.finalResult}
                            productTranslateData={productTranslateData}
                            brandData={brandData}
                            brandTranslateData={brandTranslateData}
                            generalDictionary={generalDictionary}
                        />
                        {
                            productState.filtered.length > paginationState.productCount && (
                                <ProductPagination
                                    loading={loading}
                                    totalProducts={productState.filtered.length} />
                            )
                        }
                    </div>
                </ProductGeneralContainer>
            </Container>
        </Section >
    )
}

export default React.memo(ProductsSection)
