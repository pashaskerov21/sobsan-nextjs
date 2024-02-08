'use client'
import React from 'react'
import { Container, Section } from '@/src/styles'
import { LoadingType, LocaleType, RoomDataType, RoomTranslateDataType } from '@/src/types'

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
  return (
    <Section $py={60} className={`${loading.lazy ? '' : 'room__section'}`}>
      <Container></Container>
    </Section>
  )
}

export default React.memo(RoomSuggestionSection)
