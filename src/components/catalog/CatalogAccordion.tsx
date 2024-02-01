'use client'
import React, { Fragment } from 'react'
import { CatalogDataType, CatalogTranslateDataType, ColorDataType, ColorTranslateDataType, LoadingType, LocaleType } from '@/src/types'
import { FaChevronDown } from "react-icons/fa6";
import { Catalog } from '@/src/class';
import { CatalogAccordionBodyInner } from './style';
import CatalogColors from './CatalogColors';
import { Accordion } from 'react-bootstrap';
import { AccordionContainer } from '@/src/styles';
import Skeleton from '../skeleton/Skeleton';

type CatalogAccordionProps = {
  loading: LoadingType,
  activeLocale: LocaleType,
  activeCategoryID: number,
  catalogData: CatalogDataType[],
  catalogTranslateData: CatalogTranslateDataType[],
  colorData: ColorDataType[],
  colorTranslateData: ColorTranslateDataType[],
  textDictionary: { [key: string]: string },
}

const CatalogAccordion: React.FC<CatalogAccordionProps> = ({
  loading,
  activeCategoryID,
  activeLocale,
  catalogData,
  catalogTranslateData,
  colorData,
  colorTranslateData,
  textDictionary,
}) => {
  const catalog = new Catalog(catalogData, catalogTranslateData);
  const [catalogs, setCatalogs] = React.useState<CatalogDataType[]>(catalogData);

  React.useEffect(() => {
    if (activeCategoryID === 0) {
      setCatalogs(catalogData)
    } else {
      const filteredCatalogs: CatalogDataType[] = catalog.filterCatalogsByCategory(activeCategoryID);
      setCatalogs(filteredCatalogs)
    }
  }, [activeCategoryID])

  return (
    <AccordionContainer>
      <Accordion alwaysOpen>
        {
          catalogs.map((data) => (
            <Fragment key={data.id}>
              <Accordion.Item eventKey={`${data.id}`}>
                <Accordion.Header>
                  {
                    loading.standart ? (
                      <Fragment>
                        <Skeleton width='200px' height='25px' />
                      </Fragment>
                    ) : (
                      <Fragment>
                        {catalog.getTranslate(data.id, activeLocale, "title")}
                      </Fragment>
                    )
                  }
                  <FaChevronDown />
                </Accordion.Header>
                <Accordion.Body>
                  <CatalogAccordionBodyInner>
                    <CatalogColors
                      loading={loading}
                      activeCatalogID={data.id}
                      activeLocale={activeLocale}
                      catalogData={catalogData}
                      catalogTranslateData={catalogTranslateData}
                      colorData={colorData}
                      colorTranslateData={colorTranslateData}
                    />
                    <div className="note">
                      {textDictionary.catalog_note}
                    </div>
                  </CatalogAccordionBodyInner>
                </Accordion.Body>
              </Accordion.Item>
            </Fragment>
          ))
        }
      </Accordion>
    </AccordionContainer>
  )
}

export default React.memo(CatalogAccordion)
