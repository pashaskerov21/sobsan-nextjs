'use client'
import { Catalog, Color } from '@/src/class'
import { CatalogDataType, CatalogTranslateDataType, ColorDataType, ColorTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import Image from 'next/image'
import React, { Fragment } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { Navigation, Pagination } from 'swiper/modules'
import Swiper from 'swiper';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { CatalogModalButtonWrapper, CatalogModalWrapper } from './style'

type CatalogModalProps = {
    loading: LoadingType,
    activeLocale: LocaleType,
    activeCatalog: CatalogDataType,
    catalogData: CatalogDataType[],
    catalogTranslateData: CatalogTranslateDataType[],
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
    textDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    selectedColor: ColorDataType | undefined,
    handleSelectColor: (data:ColorDataType) => void,
}

const CatalogModal: React.FC<CatalogModalProps> = ({
    activeCatalog,
    activeLocale,
    catalogData,
    catalogTranslateData,
    colorData,
    colorTranslateData,
    loading,
    selectedColor,
    handleSelectColor,
    textDictionary,
    generalDictionary,
}) => {
    const body = document.querySelector('body');
    const catalog = new Catalog(catalogData, catalogTranslateData);
    const color = new Color(colorData, colorTranslateData);

    const [showModal, setShowModal] = React.useState<boolean>(false);
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

    const swiperRef = React.useRef<HTMLDivElement & { swiper?: Swiper }>(null);
    const [activeColorIndex, setActiveColorIndex] = React.useState<number>(0);
    const handleSlideChange = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            const newIndex = swiperRef.current.swiper.realIndex;
            setActiveColorIndex(newIndex);
        }
    };
    const handlePrevButton = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            const newIndex = swiperRef.current.swiper.realIndex;
            setActiveColorIndex(newIndex);
        }
    };
    const handleNextButton = () => {

        if (swiperRef.current && swiperRef.current.swiper) {
            const newIndex = swiperRef.current.swiper.realIndex;
            setActiveColorIndex(newIndex);
        }
    };
    const handleColorButtonClick = (index: number) => {
        setActiveColorIndex(index);
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
        }
    };
    const handleConfirmModal = () => {
        closeModal();
        const data:ColorDataType = {
            ...colorData[activeColorIndex],
            catalogName: catalog.getTranslate(activeCatalog.id, activeLocale, "title")
        };
        handleSelectColor(data);
    }
    return (
        <Fragment>
            <CatalogModalButtonWrapper onClick={openModal}>
                <div className={`toggle__button`}>
                    <span>{generalDictionary.see_catalog}</span>
                </div>
                {
                    selectedColor && (
                        <div className="color__info">
                            <div className='catalog__name'>{catalog.getTranslate(activeCatalog.id, activeLocale, "title")}</div>
                            <div className="color__name">{color.getTranslate(selectedColor.id, activeLocale, "title")} {selectedColor.code}</div>
                        </div>
                    )
                }
            </CatalogModalButtonWrapper>
            {
                showModal && (
                    <Fragment>
                        <div className="black-backdrop" onClick={closeModal}></div>
                        <CatalogModalWrapper>
                            <div className="catalog__modal__close__button" onClick={closeModal}>
                                <FaXmark />
                            </div>
                            <div className="catalog__modal__inner">
                                <SwiperReact
                                    ref={swiperRef}
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
                                    onSlideChange={handleSlideChange}
                                    initialSlide={activeColorIndex}
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
                                    <div className="swiper-button-prev" onClick={handlePrevButton}><FaChevronLeft /></div>
                                    <div className="swiper-button-next" onClick={handleNextButton}><FaChevronRight /></div>
                                </SwiperReact>
                                <div className="catalog__title">
                                    {catalog.getTranslate(activeCatalog.id, activeLocale, "title")}
                                </div>
                                <div className="catalog__color__wrapper">
                                    {
                                        colorData.map((data, index) => (
                                            <Fragment key={`color-item-${data.id}`}>
                                                <div className={`color__item ${activeColorIndex === index ? 'active' : ''}`} onClick={() => handleColorButtonClick(index)}>
                                                    <div className="color__item__image">
                                                        {
                                                            data.image && (
                                                                <Image src={data.image} width={100} height={100} alt='' />
                                                            )
                                                        }
                                                    </div>
                                                    <div className="color__item__title">
                                                        {color.getTranslate(data.id, activeLocale, "title").length > 0 ? color.getTranslate(data.id, activeLocale, "title") : data.code}
                                                    </div>
                                                </div>
                                            </Fragment>
                                        ))
                                    }
                                </div>
                                <div className="catalog__modal__text">
                                    {textDictionary.catalog_note}
                                </div>
                                <div className="catalog__modal__confirm__button" onClick={handleConfirmModal}>
                                    {generalDictionary.choose_color}
                                </div>
                            </div>
                        </CatalogModalWrapper>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default React.memo(CatalogModal)
