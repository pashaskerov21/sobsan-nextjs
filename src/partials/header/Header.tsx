'use client'
import React from 'react'
import TopNavbar from './TopNavbar';
import BottomNavbar from './BottomNavbar';
import { HeaderProps, HeaderStateType } from '@/src/types';
import { HeaderWrapper } from './style';
import { Container } from 'react-bootstrap';
import { Skeleton } from '@/src/components';
import { usePathname } from 'next/navigation';

const Header: React.FC<HeaderProps> = ({
  loading,
  activeLocale,
  categoryData,
  categoryTranslateData,
  menuData,
  menuTranslateData,
  settingData,
  settingTranslateData,
  titleDictionary,
  theme,
  toggleTheme,
}) => {
  const pathName = usePathname();
  const [headerState, setHeaderState] = React.useState<HeaderStateType>({
    fixed: false,
    menuShow: false,
    searchShow: false,
  });
  React.useEffect(() => {
    setHeaderState({
      fixed: false,
      menuShow: false,
      searchShow: false,
    });
    const body = document.querySelector('body')
    if (body) {
      body.style.overflow = headerState.menuShow ? "auto" : "hidden";
    }
  }, [pathName])
  // header fixed
  React.useEffect(() => {
    window.addEventListener('scroll', function () {
      if (this.scrollY > 300) {
        setHeaderState((prev) => ({
          ...prev,
          fixed: true,
        }));
      } else {
        setHeaderState((prev) => ({
          ...prev,
          fixed: false,
        }));
      }
    });

    return () => {
      window.removeEventListener('scroll', () => { });
    }
  }, []);
  // menu toggle

  const toggleMenu = React.useCallback(() => {
    if (window.innerWidth < 1200) {
      setHeaderState((prev) => ({
        ...prev,
        menuShow: !headerState.menuShow,
      }));
      const body = document.querySelector('body')
      if (body) {
        body.style.overflow = headerState.menuShow ? "auto" : "hidden";
      }
    }
  }, [headerState.menuShow]);

  const toggleSearch = React.useCallback(() => {
    setHeaderState((prev) => ({
      ...prev,
      searchShow: !headerState.searchShow,
    }))
  }, [headerState.searchShow])

  return (
    <React.Fragment>
      <HeaderWrapper>
        <TopNavbar
          loading={loading}
          activeLocale={activeLocale}
          headerState={headerState}
          menuData={menuData}
          menuTranslateData={menuTranslateData}
          settingData={settingData}
          settingTranslateData={settingTranslateData}
          titleDictionary={titleDictionary}
          theme={theme}
          toggleTheme={toggleTheme}
          toggleMenu={toggleMenu}
          toggleSearch={toggleSearch}
        />
        <BottomNavbar
          loading={loading}
          activeLocale={activeLocale}
          categoryData={categoryData}
          categoryTranslateData={categoryTranslateData}
          headerState={headerState}
          menuData={menuData}
          menuTranslateData={menuTranslateData}
          settingData={settingData}
          settingTranslateData={settingTranslateData}
          titleDictionary={titleDictionary}
          theme={theme}
          toggleTheme={toggleTheme}
          toggleMenu={toggleMenu}
          toggleSearch={toggleSearch}
        />
      </HeaderWrapper>
    </React.Fragment>
  )
}

export default React.memo(Header);
