import React from 'react'
import Image from 'next/image';
import Skeleton from '../skeleton/Skeleton';
import Link from 'next/link';
import { BrandDataType, BrandTranslateDataType, ComparisonDataType, LoadingType, LocaleType, ProductDataType, ProductTranslateDataType, WishlistDataType } from '@/src/types'
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
}) => {
    const product = new Product(productData, productTranslateData);
    const productURL = product.getURL(activeProductData.id, activeLocale);
    const router = useRouter();
    const [basketStorage, setBasketStorage] = useLocalStorage<WishlistDataType[] | []>("basket", []);
    const [wishlistStorage, setWishlistStorage] = useLocalStorage<WishlistDataType[] | []>("wishlist", []);
    const [comparisonStorage, setComparisonStorage] = useLocalStorage<ComparisonDataType[] | []>("comparison", []);
    const wishlistData: WishlistDataType = {
        id: uuidv4(),
        user: null,
        product: activeProductData.id,
    };
    const comparisonData: ComparisonDataType = {
        id: uuidv4(),
        user: null,
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
        if (isBasket) {
            const filteredData = basketStorage.filter((data) => data.product !== activeProductData.id);
            setBasketStorage([...filteredData]);
        } else {
            setProductState((prev) => {
                return {
                    ...prev,
                    basket: true,
                }
            })
            setTimeout(() => {
                router.push(productURL);
            }, 1500);
        }
    }, [setProductState, router]);
    const handleFavoritetButton = React.useCallback(() => {
        if (isWishlist) {
            const filteredData = wishlistStorage.filter((data) => data.product !== activeProductData.id);
            setWishlistStorage([...filteredData]);
        } else {
            setWishlistStorage([...wishlistStorage, wishlistData]);
        };
    }, [wishlistStorage, setWishlistStorage, isWishlist]);
    const handleComparisonButton = React.useCallback(() => {
        if (isComparison) {
            const filteredData = comparisonStorage.filter((data) => data.product !== activeProductData.id);
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
        <React.Fragment>
            <ProductCardWrapper>
                <div className="card__top">
                    <div className="product__badges">
                        {activeProductData.new ? loading.lazy ? (
                            <Skeleton width='45px' height='23px' radius='5px' />
                        ) : (
                            <div className="product__badge">{generalDictionary["new"]}</div>
                        ) : null}
                        {activeProductData.offer ? loading.lazy ? (
                            <Skeleton width='115px' height='23px' radius='5px' />
                        ) : (
                            <div className="product__badge secondary">{generalDictionary["offered"]}</div>
                        ) : null}
                    </div>
                    {
                        loading.lazy ? (
                            <React.Fragment>
                                <Skeleton width='100%' max_width='350px' height='200px' />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Link href={product.getTranslate(activeProductData.id, activeLocale, "url")}>
                                    <Image src={activeProductData.image} width={550} height={440} alt='product' />
                                </Link>
                            </React.Fragment>
                        )
                    }
                </div>
                <div className="card__center">
                    {
                        loading.lazy ? (
                            <React.Fragment>
                                <Skeleton width='60px' height='24px' margin='0 0 5px 0' />
                                <Skeleton width='210px' height='30px' margin='0 0 25px 0' />
                                <Skeleton width='270px' height='40px' margin='0 0 45px 0' />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className="product__brand">{brandTitle}</div>
                                <Link href={product.getTranslate(activeProductData.id, activeLocale, "url")} className='product__title'>
                                    {product.getTranslate(activeProductData.id, activeLocale, "title")}
                                </Link>
                                <div className="product__description">
                                    {product.getTranslate(activeProductData.id, activeLocale, "description")}
                                </div>
                            </React.Fragment>
                        )
                    }

                </div>
                <div className="card__bottom">
                    {
                        loading.lazy ? (
                            <React.Fragment>
                                <Skeleton width='170px' height='25px' margin='0 0 10px 0' />
                                <Skeleton width='240px' height='25px' margin='0 0 10px 0' />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className="product__price">
                                    {
                                        activeProductData.discount === 0 ? (
                                            <React.Fragment>
                                                <div className="main_price">
                                                    {activeProductData.price.toFixed(2)} AZN
                                                </div>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <div className="old_price">
                                                    {activeProductData.price.toFixed(2)} AZN
                                                </div>
                                                <div className="main_price">
                                                    {activeProductData.discount.toFixed(2)} AZN
                                                </div>
                                            </React.Fragment>
                                        )
                                    }
                                </div>
                                <div className="product__stock">
                                    <div className="icon"><FaCheck /></div>
                                    <div className="value">{generalDictionary["stock"]}: {activeProductData.stock} {generalDictionary["pieces"]}</div>
                                </div>
                            </React.Fragment>
                        )
                    }
                    <div className="card__buttons">
                        {
                            loading.lazy ? (
                                <React.Fragment>
                                    <Skeleton height='50px' radius='5px' />
                                    <Skeleton height='50px' radius='5px' />
                                    <Skeleton height='50px' radius='5px' />
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <div className={`card__button basket__button ${productState.basket ? 'active' : ''}`} onClick={handleBasketButton}>
                                        {
                                            productState.basket ? (
                                                <React.Fragment>
                                                    <div className="active-icon">
                                                        <PiShoppingCartSimpleLight />
                                                    </div>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    <div className="label">{generalDictionary["add_basket"]}</div>
                                                    <div className="icon"><PiShoppingCartSimpleLight /></div>
                                                </React.Fragment>
                                            )
                                        }
                                    </div>
                                    <div className={`card__button comparison__button ${productState.comparison ? 'active' : ''}`} onClick={handleComparisonButton}>
                                        <div className="icon"><PiScalesLight /></div>
                                        <div className="label">{generalDictionary["comparison"]}</div>
                                    </div>
                                    <div className={`card__button favorite__button ${productState.wishlist ? 'active' : ''}`} onClick={handleFavoritetButton}>
                                        <div className="icon">{productState.wishlist ? <FaHeart /> : <FaRegHeart />}</div>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
            </ProductCardWrapper>
        </React.Fragment >
    )
}

export default React.memo(ProductCard)
