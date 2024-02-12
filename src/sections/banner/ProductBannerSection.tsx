'use client'
import React, { Fragment } from 'react'
import { Container, Section } from '@/src/styles'
import { LoadingType, LocaleType, ProductBannerDataType, ProductBannerTranslateDataType } from '@/src/types'
import { ProductBannerWrapper } from './style'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import VanillaTilt from 'vanilla-tilt';
import { Skeleton, VanillaComponent } from '@/src/components';
import { FaPhoneAlt, FaQuestion } from "react-icons/fa";
import { ProductBanner } from '@/src/class'

type SectionProps = {
  loading: LoadingType,
  activeLocale: LocaleType,
  productBannerData: ProductBannerDataType[];
  productBannerTranslateData: ProductBannerTranslateDataType[],
  generalDictionary: { [key: string]: string },
}

const ProductBannerSection: React.FC<SectionProps> = ({
  activeLocale,
  generalDictionary,
  loading,
  productBannerData,
  productBannerTranslateData,
}) => {
  const productBanner = new ProductBanner(productBannerTranslateData);
  const imageRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (imageRef.current) {
      VanillaTilt.init(imageRef.current)
    }
  }, []);
  return (
    <Section $py={20}>
      <Container>
        <ProductBannerWrapper>
          <div className={`top ${loading.lazy ? '' : 'bg__active'}`}>
            {
              loading.lazy ? (
                <div className="banner-slide d-none">
                  <div className="content">
                    <Skeleton width='150px' height='30px' />
                    <Skeleton width='90%' height='200px' />
                    <Skeleton width='150px' height='50px' radius='10px' />
                  </div>
                  <div className="banner-image">
                    <Skeleton width='100%' height='100%' />
                  </div>
                </div>
              ) : (
                <Swiper
                  className='pagination-true'
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  spaceBetween={20}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Pagination, Autoplay]}
                >
                  {
                    productBannerData.map((data) => (
                      <SwiperSlide key={`product-banner-${data.id}`}>
                        <div className="banner-slide">
                          <div className="content">
                            <div className="title">
                              {productBanner.getTranslate(data.id, activeLocale, "title")}
                            </div>
                            <div className="text">
                              {productBanner.getTranslate(data.id, activeLocale, "text")}
                            </div>
                            <Link href={productBanner.getTranslate(data.id, activeLocale, "url")} className='order-btn'>
                              {generalDictionary.order}
                            </Link>
                          </div>
                          <VanillaComponent className='banner-image'>
                            <Image src={data.image} width={400} height={400} alt='' priority={true} />
                          </VanillaComponent>
                        </div>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              )
            }

          </div>
          {
            loading.lazy ? (
              <Skeleton width='100%' height='100px' radius='0 0 10px 10px' className='d-none' />
            ) : (
              <div className={`bottom ${loading.lazy ? '' : 'bg__active'}`}>
                <div className="bottom_left">
                  <Link href={`/${activeLocale}`}>{generalDictionary.banner_question}</Link>
                </div>
                <div className="bottom_right">
                  <Fragment>
                    <Link href={`/${activeLocale}`}>
                      <div className="icon"><FaPhoneAlt /></div>
                      <div className="label">(+994 12) 404 45 45</div>
                    </Link>
                    <Link href={`/${activeLocale}`}>
                      <div className="icon"><FaQuestion /></div>
                      <div className="label">{generalDictionary.write_us}</div>
                    </Link>
                  </Fragment>
                </div>
              </div>
            )
          }

        </ProductBannerWrapper>
      </Container>
    </Section>
  )
}

export default React.memo(ProductBannerSection)
