'use client'
import React from 'react'
import { Container, Section } from '@/src/styles'
import { LoadingType } from '@/src/types'

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
