import Link from 'next/link'
import React from 'react'
import { CategoriesTranslateDataType, CategoryTranslateProps } from '@/src/types'
import { Category } from '@/src/class'


const CategoryTranslate:React.FC<CategoryTranslateProps> = ({
    activeLocale,
    categoryData,
    categoryID,
    categoryTranslateData,
}) => {
    const category = new Category(categoryData, categoryTranslateData);
    const activeTranslateData: CategoriesTranslateDataType | undefined = category.getTranslate(categoryID, activeLocale);
  return (
    <React.Fragment>
        {
            activeTranslateData ? (
                <React.Fragment>
                    <Link href={`/${activeLocale}/categories/${encodeURIComponent(activeTranslateData.title.toLocaleLowerCase())}`}>
                        {activeTranslateData.title}
                    </Link>
                </React.Fragment>
            ) : null
        }
    </React.Fragment>
  )
}

export default React.memo(CategoryTranslate)
