'use client'
import React, { Fragment } from 'react'
import { BiChevronDown } from "react-icons/bi";
import { Menu } from '@/src/class';
import Link from 'next/link';
import { LocaleType, MenuDataType, MenuTranslateDataType } from '@/src/types';

export type PageLinksProps = {
    activeLocale: LocaleType,
    menuData: MenuDataType[],
    menuTranslateData: MenuTranslateDataType[],
    className: string,
}

const PageLinks: React.FC<PageLinksProps> = ({ className, menuData, menuTranslateData, activeLocale }) => {
    const menu = new Menu(menuData, menuTranslateData);
    const mainMenuData = menu.getMainMenuData();

    const [activeLinkID, setActiveLinkID] = React.useState<number | null>();
    const toggleLinkMenu = (linkID: number) => {
        if (activeLinkID === linkID) {
            setActiveLinkID(null);
        } else {
            setActiveLinkID(linkID);
        }
    }
    return (
        <div className={className}>
            {
                mainMenuData.length > 0 ? (
                    mainMenuData.map((maindata) => (
                        <Fragment key={maindata.id}>
                            <div className="link-item">
                                <div className="main-row">
                                    <Link href={menu.getTranslate(maindata, activeLocale, "url")}>
                                        {menu.getTranslate(maindata, activeLocale, "title")}
                                    </Link>
                                    {
                                        menuData.filter((filterdata) => filterdata.parent_id === maindata.id).length > 0 ? (
                                            <div className={`arrow-btn ${activeLinkID === maindata.id ? 'active' : ''}`} onClick={() => toggleLinkMenu(maindata.id)}>
                                                <BiChevronDown />
                                            </div>
                                        ) : null
                                    }
                                </div>
                                {
                                    menu.getAltMenuData(maindata.id).length > 0 ? (
                                        <Fragment>
                                            <div className={`link-menu ${activeLinkID === maindata.id ? 'active' : ''}`}>
                                                {
                                                    menu.getAltMenuData(maindata.id).map((altdata) => (
                                                        <Fragment key={altdata.id}>
                                                            <Link href={menu.getTranslate(altdata, activeLocale, "url")}>
                                                                {menu.getTranslate(altdata, activeLocale, "title")}
                                                            </Link>
                                                        </Fragment>
                                                    ))
                                                }
                                            </div>
                                        </Fragment>
                                    ) : null
                                }
                            </div>
                        </Fragment>
                    ))
                ) : null
            }
        </div>
    )
}

export default React.memo(PageLinks);
