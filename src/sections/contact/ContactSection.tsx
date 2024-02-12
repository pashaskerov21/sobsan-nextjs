'use client'
import React from 'react'
import { LoadingType, LocaleType, SettingDataType, SettingTranslateDataType } from '@/src/types';
import { Container, Section } from '@/src/styles';
import { ContactWrapper } from './style';
import { ContactForm, SocialMedia } from '@/src/components';
import { Setting } from '@/src/class';
import { FaPhone, FaPhoneAlt } from 'react-icons/fa';
import { FaEnvelope, FaLocationDot } from 'react-icons/fa6';

type SectionProps = {
    activeLocale: LocaleType,
    loading: LoadingType,
    settingData: SettingDataType,
    settingTranslateData: SettingTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

const ContactSection: React.FC<SectionProps> = ({
    activeLocale,
    formDictionary,
    generalDictionary,
    loading,
    settingData,
    settingTranslateData,
    titleDictionary,
}) => {
    const setting = new Setting(settingTranslateData);
    return (
        <Section $py={20}>
            <Container>
                <ContactWrapper>
                    <div className="wrapper__left">
                        <ContactForm
                            activeLocale={activeLocale}
                            formDictionary={formDictionary}
                            generalDictionary={generalDictionary}
                            loading={loading}
                            titleDictionary={titleDictionary}
                        />
                    </div>
                    <div className="wrapper__right">
                        <div className="contact__item">
                            <div className="item__icon">
                                <FaPhoneAlt />
                            </div>
                            <div className="item__value">
                                Tel: {settingData.phone}
                            </div>
                            <div className="item__value">
                                Tel: {settingData.hotline}
                            </div>
                        </div>
                        <div className="contact__item">
                            <div className="item__icon">
                                <FaEnvelope />
                            </div>
                            <div className="item__value">
                                {settingData.mail}
                            </div>
                        </div>
                        <div className="contact__item">
                            <div className="item__icon">
                                <FaLocationDot />
                            </div>
                            <div className="item__value">
                                {setting.getTranslate(1, activeLocale, "address")}
                            </div>
                        </div>
                        <SocialMedia className='form-page' settingData={settingData} />
                    </div>
                </ContactWrapper>
            </Container>
        </Section>
    )
}

export default React.memo(ContactSection);
