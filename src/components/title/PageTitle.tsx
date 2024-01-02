'yse client'
import React from 'react'
import Link from 'next/link'
import { PageTitleWrapper } from './style'
import { LocaleType, PageTitleDataType } from '@/src/types'
import { Container } from '@/src/styles'
import { BsChevronRight } from 'react-icons/bs'
import Skeleton from '../skeleton/Skeleton'

type PageTitleProps = {
    loading: boolean,
    activeLocale: LocaleType,
    pageTitleData: PageTitleDataType,
    titleDictionary: { [key: string]: string },
}

const PageTitle: React.FC<PageTitleProps> = ({
    loading,
    activeLocale,
    pageTitleData,
    titleDictionary,
}) => {
    return (
        <React.Fragment>
            <PageTitleWrapper>
                <Container>
                    <div className="inner">
                        {
                            loading ? (
                                <React.Fragment>
                                    <Skeleton width='180px' height='15px' margin='0 0 6px 0'/>
                                    <Skeleton width='240px' height='40px'/>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
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
                                    <h2 className="title">{pageTitleData.title}</h2>
                                </React.Fragment>
                            )
                        }
                    </div>
                </Container>
            </PageTitleWrapper>
        </React.Fragment>
    )
}

export default React.memo(PageTitle)
