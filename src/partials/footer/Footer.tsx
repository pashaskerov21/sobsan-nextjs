'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FooterWrapper } from './style'
import { FooterProps } from '@/src/types'
import { Container } from '@/src/styles'
import { SocialMedia } from '@/src/components'
import { Category, Menu } from '@/src/class'
import { CategoryTranslation, FilialTranslation, MenuTranslation, SettingTranslation } from '@/src/utils'

const Footer: React.FC<FooterProps> = ({
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
  return (
    <React.Fragment>
      <FooterWrapper>
        <div className="footer-top">
          <Container>
            <div className="top-inner">
              <div className="col">
                <Link href={`/${activeLocale}`}>
                  <Image src={settingData.logo} width={100} height={130} alt='logo' />
                </Link>
                <SocialMedia className='social-media' settingData={settingData} />
              </div>
              <div className="col">
                <div className="footer-links">
                  <h3 className="title">{titleDictionary.menues}</h3>
                  {
                    menu.getMainMenuData().length > 0 ? (
                      menu.getMainMenuData().map((maindata) => (
                        <React.Fragment key={maindata.id}>
                          <MenuTranslation
                            activeLocale={activeLocale}
                            activeMenuData={maindata}
                            menuData={menuData}
                            menuTranslateData={menuTranslateData}
                            translationType='link'
                            path={`${maindata.path}`}
                          />
                          {
                            menu.getAltMenuData(maindata.id).length > 0 ? (
                              menu.getAltMenuData(maindata.id).map((altdata) => (
                                <React.Fragment key={altdata.id}>
                                  <MenuTranslation
                                    activeLocale={activeLocale}
                                    activeMenuData={altdata}
                                    menuData={menuData}
                                    menuTranslateData={menuTranslateData}
                                    translationType='link'
                                    path={`${maindata.path}/${altdata.path}`}
                                  />
                                </React.Fragment>
                              ))
                            ) : null
                          }
                        </React.Fragment>
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
                      <React.Fragment key={data.id}>
                        <CategoryTranslation
                          activeCategoryData={data}
                          activeLocale={activeLocale}
                          categoryData={categoryData}
                          categoryTranslateData={categoryTranslateData}
                          translationType='link'
                        />
                      </React.Fragment>
                    ))
                  }
                </div>
              </div>
              <div className="col">
                <div className="footer-links">
                  <h3 className="title">{titleDictionary.addresses}</h3>
                  {
                    filialData.map((data) => (
                      <React.Fragment key={data.id}>
                        <Link href={`/${activeLocale}/`}>
                          <FilialTranslation
                            activeFilialData={data}
                            activeLocale={activeLocale}
                            filialTranslateData={filialTranslateData}
                            translationType='title'
                          />
                        </Link>
                      </React.Fragment>
                    ))
                  }
                </div>
              </div>
              <div className="col">
                <div className="footer-links">
                  <h3 className="title">{titleDictionary.useful_links}</h3>
                  <Link href={`/${activeLocale}/`}>
                    {titleDictionary.faq}
                  </Link>
                  <Link href={`/${activeLocale}/`}>
                    {titleDictionary.career}
                  </Link>
                  <Link href={`/${activeLocale}/`}>
                    {titleDictionary.service_network}
                  </Link>
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
                  <SettingTranslation
                    activeLocale={activeLocale}
                    settingTranslateData={settingTranslateData}
                    translationType='copyright'
                  />
                </div>
                <div className="powered-by">
                  <Link href='https://alipashaskerov.vercel.app/' target='_blank'>Alipasha Askerov</Link>
                </div>
              </div>
              <div className="bottom-right">
                <Link href={`/${activeLocale}`}>{settingData.phone}</Link>
                <Link href={`/${activeLocale}`}>{settingData.hotline}</Link>
                <Link href={`/${activeLocale}`}>{settingData.mail}</Link>
              </div>
            </div>
          </Container>
        </div>
      </FooterWrapper>
    </React.Fragment>
  )
}

export default React.memo(Footer)
