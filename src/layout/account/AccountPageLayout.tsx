'use client'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';
import {
    AccountDataType,
    LoadingType,
    LocaleStateType,
    LocaleType,
    PageTitleDataType,
    ProductDataType,
    ProductTranslateDataType, 
    UserDataType
} from '@/src/types';
import { i18n } from '@/i18n-config';
import { useLocalStorage } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { AccounSection } from '@/src/sections';
import { Account } from '@/src/class';


type LayoutProps = {
    activeLocale: LocaleType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

const AccountPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    titleDictionary,
    generalDictionary,
    formDictionary,
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

    const path = 'account';
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: path,
        }
    });
    const pageTitleData: PageTitleDataType = {
        title: titleDictionary["private_cabinet"],
        breadcrumbs: [
            {
                id: 1,
                path: `/${activeLocale}/${path}`,
                name: titleDictionary["private_cabinet"],
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
    const activeUserData: UserDataType | undefined = account.getActiveUser();
    if (!accountData.activeUser) {
        router.push(`/${activeLocale}/login`)
    }
    if (activeUserData) {
        return (
            <Fragment>
                <PageTitle
                    loading={loading}
                    activeLocale={activeLocale}
                    pageTitleData={pageTitleData}
                    titleDictionary={titleDictionary}
                />
                <AccounSection
                    activeLocale={activeLocale}
                    formDictionary={formDictionary}
                    generalDictionary={generalDictionary}
                    titleDictionary={titleDictionary}
                    loading={loading}
                    activeUserData={activeUserData}
                    productData={productData}
                    productTranslateData={productTranslateData}
                />
            </Fragment>
        )
    } else {
        return (
            <Fragment></Fragment>
        )
    }
}

export default React.memo(AccountPageLayout)
