'use client'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';
import { LoadingType, LocaleStateType, LocaleType, PageTitleDataType, RoomDataType, RoomTranslateDataType } from '@/src/types';
import { i18n } from '@/i18n-config';
import { RoomSuggestionSection } from '@/src/sections';

type LayoutProps = {
    activeLocale: LocaleType,
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    roomData: RoomDataType[],
    roomTranslateData: RoomTranslateDataType[],
}

const SuggestionPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    titleDictionary,
    generalDictionary,
    roomData,
    roomTranslateData,
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

    const path = 'suggestions';
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: path,
        }
    });
    const pageTitleData: PageTitleDataType = {
        title: titleDictionary["coloring_suggestion"],
        breadcrumbs: [
            {
                id: 1,
                path: `/${activeLocale}/${path}`,
                name: titleDictionary["coloring_suggestion"],
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
            <RoomSuggestionSection
                activeLocale={activeLocale}
                generalDictionary={generalDictionary}
                loading={loading}
                roomData={roomData}
                roomTranslateData={roomTranslateData}
                titleDictionary={titleDictionary}
            />
        </Fragment>
    )
}

export default React.memo(SuggestionPageLayout)
