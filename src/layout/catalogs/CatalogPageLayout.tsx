'use client'
import React from 'react'
import { updateLocaleSlug } from '@/src/redux/actions';
import { CatalogPageLayout, LocaleStateType } from '@/src/types'
import { useDispatch } from 'react-redux';

const CatalogPageLayout: React.FC<CatalogPageLayout> = ({
    activeLocale,
    catalogData,
    catalogTranslateData,
    colorData,
    colorTranslateData,
    titleDictionary,
}) => {
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = [
        {
            locale: 'az',
            slug: 'catalogs'
        },
        {
            locale: 'en',
            slug: 'catalogs',
        },
        {
            locale: 'ru',
            slug: 'catalogs',
        },
    ]
    React.useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch])
    return (
        <React.Fragment></React.Fragment>
    )
}

export default React.memo(CatalogPageLayout)
