'use client'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';
import { LoadingType, LocaleStateType, LocaleType, PageTitleDataType, RoomDataType, RoomTranslateDataType } from '@/src/types';
import { i18n } from '@/i18n-config';
import { RoomSuggesstionInnerSection, RoomSuggestionSection } from '@/src/sections';
import { Suggestion } from '@/src/class';

type LayoutProps = {
    activeLocale: LocaleType,
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    activeData: RoomDataType,
    roomData: RoomDataType[],
    roomTranslateData: RoomTranslateDataType[],
}

const SuggestionInnerPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    titleDictionary,
    generalDictionary,
    activeData,
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

    const dispatch = useDispatch();
    const suggestion = new Suggestion(roomData, roomTranslateData);
    const localeSlugs: LocaleStateType[] = suggestion.getLocaleSlugs(activeData.id);
    const pageTitleData: PageTitleDataType = suggestion.getPageTitleData(activeData.id, activeLocale, titleDictionary["coloring_suggestion"]);

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
            <RoomSuggesstionInnerSection
                activeData={activeData}
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

export default React.memo(SuggestionInnerPageLayout)
