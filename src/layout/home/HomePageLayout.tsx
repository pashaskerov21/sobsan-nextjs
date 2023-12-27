'use client'
import { Menu } from '@/src/class';
import { updateLocaleSlug } from '@/src/redux/actions';
import { BannerSection } from '@/src/sections';
import { HomePageLayoutProps, LocaleStateType, PageTitleDataType } from '@/src/types'
import React from 'react'
import { useDispatch } from 'react-redux';

const HomePageLayout: React.FC<HomePageLayoutProps> = ({
    activeLocale,
    bannerData,
    menuData,
    menuTranslateData,
}) => {

    const [loading, setLoading] = React.useState<boolean>(true);
    React.useEffect(() => {
        setLoading(false);
    },[]);

    const path = '';
    const dispatch = useDispatch();

    const menu = new Menu(menuData, menuTranslateData);
    const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);

    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);
    return (
        <React.Fragment>
            <BannerSection loading={loading} bannerData={bannerData} />
        </React.Fragment>
    )
}

export default React.memo(HomePageLayout)
