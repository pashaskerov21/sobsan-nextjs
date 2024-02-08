'use client'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle, Skeleton } from '@/src/components';
import { LoadingType, LocaleStateType, LocaleType, PageTitleDataType, RoomDataType, RoomTranslateDataType } from '@/src/types';
import { Suggestion } from '@/src/class';
import { ArticleContainer, Section } from '@/src/styles';
import { Container } from 'react-bootstrap';
import Image from 'next/image';

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
            <Section $py={20}>
                <Container>
                    <ArticleContainer>
                        <div className="article__row two__column">
                            <div className="article__row__column">
                                {
                                    loading.standart ? <Skeleton width='100%' height='250px' /> : (
                                        <div className="article__text" dangerouslySetInnerHTML={{ __html: suggestion.getTranslate(activeData.id, activeLocale, "text") }} />
                                    )
                                }
                            </div>
                            <div className="article__row__column">
                                {
                                    loading.lazy ? <Skeleton width='100%' height='400px' /> : <Image src={activeData.image} width={1000} height={1000} alt='' priority={true} />
                                }
                            </div>
                        </div>
                    </ArticleContainer>
                </Container>
            </Section>
        </Fragment>
    )
}

export default React.memo(SuggestionInnerPageLayout)
