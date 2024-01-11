'use client'
import React from 'react';

type SortFilterProps = {
  generalDictionary: { [key: string]: string },
}

const ProductSortFilters:React.FC<SortFilterProps> = ({generalDictionary}) => {
  return (
    <div className='product-sort-filters'>
      <div className="sort-filter-button">{generalDictionary.by_price}</div>
      <div className="sort-filter-button">{generalDictionary.by_name}</div>
      <div className="sort-filter-button">{generalDictionary.by_popularity}</div>
    </div>
  )
}

export default React.memo(ProductSortFilters)
