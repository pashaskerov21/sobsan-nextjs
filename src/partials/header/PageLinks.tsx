import React from 'react'
import { PageLinksProps } from '@/src/types';
import { BiChevronDown } from "react-icons/bi";
import { Menu } from '@/src/class';
import { MenuTranslation } from '@/src/utils/translate';


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
        <React.Fragment>
            <div className={className}>
                {
                    mainMenuData.length > 0 ? (
                        mainMenuData.map((maindata) => (
                            <React.Fragment key={maindata.id}>
                                <div className="link-item">
                                    <div className="main-row">
                                        <MenuTranslation
                                            activeLocale={activeLocale}
                                            activeMenuData={maindata}
                                            menuData={menuData}
                                            menuTranslateData={menuTranslateData}
                                            translationType='link'
                                        />
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
