'use client'
import React from 'react'
import { Category } from '@/src/class';
import { CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoChevronForwardOutline } from 'react-icons/io5';
import Skeleton from '../skeleton/Skeleton';
import { AltCategoryWrapper, CategoryWrapper } from './style';

type CategoriesProps = {
  parentComponent: 'header' | 'filters',
  loading: LoadingType,
  activeLocale: LocaleType,
  activeCategoryData?: CategoriesDataType,
  categoryData: CategoriesDataType[],
  categoryTranslateData: CategoriesTranslateDataType[],
}

const Categories: React.FC<CategoriesProps> = ({
  parentComponent,
  activeLocale,
  categoryData,
  categoryTranslateData,
  loading,
  activeCategoryData,
}) => {
  const category = new Category(categoryData, categoryTranslateData);
  const mainCategoryData: CategoriesDataType[] | [] = category.getMainCategoryData();
  const pathName = usePathname();
  const [activeCategories, setActiveCategories] = React.useState<number[]>([]);
  React.useEffect(() => {
    setActiveCategories([]);
  }, [pathName]);

  const handleCategoryClick = (categoryID: number) => {
    const updatedCategories: number[] = [...activeCategories];
    const index = updatedCategories.findIndex((item) => item === categoryID);
    if (index > -1) {
      updatedCategories.splice(index, 1);
    } else {
      updatedCategories.push(categoryID);
    }
    setActiveCategories(updatedCategories);
  };
  const handleCategoryMouseMove = (categoryIDs: number[]) => {
    if (parentComponent === "filters" && window.innerWidth > 992) {
      setActiveCategories([...categoryIDs]);
    }
  };
  const handleCategoryMouseLeave = () => {
    if (parentComponent === "header" && window.innerWidth > 1200) {
      setActiveCategories([]);
    }
    if (parentComponent === "filters" && window.innerWidth > 992) {
      setActiveCategories([]);
    }
  };

  const handleCategoryItemMouseMove = (categoryID: number) => {
    if (parentComponent === "header" && window.innerWidth > 1200) {
      setActiveCategories([...activeCategories, categoryID]);
    }
  }

  const renderAltCategories = (data: CategoriesDataType[], level: number, parentID: number[]): JSX.Element[] => {
    return data.map((altData) => (
      <React.Fragment key={altData.id}>
        <div className={`category-item`}>
          <div className={`main-row ${(activeCategoryData && activeCategoryData.id === altData.id) ? 'active' : ''}`} onMouseMove={() => handleCategoryMouseMove([...parentID, altData.id])} onMouseLeave={() => handleCategoryMouseLeave()}>
            <Link href={category.getTranslate(altData.id, activeLocale, "url")}>
              {category.getTranslate(altData.id, activeLocale, "title")}
            </Link>
            {category.getAltCategoryData(altData.id).length > 0 && (
              <div className={`arrow-btn ${activeCategories.includes(altData.id) ? 'active' : ''}`} onClick={() => handleCategoryClick(altData.id)}>
                <IoChevronForwardOutline />
              </div>
            )}
          </div>
          {category.getAltCategoryData(altData.id).length > 0 && (
            <AltCategoryWrapper $active={activeCategories.includes(altData.id)} $level={level + 1} $parentComponent={parentComponent} onMouseMove={() => handleCategoryMouseMove([...parentID, altData.id])} onMouseLeave={() => handleCategoryMouseLeave()}>
              {renderAltCategories(category.getAltCategoryData(altData.id), level + 1, [...parentID, altData.id])}
            </AltCategoryWrapper>
          )}
        </div>
      </React.Fragment>
    ));
  };

  const renderCategories = (data: CategoriesDataType[] | []): JSX.Element[] => {
    return data.map((mainData: CategoriesDataType) => (
      <React.Fragment key={mainData.id}>
        {
          loading.standart ? (
            <Skeleton width='100%' height='38px' margin='0 0 2px 0'/>
          ) : (
            <div className={`category-item`} onMouseMove={() => handleCategoryItemMouseMove(mainData.id)} onMouseLeave={() => handleCategoryMouseLeave()}>
              <div className={`main-row ${(activeCategoryData && activeCategoryData.id === mainData.id) ? 'active' : ''}`} onMouseMove={() => handleCategoryMouseMove([mainData.id])} onMouseLeave={() => handleCategoryMouseLeave()}>
                <Link href={category.getTranslate(mainData.id, activeLocale, "url")}>
                  {category.getTranslate(mainData.id, activeLocale, "title")}
                </Link>
                {category.getAltCategoryData(mainData.id).length > 0 && (
                  <div className={`arrow-btn ${activeCategories.includes(mainData.id) ? 'active' : ''}`} onClick={() => handleCategoryClick(mainData.id)}>
                    <IoChevronForwardOutline />
                  </div>
                )}
              </div>
              {
                category.getAltCategoryData(mainData.id).length > 0 ? (
                  <AltCategoryWrapper $active={activeCategories.includes(mainData.id)} $level={1} $parentComponent={parentComponent} onMouseMove={() => handleCategoryItemMouseMove(mainData.id)} onMouseLeave={() => handleCategoryMouseLeave()}>
                    {renderAltCategories(category.getAltCategoryData(mainData.id), 1, [0, mainData.id])}
                  </AltCategoryWrapper>
                ) : null
              }
            </div>
          )
        }
      </React.Fragment>
    ))
  }
  return (
    <React.Fragment>
      <CategoryWrapper $parentComponent={parentComponent}>
        {mainCategoryData.length > 0 ? renderCategories(mainCategoryData as CategoriesDataType[]) : null}
      </CategoryWrapper>
    </React.Fragment>
  )
}

export default React.memo(Categories)
