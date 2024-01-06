'use client'
import React from 'react'
import { CategoryButtonWrapper, Container, Section } from '@/src/styles'
import { CatalogDataType, CatalogTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, ColorDataType, ColorTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import { Category } from '@/src/class'
import { CatalogAccordion, Skeleton } from '@/src/components'

type SectionProps = {
  loading: LoadingType,
  activeLocale: LocaleType,
  categoryData: CategoriesDataType[],
  categoryTranslateData: CategoriesTranslateDataType[],
  catalogData: CatalogDataType[],
  catalogTranslateData: CatalogTranslateDataType[],
  colorData: ColorDataType[],
  colorTranslateData: ColorTranslateDataType[],
  textDictionary: { [key: string]: string },
}

const CatalogSection: React.FC<SectionProps> = ({
  loading,
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
                    {
                      loading.standart ? (
                        <React.Fragment>
                          <Skeleton min_width='120px' height='42px' radius='10px' />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <button className={activeCategoryID === data.id ? 'active' : ''} type='button' onClick={() => handleCategoryButton(data.id)}>
                            {category.getTranslate(data.id, activeLocale, "title")}
                          </button>
                        </React.Fragment>
                      )
                    }
                  </React.Fragment>
                ))
              ) : null
            }
          </CategoryButtonWrapper>
          <CatalogAccordion
            loading={loading}
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
