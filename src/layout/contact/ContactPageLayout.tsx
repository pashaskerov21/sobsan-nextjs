'use client'
import React, { Fragment } from 'react'
import { Menu } from '@/src/class';
import { PageTitle } from '@/src/components';
import { updateLocaleSlug } from '@/src/redux/actions';
import {
    LoadingType,
    LocaleStateType,
    LocaleType,
    MenuDataType,
    MenuTranslateDataType,
    PageTitleDataType,
    SettingDataType,
    SettingTranslateDataType
} from '@/src/types'
import { useDispatch } from 'react-redux';
import { ContactSection } from '@/src/sections';

type LayoutProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    settingData: SettingDataType,
    settingTranslateData: SettingTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

const ContactPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    menuData,
    menuTranslateData,
    settingData,
    settingTranslateData,
    titleDictionary,
    formDictionary,
    generalDictionary,
}) => {
    const path = 'contact';
    const dispatch = useDispatch();
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

    const menu = new Menu(menuData, menuTranslateData);
    const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);
    const pageTitleData: PageTitleDataType = menu.getPageTitleData(path, activeLocale);

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
            <ContactSection
                activeLocale={activeLocale}
                formDictionary={formDictionary}
                generalDictionary={generalDictionary}
                loading={loading}
                settingData={settingData}
                settingTranslateData={settingTranslateData}
                titleDictionary={titleDictionary}
            />
        </Fragment>
    )
}

export default React.memo(ContactPageLayout)
