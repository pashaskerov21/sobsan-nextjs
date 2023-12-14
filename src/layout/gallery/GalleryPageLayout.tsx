'use client'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Menu } from '@/src/class';
import { PageTitle } from '@/src/components';
import { updateLocaleSlug } from '@/src/redux/actions';
import { GalleryPageLayoutProps, LocaleStateType, PageTitleDataType } from '@/src/types'

const GalleryPageLayout: React.FC<GalleryPageLayoutProps> = ({
  activeLocale,
  galleryData,
  menuData,
  menuTranslateData,
  titleDictionary,
}) => {
  const path = 'gallery';
  const dispatch = useDispatch();

  const menu = new Menu(menuData, menuTranslateData);
  const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);
  const pageTitleData: PageTitleDataType = menu.getPageTitleData(path, activeLocale);

  React.useEffect(() => {
    dispatch(updateLocaleSlug(localeSlugs))
  }, [dispatch]);
  return (
    <React.Fragment>
      <PageTitle
        activeLocale={activeLocale}
        pageTitleData={pageTitleData}
        titleDictionary={titleDictionary}
      />
    </React.Fragment>
  )
}

export default React.memo(GalleryPageLayout)
