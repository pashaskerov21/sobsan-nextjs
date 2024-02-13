'use client'
import React, { Fragment } from 'react'
import Link from 'next/link'
import { AccountDataType, LoadingType, LocaleType, MenuDataType, MenuTranslateDataType, SettingDataType, SettingTranslateDataType } from '@/src/types'
import { TopNavbarWrapper } from './style'
import { Container } from '@/src/styles'
import { PiShoppingCartSimpleLight, PiHeartStraight, PiScalesLight } from "react-icons/pi";
import { LanguageDropdown, Skeleton, SocialMedia, ThemeButton } from '@/src/components'
import { BiLogInCircle } from "react-icons/bi";
import PageLinks from './PageLinks'
import Search from './Search'
import { useLocalStorage } from 'usehooks-ts'
import { HiMiniUser } from "react-icons/hi2";
import { HeaderStateType } from './Header'

export type TopNavbarProps = {
  loading: LoadingType,
  headerState: HeaderStateType,
  theme: string,
  toggleTheme: () => void,
  toggleMenu: () => void,
  toggleSearch: () => void,
  activeLocale: LocaleType,
  settingData: SettingDataType,
  settingTranslateData: SettingTranslateDataType[],
  menuData: MenuDataType[],
  menuTranslateData: MenuTranslateDataType[],
  titleDictionary: { [key: string]: string },
  generalDictionary: { [key: string]: string },
};

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
  generalDictionary,
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
                activeLocale={activeLocale}
                headerState={headerState}
                titleDictionary={titleDictionary}
                toggleSearch={toggleSearch}
                generalDictionary={generalDictionary} />
              {
                accountData.activeUser ? (
                  <Link className='icon d-none d-md-flex' href={`/${activeLocale}/account`}><HiMiniUser /> <span>{titleDictionary.my_account}</span></Link>
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
