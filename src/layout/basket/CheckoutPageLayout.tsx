'use client'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';
import { AccountDataType, LoadingType, LocaleStateType, LocaleType, PageTitleDataType, UserDataType, OrderDataType } from '@/src/types';
import { i18n } from '@/i18n-config';
import { useLocalStorage } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { Account } from '@/src/class';
import { CheckoutSection } from '@/src/sections';

type LayoutProps = {
    activeLocale: LocaleType,
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

const CheckoutPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    titleDictionary,
    generalDictionary,
    formDictionary,
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

    const parentPath = 'basket'
    const path = 'checkout';
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: `${parentPath}/${path}`,
        }
    });
    const pageTitleData: PageTitleDataType = {
        title: titleDictionary["order"],
        breadcrumbs: [
            {
                id: 1,
                path: `/${activeLocale}/${parentPath}`,
                name: titleDictionary["basket"],
            },
            {
                id: 2,
                path: `/${activeLocale}/${path}`,
                name: titleDictionary["order"],
            }
        ]
    }

    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);

    const router = useRouter();
    const [accountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const account = new Account(accountData);
    const activeUser:UserDataType | undefined = account.getActiveUser();
    const activeOrder: OrderDataType | undefined = account.getActiveOrder();
    if (!accountData.activeUser) {
        router.push(`/${activeLocale}/login`);
    }
    if(activeOrder){
        if(activeOrder.basketData.length === 0){
            router.push(`/${activeLocale}/basket`);
        }
    }
    return (
        <Fragment>
            <PageTitle
                loading={loading}
                activeLocale={activeLocale}
                pageTitleData={pageTitleData}
                titleDictionary={titleDictionary}
            />
            <CheckoutSection
                activeLocale={activeLocale}
                formDictionary={formDictionary}
                generalDictionary={generalDictionary}
                loading={loading}
                titleDictionary={titleDictionary}
            />
        </Fragment>
    )
}

export default React.memo(CheckoutPageLayout)
