import { Product } from '@/src/class'
import { ProductCard, SectionTitle } from '@/src/components'
import { Container, Section } from '@/src/styles'
import { BrandDataType, BrandTranslateDataType, LoadingType, LocaleType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import React from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type SectionProps = {
  loading: LoadingType,
  activeLocale: LocaleType,
  productData: ProductDataType[],
  productTranslateData: ProductTranslateDataType[],
  brandData: BrandDataType[],
  brandTranslateData: BrandTranslateDataType[],
  generalDictionary: { [key: string]: string },
  titleDictionary: { [key: string]: string },
}

const PopularProductSection: React.FC<SectionProps> = ({
  activeLocale,
  generalDictionary,
  loading,
  productData,
  productTranslateData,
  brandData,
  brandTranslateData,
  titleDictionary,
}) => {
  const product = new Product(productData, productTranslateData);
  const popularProducts: ProductDataType[] | [] = product.getPopularProducts(productData);
  return (
    <Section $py={20}>
      <Container>
        <SectionTitle title={titleDictionary.popular_products} />
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 8,
          }}
          breakpoints={{
            576: {
              slidesPerView: 2,
              spaceBetween: 20,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
              slidesPerGroup: 3,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 20,
              slidesPerGroup: 4,
            },
          }}
          modules={[Pagination]}
          className='pagination-true'
        >
          {popularProducts.map((data) => (
            <SwiperSlide key={data.id}>
              <ProductCard
                activeLocale={activeLocale}
                activeProductData={data}
                generalDictionary={generalDictionary}
                loading={loading}
                productData={productData}
                productTranslateData={productTranslateData}
                brandData={brandData}
                brandTranslateData={brandTranslateData}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Section>
  )
}

export default React.memo(PopularProductSection)
