import React from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import { Container, Section } from '@/src/styles'
import { BannerDataType } from '@/src/types'
import { bannerSettings } from '@/src/utils'
import { BannerSlide } from './style'
import { Skeleton } from '@/src/components'

const BannerSkeleton:React.FC = () => {
    return (
        <React.Fragment>
            <Skeleton
                width='100%' 
                height='125px'
                height_sm='270px'
                height_md='365px'
                height_lg='500px'
                radius='10px'
                />
        </React.Fragment>
    )
}

const BannerSection: React.FC<{ loading: boolean, bannerData: BannerDataType[] }> = ({ loading, bannerData }) => {
    return (
        <React.Fragment>
            <Section $py={20}>
                <Container>
                    {
                        loading ? (
                            <BannerSkeleton />
                        ) : (
                            <React.Fragment>
                                <Slider {...bannerSettings}>
                                    {
                                        bannerData.map((data) => (
                                            <React.Fragment key={data.id}>
                                                <BannerSlide href=''>
                                                    <Image src={data.image} width={2000} height={980} alt='banner-image' priority={false} />
                                                </BannerSlide>
                                            </React.Fragment>
                                        ))
                                    }
                                </Slider>
                            </React.Fragment>
                        )
                    }
                </Container>
            </Section>
        </React.Fragment>
    )
}

export default React.memo(BannerSection)
