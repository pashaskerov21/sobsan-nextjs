import React from 'react'
import Link from 'next/link'
import { TopNavbarProps } from '@/src/types'
import { TopNavbarWrapper } from './style'
import { Container } from '@/src/styles/utils'
import { PiShoppingCartSimpleLight, PiHeartStraight, PiScalesLight } from "react-icons/pi";
import { LanguageDropdown, SocialMedia, ThemeButton } from '@/src/components'
import { BiLogInCircle } from "react-icons/bi";
import PageLinks from './PageLinks'
import Search from './Search'


const TopNavbar: React.FC<TopNavbarProps> = ({
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
              <PageLinks
                className='page-links d-none d-xl-flex'
                activeLocale={activeLocale}
                menuData={menuData}
                menuTranslateData={menuTranslateData}
              />
            </div>
            <div className="right">
              <LanguageDropdown activeLocale={activeLocale} />
              <ThemeButton theme={theme} toggleTheme={toggleTheme} />
              <SocialMedia className='d-none d-xl-flex' settingData={settingData} />
              <div className="general-icons">
                <Link className='icon d-none d-md-flex' href='/basket'><PiShoppingCartSimpleLight /></Link>
                <Link className='icon d-none d-md-flex' href='/wishlist'><PiHeartStraight /></Link>
                <Link className='icon d-none d-md-flex' href='/comparisons'><PiScalesLight /></Link>
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
