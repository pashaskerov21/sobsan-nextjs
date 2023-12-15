'use client'
import React from 'react'
import { AltCategoryWrapper, CategoryWrapper } from './style'
import { CategoriesDataType, CategoryProps } from '@/src/types';
import { Category } from '@/src/class';
import { IoChevronForwardOutline } from "react-icons/io5";
import { CategoryTranslation } from '@/src/utils/translate';

const Categories: React.FC<CategoryProps> = ({ activeLocale, categoryData, categoryTranslateData }) => {
  const category = new Category(categoryData, categoryTranslateData);
  const mainCategoryData: CategoriesDataType[] | [] = category.getMainCategoryData();


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
            <CategoryTranslation
              activeCategoryData={altData}
              activeLocale={activeLocale}
              categoryData={categoryData}
              categoryTranslateData={categoryTranslateData}
              translationType='link'
            />
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
            <CategoryTranslation
              activeCategoryData={mainData}
              activeLocale={activeLocale}
              categoryData={categoryData}
              categoryTranslateData={categoryTranslateData}
              translationType='link'
            />
            {category.getAltCategoryData(mainData.id).length > 0 && (
              <div className={`arrow-btn ${activeCategories.includes(mainData.id) ? 'active' : ''}`} onClick={() => handleCategoryClick(mainData.id)}>
                <IoChevronForwardOutline />
              </div>
            )}
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
