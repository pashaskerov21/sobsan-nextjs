'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { ProductGrid, ProductLeftFilters, ProductPagination, ProductSortFilters, Skeleton } from '@/src/components'
import { Container, Section } from '@/src/styles'
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleType, ProductCategoryRelationDataType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import { CategoryCoverImage, ProductGeneralContainer } from './style';
import { FaFilter } from "react-icons/fa";
import { FaList, FaTableCellsLarge } from "react-icons/fa6";
import { useLocalStorage } from 'usehooks-ts'
import { ProductAttributeRelationDataType, ProductFilterDataType } from '@/src/types/data'
import { Product } from '@/src/class'
import { ProductData } from '@/src/data'

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
    productAttributeRelationData: ProductAttributeRelationDataType[],
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
    productAttributeRelationData,
}) => {
    // variables
    const body = document.querySelector('body');
    const generalWrapperRef = useRef<HTMLDivElement>(null);
    const product = new Product(ProductData, productTranslateData);
    const [filterShow, setFilterShow] = React.useState<boolean>(false);
    const [productsView, setProductsView] = useLocalStorage<"grid" | "list">("products-view", 'grid');
    const [productState, setProductState] = React.useState<{
        filtered: ProductDataType[] | [],
        finalResult: ProductDataType[] | []
    }>({
        filtered: categoryProducts,
        finalResult: [],
    });
    const [productFilterData, setProductFilterData] = useLocalStorage<ProductFilterDataType>('filter-data', {
        price: {
            min: 0,
            max: product.getMaxPrice(productState.filtered),
        },
        brand: 0,
        attributeIDs: [],
    });
    const [paginationState, setPaginationState] = useLocalStorage("pagination", {
        currentPage: 1,
        productCount: 12,
    });
    const indexOfLastProduct = paginationState.currentPage * paginationState.productCount;
    const indexOfFirstProduct = indexOfLastProduct - paginationState.productCount;

    // functions
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
        setProductsView(value);
    }, [setProductsView]);

    const handleChangePrice = (key: "min" | "max", value: number) => {
        setProductFilterData((prev) => {
            return {
                ...prev,
                price: {
                    ...prev.price,
                    [key]: value,
                }
            }
        });
    };

    const scrollContainerTop = () => {
        if (generalWrapperRef.current) {
            const rect = generalWrapperRef.current.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const distanceFromTop = rect.top + scrollTop - 140;

            if (distanceFromTop > 0) {
                window.scrollTo({
                    top: distanceFromTop,
                    behavior: 'smooth',
                });
            }
        }
    };

    const handleSelectBrand = (id: number) => {
        setProductFilterData((prev) => {
            return {
                ...prev,
                brand: prev.brand === id ? 0 : id,
            }
        })
    };

    const handleSelectAttribute = (id: number) => {
        setProductFilterData((prev) => {
            return{
                ...prev,
                attributeIDs: prev.attributeIDs.includes(id) ? [...prev.attributeIDs.filter((attr_id) => attr_id !== id)] : [...prev.attributeIDs, id],
            }
        })
    }

    const resetLeftFilterForm = () => {
        scrollContainerTop();
        setProductFilterData({
            price: {
                min: 0,
                max: product.getMaxPrice(categoryProducts),
            },
            brand: 0,
            attributeIDs: [],
        })
    }

    const handleSubmitFilterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        scrollContainerTop();
        closeFilters();
        setPaginationState((prev) => {
            return {
                ...prev,
                currentPage: 1,
            }
        })
        setProductState((prev) => {
            return {
                ...prev,
                filtered: product.filterization(productFilterData, categoryProducts, productAttributeRelationData),
            }
        })
    };

    // useeffect
    React.useEffect(() => {
        setProductState((prev) => {
            return {
                ...prev,
                finalResult: productState.filtered.slice(indexOfFirstProduct, indexOfLastProduct),
            }
        });
    }, [indexOfFirstProduct, indexOfLastProduct, productState.filtered]);

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
                <ProductGeneralContainer ref={generalWrapperRef}>
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
                        productFilterData={productFilterData}
                        maxPrice={product.getMaxPrice(categoryProducts)}
                        handleChangePrice={handleChangePrice}
                        handleSubmitFilterForm={handleSubmitFilterForm}
                        titleDictionary={titleDictionary}
                        generalDictionary={generalDictionary}
                        handleSelectBrand={handleSelectBrand}
                        handleSelectAttribute={handleSelectAttribute}
                        resetLeftFilterForm={resetLeftFilterForm}
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
                                            <div className={`layout-button ${productsView === 'list' ? 'active' : ''}`} onClick={() => changeProductLayout('list')}><FaList /></div>
                                            <div className={`layout-button ${productsView === 'grid' ? 'active' : ''}`} onClick={() => changeProductLayout('grid')}><FaTableCellsLarge /></div>
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
                                    totalProducts={productState.filtered.length}
                                    scrollContainerTop={scrollContainerTop}
                                />
                            )
                        }
                    </div>
                </ProductGeneralContainer>
            </Container>
        </Section >
    )
}

export default React.memo(ProductsSection)
