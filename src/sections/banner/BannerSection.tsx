import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Container, Section } from '@/src/styles';
import { BannerDataType, LoadingType } from '@/src/types';
import { BannerSlide } from './style';
import { Skeleton } from '@/src/components';

const BannerSection: React.FC<{ loading: LoadingType, bannerData: BannerDataType[] }> = ({ loading, bannerData }) => {
    return (
        <Section $py={20}>
            <Container>
                {
                    loading.lazy ? (
                        <Skeleton
                            width='100%'
                            height='125px'
                            height_sm='270px'
                            height_md='365px'
                            height_lg='500px'
                            radius='10px'
                            className='d-none'
                        />
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
                                bannerData.map((data) => (
                                    <SwiperSlide key={`banner-${data.id}`}>
                                        <BannerSlide href=''>
                                            <Image src={data.image} width={2000} height={980} alt='banner-image' priority={true} />
                                        </BannerSlide>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    )
                }
            </Container>
        </Section>
    )
}

export default React.memo(BannerSection)
