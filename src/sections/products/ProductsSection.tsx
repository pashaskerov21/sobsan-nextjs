'use client'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ProductGrid, ProductLeftFilters, ProductPagination, ProductSortFilters, Skeleton } from '@/src/components'
import { AlertComponent, Container, Section } from '@/src/styles'
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
import { usePathname, useRouter } from 'next/navigation'

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
    const router = useRouter();
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
    const [productFilterData, setProductFilterData] = useState<ProductFilterDataType>({
        price: {
            min: 0,
            max: product.getMaxPrice(productState.filtered),
        },
        brand: 0,
        attributeIDs: [],
    });
    const [paginationState, setPaginationState] = useState<{
        currentPage: number,
        productCount: number,
        pageNumbers: number[],
    }>({
        currentPage: 1,
        productCount: 12,
        pageNumbers: [],
    });
    let indexOfLastProduct = paginationState.currentPage * paginationState.productCount;
    let indexOfFirstProduct = indexOfLastProduct - paginationState.productCount;

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
        setProductFilterData({
            price: {
                min: 0,
                max: product.getMaxPrice(categoryProducts),
            },
            brand: 0,
            attributeIDs: [],
        });
        const url = window.location.origin + window.location.pathname;
        router.push(url);
        closeFilters();
    }, [router]);


    const handlePageChange = (number: number) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', number.toString());
        const queryString = queryParams.toString();
        const url = `${window.location.pathname}?${queryString}`;

        router.push(url);
    }
    const handlePrevPage = () => {
        const page = paginationState.currentPage - 1;
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', page.toString());
        const queryString = queryParams.toString();
        const url = `${window.location.pathname}?${queryString}`;

        router.push(url);
    }
    const handleNextPage = () => {
        const page = paginationState.currentPage + 1;
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', page.toString());
        const queryString = queryParams.toString();
        const url = `${window.location.pathname}?${queryString}`;

        router.push(url);
    }

    const handleSubmitFilterForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        closeFilters();

        const queryParams = new URLSearchParams(window.location.search); 

        queryParams.set('min', productFilterData.price.min.toString());
        queryParams.set('max', productFilterData.price.max.toString());
        if (productFilterData.brand !== 0) {
            queryParams.set('brand', productFilterData.brand.toString());
        } else {
            queryParams.delete('brand');
        }

        if (productFilterData.attributeIDs.length > 0) {
            queryParams.delete('attr');
            productFilterData.attributeIDs.forEach(attrId => {
                queryParams.append('attr', attrId.toString());
            });
        } else {
            queryParams.delete('attr');
        }
        queryParams.delete('page');

        const queryString = queryParams.toString();
        const url = `${window.location.pathname}?${queryString}`;

        router.push(url);
    }, [router, productFilterData]);

    const handleSortFilters = useCallback((value: "cheaptoexp" | "exptocheap" | 'a-z' | 'z-a') => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('sort', value);
        const url = `${window.location.pathname}?${urlParams.toString()}`;
        router.push(url);

    }, [router]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const minPrice = urlParams.get('min');
        const maxPrice = urlParams.get('max');
        const attributes = urlParams.getAll('attr');
        const branID = urlParams.get('brand');
        const sort = urlParams.get('sort');
        const activePage = urlParams.get('page');
        let filterDataResult: ProductFilterDataType = productFilterData;
        if (minPrice && maxPrice) {
            filterDataResult = {
                ...filterDataResult,
                price: {
                    min: parseInt(minPrice),
                    max: parseInt(maxPrice),
                },
            }
        }
        if (attributes.length > 0) {
            filterDataResult = {
                ...filterDataResult,
                attributeIDs: attributes.map(attr => parseInt(attr)),
            }
        }
        if (branID) {
            filterDataResult = {
                ...filterDataResult,
                brand: parseInt(branID),
            }
        }

        setProductFilterData(filterDataResult);

        let filteredProducts: ProductDataType[] = product.techFilterization(filterDataResult, categoryProducts, productAttributeRelationData);
        setProductState((prev) => ({
            ...prev,
            filtered: filteredProducts,
        }));

        if (sort && (sort === 'cheaptoexp' || sort === 'exptocheap' || sort === 'a-z' || sort === 'z-a')) {

            filteredProducts = filteredProducts.map((data) => ({
                ...data,
                activeTitle: product.getTranslate(data.id, activeLocale, "title"),
            }));
            filteredProducts = product.sortFilterization(sort, filteredProducts)
            setProductState((prev) => ({
                ...prev,
                filtered: filteredProducts,
            }));
        }
        const pageNumbers: number[] = [];
        for (let i = 1; i <= Math.ceil(filteredProducts.length / paginationState.productCount); i++) {
            pageNumbers.push(i);
        }
        setPaginationState((prev) => {
            return {
                ...prev,
                currentPage: activePage ? parseInt(activePage) : 1,
                pageNumbers: pageNumbers,
            }
        });
        if (activePage) {
            indexOfLastProduct = parseInt(activePage) * paginationState.productCount;
            indexOfFirstProduct = indexOfLastProduct - paginationState.productCount;
        }
        setProductState((prev) => {
            return {
                ...prev,
                finalResult: filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct),
            }
        });
    }, []);

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
                                                paginationState={paginationState}
                                                handlePageChange={handlePageChange}
                                                handlePrevPage={handlePrevPage}
                                                handleNextPage={handleNextPage}
                                            />
                                        )
                                    }
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {
                                        loading.standart ? <Skeleton width='100%' height='45px' radius='10px' /> : (
                                            <AlertComponent>
                                                {generalDictionary["no_product"]}
                                            </AlertComponent>
                                        )
                                    }
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
