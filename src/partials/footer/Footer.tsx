'use client'
import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FooterWrapper } from './style'
import { Container } from '@/src/styles'
import { Skeleton, SocialMedia } from '@/src/components'
import { Category, Filial, Menu, Setting } from '@/src/class'
import {
  CategoriesDataType,
  CategoriesTranslateDataType,
  FilialDataType,
  FilialTranslateDataType,
  LoadingType,
  LocaleType,
  MenuDataType,
  MenuTranslateDataType,
  SettingDataType,
  SettingTranslateDataType
} from '@/src/types'

export type FooterProps = {
  loading: LoadingType,
  activeLocale: LocaleType,
  settingData: SettingDataType,
  settingTranslateData: SettingTranslateDataType[],
  menuData: MenuDataType[],
  menuTranslateData: MenuTranslateDataType[],
  categoryData: CategoriesDataType[],
  categoryTranslateData: CategoriesTranslateDataType[],
  filialData: FilialDataType[],
  filialTranslateData: FilialTranslateDataType[],
  titleDictionary: { [key: string]: string },
}

const Footer: React.FC<FooterProps> = ({
  loading,
  activeLocale,
  categoryData,
  categoryTranslateData,
  filialData,
  filialTranslateData,
  menuData,
  menuTranslateData,
  settingData,
  settingTranslateData,
  titleDictionary,
}) => {
  const menu = new Menu(menuData, menuTranslateData);
  const category = new Category(categoryData, categoryTranslateData);
  const filial = new Filial(filialTranslateData);
  const setting = new Setting(settingTranslateData);
  return (
    <FooterWrapper>
      <div className="footer-top">
        <Container>
          <div className="top-inner">
            <div className="col">
              <Link href={`/${activeLocale}`}>
                <Image src={settingData.logo} width={100} height={130} alt='logo' priority={true} />
              </Link>
              <SocialMedia className='social-media' settingData={settingData} />
            </div>
            <div className="col">
              <div className="footer-links">
                <h3 className="title">{titleDictionary.menues}</h3>
                {
                  menu.getMainMenuData().length > 0 ? (
                    menu.getMainMenuData().map((maindata) => (
                      <Fragment key={maindata.id}>
                        {
                          loading.standart ? (
                            <Fragment>
                              <Skeleton width='80%' height='20px' />
                            </Fragment>
                          ) : (
                            <Fragment>
                              <Link href={menu.getTranslate(maindata, activeLocale, "url")}>
                                {menu.getTranslate(maindata, activeLocale, "title")}
                              </Link>
                            </Fragment>
                          )
                        }
                        {
                          menu.getAltMenuData(maindata.id).length > 0 ? (
                            menu.getAltMenuData(maindata.id).map((altdata) => (
                              <Fragment key={altdata.id}>
                                {
                                  loading.standart ? (
                                    <Fragment>
                                      <Skeleton width='80%' height='20px' />
                                    </Fragment>
                                  ) : (
                                    <Fragment>
                                      <Link href={menu.getTranslate(altdata, activeLocale, "url")}>
                                        {menu.getTranslate(altdata, activeLocale, "title")}
                                      </Link>
                                    </Fragment>
                                  )
                                }
                              </Fragment>
                            ))
                          ) : null
                        }
                      </Fragment>
                    ))
                  ) : null
                }
              </div>
            </div>
            <div className="col">
              <div className="footer-links">
                <h3 className="title">{titleDictionary.categories}</h3>
                {
                  category.getMainCategoryData().map((data) => (
                    <Fragment key={data.id}>
                      {
                        loading.standart ? (
                          <Fragment>
                            <Skeleton width='80%' height='20px' />
                          </Fragment>
                        ) : (
                          <Fragment>
                            <Link href={category.getTranslate(data.id, activeLocale, "url")}>
                              {category.getTranslate(data.id, activeLocale, "title")}
                            </Link>
                          </Fragment>
                        )
                      }
                    </Fragment>
                  ))
                }
              </div>
            </div>
            <div className="col">
              <div className="footer-links">
                <h3 className="title">{titleDictionary.addresses}</h3>
                {
                  filialData.map((data) => (
                    <Fragment key={data.id}>
                      <Link href={`/${activeLocale}/`}>
                        {
                          loading.standart ? (
                            <Fragment>
                              <Skeleton width='80%' height='20px' />
                            </Fragment>
                          ) : (
                            <Fragment>
                              {filial.getTranslate(data.id, activeLocale, "title")}
                            </Fragment>
                          )
                        }
                      </Link>
                    </Fragment>
                  ))
                }
              </div>
            </div>
            <div className="col">
              <div className="footer-links">
                <h3 className="title">{titleDictionary.useful_links}</h3>
                {
                  loading.standart ? (
                    <Fragment>
                      <Skeleton width='80%' height='20px' />
                      <Skeleton width='80%' height='20px' />
                      <Skeleton width='80%' height='20px' />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Link href={`/${activeLocale}/`}>
                        {titleDictionary.faq}
                      </Link>
                      <Link href={`/${activeLocale}/`}>
                        {titleDictionary.career}
                      </Link>
                      <Link href={`/${activeLocale}/`}>
                        {titleDictionary.service_network}
                      </Link>
                    </Fragment>
                  )
                }
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="footer-bottom">
        <Container>
          <div className="bottom-inner">
            <div className="bottom-left">
              <div className="copyright">
                {
                  loading.standart ? (
                    <Fragment>
                      <Skeleton width='180px' height='20px' />
                    </Fragment>
                  ) : (
                    <Fragment>
                      {setting.getTranslate(1, activeLocale, "copyright")}
                    </Fragment>
                  )
                }
              </div>
              <div className="powered-by">
                <Link href='https://alipashaskerov.vercel.app/' target='_blank'>Alipasha Askerov</Link>
              </div>
            </div>
            <div className="bottom-right">
              {
                loading.standart ? (
                  <Fragment>
                    <Skeleton width='180px' height='20px' />
                    <Skeleton width='180px' height='20px' />
                    <Skeleton width='180px' height='20px' />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link href={`/${activeLocale}`}>{settingData.phone}</Link>
                    <Link href={`/${activeLocale}`}>{settingData.hotline}</Link>
                    <Link href={`/${activeLocale}`}>{settingData.mail}</Link>
                  </Fragment>
                )
              }
            </div>
          </div>
        </Container>
      </div>
    </FooterWrapper>
  )
}

export default React.memo(Footer)
