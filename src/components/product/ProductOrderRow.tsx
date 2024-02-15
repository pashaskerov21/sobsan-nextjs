import { Product } from '@/src/class';
import { BasketDataType, LocaleType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type ProductOrderRowProps = {
    activeLocale: LocaleType,
    basketData: BasketDataType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
}

const ProductOrderRow: React.FC<ProductOrderRowProps> = ({
    activeLocale,
    basketData,
    productData,
    productTranslateData,
}) => {
    const product = new Product(productData, productTranslateData);
    const activeProductData: ProductDataType | undefined = product.getProductByID(basketData.product);
    if (activeProductData) {
        return (
            <tr>
                <td>
                    <div className="product__col">
                        <Link href={product.getURL(activeProductData.id, activeLocale)} className='product__image'>
                            <Image src={activeProductData.image} width={70} height={70} alt="" />
                        </Link>
                    </div>
                </td>
                <td>
                    <div className="product__col">
                        <Link href={product.getURL(activeProductData.id, activeLocale)} className='product__title'>
                            {product.getTranslate(activeProductData.id, activeLocale, "title")}
                        </Link>
                    </div>
                </td>
                <td>
                    <div className="product__col">
                        <div className="product__price">
                            {basketData.parameters.price.toFixed(2)} AZN
                        </div>
                    </div>
                </td>
                <td>
                    <div className="product__col">
                        <div className="product__count">
                            {basketData.parameters.amount}
                        </div>
                    </div>
                </td>
                <td>
                    <div className="product__col">
                        <div className="product__price">
                            {basketData.parameters.total?.toFixed(2)} AZN
                        </div>
                    </div>
                </td>
            </tr>
        )
    } else {
        return (
            <tr></tr>
        )
    }
}

export default React.memo(ProductOrderRow)
