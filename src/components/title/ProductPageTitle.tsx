'use client'
import React from 'react'
import Link from 'next/link'
import { PageTitleWrapper } from './style'
import { LoadingType, LocaleType, PageTitleDataType } from '@/src/types'
import { Container } from '@/src/styles'
import { BsChevronRight } from 'react-icons/bs'
import Skeleton from '../skeleton/Skeleton'
import { PiHeartStraight, PiScalesLight } from 'react-icons/pi'
import { FaBalanceScale, FaHeart, FaRegHeart } from 'react-icons/fa'

type ProductPageTitleProps = {
    loading: LoadingType,
    activeLocale: LocaleType,
    pageTitleData: PageTitleDataType,
    titleDictionary: { [key: string]: string },
    productState: {
        wishlist: boolean,
        comparison: boolean,
    },
    handleFavoritetButton: () => void,
    handleComparisonButton: () => void,
}

const ProductPageTitle: React.FC<ProductPageTitleProps> = ({
    loading,
    activeLocale,
    pageTitleData,
    titleDictionary,
    productState,
    handleComparisonButton,
    handleFavoritetButton,
}) => {
    return (
        <React.Fragment>
            <PageTitleWrapper>
                <Container>
                    <div className="inner">
                        {
                            loading.standart ? (
                                <Skeleton width='180px' height='15px' margin='0 0 6px 0' />
                            ) : (
                                <div className="breadcrumbs">
                                    <Link href={`/${activeLocale}`}>{titleDictionary.home_page}</Link>
                                    {
                                        pageTitleData.breadcrumbs.map((data) => (
                                            <React.Fragment key={data.id}>
                                                <BsChevronRight />
                                                <Link href={data.path}>{data.name}</Link>
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                            )
                        }
                        <div className="pagetitle__bottom">
                            {
                                loading.standart ? (
                                    <Skeleton width='240px' height='40px' />
                                ) : (
                                    <h2 className="title">{pageTitleData.title}</h2>
                                )
                            }
                            <div className="product__buttons">
                                <div className={`product__button ${productState.comparison ? 'active' : ''}`} onClick={handleComparisonButton}>
                                    <FaBalanceScale  />
                                </div>
                                <div className={`product__button ${productState.wishlist ? 'active' : ''}`} onClick={handleFavoritetButton}>
                                    {productState.wishlist ? <FaHeart /> : <FaRegHeart />}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </PageTitleWrapper>
        </React.Fragment>
    )
}

export default React.memo(ProductPageTitle)
