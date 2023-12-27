'use client'
import React from 'react'
import { PageLinksProps } from '@/src/types';
import { BiChevronDown } from "react-icons/bi";
import { Menu } from '@/src/class';
import { MenuTranslation } from '@/src/utils';
import { Skeleton } from '@/src/components';


const PageLinks: React.FC<PageLinksProps> = ({ loading, className, menuData, menuTranslateData, activeLocale }) => {
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
        <React.Fragment>
            <div className={className}>
                {
                    mainMenuData.length > 0 ? (
                        mainMenuData.map((maindata) => (
                            <React.Fragment key={maindata.id}>
                                <div className="link-item">
                                    <div className="main-row">
                                        {
                                            loading ? (
                                                <React.Fragment>
                                                    <Skeleton width='80px' height='20px'/>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    <MenuTranslation
                                                        activeLocale={activeLocale}
                                                        activeMenuData={maindata}
                                                        menuData={menuData}
                                                        menuTranslateData={menuTranslateData}
                                                        translationType='link'
                                                        path={`${maindata.path}`}
                                                    />
                                                    {
                                                        menuData.filter((filterdata) => filterdata.parent_id === maindata.id).length > 0 ? (
                                                            <div className={`arrow-btn ${activeLinkID === maindata.id ? 'active' : ''}`} onClick={() => toggleLinkMenu(maindata.id)}>
                                                                <BiChevronDown />
                                                            </div>
                                                        ) : null
                                                    }
                                                </React.Fragment>
                                            )
                                        }
                                    </div>
                                    {
                                        menu.getAltMenuData(maindata.id).length > 0 ? (
                                            <React.Fragment>
                                                <div className={`link-menu ${activeLinkID === maindata.id ? 'active' : ''}`}>
                                                    {
                                                        menu.getAltMenuData(maindata.id).map((altdata) => (
                                                            <React.Fragment key={altdata.id}>
                                                                <MenuTranslation
                                                                    activeLocale={activeLocale}
                                                                    activeMenuData={altdata}
                                                                    menuData={menuData}
                                                                    menuTranslateData={menuTranslateData}
                                                                    translationType='link'
                                                                    path={`${maindata.path}/${altdata.path}`}
                                                                />
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
