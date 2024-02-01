'use client'
import React, { Fragment } from 'react'
import Image from 'next/image';
import Skeleton from '../skeleton/Skeleton';
import Link from 'next/link';
import { AccountDataType, BasketDataType, BrandDataType, BrandTranslateDataType, ComparisonDataType, LoadingType, LocaleType, ProductDataType, ProductTranslateDataType, WishlistDataType } from '@/src/types'
import { ProductCardWrapper } from './style';
import { FaCheck } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { Brand, Product } from '@/src/class';
import { useLocalStorage } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PiScalesLight, PiShoppingCartSimpleLight } from "react-icons/pi";

type CardProps = {
    loading: LoadingType,
    activeLocale: LocaleType,
    activeProductData: ProductDataType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[]
    generalDictionary: { [key: string]: string },
    productsView?: "list" | "grid",
}

const ProductCard: React.FC<CardProps> = ({
    activeLocale,
    activeProductData,
    brandData,
    brandTranslateData,
    generalDictionary,
    loading,
    productData,
    productTranslateData,
    productsView,
}) => {

    const product = new Product(productData, productTranslateData);
    const productURL = product.getURL(activeProductData.id, activeLocale);
    const router = useRouter();
    const [accountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const [basketStorage] = useLocalStorage<BasketDataType[] | []>("basket", []);
    const [wishlistStorage, setWishlistStorage] = useLocalStorage<WishlistDataType[] | []>("wishlist", []);
    const [comparisonStorage, setComparisonStorage] = useLocalStorage<ComparisonDataType[] | []>("comparison", []);
    const wishlistData: WishlistDataType = {
        id: uuidv4(),
        user: accountData.activeUser ? accountData.activeUser : null,
        product: activeProductData.id,
    };
    const comparisonData: ComparisonDataType = {
        id: uuidv4(),
        user: accountData.activeUser ? accountData.activeUser : null,
        product: activeProductData.id,
    };
    const isBasket = basketStorage.find((data) => data.product === activeProductData.id);
    const isWishlist = wishlistStorage.find((data) => data.product === activeProductData.id);
    const isComparison = comparisonStorage.find((data) => data.product === activeProductData.id);
    const [productState, setProductState] = React.useState<{
        basket: boolean,
        wishlist: boolean,
        comparison: boolean,
    }>({
        basket: false,
        wishlist: false,
        comparison: false,
    });

    React.useEffect(() => {
        setProductState({
            basket: isBasket ? true : false,
            comparison: isComparison ? true : false,
            wishlist: isWishlist ? true : false,
        })
    }, [isBasket, isComparison, isWishlist]);

    const handleBasketButton = React.useCallback(() => {
        setProductState((prev) => {
            return {
                ...prev,
                basket: true,
            }
        });
        setTimeout(() => {
            router.push(productURL);
        }, 1500);
    }, [router]);
    const handleFavoritetButton = React.useCallback(() => {
        if (isWishlist) {
            const filteredData = wishlistStorage.filter((data) => data.id !== isWishlist.id);
            setWishlistStorage([...filteredData]);
        } else {
            setWishlistStorage([...wishlistStorage, wishlistData]);
        };
    }, [wishlistStorage, setWishlistStorage, isWishlist]);
    const handleComparisonButton = React.useCallback(() => {
        if (isComparison) {
            const filteredData = comparisonStorage.filter((data) => data.id !== isComparison.id);
            setComparisonStorage([...filteredData]);
        } else {
            setComparisonStorage([...comparisonStorage, comparisonData])
        };
    }, [comparisonStorage, setComparisonStorage, isComparison]);

    const productBrandData: BrandDataType | undefined = product.getBrand(activeProductData, brandData);
    const brand = new Brand(brandTranslateData);
    const [brandTitle, setBrandTitle] = React.useState<string>();
    React.useEffect(() => {
        if (productBrandData) {
            setBrandTitle(brand.getTranslate(productBrandData.id, activeLocale, "title"));
        }
    }, [productBrandData]);

    return (
        <ProductCardWrapper $productsView={productsView} data-id={activeProductData.id}>
            <div className="card__top">
                <div className="product__badges">
                    {activeProductData.new ? loading.standart ? (
                        <Skeleton width='45px' height='23px' radius='5px' />
                    ) : (
                        <div className="product__badge">{generalDictionary["new"]}</div>
                    ) : null}
                    {activeProductData.offer ? loading.standart ? (
                        <Skeleton width='115px' height='23px' radius='5px' />
                    ) : (
                        <div className="product__badge secondary">{generalDictionary["offered"]}</div>
                    ) : null}
                </div>
                {
                    loading.lazy ? (
                        <Fragment>
                            <Skeleton width='100%' max_width='350px' height='200px' />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Link href={product.getTranslate(activeProductData.id, activeLocale, "url")} className='product__image'>
                                <Image src={activeProductData.image} width={550} height={440} alt='product' />
                            </Link>
                        </Fragment>
                    )
                }
            </div>
            <div className="card__center">
                {
                    loading.standart ? (
                        <Fragment>
                            <Skeleton width='60px' height='24px' margin='0 0 5px 0' />
                            <Skeleton width='210px' height='30px' margin='0 0 25px 0' />
                            <Skeleton width='270px' height='40px' margin='0 0 45px 0' />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="product__brand">{brandTitle}</div>
                            <Link href={product.getTranslate(activeProductData.id, activeLocale, "url")} className='product__title'>
                                {product.getTranslate(activeProductData.id, activeLocale, "title")}
                            </Link>
                            <div className="product__description">
                                {product.getTranslate(activeProductData.id, activeLocale, "description").length > 100 ? product.getTranslate(activeProductData.id, activeLocale, "description").slice(0, 100) + '...' : product.getTranslate(activeProductData.id, activeLocale, "description")}
                            </div>
                        </Fragment>
                    )
                }

            </div>
            <div className="card__bottom">
                {
                    loading.standart ? (
                        <Fragment>
                            <Skeleton width='170px' height='25px' margin='0 0 10px 0' />
                            <Skeleton width='240px' height='25px' margin='0 0 10px 0' />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="product__price">
                                {
                                    activeProductData.discount === 0 ? (
                                        <Fragment>
                                            <div className="main_price">
                                                {activeProductData.price.toFixed(2)} AZN
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <div className="old_price">
                                                {activeProductData.price.toFixed(2)} AZN
                                            </div>
                                            <div className="main_price">
                                                {activeProductData.discount.toFixed(2)} AZN
                                            </div>
                                        </Fragment>
                                    )
                                }
                            </div>
                            <div className="product__stock">
                                <div className="icon"><FaCheck /></div>
                                <div className="value">{generalDictionary["stock"]}: {activeProductData.stock} {generalDictionary["pieces"]}</div>
                            </div>
                        </Fragment>
                    )
                }
                <div className="card__buttons">
                    {
                        loading.standart ? (
                            <Fragment>
                                <Skeleton height='50px' radius='5px' />
                                <Skeleton height='50px' radius='5px' />
                                <Skeleton height='50px' radius='5px' />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <div className={`card__button basket__button ${productState.basket ? 'active' : ''}`} onClick={handleBasketButton}>
                                    <div className="label">{generalDictionary["add_basket"]}</div>
                                    <div className="icon"><PiShoppingCartSimpleLight /></div>
                                    <div className="active-icon">
                                        <PiShoppingCartSimpleLight />
                                    </div>
                                </div>
                                <div className={`card__button comparison__button ${productState.comparison ? 'active' : ''}`} onClick={handleComparisonButton}>
                                    <div className="icon"><PiScalesLight /></div>
                                    <div className="label">{generalDictionary["comparison"]}</div>
                                </div>
                                <div className={`card__button favorite__button ${productState.wishlist ? 'active' : ''}`} onClick={handleFavoritetButton}>
                                    <div className="icon">{productState.wishlist ? <FaHeart /> : <FaRegHeart />}</div>
                                </div>
                            </Fragment>
                        )
                    }
                </div>
            </div>
        </ProductCardWrapper>
    )
}

export default React.memo(ProductCard)
