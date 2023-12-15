'use client'
import React from 'react'
import { AccordionWrapper } from '@/src/styles'
import { CatalogAccordionProps, CatalogDataType } from '@/src/types'
import { CatalogTranslation } from '@/src/utils';
import { FaChevronDown } from "react-icons/fa6";
import { Catalog } from '@/src/class';
import { CatalogAccordionBodyWrapper } from './style';

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
  const accordionBodyRefs = React.useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [accordionState, setAccordionState] = React.useState<{
    index: number | null,
    height: number | null,
  }>({
    index: null,
    height: null,
  });

  React.useEffect(() => {
    if (activeCategoryID === 0) {
      setCatalogs(catalogData)
    } else {
      const filteredCatalogs: CatalogDataType[] = catalog.filterCatalogsByCategory(activeCategoryID);
      setCatalogs(filteredCatalogs)
    }
  }, [activeCategoryID])


  const handleAccordionButton = React.useCallback((id: number) => {
    const itemBody = accordionBodyRefs.current[id];

    if (accordionState.index === id) {
      setAccordionState({
        index: null,
        height: null,
      });
    } else {
      if (itemBody) {
        setAccordionState({
          index: id,
          height: itemBody.scrollHeight,
        });
      }
    }

  }, [accordionState])
  return (
    <React.Fragment>
      <AccordionWrapper $activeBodyHeight={accordionState.height}>
        {
          catalogs.map((data) => (
            <React.Fragment key={data.id}>
              <div className={`accordion-item ${accordionState.index === data.id ? 'active' : ''}`} >
                <div className="accordion-button" onClick={() => handleAccordionButton(data.id)}>
                  <div className="button-title">
                    <CatalogTranslation
                      activeCatalogData={data}
                      activeLocale={activeLocale}
                      catalogData={catalogData}
                      catalogTranslateData={catalogTranslateData}
                      translationType='title'
                    />
                  </div>
                  <div className="button-icon">
                    <FaChevronDown />
                  </div>
                </div>
                <div className='accordion-body'
                  >
                  <CatalogAccordionBodyWrapper ref={(ref) => { ref ? accordionBodyRefs.current[data.id] = ref : null }}>
                    <div className="note">
                      {textDictionary.catalog_note}
                    </div>
                  </CatalogAccordionBodyWrapper>
                </div>
              </div>
            </React.Fragment>
          ))
        }
      </AccordionWrapper>
    </React.Fragment>
  )
}

export default React.memo(CatalogAccordion)
