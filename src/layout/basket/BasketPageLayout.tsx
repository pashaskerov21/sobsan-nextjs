'use client'
import React, { Fragment, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';
import { AccountDataType, BasketDataType, BrandDataType, BrandTranslateDataType, ColorDataType, ColorTranslateDataType, LoadingType, LocaleStateType, LocaleType, PageTitleDataType, ProductDataType, ProductTranslateDataType } from '@/src/types';
import { i18n } from '@/i18n-config';
import { BasketSection } from '@/src/sections';
import { useLocalStorage } from 'usehooks-ts';
import { Basket } from '@/src/class';

type LayoutProps = {
    activeLocale: LocaleType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    brandTranslateData: BrandTranslateDataType[],
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
}

const BasketPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    productData,
    productTranslateData,
    brandTranslateData,
    colorData,
    colorTranslateData,
    titleDictionary,
    generalDictionary,
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

    const path = 'basket';
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: path,
        }
    });
    const pageTitleData: PageTitleDataType = {
        title: titleDictionary["basket"],
        breadcrumbs: [
            {
                id: 1,
                path: `/${activeLocale}/${path}`,
                name: titleDictionary["basket"],
            }
        ]
    }
    const [basketStorage, setBasketStorage] = useLocalStorage<BasketDataType[] | []>("basket", []);
    const [accountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const basket = new Basket(basketStorage, accountData);
    const handleClearStorage = useCallback(() => {
        setBasketStorage(basket.clear());
    },[])


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
                type="basket"
                handleClearStorage={handleClearStorage}
            />
            <BasketSection
                activeLocale={activeLocale}
                generalDictionary={generalDictionary}
                loading={loading}
                productData={productData}
                productTranslateData={productTranslateData}
                brandTranslateData={brandTranslateData}
                colorData={colorData}
                colorTranslateData={colorTranslateData}
                titleDictionary={titleDictionary}
                handleClearStorage={handleClearStorage}
                
            />
        </Fragment>
    )
}

export default React.memo(BasketPageLayout)
