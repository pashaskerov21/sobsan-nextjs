import React from 'react'
import { Container, Section } from '@/src/styles'
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, ColorDataType, ColorTranslateDataType, LoadingType, LocaleType, ProductAttributeRelationDataType, ProductCategoryRelationDataType, ProductColorRelationDataType, ProductDataType, ProductTranslateDataType, ProductWeightRelationDataType, WeightDataType } from '@/src/types'
import { ProductDetailWrapper } from './style'
import Image from 'next/image'
import { Attribute, AttributeGroup, Brand, Category, Color, Product } from '@/src/class'

type SectionProps = {
    loading: LoadingType,
    activeLocale: LocaleType,
    activeProductData: ProductDataType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    categoryData: CategoriesDataType[],
    categoryTranslateData: CategoriesTranslateDataType[],
    brandData: BrandDataType[],
    brandTranslateData: BrandTranslateDataType[],
    attributeGroupData: AttributeGroupDataType[],
    attributeGroupTranslateData: AttributeGroupTranslateDataType[],
    attributeData: AttributeDataType[],
    attributeTranslateData: AttributeTranslateDataType[],
    productCategoryRelationData: ProductCategoryRelationDataType[],
    productAttributeRelationData: ProductAttributeRelationDataType[],
    weightData: WeightDataType[],
    productWeightRelationData: ProductWeightRelationDataType[],
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
    productColorRelationData: ProductColorRelationDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
}

const ProductDetailSection: React.FC<SectionProps> = ({
    activeLocale,
    activeProductData,
    attributeData,
    attributeGroupData,
    attributeGroupTranslateData,
    attributeTranslateData,
    brandData,
    brandTranslateData,
    categoryData,
    categoryTranslateData,
    generalDictionary,
    loading,
    productAttributeRelationData,
    productCategoryRelationData,
    productData,
    productTranslateData,
    productWeightRelationData,
    weightData,
    colorData,
    colorTranslateData,
    productColorRelationData,
    titleDictionary,
}) => {
    const brand = new Brand(brandTranslateData);
    const product = new Product(productData, productTranslateData);
    const category = new Category(categoryData, categoryTranslateData);
    const attribute = new Attribute(attributeData, attributeTranslateData);
    const attributeGroup = new AttributeGroup(attributeGroupData, attributeGroupTranslateData);
    const color = new Color(colorData, colorTranslateData);

    const productCategories: CategoriesDataType[] | [] = product.getCategories(activeProductData.id, categoryData, productCategoryRelationData);
    const productAttributes: AttributeDataType[] | [] = product.getAttributes(activeProductData.id, attributeData, productAttributeRelationData);
    const productWeights: WeightDataType[] | [] = product.getWeightData(activeProductData.id, weightData, productWeightRelationData);
    const productCustomColors: ColorDataType[] | [] = product.getCustomColors(activeProductData.id, colorData, productColorRelationData);

    return (
        <Section $py={20}>
            <Container>
                <ProductDetailWrapper>
                    <div className="wrapper__left">
                        <div className="product__parameters">
                            <div className="product__parameter">
                                <div className="parameter__key">Brend:</div>
                                <div className="parameter__value">{brand.getTranslate(activeProductData.brand_id, activeLocale, "title")}</div>
                            </div>
                            {
                                productCategories.length > 0 && productCategories.map((data) => (
                                    <div className="product__parameter" key={`category-${data.id}`}>
                                        <div className="parameter__key">Kateqoriya:</div>
                                        <div className="parameter__value">{category.getTranslate(data.id, activeLocale, "title")}</div>
                                    </div>
                                ))
                            }
                            <div className="product__parameter">
                                <div className="parameter__key">Məhsulun kodu:</div>
                                <div className="parameter__value">{activeProductData.code}</div>
                            </div>
                            <div className="parameter__title">Texniki parametrlər</div>
                            {
                                productAttributes.length > 0 && productAttributes.map((data) => (
                                    <div className="product__parameter" key={`attr-${data.id}`}>
                                        <div className="parameter__key">{attributeGroup.getTitleByID(data.group_id, activeLocale)}:</div>
                                        <div className="parameter__value">{attribute.getTranslate(data.id, activeLocale, "title")}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="wrapper__left__bottom">
                            <div className="wrapper__left__bottom__col">
                                <div className="col__title">Çəkini seç</div>
                                <div className="product__weight__buttons">
                                    {
                                        productWeights.length > 0 && productWeights.map((data) => (
                                            <div className="product__weight__button" key={`weight-${data.id}`}>{data.title}</div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="wrapper__left__bottom__col">
                                <div className="col__title">Rəngi seç</div>
                                <div className="product__custom__color__buttons">
                                    {
                                        activeProductData.catalog_id === 0 && productCustomColors.length > 0 && productCustomColors.map((data) => (
                                            <div className={`product__custom__color__button`} key={`custom-color-${data.id}`}>
                                                <div className="color__value">
                                                    <div className="color__value__inner" style={{ backgroundColor: `${data.color_code}` }}></div>
                                                </div>
                                                <div className="color__title">
                                                    {color.getTranslate(data.id, activeLocale, "title")}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="wrapper__left__bottom__col"></div>
                            <div className="wrapper__left__bottom__col"></div>
                        </div>
                    </div>
                    <div className="wrapper__right">
                        <div className="product__image">
                            <Image src={activeProductData.image} width={400} height={400} alt='product' />
                        </div>
                    </div>
                </ProductDetailWrapper>
            </Container>
        </Section>
    )
}

export default React.memo(ProductDetailSection);
