'use client'
import React, { Fragment } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { ProductPaginationWrapper } from './style';
import { LoadingType } from '@/src/types';
import Skeleton from '../skeleton/Skeleton';

type PaginationProps = {
  loading: LoadingType,
  paginationState: {
    currentPage: number,
    productCount: number,
    pageNumbers: number[],
  },
  handlePageChange: (number: number) => void,
  handlePrevPage: () => void,
  handleNextPage: () => void,
}

const ProductPagination: React.FC<PaginationProps> = ({
  loading,
  handleNextPage,
  handlePageChange,
  handlePrevPage,
  paginationState,
}) => {
  const isFirstPage = paginationState.currentPage === 1;
  const isLastPage = paginationState.currentPage === paginationState.pageNumbers[paginationState.pageNumbers.length - 1];

  return (
    <ProductPaginationWrapper>
      {
        loading.standart ? (
          <Skeleton width='30px' height='30px' radius='5px' />
        ) : (
          <button type='button' disabled={isFirstPage} onClick={handlePrevPage}><FaChevronLeft /></button>
        )
      }
      <div className="numbers">
        {paginationState.pageNumbers.map((number) => (
          <Fragment key={number}>
            {
              loading.standart ? (
                <Skeleton width='30px' height='30px' radius='5px' />
              ) : (
                <button type='button' className={paginationState.currentPage === number ? 'active' : ''} onClick={() => handlePageChange(number)}>{number}</button>
              )
            }
          </Fragment>
        ))}
      </div>
      {
        loading.standart ? (
          <Skeleton width='30px' height='30px' radius='5px' />
        ) : (
          <button type='button' disabled={isLastPage} onClick={handleNextPage}><FaChevronRight /></button>
        )
      }
    </ProductPaginationWrapper>
  )
}

export default React.memo(ProductPagination)
