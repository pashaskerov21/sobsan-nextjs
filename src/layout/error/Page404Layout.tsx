'use client';
import { i18n } from '@/i18n-config';
import { Skeleton } from '@/src/components';
import { updateLocaleSlug } from '@/src/redux/actions';
import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Container, Section } from '../../styles'
import { LoadingType, LocaleStateType, LocaleType } from '../../types'
import { Error404Wrapper } from './style';

type LayoutProps = {
  activeLocale: LocaleType,
  titleDictionary: { [key: string]: string },
  generalDictionary: { [key: string]: string },
}

const Page404Layout: React.FC<LayoutProps> = ({ activeLocale, titleDictionary, generalDictionary }) => {
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
    }, 1000);
    setTimeout(() => {
      setLoading((prev) => {
        return {
          ...prev,
          lazy: false,
        }
      });
    }, 2000);
  }, []);
  const dispatch = useDispatch();
  const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
    return {
      locale: locale,
      slug: "404"
    }
  });
  React.useEffect(() => {
    dispatch(updateLocaleSlug(localeSlugs))
  }, [dispatch]);
  return (
    <React.Fragment>
      <Section>
        <Container>
          <Error404Wrapper>
            {
              loading.standart ? (
                <React.Fragment>
                  <Skeleton width='190px' height='135px' />
                  <Skeleton width='170px' height='30px' />
                  <Skeleton width='100%' max_width='250px' height='60px' />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="error_code">404</div>
                  <div className="error_text">{generalDictionary.page_not_found}</div>
                  <Link href={`/${activeLocale}`}>{titleDictionary.home_page}</Link>
                </React.Fragment>
              )
            }
          </Error404Wrapper>
        </Container>
      </Section>
    </React.Fragment>
  )
}

export default React.memo(Page404Layout)
