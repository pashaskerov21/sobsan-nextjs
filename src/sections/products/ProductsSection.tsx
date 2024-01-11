'use client'
import React from 'react'
import Image from 'next/image'
import { ProductGrid, ProductLeftFilters, ProductPagination, ProductSortFilters, Skeleton } from '@/src/components'
import { Container, Section } from '@/src/styles'
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import { CategoryCoverImage, ProductGeneralContainer } from './style';
import { FaFilter } from "react-icons/fa";
import { FaList, FaTableCellsLarge } from "react-icons/fa6";

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
    }, [productsLayout])



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
                                <span>Filterlər</span>
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
                        <ProductGrid />
                        <ProductPagination />
                    </div>
                </ProductGeneralContainer>
            </Container>
        </Section >
    )
}

export default React.memo(ProductsSection)
