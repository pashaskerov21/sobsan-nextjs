import React, { ChangeEvent, Fragment } from 'react'
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import Categories from '../category/Categories'
import { LeftFilterWrapper } from './style'
import { FaXmark } from 'react-icons/fa6'
import { Attribute, AttributeGroup, Brand, Category, Product } from '@/src/class'
import Skeleton from '../skeleton/Skeleton'
import { ProductFilterDataType } from '@/src/types/data'

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
  productFilterData: ProductFilterDataType,
  maxPrice: number,
  handleChangePrice: (key: "min" | "max", value: number) => void,
  handleSubmitFilterForm: (e: React.FormEvent<HTMLFormElement>) => void,
  titleDictionary: { [key: string]: string },
  generalDictionary: { [key: string]: string },
  handleSelectBrand: (id: number) => void,
  handleSelectAttribute: (id: number) => void,
  resetLeftFilterForm: () => void,
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
  generalDictionary,
  handleChangePrice,
  handleSubmitFilterForm,
  loading,
  maxPrice,
  productFilterData,
  titleDictionary,
  activeCategoryData,
  handleSelectBrand,
  handleSelectAttribute,
  resetLeftFilterForm,
}) => {
  const category = new Category(categoryData, categoryTranslateData);
  const brand = new Brand(brandTranslateData);
  const attributeGroup = new AttributeGroup(attributeGroupData, attributeGroupTranslateData);
  const attribute = new Attribute(attributeData, attributeTranslateData);


  return (
    <Fragment>
      {filterShow && <div className="black-backdrop" onClick={closeFilters}></div>}
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
          <form className='product-filter-form' onSubmit={(e) => handleSubmitFilterForm(e)}>
            {/* price filter */}
            {
              maxPrice > 1 && (
                <div className="filter-item">
                  {
                    loading.standart ? (
                      <Skeleton width='120px' height='20px' margin='10px 0' />
                    ) : (
                      <div className="filter-title">{generalDictionary.price}</div>
                    )
                  }
                  {
                    loading.standart ? (
                      <Skeleton width='100%' height='70px' />
                    ) : (
                      <div className='range-filter'>
                        <div className='range-inputs'>
                          <input type="range" value={productFilterData.price.min} min={0} max={maxPrice} step={1} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePrice("min", parseInt(e.target.value))} />
                          <input type="range" value={productFilterData.price.max} min={0} max={maxPrice} step={1} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePrice("max", parseInt(e.target.value))} />
                        </div>
                        <div className='result-inputs'>
                          <div className="item">
                            <input type="number" value={productFilterData.price.min} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePrice("min", parseInt(e.target.value))} />
                            <span>AZN</span>
                          </div>
                          <div className="item">
                            <input type="number" value={productFilterData.price.max} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePrice("max", parseInt(e.target.value))} />
                            <span>AZN</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              )
            }
            {/* brand filter */}
            <div className="filter-item">
              {
                loading.standart ? (
                  <Skeleton width='120px' height='20px' margin='10px 0' />
                ) : (
                  <div className="filter-title">{generalDictionary.brand}</div>
                )
              }
              <div className="filter-checkbox-buttons">
                {
                  brandData.map((data) => (
                    <Fragment key={data.id}>
                      {
                        loading.standart ? (
                          <Skeleton width='125px' height='44px' radius='10px' />
                        ) : (
                          <div className="filter-checkbox-button" key={data.id}>
                            <input type="checkbox" id={`brand-check-${data.id}`} value={data.id} hidden checked={productFilterData.brand === data.id ? true : false} onChange={(e: ChangeEvent<HTMLInputElement>) => handleSelectBrand(parseInt(e.target.value))} />
                            <label htmlFor={`brand-check-${data.id}`}>{brand.getTranslate(data.id, activeLocale, "title")}</label>
                          </div>
                        )
                      }
                    </Fragment>
                  ))
                }
              </div>
            </div>
            {/* attribute filter */}
            {
              attributeGroupData.map((data) => (
                <div className="filter-item" key={`group-${data.id}`}>
                  {
                    loading.standart ? (
                      <Skeleton width='120px' height='20px' margin='10px 0' />
                    ) : (
                      <div className="filter-title">{attributeGroup.getTranslate(data.id, activeLocale, "title")}</div>
                    )
                  }
                  <div className="filter-checkbox-buttons">
                    {
                      attributeGroup.getAttributes(data.id, attributeData).length > 0 && attributeGroup.getAttributes(data.id, attributeData).map((attr) => (
                        <Fragment key={`attr-${attr.id}`}>
                          {
                            loading.standart ? (
                              <Skeleton width='125px' height='44px' radius='10px' />
                            ) : (
                              <div className="filter-checkbox-button" key={attr.id}>
                                <input type="checkbox" id={`${attributeGroup.getTranslate(data.id, activeLocale, "title")}-check-${attr.id}`} hidden checked={productFilterData.attributeIDs && productFilterData.attributeIDs.length > 0 && productFilterData.attributeIDs.includes(attr.id) ? true : false} onChange={() => handleSelectAttribute(attr.id)} />
                                <label htmlFor={`${attributeGroup.getTranslate(data.id, activeLocale, "title")}-check-${attr.id}`}>{attribute.getTranslate(attr.id, activeLocale, "title")}</label>
                              </div>
                            )
                          }
                        </Fragment>
                      ))
                    }
                  </div>
                </div>
              ))
            }
            <div className="form-buttons">
              {
                loading.standart ? (
                  <Fragment>
                    <Skeleton width='100%' height='56px' />
                    <Skeleton width='100%' height='56px' />
                  </Fragment>
                ) : (
                  <Fragment>
                    <button type='submit' className='submit'>{generalDictionary.confirm}</button>
                    <button type='button' className='reset' onClick={resetLeftFilterForm}>{generalDictionary.reset}</button>
                  </Fragment>
                )
              }
            </div>
          </form>
        </div>
      </LeftFilterWrapper>
    </Fragment>
  )
}

export default React.memo(ProductLeftFilters)
