import React from 'react'
import TopNavbar from './TopNavbar';
import BottomNavbar from './BottomNavbar';
import { HeaderProps, HeaderStateType } from '@/src/types';
import { HeaderWrapper } from './style';
import Search from './Search';

const Header: React.FC<HeaderProps> = ({
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
  const [headerState, setHeaderState] = React.useState<HeaderStateType>({
    fixed: false,
    menuShow: false,
    searchShow: false,
  });
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
