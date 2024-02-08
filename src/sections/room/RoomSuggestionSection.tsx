'use client'
import React, { Fragment } from 'react'
import { Container, Section } from '@/src/styles'
import { LoadingType, LocaleType, RoomDataType, RoomTranslateDataType } from '@/src/types'
import { SectionTitle, Skeleton } from '@/src/components'
import { SuggestionWrapper } from './style'
import Link from 'next/link'
import Image from 'next/image'
import { Suggestion } from '@/src/class'

type SectionProps = {
  activeLocale: LocaleType,
  loading: LoadingType,
  roomData: RoomDataType[],
  roomTranslateData: RoomTranslateDataType[],
  titleDictionary: { [key: string]: string },
  generalDictionary: { [key: string]: string },
}

const RoomSuggestionSection: React.FC<SectionProps> = ({
  activeLocale,
  generalDictionary,
  loading,
  roomData,
  roomTranslateData,
  titleDictionary,
}) => {
  const suggestion = new Suggestion(roomData, roomTranslateData);
  return (
    <Section $py={60} className={`${loading.lazy ? '' : 'room__section'}`}>
      <Container>
        <SectionTitle title={generalDictionary['coloring_suggestion']} className="color__white" />
        <SuggestionWrapper>
          {
            roomData.map((data) => (
              <Link href={suggestion.getTranslate(data.id, activeLocale, "url")} className='suggestion__item' key={`suggestion-${data.id}`}>
                <div className="suggestion__item__image">
                  {loading.lazy ? <Skeleton width='100%' height='100%' /> : <Image src={data.image} width={1000} height={1000} alt='' priority={true} />}
                  <div className="image__hover">
                    <div className="title">
                      {suggestion.getTranslate(data.id, activeLocale, "title")}
                    </div>
                  </div>
                </div>
                <div className="suggestion__item__content">
                  {loading.lazy ? (
                    <Fragment>
                      <Skeleton width='100%' max_width='325px' height='25px' />
                      <Skeleton width='100%' max_width='150px' height='65px' />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className="up__title">{generalDictionary['coloring_suggestion']}</div>
                      <div className="main__title">{suggestion.getTranslate(data.id, activeLocale, "title")}</div>
                    </Fragment>
                  )}
                </div>
              </Link>
            ))
          }
        </SuggestionWrapper>
      </Container>
    </Section>
  )
}

export default React.memo(RoomSuggestionSection)
