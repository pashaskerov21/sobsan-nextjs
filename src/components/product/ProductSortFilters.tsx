'use client'
import React, { Fragment } from 'react';
import { LoadingType } from '@/src/types';
import Skeleton from '../skeleton/Skeleton';
import { IoChevronForward  } from "react-icons/io5";
import { ProductSortFilterWrapper } from './style';

type SortFilterProps = {
  loading: LoadingType,
  generalDictionary: { [key: string]: string },
  handleSortFilters: (type: "cheaptoexp" | "exptocheap" | 'a-z' | 'z-a') => void,
}

const ProductSortFilters: React.FC<SortFilterProps> = ({ loading, generalDictionary,handleSortFilters }) => {
  return (
    <ProductSortFilterWrapper>
      {
        loading.standart ? (
          <Fragment>
            <Skeleton width='120px' height='21px' />
            <Skeleton width='120px' height='21px' />
            <Skeleton width='120px' height='21px' />
          </Fragment>
        ) : (
          <Fragment>
            <div className="sort-filter-dropdown">
              <div className="sfd-title">{generalDictionary.by_price} <IoChevronForward  /></div>
              <div className="sfd-menu">
                <div className="sfd-button" onClick={() => handleSortFilters('cheaptoexp')}>{generalDictionary.cheaptoexp}</div>
                <div className="sfd-button" onClick={() => handleSortFilters('exptocheap')}>{generalDictionary.exptocheap}</div>
              </div>
            </div>
            <div className="sort-filter-dropdown">
              <div className="sfd-title">{generalDictionary.by_name} <IoChevronForward  /></div>
              <div className="sfd-menu">
                <div className="sfd-button" onClick={() => handleSortFilters('a-z')}>{generalDictionary.a_z}</div>
                <div className="sfd-button" onClick={() => handleSortFilters('z-a')}>{generalDictionary.z_a}</div>
              </div>
            </div>
          </Fragment>
        )
      }
    </ProductSortFilterWrapper>
  )
}

export default React.memo(ProductSortFilters)
