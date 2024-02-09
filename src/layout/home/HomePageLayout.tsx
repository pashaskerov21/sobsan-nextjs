'use client'
import { Menu } from '@/src/class';
import { Gallery, SectionTitle } from '@/src/components';
import { updateLocaleSlug } from '@/src/redux/actions';
import { BannerSection, PopularProductSection, ProductBannerSection, RoomSuggestionSection } from '@/src/sections';
import { Section } from '@/src/styles';
import {
    BannerDataType,
    BrandDataType,
    BrandTranslateDataType,
    GalleryDataType,
    LoadingType,
    LocaleStateType,
    LocaleType,
    MenuDataType,
    MenuTranslateDataType,
    ProductBannerDataType,
    ProductBannerTranslateDataType,
    ProductDataType,
    ProductTranslateDataType,
    RoomDataType,
    RoomTranslateDataType
} from '@/src/types'
import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

type LayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    bannerData: BannerDataType[],
    productBannerData: ProductBannerDataType[];
    productBannerTranslateData: ProductBannerTranslateDataType[],
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    generalDictionary: { [key: string]: string },
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[],
    titleDictionary: { [key: string]: string },
    roomData: RoomDataType[],
    roomTranslateData: RoomTranslateDataType[],
    galleryData: GalleryDataType[],
}

const HomePageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    bannerData,
    menuData,
    menuTranslateData,
    generalDictionary,
    productBannerData,
    productBannerTranslateData,
    productData,
    productTranslateData,
    brandData,
    brandTranslateData,
    titleDictionary,
    roomData,
    roomTranslateData,
    galleryData,
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

    const path = '';
    const dispatch = useDispatch();

    const menu = new Menu(menuData, menuTranslateData);
    const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);

    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);
    return (
        <Fragment>
            <BannerSection
                loading={loading} bannerData={bannerData} />
            <ProductBannerSection
                activeLocale={activeLocale}
                generalDictionary={generalDictionary}
                loading={loading}
                productBannerData={productBannerData}
                productBannerTranslateData={productBannerTranslateData}
            />
            <PopularProductSection
                activeLocale={activeLocale}
                generalDictionary={generalDictionary}
                loading={loading}
                productData={productData}
                productTranslateData={productTranslateData}
                brandData={brandData}
                brandTranslateData={brandTranslateData}
                titleDictionary={titleDictionary}
            />
            <RoomSuggestionSection
                activeLocale={activeLocale}
                generalDictionary={generalDictionary}
                loading={loading}
                roomData={roomData}
                roomTranslateData={roomTranslateData}
                titleDictionary={titleDictionary}
            />
            <Section $py={60}>
                <Container>
                    <SectionTitle title={titleDictionary['gallery']}/>
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

export default React.memo(HomePageLayout)
