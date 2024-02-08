'use client'
import React from 'react'
import { Suggestion } from '@/src/class'
import { ArticleContainer, Container, Section } from '@/src/styles'
import { LoadingType, LocaleType, RoomDataType, RoomTranslateDataType } from '@/src/types'
import Image from 'next/image'
import { Skeleton } from '@/src/components'

type SectionProps = {
    activeLocale: LocaleType,
    loading: LoadingType,
    activeData: RoomDataType,
    roomData: RoomDataType[],
    roomTranslateData: RoomTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
}

const RoomSuggesstionInnerSection: React.FC<SectionProps> = ({
    activeData,
    activeLocale,
    generalDictionary,
    loading,
    roomData,
    roomTranslateData,
    titleDictionary,
}) => {
    const suggestion = new Suggestion(roomData, roomTranslateData);
    return (
        <Section $py={20}>
            <Container>
                <ArticleContainer>
                    <div className="article__row two__column">
                        <div className="article__row__column">
                            {
                                loading.standart ? <Skeleton width='100%' height='250px' /> : (
                                    <div className="article__text">
                                        {suggestion.getTranslate(activeData.id, activeLocale, "text")}
                                    </div>
                                )
                            }
                        </div>
                        <div className="article__row__column">
                            {
                                loading.lazy ? <Skeleton width='100%' height='400px' /> : <Image src={activeData.image} width={1000} height={1000} alt='' priority={true} />
                            }
                        </div>
                    </div>
                </ArticleContainer>
            </Container>
        </Section>
    )
}

export default React.memo(RoomSuggesstionInnerSection)
