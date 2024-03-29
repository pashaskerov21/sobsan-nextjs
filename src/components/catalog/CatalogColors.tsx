'use client'
import { Catalog, Color } from '@/src/class';
import { CatalogDataType, CatalogTranslateDataType, ColorDataType, ColorTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import React, { Fragment } from 'react'
import { ColorWrapper } from './style';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from '../skeleton/Skeleton';

type CatalogColorProps = {
  loading: LoadingType,
  activeLocale: LocaleType,
  activeCatalogID: number,
  catalogData: CatalogDataType[],
  catalogTranslateData: CatalogTranslateDataType[],
  colorData: ColorDataType[],
  colorTranslateData: ColorTranslateDataType[],
}

const CatalogColors: React.FC<CatalogColorProps> = ({
  loading,
  activeCatalogID,
  activeLocale,
  catalogData,
  catalogTranslateData,
  colorData,
  colorTranslateData,
}) => {
  const catalog = new Catalog(catalogData, catalogTranslateData);
  const color = new Color(colorData, colorTranslateData);
  const [colors, setColors] = React.useState<ColorDataType[] | []>(catalog.getColors(activeCatalogID, color.getMainColors()));
  const [activeColorID, setActiveColorID] = React.useState<number>(0);
  const handleColorItem = React.useCallback((id: number) => {
    if (activeColorID === id) {
      setActiveColorID(0)
    } else {
      setActiveColorID(id)
    }
  }, [activeColorID]);



  const ColorCardSkeleton = () => {
    return (
      <div className="color-item">
        <Skeleton width='100%' max_width='200px' height='100px' margin='0 0 10px 0' />
        <Skeleton width='100%' max_width='100px' height='20px' margin='0 auto 25px auto' />
      </div>
    )
  }


  return (
    <Fragment>
      {
        colors.length > 0 ? (
          <ColorWrapper>
            {
              colors.map((maindata) => (
                <Fragment key={maindata.id}>
                  {
                    color.getAltColors(maindata.id).length > 0 ? (
                      <Fragment>
                        {
                          loading.lazy ? <ColorCardSkeleton /> : (
                            <Fragment>
                              <div className="color-item secondary" onClick={() => handleColorItem(maindata.id)}>
                                {
                                  maindata.image ? (
                                    <div className='image'>
                                      <Image src={maindata.image} width={500} height={500} alt='' priority={true} />
                                    </div>
                                  ) : null
                                }
                                <div className="info">
                                  <div className="name">
                                    {color.getTranslate(maindata.id, activeLocale, "title")}
                                  </div>
                                  <div className="code">{maindata.code}</div>
                                </div>
                              </div>
                            </Fragment>
                          )
                        }
                        <div className={`subcolors ${activeColorID === maindata.id ? '' : 'd-none'}`}>
                          {
                            color.getAltColors(maindata.id).map((altdata) => (
                              <Fragment key={altdata.id}>
                                <div className="color-item secondary">
                                  {
                                    altdata.image ? (
                                      <Link href={altdata.image} data-fancybox={`catalog-${activeCatalogID}-${maindata.id}`} className='image'>
                                        <Image src={altdata.image} width={500} height={500} alt='' priority={true} />
                                      </Link>
                                    ) : null
                                  }
                                  <div className="info">
                                    <div className="name">
                                      {color.getTranslate(altdata.id, activeLocale, "title")}
                                    </div>
                                    <div className="code">{altdata.code}</div>
                                  </div>
                                </div>
                              </Fragment>
                            ))
                          }
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        {
                          loading.lazy ? <ColorCardSkeleton /> : (
                            <Fragment>
                              <div className="color-item">
                                {
                                  maindata.image ? (
                                    <Link href={maindata.image} data-fancybox={`catalog-${activeCatalogID}`} className='image'>
                                      <Image src={maindata.image} width={500} height={500} alt='' priority={true} />
                                    </Link>
                                  ) : null
                                }
                                <div className="info">
                                  <div className="name">
                                    {color.getTranslate(maindata.id, activeLocale, "title")}
                                  </div>
                                  <div className="code">{maindata.code}</div>
                                </div>
                              </div>
                            </Fragment>
                          )
                        }
                      </Fragment>
                    )
                  }
                </Fragment>
              ))
            }
          </ColorWrapper>

        ) : null
      }
    </Fragment>
  )
}

export default React.memo(CatalogColors)
