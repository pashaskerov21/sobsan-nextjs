import Link from 'next/link'
import React from 'react'
import PageLinkTranslate from '../translate/PageLinkTranslate'
import { PageLinksProps } from '@/src/types';
import { BiChevronDown } from "react-icons/bi";


const PageLinks: React.FC<PageLinksProps> = ({ className, menuData, menuTranslateData, activeLocale }) => {
    return (
        <React.Fragment>
            <div className={className}>
                {
                    menuData.filter((filterdata) => filterdata.parent_id === 0).map((maindata) => (
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
                                    menuData.filter((filterdata) => filterdata.parent_id === maindata.id).length > 0 ? (
                                        <React.Fragment>
                                            <div className="link-menu">
                                                {
                                                    menuData.filter((filterdata) => filterdata.parent_id === maindata.id).map((altdata) => (
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
                }
            </div>
        </React.Fragment>
    )
}

export default React.memo(PageLinks);
