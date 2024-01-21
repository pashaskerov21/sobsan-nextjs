'use client'
import React from 'react'
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
        {
          loading.lazy ? (
            <React.Fragment>
              {/* <Skeleton
                width='100%'
                height='125px'
                height_sm='270px'
                height_md='365px'
                height_lg='500px'
                radius='10px'
              /> */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ProductBannerWrapper>
                <div className="top">
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
                        <React.Fragment key={data.id}>
                          <SwiperSlide>
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
                                <Image src={data.image} width={500} height={500} alt='' />
                              </VanillaComponent>
                            </div>
                          </SwiperSlide>
                        </React.Fragment>
                      ))
                    }
                  </Swiper>
                </div>
                <div className="bottom">
                  <div className="bottom_left">
                    <Link href={`/${activeLocale}`}>{generalDictionary.banner_question}</Link>
                  </div>
                  <div className="bottom_right">
                    <Link href={`/${activeLocale}`}>
                      <div className="icon"><FaPhoneAlt /></div>
                      <div className="label">(+994 12) 404 45 45</div>
                    </Link>
                    <Link href={`/${activeLocale}`}>
                      <div className="icon"><FaQuestion /></div>
                      <div className="label">{generalDictionary.write_us}</div>
                    </Link>
                  </div>
                </div>
              </ProductBannerWrapper>
            </React.Fragment>
          )
        }
      </Container>
    </Section>
  )
}

export default React.memo(ProductBannerSection)
