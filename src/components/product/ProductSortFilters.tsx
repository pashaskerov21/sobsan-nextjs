'use client'
import { LoadingType } from '@/src/types';
import React from 'react';
import Skeleton from '../skeleton/Skeleton';

type SortFilterProps = {
  loading: LoadingType,
  generalDictionary: { [key: string]: string },
}

const ProductSortFilters: React.FC<SortFilterProps> = ({ loading, generalDictionary }) => {
  return (
    <div className='product-sort-filters'>
      {
        loading.standart ? (
          <React.Fragment>
            <Skeleton width='120px' height='21px'/>
            <Skeleton width='120px' height='21px'/>
            <Skeleton width='120px' height='21px'/>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="sort-filter-button">{generalDictionary.by_price}</div>
            <div className="sort-filter-button">{generalDictionary.by_name}</div>
            <div className="sort-filter-button">{generalDictionary.by_popularity}</div>
          </React.Fragment>
        )
      }
    </div>
  )
}

export default React.memo(ProductSortFilters)
