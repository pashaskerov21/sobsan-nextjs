import { ProductBanner } from '@/src/class'
import { LocaleType, ProductBannerDataType, ProductBannerTranslateDataType } from '@/src/types'
import Link from 'next/link'
import React from 'react'

type TranslationProps = {
    translationType: "title" | "text" | "url",
    activeLocale: LocaleType,
    activeProductBannerData: ProductBannerDataType,
    productBannerTranslateData: ProductBannerTranslateDataType[],
    linkName?: string,
    linkClassName?: string,
}

const ProductBannerTranslation: React.FC<TranslationProps> = ({
    activeLocale,
    activeProductBannerData,
    productBannerTranslateData,
    translationType,
    linkName,
    linkClassName,
}) => {
    const productBanner = new ProductBanner(productBannerTranslateData);
    const activeTranslateData: ProductBannerTranslateDataType | undefined = productBanner.getTranslate(activeProductBannerData.id, activeLocale);

    if (activeTranslateData) {
        switch (translationType) {
            case "title":
                return (
                    <React.Fragment>
                        {activeTranslateData.title}
                    </React.Fragment>
                )
            case "text":
                return (
                    <React.Fragment>
                        {activeTranslateData.text}
                    </React.Fragment>
                )
            case "url":
                return (
                    <React.Fragment>
                        <Link href={`/${activeLocale}/${activeTranslateData.url}`} className={linkClassName}>{linkName}</Link>
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment></React.Fragment>
                )
        }
    } else {
        return (
            <React.Fragment></React.Fragment>
        )
    }
}

export default React.memo(ProductBannerTranslation)
