import { Brand, Comparison, Product } from '@/src/class'
import { AccountDataType, BrandDataType, BrandTranslateDataType, ComparisonDataType, LoadingType, LocaleType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { useLocalStorage } from 'usehooks-ts'
import Skeleton from '../skeleton/Skeleton'

type CardProps = {
    loading: LoadingType,
    activeLocale: LocaleType,
    activeComparisonData: ComparisonDataType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[],
    generalDictionary: { [key: string]: string },
}

const ProductComparisonCard: React.FC<CardProps> = ({
    activeLocale,
    activeComparisonData,
    brandData,
    brandTranslateData,
    loading,
    productData,
    productTranslateData,
    generalDictionary,
}) => {
    const product = new Product(productData, productTranslateData);
    const activeProductData: ProductDataType | undefined = product.getProductByID(activeComparisonData.product);

    const [brandTitle, setBrandTitle] = React.useState<string>();


    const [comparisonStorage, setComparisonStorage] = useLocalStorage<ComparisonDataType[] | []>("comparison", []);
    const [accountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const comparison = new Comparison(comparisonStorage, accountData);

    const handleRemoveButton = React.useCallback(() => {
        setComparisonStorage(comparison.remove(activeComparisonData.id));
    }, [setComparisonStorage, comparison, activeComparisonData.id])


    React.useEffect(() => {
        if (activeProductData) {
            const productBrandData: BrandDataType | undefined = product.getBrand(activeProductData, brandData);
            const brand = new Brand(brandTranslateData);
            if (productBrandData) {
                setBrandTitle(brand.getTranslate(productBrandData.id, activeLocale, "title"));
            }
        }

    }, []);
    if (activeProductData) {
        return (
            <div className='comparison__col'>
                <div className="comparison__col__list product">
                    {
                        loading.lazy ? (
                            <Fragment>
                                <Skeleton width='100%' height='200px' margin='0 0 2px 0' />
                                <Skeleton width='100%' height='70px' margin='0 0 2px 0' />
                                <Skeleton width='100%' height='70px' margin='0 0 2px 0' />
                                <Skeleton width='100%' height='70px' margin='0 0 2px 0' />
                                <Skeleton width='100%' height='70px' margin='0 0 2px 0' />
                                <Skeleton width='100%' height='70px' margin='0 0 2px 0' />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <div className="list__item">
                                    <div className="remove__button" onClick={handleRemoveButton}>
                                        <FaXmark />
                                    </div>
                                    <Link href={product.getTranslate(activeProductData.id, activeLocale, "url")} className='product__image'>
                                        <Image src={activeProductData.image} width={200} height={200} alt='product' />
                                    </Link>
                                </div>
                                <div className="list__item">
                                    <div className="product__brand">{brandTitle}</div>
                                </div>
                                <div className="list__item">
                                    <Link href={product.getTranslate(activeProductData.id, activeLocale, "url")} className='product__title'>
                                        {product.getTranslate(activeProductData.id, activeLocale, "title")}
                                    </Link>
                                </div>
                                <div className="list__item">
                                    <div className="product__code">{activeProductData.code}</div>
                                </div>
                                <div className="list__item">
                                    <div className="product__price">
                                        {activeProductData.discount === 0 ? activeProductData.discount.toFixed(2) : activeProductData.price.toFixed(2)} AZN
                                    </div>
                                </div>
                                <div className="list__item">
                                    <Link href={product.getTranslate(activeProductData.id, activeLocale, "url")} className='basket__button'>
                                        {generalDictionary["add_basket"]}
                                    </Link>
                                </div>
                            </Fragment>
                        )
                    }
                </div>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default React.memo(ProductComparisonCard)
