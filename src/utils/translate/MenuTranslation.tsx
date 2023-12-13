import React from 'react'
import Link from 'next/link';
import { Menu } from '@/src/class';
import { MenuTranslateDataType, MenuTranslationProps } from '@/src/types'

const MenuTranslation: React.FC<MenuTranslationProps> = ({
    activeLocale,
    menuData,
    activeMenuData,
    className,
    menuTranslateData,
    translationType,
}) => {
    const menu = new Menu(menuData, menuTranslateData);
    const activeTranslateData: MenuTranslateDataType | undefined = menu.getTranslate(activeMenuData.id, activeLocale);
    if (activeTranslateData) {
        switch (translationType) {
            case "link":
                return (
                    <React.Fragment>
                        <Link href={`/${activeLocale}/${activeMenuData.path}`} className={className}>
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
