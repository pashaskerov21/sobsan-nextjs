'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LoginForm, Skeleton, SocialMedia } from '@/src/components'
import { Container, Section } from '@/src/styles'
import { LoadingType, LocaleType, SettingDataType } from '@/src/types'
import { AccountFormWrapper } from './style'

type SectionProps = {
    activeLocale: LocaleType,
    settingData: SettingDataType,
    loading: LoadingType,
    titleDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

const LoginSection: React.FC<SectionProps> = ({
    activeLocale,
    settingData,
    titleDictionary,
    formDictionary,
    loading,
}) => {
    return (
        <Section $py={20}>
            <Container>
                <AccountFormWrapper>
                    {
                        loading.lazy ? (
                            <Skeleton width='100%' min_height='365px'/>
                        ) : (
                            <LoginForm
                                activeLocale={activeLocale}
                                formDictionary={formDictionary}
                                loading={loading}
                                titleDictionary={titleDictionary}
                            />
                        )
                    }
                    {
                        loading.standart ? (
                            <Skeleton width='100%' min_height='365px' />
                        ) : (
                            <div className="wrapper__right">
                                <Link href={`/${activeLocale}`} className='logo'>
                                    <Image src={settingData.logo} width={65} height={120} alt='logo' />
                                </Link>
                                <SocialMedia className='form-page' settingData={settingData} />
                                <Link href={`/${activeLocale}/registration`} className="link__button">
                                    {titleDictionary["registration"]}
                                </Link>
                            </div>
                        )
                    }
                </AccountFormWrapper>
            </Container>
        </Section>
    )
}

export default React.memo(LoginSection)
