'use client'
import React from 'react'
import Link from 'next/link'
import { BottomToolbarWrapper, CenterToolbarWrapper } from './style'
import { FaArrowUp } from "react-icons/fa";
import { PiShoppingCartSimpleLight, PiHeartStraight, PiScalesLight } from "react-icons/pi";
import { SiteToolbarProps } from '@/src/types';

const SiteToolbar: React.FC<SiteToolbarProps> = ({settingData,titleDictionary}) => {
    const [showScrollBtn, setShowScrollBtn] = React.useState<boolean>(false);
    React.useEffect(() => {
        window.addEventListener('scroll', function () {
            if (this.scrollY > 500) {
                setShowScrollBtn(true);
            } else {
                setShowScrollBtn(false)
            }
        });

        return () => {
            window.removeEventListener('scroll', () => { });
        }
    }, []);
    return (
        <React.Fragment>
            <CenterToolbarWrapper>
                <div className="toolbar-card">
                    <div className="icon">
                        <PiShoppingCartSimpleLight />
                        <span className='amount'>0</span>
                    </div>
                    <Link href='/basket'>{titleDictionary.basket}</Link>
                </div>
                <div className="toolbar-card">
                    <div className="icon">
                        <PiHeartStraight />
                        <span className='amount'>0</span>
                    </div>
                    <Link href='/wishlist'>{titleDictionary.wishlist}</Link>
                </div>
                <div className="toolbar-card">
                    <div className="icon">
                        <PiScalesLight />
                        <span className='amount'>0</span>
                    </div>
                    <Link href='/compare'>{titleDictionary.comparisons}</Link>
                </div>
            </CenterToolbarWrapper>
            <BottomToolbarWrapper>
                {
                    showScrollBtn ? (
                        <div className="scroll-button" onClick={() => window.scrollTo(0, 0)}>
                            <FaArrowUp />
                        </div>
                    ) : null
                }
                <Link href='' className="hot-line "><span>{settingData.hotline}</span></Link>
            </BottomToolbarWrapper>
        </React.Fragment>
    )
}

export default React.memo(SiteToolbar);
