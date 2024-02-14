'use client'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle, ProductGrid, Skeleton } from '@/src/components';
import {
    BrandDataType,
    BrandTranslateDataType,
    CategoriesDataType,
    CategoriesTranslateDataType,
    LoadingType,
    LocaleStateType,
    LocaleType,
    MenuDataType,
    MenuTranslateDataType,
    PageTitleDataType,
    ProductDataType,
    ProductTranslateDataType,
} from '@/src/types';
import { i18n } from '@/i18n-config';
import { Container, Section } from '@/src/styles';
import { Category, Menu, Product } from '@/src/class';
import { redirect, useRouter } from 'next/navigation';
import Image from 'next/image';
import { SearchMessage } from './style';

type LayoutProps = {
    activeLocale: LocaleType,
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[],
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
}

const SearchPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    titleDictionary,
    generalDictionary,
    brandData,
    brandTranslateData,
    productData,
    productTranslateData,
    menuData,
    menuTranslateData,
    categoryData,
    categoryTranslateData,
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

    const router = useRouter();
    const product = new Product(productData, productTranslateData);
    const menu = new Menu(menuData, menuTranslateData);
    const category = new Category(categoryData, categoryTranslateData);

    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('query');
    if (queryParam) {
        localeSlugs = i18n.locales.map((locale) => {
            return {
                locale: locale,
                slug: `${path}?query=${queryParam}`,
            }
        });
        dispatch(updateLocaleSlug(localeSlugs));

        const searchProductsByTitle: ProductDataType[] = product.searchByTitle(queryParam, activeLocale);
        const searchProductsByDesc: ProductDataType[] = product.searchByDesc(queryParam, activeLocale);
        const mergedProducts = [...searchProductsByTitle, ...searchProductsByDesc];

        const uniqueProducts = mergedProducts.filter((product, index, self) =>
            index === self.findIndex((p) => (
                p.id === product.id
            ))
        );

        const activeCategoryData: CategoriesDataType | undefined = category.search(queryParam, activeLocale);
        const activeMenuData: MenuDataType | undefined = menu.search(queryParam, activeLocale);

        if (uniqueProducts.length > 0) {
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
                            <ProductGrid
                                loading={loading}
                                activeLocale={activeLocale}
                                productData={uniqueProducts}
                                productTranslateData={productTranslateData}
                                brandData={brandData}
                                brandTranslateData={brandTranslateData}
                                generalDictionary={generalDictionary}
                                className="full__container"
                                searchKeyword={queryParam}
                            />
                        </Container>
                    </Section>
                </Fragment>
            )
        } else if (activeCategoryData) {
            setTimeout(() => {
                router.push(category.getTranslate(activeCategoryData.id, activeLocale, "url"))
            }, 1000)
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
                                loading.standart ? <Skeleton width='100%' height='45px' /> : (
                                    <SearchMessage>
                                        <div className='title'>{generalDictionary["search_redirect_message"]}</div>
                                        <div className="loader__spin"></div>
                                    </SearchMessage>
                                )
                            }
                        </Container>
                    </Section>
                </Fragment>
            )
        } else if (activeMenuData) {
            setTimeout(() => {
                router.push(menu.getTranslate(activeMenuData, activeLocale, "url"))
            }, 1000)
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
                                loading.standart ? <Skeleton width='100%' height='45px' /> : (
                                    <SearchMessage>
                                        <div className='title'>{generalDictionary["search_redirect_message"]}</div>
                                        <div className="loader__spin"></div>
                                    </SearchMessage>
                                )
                            }
                        </Container>
                    </Section>
                </Fragment>
            )
        } else {
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
                                loading.standart ? <Skeleton width='100%' height='45px' /> : (
                                    <SearchMessage>
                                        <div className='title'>{generalDictionary["search_redirect_message"]}</div>
                                    </SearchMessage>
                                )
                            }
                        </Container>
                    </Section>
                </Fragment>
            )
        }
    } else {
        router.push(`/${activeLocale}/404`)
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
                            loading.standart ? <Skeleton width='100%' height='45px' /> : (
                                <SearchMessage>
                                    <div className='title'>{generalDictionary["search_redirect_message"]}</div>
                                    <div className="loader__spin"></div>
                                </SearchMessage>
                            )
                        }
                    </Container>
                </Section>
            </Fragment>
        )
    }
}

export default React.memo(SearchPageLayout)
