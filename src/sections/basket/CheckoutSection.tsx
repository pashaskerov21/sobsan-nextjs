'use client'
import React from 'react'
import { Container, Section } from '@/src/styles'
import { LoadingType, LocaleType } from '@/src/types'
import { CheckoutForm } from '@/src/components'

type SectionProps = {
  activeLocale: LocaleType,
  loading: LoadingType,
  titleDictionary: { [key: string]: string },
  generalDictionary: { [key: string]: string },
  formDictionary: {
    [key: string]: {
      [key: string]: string
    }
  },
}

const CheckoutSection: React.FC<SectionProps> = ({
  activeLocale,
  formDictionary,
  loading,
  titleDictionary,
  generalDictionary
}) => {
  return (
    <Section $py={20}>
      <Container>
        <CheckoutForm
          activeLocale={activeLocale}
          formDictionary={formDictionary}
          generalDictionary={generalDictionary}
          loading={loading}
          titleDictionary={titleDictionary}
        />
      </Container>
    </Section>
  )
}

export default React.memo(CheckoutSection)
