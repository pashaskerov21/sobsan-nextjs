'use client'
import React from 'react'
import Link from 'next/link'
import { PageTitleWrapper } from './style'
import { LoadingType, LocaleType, PageTitleDataType } from '@/src/types'
import { Container } from '@/src/styles'
import { BsChevronRight } from 'react-icons/bs'
import Skeleton from '../skeleton/Skeleton'
import { FaBalanceScale, FaHeart, FaRegHeart } from 'react-icons/fa'
import { FaRegTrashCan } from "react-icons/fa6";

type PageTitleProps = {
    loading: LoadingType,
    activeLocale: LocaleType,
    pageTitleData: PageTitleDataType,
    titleDictionary: { [key: string]: string },
    type?: "product" | "basket" | "wishlist" | "comparison",
    productState?: {
        wishlist: boolean,
        comparison: boolean,
    },
    handleFavoritetButton?: () => void,
    handleComparisonButton?: () => void,
    handleClearStorage?: () => void,
}

const PageTitle: React.FC<PageTitleProps> = ({
    loading,
    activeLocale,
    pageTitleData,
    titleDictionary,
    type,
    handleComparisonButton,
    handleFavoritetButton,
    handleClearStorage,
    productState,
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
                            {
                                type === "product" && productState && (
                                    <div className="product__buttons">
                                        <div className={`product__button ${productState.comparison ? 'active' : ''}`} onClick={handleComparisonButton}>
                                            <FaBalanceScale />
                                        </div>
                                        <div className={`product__button ${productState.wishlist ? 'active' : ''}`} onClick={handleFavoritetButton}>
                                            {productState.wishlist ? <FaHeart /> : <FaRegHeart />}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                (type === "basket" || type === "wishlist" || type === "comparison") && (
                                    <div className="clear__button" onClick={handleClearStorage}>
                                        <FaRegTrashCan/>
                                        <span>{titleDictionary["clear"]}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Container>
            </PageTitleWrapper >
        </React.Fragment >
    )
}

export default React.memo(PageTitle)
