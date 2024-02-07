'use client'
import React, { Fragment } from 'react'
import { ProductComparisonCard, Skeleton } from '@/src/components'
import { Container, Section } from '@/src/styles'
import { AccountDataType, BrandDataType, BrandTranslateDataType, ComparisonDataType, LoadingType, LocaleType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import { ComparisonContainer } from './style'
import { useLocalStorage } from 'usehooks-ts'
import { Comparison } from '@/src/class'

type SectionProps = {
    activeLocale: LocaleType,
    loading: LoadingType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
}

const ComparisonSection: React.FC<SectionProps> = ({
    activeLocale,
    brandData,
    brandTranslateData,
    generalDictionary,
    loading,
    productData,
    productTranslateData,
    titleDictionary,
}) => {
    const [comparisonStorage, setComparisonStorage] = useLocalStorage<ComparisonDataType[] | []>("comparison", []);
    const [accountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const comparison = new Comparison(comparisonStorage, accountData);
    const comparisonData: ComparisonDataType[] | [] = comparison.data();
    return (
        <Section $py={20}>
            <Container>
                {
                    comparisonData.length > 0 ? (
                        <ComparisonContainer>
                            <div className="comparison__col">
                                <div className="comparison__col__list">
                                    <div className="list__item"></div>
                                    <div className="list__item">{generalDictionary["brand"]}:</div>
                                    <div className="list__item">{generalDictionary["product_name"]}:</div>
                                    <div className="list__item">{generalDictionary["product_code"]}:</div>
                                    <div className="list__item">{generalDictionary["price"]}:</div>
                                    <div className="list__item"></div>
                                </div>
                            </div>
                            {
                                    comparisonData.map((data) => (
                                        <Fragment key={`product-comparison-item-${data.id}`}>
                                            <ProductComparisonCard
                                                activeLocale={activeLocale}
                                                activeComparisonData={data}
                                                brandData={brandData}
                                                brandTranslateData={brandTranslateData}
                                                generalDictionary={generalDictionary}
                                                loading={loading}
                                                productData={productData}
                                                productTranslateData={productTranslateData}
                                            />
                                        </Fragment>
                                    ))
                                }
                        </ComparisonContainer>
                    ) : (
                        <Fragment>
                            {
                                loading.standart ? <Skeleton width='100%' height='45px' /> : (
                                    <h3 className='text-center text-lg-start'>{generalDictionary["no_product_in_comparison"]}</h3>
                                )
                            }
                        </Fragment>
                    )
                }
            </Container>
        </Section>
    )
}

export default React.memo(ComparisonSection)
