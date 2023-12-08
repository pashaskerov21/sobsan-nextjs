import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BottomNavbarProps } from '@/src/types';
import { BottomNavbarWrapper } from './style';
import { Container } from '@/src/styles/utils';
import { FaPhoneAlt } from "react-icons/fa";
import { FaQuestion, FaXmark } from "react-icons/fa6";
import { BiLogInCircle } from 'react-icons/bi';

const BottomNavbar: React.FC<BottomNavbarProps> = ({
  activeLocale,
  categoryData,
  categoryTranslateData,
  headerState,
  menuData,
  menuTranslateData,
  settingData,
  settingTranslateData,
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
      <BottomNavbarWrapper>
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
            <div className="inner-center"></div>
            <div className="inner-right"></div>
          </div>
        </Container>
      </BottomNavbarWrapper>
    </React.Fragment>
  )
}

export default React.memo(BottomNavbar)
