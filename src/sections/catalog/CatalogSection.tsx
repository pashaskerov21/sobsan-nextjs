'use client'
import React, { Fragment } from 'react'
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
  titleDictionary: { [key: string]: string },
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
  titleDictionary,
  textDictionary,
}) => {
  const category = new Category(categoryData, categoryTranslateData);

  const [activeCategoryID, setActiveCategoryID] = React.useState<number>(0);
  const handleCategoryButton = React.useCallback((id: number) => {
    setActiveCategoryID(id);
  }, [activeCategoryID])
  return (
    <Fragment>
      <Section $py={20}>
        <Container>
          <CategoryButtonWrapper>
            <button className={activeCategoryID === 0 ? 'active' : ''} type='button' onClick={() => handleCategoryButton(0)}>{titleDictionary["all"]}</button>
            {
              category.getMainCategoryData().length > 0 ? (
                category.getMainCategoryData().map((data) => (
                  <Fragment key={data.id}>
                    {
                      loading.standart ? (
                        <Fragment>
                          <Skeleton min_width='120px' height='42px' radius='10px' />
                        </Fragment>
                      ) : (
                        <Fragment>
                          <button className={activeCategoryID === data.id ? 'active' : ''} type='button' onClick={() => handleCategoryButton(data.id)}>
                            {category.getTranslate(data.id, activeLocale, "title")}
                          </button>
                        </Fragment>
                      )
                    }
                  </Fragment>
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
    </Fragment>
  )
}

export default React.memo(CatalogSection)
