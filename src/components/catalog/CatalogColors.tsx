'use client'
import { Catalog, Color } from '@/src/class';
import { CatalogColorProps, ColorDataType } from '@/src/types'
import React from 'react'
import { ColorWrapper } from './style';
import Image from 'next/image';
import Link from 'next/link';
import { ColorTranslation } from '@/src/utils';

const CatalogColors: React.FC<CatalogColorProps> = ({
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
    if(activeColorID === id){
      setActiveColorID(0)
    }else{
      setActiveColorID(id)
    }
  },[activeColorID]);


  return (
    <React.Fragment>
      {
        colors.length > 0 ? (
          <ColorWrapper>
            {
              colors.map((maindata) => (
                <React.Fragment key={maindata.id}>

                  {
                    color.getAltColors(maindata.id).length > 0 ? (
                      <React.Fragment>
                        <div className="color-item secondary" onClick={() => handleColorItem(maindata.id)}>
                          {
                            maindata.image ? (
                              <div className='image'>
                                <Image src={maindata.image} width={100} height={100} alt='' priority={true} />
                              </div>
                            ) : null
                          }
                          <div className="info">
                            <div className="name">
                              <ColorTranslation
                                activeColorData={maindata}
                                activeLocale={activeLocale}
                                colorData={colorData}
                                colorTranslateData={colorTranslateData}
                              />
                            </div>
                            <div className="code">{maindata.code}</div>
                          </div>
                        </div>
                        <div className={`subcolors ${activeColorID === maindata.id ? '' : 'd-none'}`}>
                          {
                            color.getAltColors(maindata.id).map((altdata) => (
                              <React.Fragment key={altdata.id}>
                                <div className="color-item secondary">
                                  {
                                    altdata.image ? (
                                      <Link href={altdata.image} data-fancybox={`catalog-${activeCatalogID}-${maindata.id}`} className='image'>
                                        <Image src={altdata.image} width={100} height={100} alt='' priority={true} />
                                      </Link>
                                    ) : null
                                  }
                                  <div className="info">
                                    <div className="name">
                                      <ColorTranslation
                                        activeColorData={altdata}
                                        activeLocale={activeLocale}
                                        colorData={colorData}
                                        colorTranslateData={colorTranslateData}
                                      />
                                    </div>
                                    <div className="code">{altdata.code}</div>
                                  </div>
                                </div>
                              </React.Fragment>
                            ))
                          }
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div className="color-item">
                          {
                            maindata.image ? (
                              <Link href={maindata.image} data-fancybox={`catalog-${activeCatalogID}`} className='image'>
                                <Image src={maindata.image} width={100} height={100} alt='' priority={true} />
                              </Link>
                            ) : null
                          }
                          <div className="info">
                            <div className="name">
                              <ColorTranslation
                                activeColorData={maindata}
                                activeLocale={activeLocale}
                                colorData={colorData}
                                colorTranslateData={colorTranslateData}
                              />
                            </div>
                            <div className="code">{maindata.code}</div>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  }
                </React.Fragment>
              ))
            }
          </ColorWrapper>

        ) : null
      }
    </React.Fragment>
  )
}

export default React.memo(CatalogColors)
