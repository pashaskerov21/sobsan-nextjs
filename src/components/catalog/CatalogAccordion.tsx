'use client'
import React from 'react'
import { CatalogAccordionProps, CatalogDataType } from '@/src/types'
import { CatalogTranslation } from '@/src/utils';
import { FaChevronDown } from "react-icons/fa6";
import { Catalog } from '@/src/class';
import { CatalogAccordionBodyInner } from './style';
import CatalogColors from './CatalogColors';
import { Accordion } from 'react-bootstrap';
import { AccordionContainer } from '@/src/styles';

const CatalogAccordion: React.FC<CatalogAccordionProps> = ({
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
    <React.Fragment>
      <AccordionContainer>
        <Accordion alwaysOpen>
          {
            catalogs.map((data) => (
              <React.Fragment key={data.id}>
                <Accordion.Item eventKey={`${data.id}`}>
                  <Accordion.Header>
                    <CatalogTranslation
                      activeCatalogData={data}
                      activeLocale={activeLocale}
                      catalogData={catalogData}
                      catalogTranslateData={catalogTranslateData}
                      translationType='title'
                    />
                    <FaChevronDown />
                  </Accordion.Header>
                  <Accordion.Body>
                    <CatalogAccordionBodyInner>
                      <CatalogColors
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
              </React.Fragment>
            ))
          }
        </Accordion>
      </AccordionContainer>

    </React.Fragment>
  )
}

export default React.memo(CatalogAccordion)
