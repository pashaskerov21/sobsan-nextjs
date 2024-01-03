'use client'
import { Menu } from '@/src/class';
import { updateLocaleSlug } from '@/src/redux/actions';
import { BannerSection, ProductBannerSection } from '@/src/sections';
import { HomePageLayoutProps, LoadingType, LocaleStateType, PageTitleDataType } from '@/src/types'
import React from 'react'
import { useDispatch } from 'react-redux';

const HomePageLayout: React.FC<HomePageLayoutProps> = ({
    activeLocale,
    bannerData,
    menuData,
    menuTranslateData,
    generalDictionary,
    productBannerData,
    productBannerTranslateData,
}) => {

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

    const path = '';
    const dispatch = useDispatch();

    const menu = new Menu(menuData, menuTranslateData);
    const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);

    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);
    return (
        <React.Fragment>
            <BannerSection
                loading={loading} bannerData={bannerData} />
            <ProductBannerSection
                activeLocale={activeLocale}
                generalDictionary={generalDictionary}
                loading={loading}
                productBannerData={productBannerData}
                productBannerTranslateData={productBannerTranslateData}
            />
        </React.Fragment>
    )
}

export default React.memo(HomePageLayout)
