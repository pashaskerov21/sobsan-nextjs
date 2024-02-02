'use client'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';
import { AccountDataType, BasketDataType, LoadingType, LocaleStateType, LocaleType, PageTitleDataType, UserDataType, OrderDataType} from '@/src/types';
import { i18n } from '@/i18n-config';
import { useLocalStorage } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { Account } from '@/src/class';

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
    const [basketStorage] = useLocalStorage<BasketDataType[] | []>("basket", []);
    const [accountData, setAccountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const account = new Account(accountData);
    if(!accountData.activeUser){
        router.push(`/${activeLocale}/login`);
    }
    if(accountData.activeUser){
        let userData: UserDataType | undefined = account.searchUserByID(accountData.activeUser);
        if(userData){
            if(userData.activeOrderID){
                const activeOrderData: OrderDataType | undefined = userData.orders.find((data) => data.id === userData?.activeOrderID);
                if(activeOrderData && activeOrderData.basketData.length === 0){
                    router.push(`/${activeLocale}/basket`);
                }
            }else{
                router.push(`/${activeLocale}/basket`);
            }            
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
        </Fragment>
    )
}

export default React.memo(CheckoutPageLayout)
