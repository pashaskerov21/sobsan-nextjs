'use client'
import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AccountDataType, BottomNavbarProps } from '@/src/types';
import { BottomNavbarWrapper } from './style';
import { Container } from '@/src/styles';
import { FaPhoneAlt } from "react-icons/fa";
import { FaQuestion, FaXmark } from "react-icons/fa6";
import { BiLogInCircle } from 'react-icons/bi';
import PageLinks from './PageLinks';
import { Categories, LanguageDropdown, Skeleton, SocialMedia, ThemeButton } from '@/src/components';
import Search from './Search';
import { useLocalStorage } from 'usehooks-ts';
import { HiMiniUser } from 'react-icons/hi2';

const BottomNavbar: React.FC<BottomNavbarProps> = ({
  loading,
  activeLocale,
  categoryData,
  categoryTranslateData,
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
    <Fragment>
      {
        headerState.menuShow ? (
          <Fragment>
            <div className="black-backdrop" onClick={toggleMenu}></div>
          </Fragment>
        ) : null
      }
      <BottomNavbarWrapper $fixed={headerState.fixed}>
        <Container>
          <div className={`bottom-inner ${headerState.menuShow ? 'menuShow' : ''}`}>
            <div className="inner-left">
              <Link href={`/${activeLocale}`}>
                <Image src={settingData.logo} width={50} height={80} alt='logo' />
              </Link>
              <div className="menu-items d-xl-none">
                <div className="menu-header-icons">
                  <Link href='/'><FaPhoneAlt /></Link>
                  <Link href='/'><FaQuestion /></Link>
                </div>
                {
                  accountData.activeUser ? (
                    <Link href={`/${activeLocale}/login`} className='login-link'>
                      <div className="icon"><HiMiniUser /></div>
                      <span>{titleDictionary.my_account}</span>
                    </Link>
                  ) : (
                    <Link href={`/${activeLocale}/login`} className='login-link'>
                      <div className="icon"><BiLogInCircle /></div>
                      <span>{titleDictionary.login}</span>
                    </Link>
                  )
                }
                <button className='close-button' onClick={toggleMenu}><FaXmark /></button>
              </div>
            </div>
            <div className="inner-center">
              <Categories
                loading={loading}
                activeLocale={activeLocale}
                categoryData={categoryData}
                categoryTranslateData={categoryTranslateData}
                parentComponent="header"
              />
              <PageLinks
                className='page-links d-xl-none'
                activeLocale={activeLocale}
                menuData={menuData}
                menuTranslateData={menuTranslateData}
              />
            </div>
            <div className="inner-right">
              <div className="menu-footer-icons">
                <SocialMedia className='social-icons d-xl-none' settingData={settingData} />
                <div className={`fixnav-items ${headerState.fixed ? 'd-none d-xl-flex' : 'd-none'}`}>
                  <LanguageDropdown activeLocale={activeLocale} />
                  <ThemeButton theme={theme} toggleTheme={toggleTheme} />
                  <Search
                    headerState={headerState}
                    titleDictionary={titleDictionary}
                    toggleSearch={toggleSearch} />
                </div>
              </div>
              <Link href='/' className='master-logo'>
                <Image src={settingData.master_logo} width={100} height={30} alt='m-logo' />
              </Link>
            </div>
          </div>
        </Container>
      </BottomNavbarWrapper>
    </Fragment >
  )
}

export default React.memo(BottomNavbar)
