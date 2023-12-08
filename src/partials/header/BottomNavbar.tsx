import { BottomNavbarProps } from '@/src/types'
import React from 'react'
import { BottomNavbarWrapper } from './style'

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
      <BottomNavbarWrapper></BottomNavbarWrapper>
    </React.Fragment>
  )
}

export default React.memo(BottomNavbar)
