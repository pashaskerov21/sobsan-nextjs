'use client'
import React, { Fragment } from 'react'
import Link from 'next/link'
import { AccountDataType, TopNavbarProps } from '@/src/types'
import { TopNavbarWrapper } from './style'
import { Container } from '@/src/styles'
import { PiShoppingCartSimpleLight, PiHeartStraight, PiScalesLight } from "react-icons/pi";
import { LanguageDropdown, Skeleton, SocialMedia, ThemeButton } from '@/src/components'
import { BiLogInCircle } from "react-icons/bi";
import PageLinks from './PageLinks'
import Search from './Search'
import { useLocalStorage } from 'usehooks-ts'
import { FaUser } from "react-icons/fa";
import { HiMiniUser } from "react-icons/hi2";


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
  const [accountData] = useLocalStorage<AccountDataType>('accounts', {
    activeUser: undefined,
    users: [],
  });
  return (
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
                <Fragment>
                  <Skeleton width='570px' height='32px' className='d-none d-xl-block' />
                </Fragment>
              ) : (
                <Fragment>
                  <PageLinks
                    className='page-links d-none d-xl-flex'
                    activeLocale={activeLocale}
                    menuData={menuData}
                    menuTranslateData={menuTranslateData}
                  />
                </Fragment>
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
              {
                accountData.activeUser ? (
                  <Link className='icon d-none d-md-flex' href={`/${activeLocale}/account`}><HiMiniUser /></Link>
                ) : (
                  <Link className='icon d-none d-md-flex' href={`/${activeLocale}/login`}><span>{titleDictionary.login}</span><BiLogInCircle /></Link>
                )
              }
            </div>
          </div>
        </div>
      </Container>
    </TopNavbarWrapper>
  )
}


export default React.memo(TopNavbar)
