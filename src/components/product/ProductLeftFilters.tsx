import React from 'react'
import { CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import Categories from '../category/Categories'
import { LeftFilterWrapper } from './style'
import { FaXmark } from 'react-icons/fa6'
import { Category } from '@/src/class'

type LeftFilterProps = {
  loading: LoadingType,
  activeLocale: LocaleType,
  activeCategoryData?: CategoriesDataType,
  categoryData: CategoriesDataType[],
  categoryTranslateData: CategoriesTranslateDataType[],
  titleDictionary: { [key: string]: string },
  filterShow: boolean,
  closeFilters: () => void,
}

const ProductLeftFilters: React.FC<LeftFilterProps> = ({
  activeLocale,
  categoryData,
  categoryTranslateData,
  loading,
  titleDictionary,
  activeCategoryData,
  filterShow,
  closeFilters,
}) => {
  const category = new Category(categoryData, categoryTranslateData);
  return (
    <LeftFilterWrapper className={filterShow ? 'active' : ''}>
      <div className="lfw-header">
        <div className="lfwh-title">{activeCategoryData ? `${category.getTranslate(activeCategoryData?.id, activeLocale, "title")}` : `Filterlər`}</div>
        <div className="close-button" onClick={closeFilters}><FaXmark /></div>
      </div>
      <div className="lfw-body">
        <Categories
          parentComponent='filters'
          loading={loading}
          activeLocale={activeLocale}
          categoryData={categoryData}
          categoryTranslateData={categoryTranslateData}
          activeCategoryData={activeCategoryData}
        />
      </div>
    </LeftFilterWrapper>
  )
}

export default ProductLeftFilters
