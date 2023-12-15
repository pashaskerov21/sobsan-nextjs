import { Catalog } from '@/src/class'
import { CatalogTransLationProps, CatalogTranslateDataType } from '@/src/types'
import React from 'react'

const CatalogTranslation: React.FC<CatalogTransLationProps> = ({
  activeCatalogData,
  activeLocale,
  catalogData,
  catalogTranslateData,
  translationType,
}) => {
  const catalog = new Catalog(catalogData, catalogTranslateData);
  const activeTranslateData: CatalogTranslateDataType | undefined = catalog.getTranslate(activeCatalogData.id, activeLocale);
  if (activeTranslateData) {
    switch (translationType) {
      case "title":
        return (
          <React.Fragment>
            {activeTranslateData.title}
          </React.Fragment>
        )
      default:
        return (
          <React.Fragment>
            {activeTranslateData.title}
          </React.Fragment>
        )
    }
  } else {
    return (
      <React.Fragment></React.Fragment>
    )
  }
}

export default React.memo(CatalogTranslation)
