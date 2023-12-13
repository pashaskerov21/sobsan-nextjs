import React from 'react'
import Link from 'next/link';
import { Category } from '@/src/class';
import { CategoriesTranslateDataType, CategoryTranslationProps } from '@/src/types'


const CategoryTranslation: React.FC<CategoryTranslationProps> = ({
  activeLocale,
  activeCategoryData,
  categoryData,
  categoryTranslateData,
  className,
  translationType,
}) => {
  const category = new Category(categoryData, categoryTranslateData);
  const activeTranslateData: CategoriesTranslateDataType | undefined = category.getTranslate(activeCategoryData.id, activeLocale);
  if (activeTranslateData) {
    switch (translationType) {
      case "link":
        return (
          <React.Fragment>
            <Link href={`/${activeLocale}/categories/${encodeURIComponent(activeTranslateData.title.toLocaleLowerCase())}`} className={className}>
              {activeTranslateData.title}
            </Link>
          </React.Fragment>
        )
      case "title":
        return (
          <React.Fragment>
            {activeTranslateData.title}
          </React.Fragment>
        )
      default:
        return (
          <React.Fragment>

          </React.Fragment>
        )
    }
  } else {
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

export default React.memo(CategoryTranslation);
