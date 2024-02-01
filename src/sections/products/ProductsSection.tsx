'use client'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ProductGrid, ProductLeftFilters, ProductPagination, ProductSortFilters, Skeleton } from '@/src/components'
import { Container, Section } from '@/src/styles'
import {
    AttributeDataType,
    AttributeGroupDataType,
    AttributeGroupTranslateDataType,
    AttributeTranslateDataType,
    BrandDataType,
    BrandTranslateDataType,
    CategoriesDataType,
    CategoriesTranslateDataType,
    LoadingType,
    LocaleType,
    ProductAttributeRelationDataType,
    ProductDataType,
    ProductFilterDataType,
    ProductTranslateDataType
} from '@/src/types'
import { CategoryCoverImage, ProductGeneralContainer } from './style';
import { FaFilter } from "react-icons/fa";
import { FaList, FaTableCellsLarge } from "react-icons/fa6";
import { useLocalStorage } from 'usehooks-ts'
import { Product } from '@/src/class'
import { ProductData } from '@/src/data'
import { usePathname } from 'next/navigation'
import { AlertComponent } from '@/src/styles/components/alert'

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
    const pathName = usePathname();
    const generalWrapperRef = useRef<HTMLDivElement>(null);
    const product = new Product(ProductData, productTranslateData);
    const [filterShow, setFilterShow] = useState<boolean>(false);
    const [productsView, setProductsView] = useState<"grid" | "list">('grid');
    const [productState, setProductState] = useState<{
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
    const openFilters = useCallback(() => {
        if (window.innerWidth < 1200) {
            setFilterShow(true);
            if (body) {
                body.style.overflow = "hidden";
            }
        }
    }, [setFilterShow, body]);

    const closeFilters = useCallback(() => {
        if (window.innerWidth < 1200) {
            setFilterShow(false);
            if (body) {
                body.style.overflow = "visible";
            }
        }
    }, [setFilterShow, body]);

    const changeProductLayout = useCallback((value: 'list' | 'grid') => {
        setProductsView(value);
    }, [setProductsView]);

    const handleChangePrice = useCallback((key: "min" | "max", value: number) => {
        setProductFilterData((prev) => {
            return {
                ...prev,
                price: {
                    ...prev.price,
                    [key]: value,
                }
            };
        });
    }, [setProductFilterData]);

    const scrollContainerTop = useCallback(() => {
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
    }, [generalWrapperRef]);

    const handleSelectBrand = useCallback((id: number) => {
        setProductFilterData((prev) => {
            return {
                ...prev,
                brand: prev.brand === id ? 0 : id,
            };
        });
    }, [setProductFilterData]);

    const handleSelectAttribute = useCallback((id: number) => {
        setProductFilterData((prev) => {
            return {
                ...prev,
                attributeIDs: prev.attributeIDs.includes(id)
                    ? [...prev.attributeIDs.filter((attr_id) => attr_id !== id)]
                    : [...prev.attributeIDs, id],
            };
        });
    }, [setProductFilterData]);

    const resetLeftFilterForm = useCallback(() => {
        scrollContainerTop();

        setProductFilterData((prev) => ({
            price: {
                min: 0,
                max: product.getMaxPrice(categoryProducts),
            },
            brand: 0,
            attributeIDs: [],
        }));

        setPaginationState((prev) => ({
            ...prev,
            currentPage: 1,
        }));

        scrollContainerTop();
        closeFilters();

        setProductState((prev) => ({
            ...prev,
            filtered: product.techFilterization(productFilterData, categoryProducts, productAttributeRelationData),
        }));
    }, [scrollContainerTop, setProductFilterData, product.getMaxPrice, categoryProducts, setPaginationState, closeFilters, setProductState, product.techFilterization]);


    const handleSubmitFilterForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        scrollContainerTop();
        closeFilters();

        setPaginationState((prev) => ({
            ...prev,
            currentPage: 1,
        }));

        setProductState((prev) => ({
            ...prev,
            filtered: product.techFilterization(productFilterData, categoryProducts, productAttributeRelationData),
        }));
    }, [scrollContainerTop, closeFilters, setPaginationState, setProductState, product.techFilterization, productFilterData, categoryProducts, productAttributeRelationData]);


    const handleSortFilters = useCallback((type: "cheaptoexp" | "exptocheap" | 'a-z' | 'z-a') => {
        const productDataWithActiveTitle = productState.filtered.map((data) => ({
            ...data,
            activeTitle: product.getTranslate(data.id, activeLocale, "title"),
        }));

        setProductState((prev) => ({
            ...prev,
            filtered: product.sortFilterization(type, productDataWithActiveTitle),
            finalResult: product.sortFilterization(type, productDataWithActiveTitle).slice(indexOfFirstProduct, indexOfLastProduct),
        }));
    }, [productState, setProductState, product, activeLocale, indexOfFirstProduct, indexOfLastProduct]);

    // useeffect
    useEffect(() => {
        setProductState((prev) => {
            return {
                ...prev,
                finalResult: productState.filtered.slice(indexOfFirstProduct, indexOfLastProduct),
            }
        });
    }, [indexOfFirstProduct, indexOfLastProduct, productState.filtered]);

    useEffect(() => {
        setProductFilterData({
            price: {
                min: 0,
                max: product.getMaxPrice(productState.filtered),
            },
            brand: 0,
            attributeIDs: [],
        })
    }, [pathName])

    return (
        <Section $py={20}>
            <Container>
                {
                    activeCategoryData && activeCategoryData.cover_img && (
                        <Fragment>
                            {loading.lazy ? (
                                <Fragment></Fragment>
                            ) : (
                                <CategoryCoverImage>
                                    <Image src={activeCategoryData.cover_img} width={1000} height={100} alt='' />
                                </CategoryCoverImage>
                            )}
                        </Fragment>
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
                            <ProductSortFilters generalDictionary={generalDictionary} loading={loading} handleSortFilters={handleSortFilters} />
                            <div className="layout-buttons">
                                {
                                    loading.standart ? (
                                        <Fragment>
                                            <Skeleton width='36px' height='36px' radius='5px' />
                                            <Skeleton width='36px' height='36px' radius='5px' />
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <div className={`layout-button ${productsView === 'list' ? 'active' : ''}`} onClick={() => changeProductLayout('list')}><FaList /></div>
                                            <div className={`layout-button ${productsView === 'grid' ? 'active' : ''}`} onClick={() => changeProductLayout('grid')}><FaTableCellsLarge /></div>
                                        </Fragment>
                                    )
                                }
                            </div>
                        </div>
                        {
                            productState.filtered.length > 0 ? (
                                <Fragment>
                                    <ProductGrid
                                        loading={loading}
                                        activeLocale={activeLocale}
                                        productData={productState.finalResult}
                                        productTranslateData={productTranslateData}
                                        brandData={brandData}
                                        brandTranslateData={brandTranslateData}
                                        generalDictionary={generalDictionary}
                                        productsView={productsView}
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
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <AlertComponent>
                                        {generalDictionary["no_product"]}
                                    </AlertComponent>
                                </Fragment>
                            )
                        }
                    </div>
                </ProductGeneralContainer>
            </Container>
        </Section >
    )
}

export default React.memo(ProductsSection)
