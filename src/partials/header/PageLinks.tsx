import Link from 'next/link'
import React from 'react'
import PageLinkTranslate from '../translate/PageLinkTranslate'
import { PageLinksProps } from '@/src/types';
import { BiChevronDown } from "react-icons/bi";
import { Menu } from '@/src/class';


const PageLinks: React.FC<PageLinksProps> = ({ className, menuData, menuTranslateData, activeLocale }) => {
    const menu = new Menu(menuData, menuTranslateData);
    const mainMenuData = menu.getMainMenuData();
    return (
        <React.Fragment>
            <div className={className}>
                {
                    mainMenuData.length > 0 ? (
                        mainMenuData.map((maindata) => (
                            <React.Fragment key={maindata.id}>
                                <div className="link-item">
                                    <Link href={`/${activeLocale}/${maindata.path}`}>
                                        <PageLinkTranslate
                                            activeLocale={activeLocale}
                                            menuData={menuData}
                                            menuTranslateData={menuTranslateData}
                                            menuID={maindata.id}
                                        />
                                    </Link>
                                    {
                                        menuData.filter((filterdata) => filterdata.parent_id === maindata.id).length > 0 ? (
                                            <BiChevronDown />
                                        ) : null
                                    }
                                    {
                                        menu.getAltMenuData(maindata.id).length > 0 ? (
                                            <React.Fragment>
                                                <div className="link-menu">
                                                    {
                                                        menu.getAltMenuData(maindata.id).map((altdata) => (
                                                            <React.Fragment key={altdata.id}>
                                                                <Link href={`/${activeLocale}/${altdata.path}`}>
                                                                    <PageLinkTranslate
                                                                        activeLocale={activeLocale}
                                                                        menuData={menuData}
                                                                        menuTranslateData={menuTranslateData}
                                                                        menuID={altdata.id}
                                                                    />
                                                                </Link>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </div>
                                            </React.Fragment>
                                        ) : null
                                    }
                                </div>
                            </React.Fragment>
                        ))
                    ) : null
                }
            </div>
        </React.Fragment>
    )
}

export default React.memo(PageLinks);
