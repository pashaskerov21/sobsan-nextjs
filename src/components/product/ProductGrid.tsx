import { BrandDataType, BrandTranslateDataType, LoadingType, LocaleType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
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
}

const ProductGrid: React.FC<ProductGridProps> = ({
  activeLocale,
  loading,
  productData,
  productTranslateData,
  brandData,
  brandTranslateData,
  generalDictionary,
}) => {
  const [productsView, setProductsView] = useLocalStorage<"grid" | "list">("products-view",'grid');
  return (
    <ProductGridWrapper $productsView={productsView}>
      {
        productData.map((data) => (
          <React.Fragment>
            <ProductCard
              activeLocale={activeLocale}
              activeProductData={data}
              productData={productData}
              productTranslateData={productTranslateData}
              loading={loading}
              brandData={brandData}
              brandTranslateData={brandTranslateData}
              generalDictionary={generalDictionary}
              
            />
          </React.Fragment>
        ))
      }
    </ProductGridWrapper>
  )
}

export default React.memo(ProductGrid)
