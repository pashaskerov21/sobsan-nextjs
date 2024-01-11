import React from 'react'
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import Categories from '../category/Categories'
import { LeftFilterWrapper } from './style'
import { FaXmark } from 'react-icons/fa6'
import { Attribute, AttributeGroup, Brand, Category } from '@/src/class'
import Skeleton from '../skeleton/Skeleton'

type LeftFilterProps = {
  loading: LoadingType,
  activeLocale: LocaleType,
  activeCategoryData?: CategoriesDataType,
  categoryData: CategoriesDataType[],
  categoryTranslateData: CategoriesTranslateDataType[],
  brandData: BrandDataType[],
  brandTranslateData: BrandTranslateDataType[],
  attributeGroupData: AttributeGroupDataType[],
  attributeGroupTranslateData: AttributeGroupTranslateDataType[],
  attributeData: AttributeDataType[],
  attributeTranslateData: AttributeTranslateDataType[],
  filterShow: boolean,
  closeFilters: () => void,
  titleDictionary: { [key: string]: string },
  generalDictionary: { [key: string]: string },
}

const ProductLeftFilters: React.FC<LeftFilterProps> = ({
  activeLocale,
  attributeData,
  attributeGroupData,
  attributeGroupTranslateData,
  attributeTranslateData,
  brandData,
  brandTranslateData,
  categoryData,
  categoryTranslateData,
  closeFilters,
  filterShow,
  loading,
  titleDictionary,
  generalDictionary,
  activeCategoryData,
}) => {
  const category = new Category(categoryData, categoryTranslateData);
  const brand = new Brand(brandTranslateData);
  const attributeGroup = new AttributeGroup(attributeGroupData, attributeGroupTranslateData);
  const attribute = new Attribute(attributeData, attributeTranslateData);
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
        <form className='product-filter-form'>
          {/* price filter */}
          <div className="filter-item">
            <div className="filter-title">{generalDictionary.price}</div>
            {
              loading.standart ? (
                <Skeleton width='100%' height='70px' />
              ) : (
                <div className='range-filter'>
                  <div className='range-inputs'>
                    <input type="range" value={0} min={0} max={500} step={1} />
                    <input type="range" value={500} min={0} max={500} step={1} />
                  </div>
                  <div className='result-inputs'>
                    <div className="item">
                      <input type="number" value={0} />
                      <span>AZN</span>
                    </div>
                    <div className="item">
                      <input type="number" value={500} />
                      <span>AZN</span>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          {/* brand filter */}
          <div className="filter-item">
            <div className="filter-title">{generalDictionary.brand}</div>
            <div className="filter-checkbox-buttons">
              {
                brandData.map((data) => (
                  <React.Fragment>
                    {
                      loading.standart ? (
                        <Skeleton width='125px' height='44px' radius='10px' />
                      ) : (
                        <div className="filter-checkbox-button" key={data.id}>
                          <input type="checkbox" id={`brand-check-${data.id}`} hidden />
                          <label htmlFor={`brand-check-${data.id}`}>{brand.getTranslate(data.id, activeLocale, "title")}</label>
                        </div>
                      )
                    }
                  </React.Fragment>
                ))
              }
            </div>
          </div>
          {/* attribute filter */}
          {
            attributeGroupData.map((data) => (
              <div className="filter-item" key={data.id}>
                <div className="filter-title">{attributeGroup.getTranslate(data.id, activeLocale, "title")}</div>
                <div className="filter-checkbox-buttons">
                  {
                    attributeGroup.getAttributes(data.id, attributeData).length > 0 && attributeGroup.getAttributes(data.id, attributeData).map((attr) => (
                      <React.Fragment>
                        {
                          loading.standart ? (
                            <Skeleton width='125px' height='44px' radius='10px' />
                          ) : (
                            <div className="filter-checkbox-button" key={attr.id}>
                              <input type="checkbox" id={`${attributeGroup.getTranslate(data.id, activeLocale, "title")}-check-${attr.id}`} hidden />
                              <label htmlFor={`${attributeGroup.getTranslate(data.id, activeLocale, "title")}-check-${attr.id}`}>{attribute.getTranslate(attr.id, activeLocale, "title")}</label>
                            </div>
                          )
                        }
                      </React.Fragment>
                    ))
                  }
                </div>
              </div>
            ))
          }
          <div className="form-buttons">
            {
              loading.standart ? (
                <React.Fragment>
                  <Skeleton width='100%' height='56px'/>
                  <Skeleton width='100%' height='56px'/>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button type='submit' className='submit'>{generalDictionary.confirm}</button>
                  <button type='reset' className='reset'>{generalDictionary.reset}</button>
                </React.Fragment>
              )
            }
          </div>
        </form>
      </div>
    </LeftFilterWrapper>
  )
}

export default ProductLeftFilters
