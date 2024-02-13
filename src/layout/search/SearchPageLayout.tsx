'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle, Skeleton } from '@/src/components';
import { LoadingType, LocaleStateType, LocaleType, PageTitleDataType, RoomDataType, RoomTranslateDataType } from '@/src/types';
import { i18n } from '@/i18n-config';
import { RoomSuggestionSection } from '@/src/sections';
import { useRouter } from 'next/navigation';
import { Container, Section } from '@/src/styles';

type LayoutProps = {
    activeLocale: LocaleType,
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
}

const SearchPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
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



    const [queryStatus, setQueryStatus] = useState<boolean>(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('query');
        if (queryParam) {
            setQueryStatus(true);
            localeSlugs = i18n.locales.map((locale) => {
                return {
                    locale: locale,
                    slug: `${path}?query=${queryParam}`,
                }
            });
            dispatch(updateLocaleSlug(localeSlugs))
        } else {
            setQueryStatus(false);
        }
    }, [dispatch]);


    return (
        <Fragment>
            <PageTitle
                loading={loading}
                activeLocale={activeLocale}
                pageTitleData={pageTitleData}
                titleDictionary={titleDictionary}
            />
            {
                !queryStatus && (
                    <Section $py={20}>
                        <Container>
                            {
                                loading.standart ? <Skeleton width='100%' height='45px' /> : (
                                    <h3 className='text-center text-lg-start'>{generalDictionary["search_error_message"]}</h3>
                                )
                            }

                        </Container>
                    </Section>
                )
            }
        </Fragment>
    )
}

export default React.memo(SearchPageLayout)
