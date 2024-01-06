'use client'
import React from 'react'
import { AltCategoryWrapper, CategoryWrapper } from './style'
import { CategoriesDataType, CategoryProps } from '@/src/types';
import { Category } from '@/src/class';
import { IoChevronForwardOutline } from "react-icons/io5";
import { Skeleton } from '@/src/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Categories: React.FC<CategoryProps> = ({ loading, activeLocale, categoryData, categoryTranslateData }) => {
  const category = new Category(categoryData, categoryTranslateData);
  const mainCategoryData: CategoriesDataType[] | [] = category.getMainCategoryData();
  const pathName = usePathname();
  React.useEffect(() => {
    setActiveCategories([]);
  }, [pathName])


  const [activeCategories, setActiveCategories] = React.useState<number[]>([]);
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
  const handleCategoryMouseMove = (categoryID: number) => {
    let updatedCategories: number[] = [...activeCategories];
    if (window.innerWidth > 1200) {
      if (!activeCategories.includes(categoryID)) {
        updatedCategories.push(categoryID);
      }
      setActiveCategories(updatedCategories);
    }
  };
  const handleCategoryMouseLeave = () => {
    if (window.innerWidth > 1200) {
      setActiveCategories([]);
    }
  };



  const renderAltCategories = (data: CategoriesDataType[], level: number): JSX.Element[] => {
    return data.map((altData) => (
      <React.Fragment key={altData.id}>
        <div className={`category-item`}>
          <div className="main-row">
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
            <AltCategoryWrapper $active={activeCategories.includes(altData.id)} $level={level + 1}>
              {renderAltCategories(category.getAltCategoryData(altData.id), level + 1)}
            </AltCategoryWrapper>
          )}
        </div>
      </React.Fragment>
    ));
  };

  const renderCategories = (data: CategoriesDataType[] | []): JSX.Element[] => {
    return data.map((mainData: CategoriesDataType) => (
      <React.Fragment key={mainData.id}>
        <div className={`category-item`} onMouseMove={() => handleCategoryMouseMove(mainData.id)} onMouseLeave={() => handleCategoryMouseLeave()}>
          <div className="main-row">
            {
              loading.standart ? (
                <React.Fragment>
                  <Skeleton width='100%' width_xl='80px' height='20px' height_xl='50px' />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link href={category.getTranslate(mainData.id, activeLocale, "url")}>
                    {category.getTranslate(mainData.id, activeLocale, "title")}
                  </Link>
                  {category.getAltCategoryData(mainData.id).length > 0 && (
                    <div className={`arrow-btn ${activeCategories.includes(mainData.id) ? 'active' : ''}`} onClick={() => handleCategoryClick(mainData.id)}>
                      <IoChevronForwardOutline />
                    </div>
                  )}
                </React.Fragment>
              )
            }
          </div>
          {
            category.getAltCategoryData(mainData.id).length > 0 ? (
              <AltCategoryWrapper $active={activeCategories.includes(mainData.id)} $level={1}>
                {renderAltCategories(category.getAltCategoryData(mainData.id), 1)}
              </AltCategoryWrapper>
            ) : null
          }
        </div>
      </React.Fragment>
    ))
  }


  return (
    <React.Fragment>
      <CategoryWrapper>
        {mainCategoryData.length > 0 ? renderCategories(mainCategoryData as CategoriesDataType[]) : null}
      </CategoryWrapper>
    </React.Fragment>
  )
}

export default React.memo(Categories);
