import React from 'react'
import Link from 'next/link';
import { Menu } from '@/src/class';
import { LocaleType, MenuDataType, MenuTranslateDataType } from '@/src/types'

type TranslationProps = {
    translationType: "link" | "title",
    activeLocale: LocaleType,
    activeMenuData: MenuDataType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    className?: string,
    path: string,
}

const MenuTranslation: React.FC<TranslationProps> = ({
    activeLocale,
    menuData,
    activeMenuData,
    className,
    menuTranslateData,
    translationType,
    path,
}) => {
    const menu = new Menu(menuData, menuTranslateData);
    const activeTranslateData: MenuTranslateDataType | undefined = menu.getTranslate(activeMenuData.id, activeLocale);
    if (activeTranslateData) {
        switch (translationType) {
            case "link":
                return (
                    <React.Fragment>
                        <Link href={`/${activeLocale}/${path}`} className={className}>
                            {activeTranslateData.title}
                        </Link>
                    </React.Fragment>
                )
            case "title":
                return (
                    <React.Fragment>
                        {activeTranslateData.title}
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

export default React.memo(MenuTranslation)
