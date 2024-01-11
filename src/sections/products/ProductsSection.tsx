'use client'
import React from 'react'
import Image from 'next/image'
import { ProductGrid, ProductLeftFilters, ProductPagination, ProductSortFilters, Skeleton } from '@/src/components'
import { Container, Section } from '@/src/styles'
import { CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import { CategoryCoverImage, ProductGeneralContainer } from './style';
import { FaFilter } from "react-icons/fa";

type SectionProps = {
    loading: LoadingType,
    activeLocale: LocaleType,
    activeCategoryData?: CategoriesDataType,
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    titleDictionary: { [key: string]: string },
}

const ProductsSection: React.FC<SectionProps> = ({
    activeLocale,
    categoryData,
    categoryTranslateData,
    loading,
    titleDictionary,
    activeCategoryData,
}) => {
    const body = document.querySelector('body');
    const [filterShow, setFilterShow] = React.useState<boolean>(false);
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
                        titleDictionary={titleDictionary}
                        activeCategoryData={activeCategoryData}
                        filterShow={filterShow}
                        closeFilters={closeFilters}
                    />
                    <div className="container-right">
                        <div className="right-top">
                            <ProductSortFilters />
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
