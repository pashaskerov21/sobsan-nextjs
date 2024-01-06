'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BottomNavbarProps } from '@/src/types';
import { BottomNavbarWrapper } from './style';
import { Container } from '@/src/styles';
import { FaPhoneAlt } from "react-icons/fa";
import { FaQuestion, FaXmark } from "react-icons/fa6";
import { BiLogInCircle } from 'react-icons/bi';
import Categories from './Categories';
import PageLinks from './PageLinks';
import { LanguageDropdown, Skeleton, SocialMedia, ThemeButton } from '@/src/components';
import Search from './Search';

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
  return (
    <React.Fragment>
      {
        headerState.menuShow ? (
          <React.Fragment>
            <div className="black-backdrop" onClick={toggleMenu}></div>
          </React.Fragment>
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
                <Link href='/login' className='login-link'>
                  <div className="icon"><BiLogInCircle /></div>
                  <span>{titleDictionary.login}</span>
                </Link>
                <button className='close-button' onClick={toggleMenu}><FaXmark /></button>
              </div>
            </div>
            <div className="inner-center">
              {
                loading.standart ? (
                  <React.Fragment>
                    <Skeleton width='100%' max_width='750px' height='60px'/>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Categories
                      loading={loading}
                      activeLocale={activeLocale}
                      categoryData={categoryData}
                      categoryTranslateData={categoryTranslateData}
                    />
                  </React.Fragment>
                )
              }
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
    </React.Fragment>
  )
}

export default React.memo(BottomNavbar)
