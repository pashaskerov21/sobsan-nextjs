'use client'
import React from 'react'
import { CategoryButtonWrapper, Container, Section } from '@/src/styles'
import { CatalogSectionProps } from '@/src/types'
import { Catalog, Category } from '@/src/class'
import { CategoryTranslation } from '@/src/utils'
import { CatalogAccordion } from '@/src/components'

const CatalogSection: React.FC<CatalogSectionProps> = ({
  activeLocale,
  catalogData,
  catalogTranslateData,
  categoryData,
  categoryTranslateData,
  colorData,
  colorTranslateData,
  textDictionary,
}) => {
  const category = new Category(categoryData, categoryTranslateData);


  const [activeCategoryID, setActiveCategoryID] = React.useState<number>(0);
  const handleCategoryButton = React.useCallback((id: number) => {
    setActiveCategoryID(id);
  }, [activeCategoryID])
  return (
    <React.Fragment>
      <Section $py={20}>
        <Container>
          <CategoryButtonWrapper>
            <button className={activeCategoryID === 0 ? 'active' : ''} type='button' onClick={() => handleCategoryButton(0)}>hamısı</button>
            {
              category.getMainCategoryData().length > 0 ? (
                category.getMainCategoryData().map((data) => (
                  <React.Fragment key={data.id}>
                    <button className={activeCategoryID === data.id ? 'active' : ''} type='button' onClick={() => handleCategoryButton(data.id)}>
                      <CategoryTranslation
                        activeCategoryData={data}
                        activeLocale={activeLocale}
                        categoryData={categoryData}
                        categoryTranslateData={categoryTranslateData}
                        translationType='title'
                      />
                    </button>
                  </React.Fragment>
                ))
              ) : null
            }
          </CategoryButtonWrapper>
          <CatalogAccordion
            activeCategoryID={activeCategoryID}
            activeLocale={activeLocale}
            catalogData={catalogData}
            catalogTranslateData={catalogTranslateData}
            colorData={colorData}
            colorTranslateData={colorTranslateData}
            textDictionary={textDictionary}
          />
        </Container>
      </Section>
    </React.Fragment>
  )
}

export default React.memo(CatalogSection)