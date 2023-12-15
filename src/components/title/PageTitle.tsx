'yse client'
import React from 'react'
import Link from 'next/link'
import { PageTitleWrapper } from './style'
import { PageTitleProps } from '@/src/types'
import { Container } from '@/src/styles'
import { BsChevronRight } from 'react-icons/bs'

const PageTitle: React.FC<PageTitleProps> = ({
    activeLocale,
    pageTitleData,
    titleDictionary,
}) => {
    return (
        <React.Fragment>
            <PageTitleWrapper>
                <Container>
                    <div className="inner">
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
                    </div>
                </Container>
            </PageTitleWrapper>
        </React.Fragment>
    )
}

export default React.memo(PageTitle)
