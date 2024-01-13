'use client'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { ProductPaginationWrapper } from './style';
import { LoadingType } from '@/src/types';
import Skeleton from '../skeleton/Skeleton';
import { usePathname } from 'next/navigation';

const ProductPagination: React.FC<{ loading: LoadingType, totalProducts: number }> = ({ loading, totalProducts }) => {
  const [paginationState, setPaginationState] = useLocalStorage("pagination", {
    currentPage: 1,
    productCount: 12,
  });
  const pathName = usePathname();
  const handlePageChange = (pageNumber: number) => {
    setPaginationState((prev) => {
      return {
        ...prev,
        currentPage: pageNumber,
      }
    });
    window.scrollTo(0, 0);
  };
  const handlePrevChange = () => {
    setPaginationState((prev) => {
      return {
        ...prev,
        currentPage: prev.currentPage - 1,
      }
    });
    window.scrollTo(0, 0);
  };
  const handleNextChange = () => {
    setPaginationState((prev) => {
      return {
        ...prev,
        currentPage: prev.currentPage + 1,
      }
    });
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    setPaginationState((prev) => {
      return {
        ...prev,
        currentPage: 1,
      }
    })
  }, [pathName])

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalProducts / paginationState.productCount); i++) {
    pageNumbers.push(i);
  }

  return (
    <ProductPaginationWrapper>
      {
        loading.standart ? (
          <Skeleton width='30px' height='30px' radius='5px' />
        ) : (
          <button type='button' onClick={handlePrevChange}><FaChevronLeft /></button>
        )
      }
      <div className="numbers">
        {pageNumbers.map((number) => (
          <React.Fragment key={number}>
            {
              loading.standart ? (
                <Skeleton width='30px' height='30px' radius='5px' />
              ) : (
                <button type='button' className={paginationState.currentPage === number ? 'active' : ''} onClick={() => handlePageChange(number)}>{number}</button>
              )
            }
          </React.Fragment>
        ))}
      </div>
      {
        loading.standart ? (
          <Skeleton width='30px' height='30px' radius='5px' />
        ) : (
          <button type='button' onClick={handleNextChange}><FaChevronRight /></button>
        )
      }
    </ProductPaginationWrapper>
  )
}

export default ProductPagination
