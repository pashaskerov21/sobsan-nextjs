'use client'
import React from 'react'
import TopNavbar from './TopNavbar';
import BottomNavbar from './BottomNavbar';
import { HeaderWrapper } from './style';
import { usePathname } from 'next/navigation';
import {
  CategoriesDataType,
  CategoriesTranslateDataType,
  LoadingType,
  LocaleType,
  MenuDataType,
  MenuTranslateDataType,
  SettingDataType,
  SettingTranslateDataType
} from '@/src/types';

export type HeaderProps = {
  loading: LoadingType,
  activeLocale: LocaleType,
  theme: string,
  toggleTheme: () => void,
  settingData: SettingDataType,
  settingTranslateData: SettingTranslateDataType[],
  menuData: MenuDataType[],
  menuTranslateData: MenuTranslateDataType[],
  categoryData: CategoriesDataType[],
  categoryTranslateData: CategoriesTranslateDataType[],
  titleDictionary: { [key: string]: string },
  generalDictionary: { [key: string]: string },
};

export type HeaderStateType = {
  fixed: boolean,
  menuShow: boolean,
  searchShow: boolean,
};

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
  generalDictionary,
}) => {
  const pathName = usePathname();
  const body = document.querySelector('body');
  const [headerState, setHeaderState] = React.useState<HeaderStateType>({ fixed: false, menuShow: false, searchShow: false, });
  React.useEffect(() => {
    window.addEventListener('scroll', function () {
      if (this.scrollY > 300) {
        setHeaderState((prev) => ({ ...prev, fixed: true, }));
      } else {
        setHeaderState((prev) => ({ ...prev, fixed: false, }));
      }
    });
    return () => {
      window.removeEventListener('scroll', () => { });
    }
  }, []);
  React.useEffect(() => {
    setHeaderState({ fixed: false, menuShow: false, searchShow: false, });
    if (body) {
      body.style.overflow = "visible";
    }
  }, [pathName])
  const openMenu = React.useCallback(() => {
    if (window.innerWidth < 1200) {
      setHeaderState((prev) => ({ ...prev, menuShow: true }));
      if (body) {
        body.style.overflow = "hidden";
      }
    }
  }, [headerState.menuShow]);
  const closeMenu = React.useCallback(() => {
    if (window.innerWidth < 1200) {
      setHeaderState((prev) => ({ ...prev, menuShow: false }));
      if (body) {
        body.style.overflow = "visible";
      }
    }
  }, [headerState.menuShow]);

  const toggleSearch = React.useCallback(() => {
    setHeaderState((prev) => ({ ...prev, searchShow: !headerState.searchShow }))
  }, [headerState.searchShow])

  return (
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
        toggleMenu={openMenu}
        toggleSearch={toggleSearch}
        generalDictionary={generalDictionary}
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
        toggleMenu={closeMenu}
        toggleSearch={toggleSearch}
        generalDictionary={generalDictionary}
      />
    </HeaderWrapper>
  )
}

export default React.memo(Header);
