import React from 'react'
import { Container, Section } from '@/src/styles'
import { AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BrandDataType, BrandTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, LoadingType, LocaleType, ProductAttributeRelationDataType, ProductCategoryRelationDataType, ProductDataType, ProductTranslateDataType } from '@/src/types'
import { ProductDetailWrapper } from './style'
import Image from 'next/image'
import { Attribute, AttributeGroup, Brand, Category, Product } from '@/src/class'

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
    titleDictionary,
}) => {
    const brand = new Brand(brandTranslateData);
    const product = new Product(productData, productTranslateData);
    const category = new Category(categoryData, categoryTranslateData);
    const attribute = new Attribute(attributeData, attributeTranslateData);
    const attributeGroup = new AttributeGroup(attributeGroupData, attributeGroupTranslateData);
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
                                product.getCategories(activeProductData.id, categoryData, productCategoryRelationData).length > 0 && product.getCategories(activeProductData.id, categoryData, productCategoryRelationData).map((data) => (
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
                                product.getAttributes(activeProductData.id, attributeData, productAttributeRelationData).length > 0 && product.getAttributes(activeProductData.id, attributeData, productAttributeRelationData).map((data) => (
                                    <div className="product__parameter" key={`attr-${data.id}`}>
                                        <div className="parameter__key">{attributeGroup.getTitleByID(data.group_id, activeLocale)}:</div>
                                        <div className="parameter__value">{attribute.getTranslate(data.id, activeLocale, "title")}</div>
                                    </div>
                                ))
                            }
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
