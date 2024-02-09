'use client'
import React, { Fragment } from 'react'
import { GalleryDataType, LoadingType } from '@/src/types'
import Skeleton from '../skeleton/Skeleton'
import { GalleryWrapper } from './style'
import Link from 'next/link'
import Image from 'next/image'
import { FaSearch, FaPlay } from "react-icons/fa";

type GalleryProps = {
    loading: LoadingType,
    galleryData: GalleryDataType[],
    titleDictionary: { [key: string]: string },
}

const Gallery: React.FC<GalleryProps> = ({
    galleryData,
    loading,
    titleDictionary,
}) => {
    const [activeType, setActiveType] = React.useState<number>(1);
    const [galleryItems, setGalleryItems] = React.useState<GalleryDataType[]>(galleryData);
    const [imageLoading, setImageLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        setGalleryItems([...galleryData.filter((data) => data.type === activeType)]);
    }, [activeType]);

    const handleImageLoad = () => {
        setImageLoading(false); 
        console.log('load func test')
    };
    return (
        <GalleryWrapper>
            <div className="gallery__buttons">
                {
                    loading.lazy ? (
                        <Fragment>
                            <Skeleton width='100%' height='70px' className='button__skeleton' />
                            <Skeleton width='100%' height='70px' className='button__skeleton' />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className={`gallery__button ${activeType === 1 && 'active'}`} onClick={() => setActiveType(1)}>{titleDictionary["photos"]}</div>
                            <div className={`gallery__button ${activeType === 2 && 'active'}`} onClick={() => setActiveType(2)}>{titleDictionary["videos"]}</div>
                        </Fragment>
                    )
                }
            </div>
            <div className="gallery__items">
                {
                    galleryItems.map((data) => (
                        <div key={`gallery-item-${data.id}`} className='gallery__item'>
                            {loading.lazy ? <Skeleton width='100%' height='300px' /> : (
                                <Fragment>
                                    <Image src={data.image} className='gallery__image' width={500} height={500} alt='' onLoad={handleImageLoad} />
                                    <div className="item__hover">
                                        <Link href={data.image} data-fancybox={`gallery-${activeType}`} className='item__button'>
                                            {activeType === 1 ? <FaSearch /> : <FaPlay />}
                                        </Link>
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    ))
                }
            </div>
        </GalleryWrapper>
    )
}

export default React.memo(Gallery)
