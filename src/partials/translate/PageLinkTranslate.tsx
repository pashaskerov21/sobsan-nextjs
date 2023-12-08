import { Menu } from '@/src/class';
import React from 'react';
import { MenuTranslateDataType, PageLinkTranslateProps } from '@/src/types';

const PageLinkTranslate: React.FC<PageLinkTranslateProps> = ({
    activeLocale,
    menuData,
    menuID,
    menuTranslateData,
}) => {
    const menu = new Menu(menuData, menuTranslateData);
    const activeTranslateData: MenuTranslateDataType | undefined = menu.getTranslate(menuID, activeLocale);
    return (
        <React.Fragment>
            {
                activeTranslateData ? (
                    activeTranslateData.title
                ) : null
            }
        </React.Fragment>
    )
}

export default React.memo(PageLinkTranslate)