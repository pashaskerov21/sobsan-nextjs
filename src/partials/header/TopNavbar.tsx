'use client'
import React from 'react'
import Link from 'next/link'
import { TopNavbarProps } from '@/src/types'
import { TopNavbarWrapper } from './style'
import { Container } from '@/src/styles'
import { PiShoppingCartSimpleLight, PiHeartStraight, PiScalesLight } from "react-icons/pi";
import { LanguageDropdown, Skeleton, SocialMedia, ThemeButton } from '@/src/components'
import { BiLogInCircle } from "react-icons/bi";
import PageLinks from './PageLinks'
import Search from './Search'


const TopNavbar: React.FC<TopNavbarProps> = ({
  loading,
  activeLocale,
  headerState,
  menuData,
  menuTranslateData,
  settingData,
  titleDictionary,
  theme,
  toggleTheme,
  toggleMenu,
  toggleSearch,
}) => {
  return (
    <React.Fragment>
      <TopNavbarWrapper $fixed={headerState.fixed}>
        <Container>
          <div className="nav-inner">
            <div className="left">
              <div className="menu-button d-xl-none" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
              {
                loading.standart ? (
                  <React.Fragment>
                    <Skeleton width='570px' height='32px' className='d-none d-xl-block'/>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <PageLinks
                      className='page-links d-none d-xl-flex'
                      activeLocale={activeLocale}
                      menuData={menuData}
                      menuTranslateData={menuTranslateData}
                    />
                  </React.Fragment>
                )
              }
            </div>
            <div className="right">
              <LanguageDropdown activeLocale={activeLocale} />
              <ThemeButton theme={theme} toggleTheme={toggleTheme} />
              <SocialMedia
                className='d-none d-xl-flex'
                settingData={settingData} />
              <div className="general-icons">
                <Link className='icon d-none d-md-flex' href={`/${activeLocale}/basket`}><PiShoppingCartSimpleLight /></Link>
                <Link className='icon d-none d-md-flex' href={`/${activeLocale}/wishlist`}><PiHeartStraight /></Link>
                <Link className='icon d-none d-md-flex' href={`/${activeLocale}/comparisons`}><PiScalesLight /></Link>
                <Search
                  headerState={headerState}
                  titleDictionary={titleDictionary}
                  toggleSearch={toggleSearch} />
                <Link className='icon d-none d-md-flex' href='/login'><span>{titleDictionary.login}</span><BiLogInCircle /></Link>
              </div>
            </div>
          </div>
        </Container>
      </TopNavbarWrapper>
    </React.Fragment>
  )
}


export default React.memo(TopNavbar)
