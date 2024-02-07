'use client'
import React, { Fragment, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle, ProductGrid, Skeleton } from '@/src/components';
import {
    AccountDataType,
    BrandDataType,
    BrandTranslateDataType,
    LoadingType,
    LocaleStateType,
    LocaleType,
    PageTitleDataType,
    ProductDataType,
    ProductTranslateDataType,
    WishlistDataType
} from '@/src/types';
import { i18n } from '@/i18n-config';
import { BasketSection } from '@/src/sections';
import { useLocalStorage } from 'usehooks-ts';
import { Wishlist } from '@/src/class';
import { AlertComponent, Container, Section } from '@/src/styles';

type LayoutProps = {
    activeLocale: LocaleType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
}

const WishlistPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    brandData,
    brandTranslateData,
    generalDictionary,
    productData,
    productTranslateData,
    titleDictionary,
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

    const path = 'wishlist';
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: path,
        }
    });
    const pageTitleData: PageTitleDataType = {
        title: titleDictionary["wishlist"],
        breadcrumbs: [
            {
                id: 1,
                path: `/${activeLocale}/${path}`,
                name: titleDictionary["wishlist"],
            }
        ]
    }
    const [wishlistStorage, setWishlistStorage] = useLocalStorage<WishlistDataType[] | []>("wishlist", []);
    const [accountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const wishlist = new Wishlist(wishlistStorage, accountData);
    const wishlistProducts: ProductDataType[] = wishlist.products(productData);
    const handleClearStorage = useCallback(() => {
        setWishlistStorage(wishlist.clear());
    }, [])


    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);
    return (
        <Fragment>
            {
                wishlist.data().length > 0 ? (
                    <PageTitle
                        loading={loading}
                        activeLocale={activeLocale}
                        pageTitleData={pageTitleData}
                        titleDictionary={titleDictionary}
                        type="wishlist"
                        handleClearStorage={handleClearStorage}
                    />
                ) : (
                    <PageTitle
                        loading={loading}
                        activeLocale={activeLocale}
                        pageTitleData={pageTitleData}
                        titleDictionary={titleDictionary}
                    />
                )
            }
            <Section $py={20}>
                <Container>

                    {
                        wishlistProducts.length > 0 ? (
                            <ProductGrid
                                loading={loading}
                                activeLocale={activeLocale}
                                productData={wishlistProducts}
                                productTranslateData={productTranslateData}
                                brandData={brandData}
                                brandTranslateData={brandTranslateData}
                                generalDictionary={generalDictionary}
                                className="full__container"
                            />
                        ) : (
                            <Fragment>
                                {
                                    loading.standart ? <Skeleton width='100%' height='45px'/> : (
                                        <h3 className='text-center text-lg-start'>{generalDictionary["no_product_in_wishlist"]}</h3>
                                    )
                                }
                            </Fragment>
                        )
                    }
                </Container>
            </Section>
        </Fragment >
    )
}

export default React.memo(WishlistPageLayout)
