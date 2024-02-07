'use client'
import React, { Fragment, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle, ProductGrid, Skeleton } from '@/src/components';
import {
    AccountDataType,
    BrandDataType,
    BrandTranslateDataType,
    ComparisonDataType,
    LoadingType,
    LocaleStateType,
    LocaleType,
    PageTitleDataType,
    ProductDataType,
    ProductTranslateDataType,
} from '@/src/types';
import { i18n } from '@/i18n-config';
import { useLocalStorage } from 'usehooks-ts';
import { Comparison, Wishlist } from '@/src/class';
import { Container, Section } from '@/src/styles';
import { ComparisonSection } from '@/src/sections';

type LayoutProps = {
    activeLocale: LocaleType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
}

const ComparisonPageLayout: React.FC<LayoutProps> = ({
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

    const path = 'comparisons';
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: path,
        }
    });
    const pageTitleData: PageTitleDataType = {
        title: titleDictionary["comparisons"],
        breadcrumbs: [
            {
                id: 1,
                path: `/${activeLocale}/${path}`,
                name: titleDictionary["comparisons"],
            }
        ]
    }
    const [comparisonStorage, setComparisonStorage] = useLocalStorage<ComparisonDataType[] | []>("comparison", []);
    const [accountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const comparison = new Comparison(comparisonStorage, accountData);
    const comparisonProducts: ProductDataType[] = comparison.products(productData);
    const handleClearStorage = useCallback(() => {
        setComparisonStorage(comparison.clear());
    }, [])


    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);
    return (
        <Fragment>
            {
                comparison.data().length > 0 ? (
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
            <ComparisonSection
                activeLocale={activeLocale}
                brandData={brandData}
                brandTranslateData={brandTranslateData}
                generalDictionary={generalDictionary}
                loading={loading}
                productData={comparisonProducts}
                productTranslateData={productTranslateData}
                titleDictionary={titleDictionary}
            />
        </Fragment >
    )
}

export default React.memo(ComparisonPageLayout)
