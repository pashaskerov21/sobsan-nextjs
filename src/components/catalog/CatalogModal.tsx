'use client'
import { Catalog, Color } from '@/src/class'
import { CatalogDataType, CatalogTranslateDataType, ColorDataType, ColorTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import Image from 'next/image'
import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CatalogModalWrapper } from './style'

type CatalogModalProps = {
    loading: LoadingType,
    activeLocale: LocaleType,
    activeCatalog: CatalogDataType,
    catalogData: CatalogDataType[],
    catalogTranslateData: CatalogTranslateDataType[],
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
    textDictionary: { [key: string]: string },
}

const CatalogModal: React.FC<CatalogModalProps> = ({
    activeCatalog,
    activeLocale,
    catalogData,
    catalogTranslateData,
    colorData,
    colorTranslateData,
    loading,
    textDictionary,
}) => {
    const body = document.querySelector('body');
    const catalog = new Catalog(catalogData, catalogTranslateData);
    const color = new Color(colorData, colorTranslateData);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const toggleModal = () => setShowModal(!showModal);
    const openModal = () => {
        setShowModal(true);
        if (body) {
            body.style.overflow = "hidden";
        }
    }
    const closeModal = () => {
        setShowModal(false);
        if (body) {
            body.style.overflow = "visible";
        }
    }
    return (
        <React.Fragment>
            <div className='catalog__modal__toggle__button' onClick={openModal}>Kataloqa bax</div>
            {
                showModal && (
                    <React.Fragment>
                        <div className="black-backdrop" onClick={closeModal}></div>
                        <CatalogModalWrapper>
                            <div className="catalog__modal__close__button" onClick={closeModal}>
                                <FaXmark />
                            </div>
                            <div className="catalog__modal__inner">
                                <Swiper
                                    className="color__swiper"
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    navigation={{
                                        prevEl: '.swiper-button-prev',
                                        nextEl: '.swiper-button-next'
                                    }}
                                    pagination={{
                                        type: "fraction",
                                    }}
                                    modules={[Navigation, Pagination]}
                                >
                                    {
                                        colorData.map((data) => (
                                            <SwiperSlide key={`color-slide-${data.id}`}>
                                                <div className="color__slide">
                                                    {
                                                        data.image && (
                                                            <Image src={data.image} width={250} height={250} alt='' />
                                                        )
                                                    }
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                    <div className="swiper-button-prev"><FaChevronLeft /></div>
                                    <div className="swiper-button-next"><FaChevronRight /></div>
                                </Swiper>
                                <div className="catalog__title">
                                    {catalog.getTranslate(activeCatalog.id, activeLocale, "title")}
                                </div>
                                <div className="catalog__color__wrapper">
                                    {
                                        colorData.map((data) => (
                                            <React.Fragment key={`color-item-${data.id}`}>
                                                <div className="color__item">
                                                    <div className="color__item__image">
                                                        {
                                                            data.image && (
                                                                <Image src={data.image} width={100} height={100} alt='' />
                                                            )
                                                        }
                                                    </div>
                                                    <div className="color__item__title">
                                                        <span>{color.getTranslate(data.id, activeLocale, "title")}</span>
                                                        <span>{data.code}</span>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                                <div className="catalog__modal__text">
                                    {textDictionary.catalog_note}
                                </div>
                                <div className="catalog__modal__confirm__button">
                                    Rəngi seç
                                </div>
                            </div>
                        </CatalogModalWrapper>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}

export default React.memo(CatalogModal)
