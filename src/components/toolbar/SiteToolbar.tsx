'use client'
import React, { Fragment } from 'react'
import Link from 'next/link'
import Skeleton from '../skeleton/Skeleton';
import { BottomToolbarWrapper, CenterToolbarWrapper } from './style'
import { FaArrowUp } from "react-icons/fa";
import { PiShoppingCartSimpleLight, PiHeartStraight, PiScalesLight } from "react-icons/pi";
import { AccountDataType, BasketDataType, ComparisonDataType, LoadingType, LocaleType, SettingDataType, WishlistDataType } from '@/src/types';
import { useLocalStorage } from 'usehooks-ts';
import { Basket } from '@/src/class';

type SiteToolbarProps = {
    activeLocale: LocaleType,
    loading: LoadingType,
    settingData: SettingDataType,
    titleDictionary: { [key: string]: string },
}

const SiteToolbar: React.FC<SiteToolbarProps> = ({ activeLocale, loading, settingData, titleDictionary }) => {
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

    const [basketStorage] = useLocalStorage<BasketDataType[] | []>("basket", []);
    const [wishlistStorage] = useLocalStorage<WishlistDataType[] | []>("wishlist", []);
    const [comparisonStorage] = useLocalStorage<ComparisonDataType[] | []>("comparison", []);
    const [accountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const basket = new Basket(basketStorage, accountData);
    const basketData: BasketDataType[] = basket.data();
    return (
        <Fragment>
            <CenterToolbarWrapper>
                {
                    loading.standart ? (
                        <Fragment>
                            <Skeleton width='100%' height='60px' radius='10px' />
                            <Skeleton width='100%' height='60px' radius='10px' />
                            <Skeleton width='100%' height='60px' radius='10px' />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="toolbar-card">
                                <div className="icon">
                                    <PiShoppingCartSimpleLight />
                                    <span className='amount'>{basketData ? basketData.length : 0}</span>
                                </div>
                                <Link href={`/${activeLocale}/basket`}>{titleDictionary.basket}</Link>
                            </div>
                            <div className="toolbar-card">
                                <div className="icon">
                                    <PiHeartStraight />
                                    <span className='amount'>{wishlistStorage ? wishlistStorage.length : 0}</span>
                                </div>
                                <Link href={`/${activeLocale}/wishlist`}>{titleDictionary.wishlist}</Link>
                            </div>
                            <div className="toolbar-card">
                                <div className="icon">
                                    <PiScalesLight />
                                    <span className='amount'>{comparisonStorage ? comparisonStorage.length : 0}</span>
                                </div>
                                <Link href={`/${activeLocale}/comparisons`}>{titleDictionary.comparisons}</Link>
                            </div>
                        </Fragment>
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
        </Fragment>
    )
}

export default React.memo(SiteToolbar);
