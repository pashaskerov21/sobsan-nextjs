'use client'
import React, { Fragment } from 'react'
import { useLocalStorage } from 'usehooks-ts';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { ProductPaginationWrapper } from './style';
import { LoadingType } from '@/src/types';
import Skeleton from '../skeleton/Skeleton';
import { usePathname } from 'next/navigation';

type PaginationProps = {
  loading: LoadingType, 
  totalProducts: number, 
  scrollContainerTop: () => void
}

const ProductPagination: React.FC<PaginationProps> = ({ loading, totalProducts, scrollContainerTop }) => {
  const pathName = usePathname();
  const [paginationState, setPaginationState] = useLocalStorage("pagination", {
    currentPage: 1,
    productCount: 12,
  });
  const handlePageChange = (pageNumber: number) => {
    setPaginationState((prev) => {
      return {
        ...prev,
        currentPage: pageNumber,
      }
    });
    scrollContainerTop();
  };
  const handlePrevChange = () => {
    setPaginationState((prev) => {
      return {
        ...prev,
        currentPage: prev.currentPage - 1,
      }
    });
    scrollContainerTop();
  };
  const handleNextChange = () => {
    setPaginationState((prev) => {
      return {
        ...prev,
        currentPage: prev.currentPage + 1,
      }
    });
    scrollContainerTop();
  };

  React.useEffect(() => {
    setPaginationState((prev) => {
      return {
        ...prev,
        currentPage: 1,
      }
    })
  }, [pathName]);

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
          <button type='button' onClick={handleNextChange}><FaChevronRight /></button>
        )
      }
    </ProductPaginationWrapper>
  )
}

export default React.memo(ProductPagination)
