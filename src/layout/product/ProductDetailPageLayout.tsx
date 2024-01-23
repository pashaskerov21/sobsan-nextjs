'use client'
import React from 'react'
import { LoadingType, LocaleStateType, LocaleType, PageTitleDataType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import { useDispatch } from 'react-redux'
import { Product } from '@/src/class'
import { updateLocaleSlug } from '@/src/redux/actions'
import { PageTitle } from '@/src/components'

type LayoutProps = {
    activeLocale: LocaleType,
    activeProductData: ProductDataType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
}

const ProductDetailPageLayout: React.FC<LayoutProps> = ({
    activeLocale,
    activeProductData,
    generalDictionary,
    productData,
    productTranslateData,
    titleDictionary,
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
    const dispatch = useDispatch();
    const product = new Product(productData, productTranslateData);
    const localeSlugs: LocaleStateType[] = product.getLocaleSlugs(activeProductData.id);
    const pageTitleData: PageTitleDataType = product.getPageTitleData(activeProductData.id, activeLocale);

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

export default React.memo(ProductDetailPageLayout)
