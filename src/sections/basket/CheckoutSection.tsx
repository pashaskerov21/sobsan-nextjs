'use client'
import { Container, Section } from '@/src/styles'
import { LoadingType } from '@/src/types'
import React from 'react'

type SectionProps = {
    activeLocale: string,
    loading: LoadingType,
    titleDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

const CheckoutSection:React.FC<SectionProps> = () => {
  return (
    <Section $py={20}>
        <Container></Container>
    </Section>
  )
}

export default React.memo(CheckoutSection)
