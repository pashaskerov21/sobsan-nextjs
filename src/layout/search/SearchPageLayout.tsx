'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle, ProductGrid, Skeleton } from '@/src/components';
import {
    BrandDataType,
    BrandTranslateDataType,
    LoadingType,
    LocaleStateType,
    LocaleType,
    PageTitleDataType,
    ProductDataType,
    ProductTranslateDataType,
} from '@/src/types';
import { i18n } from '@/i18n-config';
import { Container, Section } from '@/src/styles';
import { Product } from '@/src/class';

type LayoutProps = {
    activeLocale: LocaleType,
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[],
}

const SearchPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    titleDictionary,
    generalDictionary,
    brandData,
    brandTranslateData,
    productData,
    productTranslateData,
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

    const path = 'search';
    const dispatch = useDispatch();
    let localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: path,
        }
    });
    const pageTitleData: PageTitleDataType = {
        title: titleDictionary["search"],
        breadcrumbs: [
            {
                id: 1,
                path: `/${activeLocale}/${path}`,
                name: titleDictionary["search"],
            }
        ]
    }



    const product = new Product(productData, productTranslateData);
    const [queryStatus, setQueryStatus] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [searchProducts, setSearchProducts] = useState<ProductDataType[]>([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('query');
        if (queryParam) {
            setQueryStatus(true);
            setQuery(queryParam);
            localeSlugs = i18n.locales.map((locale) => {
                return {
                    locale: locale,
                    slug: `${path}?query=${queryParam}`,
                }
            });
            dispatch(updateLocaleSlug(localeSlugs));

            const resultProducts: ProductDataType[] = product.search(queryParam, activeLocale);
            if(resultProducts.length > 0){
                setQueryStatus(true);
                setSearchProducts(resultProducts);
            }else{
                setQueryStatus(false);
                setSearchProducts([]);
            }
        } else {
            setQueryStatus(false);
        }
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
                    {
                        queryStatus ? (
                            <Fragment>
                                {
                                    searchProducts.length > 0 && (
                                        <ProductGrid
                                            loading={loading}
                                            activeLocale={activeLocale}
                                            productData={searchProducts}
                                            productTranslateData={productTranslateData}
                                            brandData={brandData}
                                            brandTranslateData={brandTranslateData}
                                            generalDictionary={generalDictionary}
                                            className="full__container"
                                            searchKeyword={query}
                                        />
                                    )
                                }
                            </Fragment>
                        ) : (
                            <Fragment>
                                {
                                    loading.standart ? <Skeleton width='100%' height='45px' /> : (
                                        <h3 className='text-center text-lg-start'>{generalDictionary["search_error_message"]}</h3>
                                    )
                                }
                            </Fragment>
                        )
                    }

                </Container>
            </Section>
        </Fragment>
    )
}

export default React.memo(SearchPageLayout)
