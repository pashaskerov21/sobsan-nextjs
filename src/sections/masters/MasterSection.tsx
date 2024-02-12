'use client'
import React, { Fragment } from 'react'
import { Container, Section } from '@/src/styles'
import { ArticleDataType, ArticleTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import { MasterWrapper } from './style'
import { Article } from '@/src/class'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { Autoplay } from 'swiper/modules'
import { Skeleton } from '@/src/components'

type SectionProps = {
    loading: LoadingType,
    activeLocale: LocaleType,
    articleData: ArticleDataType[],
    articleTranslateData: ArticleTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

const MasterSection: React.FC<SectionProps> = ({
    activeLocale,
    articleData,
    articleTranslateData,
    formDictionary,
    generalDictionary,
    titleDictionary,
    loading,
}) => {
    const article = new Article(articleData, articleTranslateData);
    const masterArticles: ArticleDataType[] = article.getArticle(7);
    const [activeFormTab, setActiveFormTab] = React.useState<number>(1);
    return (
        <Section $py={20}>
            <Container>
                <MasterWrapper $activeTab={activeFormTab}>
                    <div className="wrapper__left">
                        <div className="master__form__tab__buttons">
                            {
                                loading.lazy ? (
                                    <Fragment>
                                        <Skeleton width='100%' height='55px' className='button__skeleton' />
                                        <Skeleton width='100%' height='55px' className='button__skeleton' />
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <div className={`form__tab__button ${activeFormTab === 1 && 'active'}`} onClick={() => setActiveFormTab(1)}>{titleDictionary['login']}</div>
                                        <div className={`form__tab__button ${activeFormTab === 2 && 'active'}`} onClick={() => setActiveFormTab(2)}>{titleDictionary['registration']}</div>
                                        <div className="active__button__layer"></div>
                                    </Fragment>
                                )
                            }

                        </div>
                    </div>
                    <div className="wrapper__right">
                        <Swiper
                            loop={true}
                            spaceBetween={20}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                        >
                            {
                                masterArticles.map((data) => (
                                    <SwiperSlide key={`master-article-image-${data.id}`}>
                                        {data.image && (
                                            <div className="master__image">
                                                <Image src={data.image} width={1000} height={500} priority={true} alt='' />
                                            </div>
                                        )}
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        {
                            masterArticles.map((data) => (
                                <div className="master__content" key={`master-article-content-${data.id}`}>
                                    <div className="content__title">{article.getTranslate(data.id, activeLocale, "title")}</div>
                                    <div className="content__text" dangerouslySetInnerHTML={{ __html: article.getTranslate(data.id, activeLocale, "text") }} />
                                </div>
                            ))
                        }
                    </div>
                </MasterWrapper>
            </Container>
        </Section>
    )
}

export default React.memo(MasterSection)
