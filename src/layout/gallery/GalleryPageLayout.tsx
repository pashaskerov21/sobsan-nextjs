'use client'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { Menu } from '@/src/class';
import { Gallery, PageTitle } from '@/src/components';
import { updateLocaleSlug } from '@/src/redux/actions';
import { GalleryDataType, LoadingType, LocaleStateType, LocaleType, MenuDataType, MenuTranslateDataType, PageTitleDataType } from '@/src/types'
import { Container, Section } from '@/src/styles';

type LayoutProps = {
  activeLocale: LocaleType,
  menuData: MenuDataType[],
  menuTranslateData: MenuTranslateDataType[],
  galleryData: GalleryDataType[],
  titleDictionary: { [key: string]: string },
}

const GalleryPageLayout: React.FC<LayoutProps> = ({
  activeLocale,
  galleryData,
  menuData,
  menuTranslateData,
  titleDictionary,
}) => {
  const path = 'gallery';
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<LoadingType>({
    standart: true,
    lazy: true,
  });
  React.useEffect(() => {
    setTimeout(() => {
      setLoading((prev) => {
        return {
          ...prev,
          standart: false,
        }
      });
    }, 500);
    setTimeout(() => {
      setLoading((prev) => {
        return {
          ...prev,
          lazy: false,
        }
      });
    }, 1000);
  }, []);

  const menu = new Menu(menuData, menuTranslateData);
  const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);
  const pageTitleData: PageTitleDataType = menu.getPageTitleData(path, activeLocale);

  React.useEffect(() => {
    dispatch(updateLocaleSlug(localeSlugs))
  }, [dispatch]);
  return (
    <Fragment>
      <PageTitle
        loading={loading}
        activeLocale={activeLocale}
        pageTitleData={pageTitleData}
        titleDictionary={titleDictionary}
      />
      <Section $py={20}>
        <Container>
          <Gallery
            galleryData={galleryData}
            loading={loading}
            titleDictionary={titleDictionary}
          />
        </Container>
      </Section>
    </Fragment>
  )
}

export default React.memo(GalleryPageLayout)
