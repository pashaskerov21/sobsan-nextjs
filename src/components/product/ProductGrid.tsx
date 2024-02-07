'use client'
import React, { Fragment } from 'react'
import { BrandDataType, BrandTranslateDataType, LoadingType, LocaleType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import ProductCard from './ProductCard'
import { ProductGridWrapper } from './style'

type ProductGridProps = {
  loading: LoadingType,
  activeLocale: LocaleType,
  productData: ProductDataType[],
  productTranslateData: ProductTranslateDataType[],
  generalDictionary: { [key: string]: string },
  brandData: BrandDataType[],
  brandTranslateData: BrandTranslateDataType[],
  productsView?: "list" | "grid",
  className?: string,
}

const ProductGrid: React.FC<ProductGridProps> = ({
  activeLocale,
  loading,
  productData,
  productTranslateData,
  brandData,
  brandTranslateData,
  generalDictionary,
  productsView,
  className
}) => {
  return (
    <ProductGridWrapper $productsView={productsView} className={`${className}`}>
      {
        productData.map((data) => (
          <Fragment key={`product-${data.id}`}>
            <ProductCard
              activeLocale={activeLocale}
              activeProductData={data}
              productData={productData}
              productTranslateData={productTranslateData}
              loading={loading}
              brandData={brandData}
              brandTranslateData={brandTranslateData}
              generalDictionary={generalDictionary}
              productsView={productsView}
            />
          </Fragment>
        ))
      }
    </ProductGridWrapper>
  )
}

export default React.memo(ProductGrid)
