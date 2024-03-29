'use client'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';
import { LoadingType, LocaleStateType, LocaleType, PageTitleDataType, SettingDataType } from '@/src/types';
import { i18n } from '@/i18n-config';
import { LoginSection } from '@/src/sections';


type LayoutProps = {
    activeLocale: LocaleType,
    settingData: SettingDataType,
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

const LoginPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    settingData,
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

    const path = 'login';
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: path,
        }
    });
    const pageTitleData: PageTitleDataType = {
        title: titleDictionary["login"],
        breadcrumbs: [
            {
                id: 1,
                path: `/${activeLocale}/${path}`,
                name: titleDictionary["login"],
            }
        ]
    }

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
            />
            <LoginSection
                activeLocale={activeLocale}
                settingData={settingData}
                titleDictionary={titleDictionary}
                formDictionary={formDictionary}
                loading={loading}
            />
        </Fragment>
    )
}

export default React.memo(LoginPageLayout)
