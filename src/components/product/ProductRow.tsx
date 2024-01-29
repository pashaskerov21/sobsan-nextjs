'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Brand, Color, Product } from "@/src/class";
import { BasketDataType, BrandDataType, BrandTranslateDataType, ColorDataType, ColorTranslateDataType, LocaleType, ProductDataType, ProductTranslateDataType } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { useLocalStorage } from 'usehooks-ts';
import { FaCheck, FaMinus, FaPlus } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

type RowProps = {
    activeLocale: LocaleType,
    basketData: BasketDataType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    brandTranslateData: BrandTranslateDataType[],
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
    generalDictionary: { [key: string]: string },
}
const ProductRow: React.FC<RowProps> = ({
    activeLocale,
    basketData,
    productData,
    productTranslateData,
    brandTranslateData,
    colorData,
    colorTranslateData,
    generalDictionary,
}) => {
    const product = new Product(productData, productTranslateData);
    const brand = new Brand(brandTranslateData);
    const color = new Color(colorData, colorTranslateData);
    const activeProductData: ProductDataType | undefined = product.getProductByID(basketData.product);
    const [basketStorage, setBasketStorage] = useLocalStorage<BasketDataType[]>("basket", []);


    const [productAmount, setProductAmount] = useState<number>(basketData.parameters.amount);
    const [productTotal, setProductTotal] = useState<number>(0);
    const handleMinusButtonClick = useCallback(() => {
        if (productAmount > 1) {
            setProductAmount(productAmount - 1);
        }
    }, [productAmount]);

    const handlePlusButtonClick = useCallback(() => {
        if (activeProductData && productAmount < activeProductData.stock) {
            setProductAmount(productAmount + 1);
        }
    }, [productAmount, activeProductData?.stock]);

    const changeProductAmount = useCallback((value: number) => {
        if (activeProductData && isNaN(value)) {
            setProductAmount(activeProductData.stock > 1 ? 1 : 0);
        } else if (activeProductData && value > activeProductData.stock) {
            setProductAmount(activeProductData.stock);
        } else {
            setProductAmount(value);
        }
    }, [activeProductData?.stock]);

    const handleDeleteProduct = useCallback(() => {
        console.log(basketData.id);
        const updateData: BasketDataType[] = basketStorage.filter((data) => data.id !== basketData.id)
        setBasketStorage([...updateData]);
    }, [setBasketStorage, basketStorage])

    useEffect(() => {
        console.log('test')
        setBasketStorage((prev) => {
            return prev.map((data) =>
                data.id === basketData.id ? {
                    ...data,
                    parameters: {
                        ...data.parameters,
                        amount: productAmount,
                    }
                } : data)
        });
    }, [productAmount])

    useEffect(() => {
        if (activeProductData) {
            const price = activeProductData.discount === 0 ? activeProductData.price : activeProductData.discount
            setProductTotal(productAmount * price);
        }
    }, [productAmount, activeProductData])
    return (
        <React.Fragment>
            {
                activeProductData && (
                    <tr>
                        <td>
                            <div className="product__col">
                                <Link href={product.getURL(activeProductData.id, activeLocale)} className='product__image'>
                                    <Image src={activeProductData.image} width={90} height={90} alt="" />
                                </Link>
                            </div>
                        </td>
                        <td>
                            <div className="product__col">
                                <div className="product__brand">
                                    {brand.getTranslate(activeProductData.brand_id, activeLocale, "title")}
                                </div>
                                <Link href={product.getURL(activeProductData.id, activeLocale)} className='product__title'>
                                    {product.getTranslate(activeProductData.id, activeLocale, "title")}
                                </Link>
                            </div>
                        </td>
                        <td>
                            <div className="product__col">
                                <div className="product__color">
                                    {basketData.parameters.color ? (
                                        <React.Fragment>
                                            {basketData.parameters.color.catalogName} {color.getTranslate(basketData.parameters.color.id, activeLocale, "title")} {basketData.parameters.color.code}
                                        </React.Fragment>
                                    ) : '-'}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="product__col">
                                <div className="product__weight">
                                    {basketData.parameters.weight.title}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="product__col">
                                <div className="product__price">
                                    {activeProductData.discount === 0 ? activeProductData.price.toFixed(2) : activeProductData.discount.toFixed(2)} AZN
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="product__col">
                                <div className="product__stock">
                                    <div className="icon"><FaCheck /></div>
                                    <div className="value">{generalDictionary["stock"]}: {activeProductData.stock} {generalDictionary["pieces"]}</div>
                                </div>
                                <div className="product__amount__counter">
                                    <div className="counter__button" onClick={handleMinusButtonClick}><FaMinus /></div>
                                    <input type="number" name="" id="" max={activeProductData.stock} value={productAmount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeProductAmount(parseInt(e.target.value))} />
                                    <div className="counter__button" onClick={handlePlusButtonClick}><FaPlus /></div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="product__col">
                                <div className="product__price">
                                    {productTotal.toFixed(2)} AZN
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="product__col">
                                <div className="product__delete__button" onClick={handleDeleteProduct}>
                                    <FaXmark />
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            }
        </React.Fragment>
    )
}

export default React.memo(ProductRow);