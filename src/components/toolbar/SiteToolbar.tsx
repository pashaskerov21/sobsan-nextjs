'use client'
import React from 'react'
import Link from 'next/link'
import Skeleton from '../skeleton/Skeleton';
import { BottomToolbarWrapper, CenterToolbarWrapper } from './style'
import { FaArrowUp } from "react-icons/fa";
import { PiShoppingCartSimpleLight, PiHeartStraight, PiScalesLight } from "react-icons/pi";
import { LoadingType, SettingDataType } from '@/src/types';

type SiteToolbarProps = {
    loading: LoadingType,
    settingData: SettingDataType,
    titleDictionary: { [key: string]: string },
}

const SiteToolbar: React.FC<SiteToolbarProps> = ({ loading, settingData, titleDictionary }) => {
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
                {
                    loading.standart ? (
                        <React.Fragment>
                            <Skeleton width='100%' height='60px' radius='10px' />
                            <Skeleton width='100%' height='60px' radius='10px' />
                            <Skeleton width='100%' height='60px' radius='10px' />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
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
                                <Link href='/comparisons'>{titleDictionary.comparisons}</Link>
                            </div>
                        </React.Fragment>
                    )
                }
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
