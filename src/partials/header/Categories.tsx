import React from 'react'
import { AltCategoryWrapper, CategoryWrapper } from './style'
import { CategoriesDataType, CategoryProps } from '@/src/types';
import { Category } from '@/src/class';
import CategoryTranslate from '../translate/CategoryTranslate';
import { IoChevronForwardOutline } from "react-icons/io5";

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
      if(!activeCategories.includes(categoryID)){
        updatedCategories.push(categoryID);
      }
      setActiveCategories(updatedCategories);
    }
  };
  const handleCategoryMouseLeave = () => {
    setActiveCategories([]);
  };



  const renderAltCategories = (data: CategoriesDataType[], level: number): JSX.Element[] => {
    return data.map((altData) => (
      <React.Fragment key={altData.id}>
        <div className={`category-item`}>
          <div className="main-row">
            <CategoryTranslate
              activeLocale={activeLocale}
              categoryData={categoryData}
              categoryID={altData.id}
              categoryTranslateData={categoryTranslateData}
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

  React.useEffect(() => {
    console.log(activeCategories)
  },[activeCategories])

  const renderCategories = (data: CategoriesDataType[] | []): JSX.Element[] => {
    return data.map((mainData: CategoriesDataType) => (
      <React.Fragment key={mainData.id}>
        <div className={`category-item`} onMouseMove={() => handleCategoryMouseMove(mainData.id)} onMouseLeave={() => handleCategoryMouseLeave()}>
          <div className="main-row">
            <CategoryTranslate
              activeLocale={activeLocale}
              categoryData={categoryData}
              categoryID={mainData.id}
              categoryTranslateData={categoryTranslateData}
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