'use client'
import React from 'react'
import { Menu } from '@/src/class';
import { LoadingType, LocaleStateType, PageTitleDataType, WarrantyConditionPageLayoutProps } from '@/src/types'
import { useDispatch } from 'react-redux';
import { updateLocaleSlug } from '@/src/redux/actions';
import { PageTitle } from '@/src/components';

const WarrantyConditionsPageLayout: React.FC<WarrantyConditionPageLayoutProps> = ({
    activeLocale,
    articleData,
    articleTranslateData,
    menuData,
    menuTranslateData,
    titleDictionary,
}) => {
    const path = 'warranty-conditions';
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
        }, 1000);
        setTimeout(() => {
            setLoading((prev) => {
                return {
                    ...prev,
                    lazy: false,
                }
            });
        }, 2000);
    }, []);

    const menu = new Menu(menuData, menuTranslateData);
    const localeSlugs: LocaleStateType[] = menu.getLocaleSlugs(path);
    const pageTitleData: PageTitleDataType = menu.getPageTitleData(path, activeLocale);

    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);
    return (
        <React.Fragment>
            <PageTitle
                loading={loading}
                activeLocale={activeLocale}
                pageTitleData={pageTitleData}
                titleDictionary={titleDictionary}
            />
        </React.Fragment>
    )
}

export default React.memo(WarrantyConditionsPageLayout)
