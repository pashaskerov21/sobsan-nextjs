'use client'
import React, { Fragment, useCallback, useState } from 'react'
import Image from 'next/image'
import Swal from 'sweetalert2'
import { Container, Section } from '@/src/styles'
import { AccountDataType, AttributeDataType, AttributeGroupDataType, AttributeGroupTranslateDataType, AttributeTranslateDataType, BasketDataType, BrandDataType, BrandTranslateDataType, CatalogDataType, CatalogTranslateDataType, CategoriesDataType, CategoriesTranslateDataType, ColorDataType, ColorTranslateDataType, LoadingType, LocaleType, ProductAttributeRelationDataType, ProductCategoryRelationDataType, ProductColorRelationDataType, ProductDataType, ProductTranslateDataType, ProductWeightRelationDataType, WeightDataType } from '@/src/types'
import { ProductDetailWrapper } from './style'
import { Attribute, AttributeGroup, Brand, Catalog, Category, Color, Product } from '@/src/class'
import { CatalogModal, Skeleton } from '@/src/components'
import { FaCheck, FaMinus, FaPlus } from 'react-icons/fa'
import { useLocalStorage } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid';
import { PiShoppingCartSimpleLight } from 'react-icons/pi'


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
    catalogData: CatalogDataType[];
    catalogTranslateData: CatalogTranslateDataType[];
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    textDictionary: { [key: string]: string },
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
    catalogData,
    catalogTranslateData,
    titleDictionary,
    textDictionary,
}) => {

    const brand = new Brand(brandTranslateData);
    const product = new Product(productData, productTranslateData);
    const category = new Category(categoryData, categoryTranslateData);
    const attribute = new Attribute(attributeData, attributeTranslateData);
    const attributeGroup = new AttributeGroup(attributeGroupData, attributeGroupTranslateData);
    const color = new Color(colorData, colorTranslateData);
    const catalog = new Catalog(catalogData, catalogTranslateData);

    const productCategories: CategoriesDataType[] | [] = product.getCategories(activeProductData.id, categoryData, productCategoryRelationData);
    const productAttributes: AttributeDataType[] | [] = product.getAttributes(activeProductData.id, attributeData, productAttributeRelationData);
    const productWeights: WeightDataType[] | [] = product.getWeightData(activeProductData.id, weightData, productWeightRelationData);
    const productCustomColors: ColorDataType[] | [] = product.getCustomColors(activeProductData.id, colorData, productColorRelationData);
    const productCatalog: CatalogDataType | undefined = product.getCatalog(activeProductData.catalog_id, catalogData);
    const productCatalogColors: ColorDataType[] | [] = catalog.getColors(productCatalog ? productCatalog.id : 0, colorData);


    const [selectedColor, setSelectedColor] = useState<ColorDataType | undefined>();
    const [selectedWeight, setSelectedWeight] = useState<WeightDataType>(productWeights[0]);
    const [productAmount, setProductAmount] = useState<number>(activeProductData.stock > 0 ? 1 : 0);

    const [accountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const [basketStorage, setBasketStorage] = useLocalStorage<BasketDataType[] | []>("basket", []);
    const productBasketStatus: BasketDataType | undefined = basketStorage.find((data) =>
        data.product === activeProductData.id &&
        data.parameters.color?.id === selectedColor?.id &&
        data.parameters.weight.id === selectedWeight.id);

    const handleSelectColor = useCallback((data: ColorDataType) => {
        setSelectedColor(data);
    }, []);

    const handleSelectWeight = useCallback((data: WeightDataType) => {
        setSelectedWeight(data);
    }, []);
    const handleMinusButtonClick = useCallback(() => {
        if (productAmount > 1) {
            setProductAmount(productAmount - 1);
        }
    }, [productAmount]);

    const handlePlusButtonClick = useCallback(() => {
        if (productAmount < activeProductData.stock) {
            setProductAmount(productAmount + 1);
        }
    }, [productAmount, activeProductData.stock]);

    const changeProductAmount = useCallback((value: number) => {
        if (isNaN(value)) {
            setProductAmount(activeProductData.stock > 1 ? 1 : 0);
        } else if (value > activeProductData.stock) {
            setProductAmount(activeProductData.stock);
        } else {
            setProductAmount(value);
        }
    }, [activeProductData.stock]);


    const handleBasketConfirm = () => {
        if (productBasketStatus) {
            setBasketStorage([...basketStorage.filter((data) => data.id !== productBasketStatus.id)]);
        } else {
            if ((productCatalogColors.length > 0 || productCustomColors.length > 0) && !selectedColor) {
                Swal.fire({
                    icon: "warning",
                    title: generalDictionary["attention"],
                    text: generalDictionary["color_message"],
                });
            } else {
                let basketData: BasketDataType = {
                    id: uuidv4(),
                    product: activeProductData.id,
                    user: accountData.activeUser ? accountData.activeUser : null,
                    parameters: {
                        color: selectedColor,
                        weight: selectedWeight,
                        amount: productAmount,
                        price: activeProductData.discount === 0 ? activeProductData.price : activeProductData.discount,
                    }
                }
                setBasketStorage([...basketStorage, basketData]);
                Swal.fire({
                    icon: "success",
                    title: generalDictionary["congratulations"],
                    text: generalDictionary["add_basket_message"],
                });
            }
        }
    }

    return (
        <Section $py={20}>
            <Container>
                <ProductDetailWrapper>
                    <div className="wrapper__left">
                        <div className="product__parameters">
                            <div className="product__parameter">
                                {
                                    loading.standart ? (
                                        <Fragment>
                                            <Skeleton width='50%' height='21px' />
                                            <Skeleton width='50%' height='21px' />
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <div className="parameter__key">{generalDictionary.brand}:</div>
                                            <div className="parameter__value">{brand.getTranslate(activeProductData.brand_id, activeLocale, "title")}</div>
                                        </Fragment>
                                    )
                                }
                            </div>
                            {
                                productCategories.length > 0 && productCategories.map((data) => (
                                    <div className="product__parameter" key={`category-${data.id}`}>
                                        {
                                            loading.standart ? (
                                                <Fragment>
                                                    <Skeleton width='50%' height='21px' />
                                                    <Skeleton width='50%' height='21px' />
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <div className="parameter__key">{generalDictionary.category}:</div>
                                                    <div className="parameter__value">{category.getTranslate(data.id, activeLocale, "title")}</div>
                                                </Fragment>
                                            )
                                        }
                                    </div>
                                ))
                            }
                            <div className="product__parameter">
                                {
                                    loading.standart ? (
                                        <Fragment>
                                            <Skeleton width='50%' height='21px' />
                                            <Skeleton width='50%' height='21px' />
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <div className="parameter__key">{generalDictionary.product_code}:</div>
                                            <div className="parameter__value">{activeProductData.code}</div>
                                        </Fragment>
                                    )
                                }
                            </div>
                            <div className="parameter__title">{loading.standart ? <Skeleton width='150px' height='27px' /> : 'Texniki parametrlər'}</div>
                            {
                                productAttributes.length > 0 && productAttributes.map((data) => (
                                    <div className="product__parameter" key={`attr-${data.id}`}>
                                        {
                                            loading.standart ? (
                                                <Fragment>
                                                    <Skeleton width='50%' height='21px' />
                                                    <Skeleton width='50%' height='21px' />
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <div className="parameter__key">{attributeGroup.getTitleByID(data.group_id, activeLocale)}:</div>
                                                    <div className="parameter__value">{attribute.getTranslate(data.id, activeLocale, "title")}</div>
                                                </Fragment>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="wrapper__left__bottom">
                            <div className="wrapper__left__bottom__col">
                                {loading.standart ? <Skeleton width='120px' height='27px' /> : <div className="col__title">{generalDictionary.choose_weight}</div>}
                                <div className="product__weight__buttons">
                                    {
                                        productWeights.length > 0 && productWeights.map((data) => (
                                            <Fragment key={`weight-${data.id}`}>
                                                {loading.standart ? <Skeleton width='88px' height='44px' radius='10px' /> : (
                                                    <div className={`product__weight__button ${selectedWeight.id === data.id ? 'active' : ''}`} onClick={() => handleSelectWeight(data)}>{data.title}</div>
                                                )}
                                            </Fragment>
                                        ))
                                    }
                                </div>
                                {
                                    loading.standart ? (
                                        <Skeleton width='150px' height='60px' margin='30px 0 0 0' />
                                    ) : (
                                        <Fragment>
                                            <div className="product__stock">
                                                <div className="icon"><FaCheck /></div>
                                                <div className="value">{generalDictionary["stock"]}: {activeProductData.stock} {generalDictionary["pieces"]}</div>
                                            </div>
                                            <div className="product__price">
                                                {
                                                    activeProductData.discount === 0 ? (
                                                        <Fragment>
                                                            <div className="main_price">
                                                                {activeProductData.price.toFixed(2)} AZN
                                                            </div>
                                                        </Fragment>
                                                    ) : (
                                                        <Fragment>
                                                            <div className="old_price">
                                                                {activeProductData.price.toFixed(2)} AZN
                                                            </div>
                                                            <div className="main_price">
                                                                {activeProductData.discount.toFixed(2)} AZN
                                                            </div>
                                                        </Fragment>
                                                    )
                                                }
                                            </div>
                                        </Fragment>
                                    )
                                }

                            </div>
                            <div className="wrapper__left__bottom__col">
                                {
                                    activeProductData.catalog_id !== 0 && productCatalog && productCatalogColors.length > 0 && (
                                        <Fragment>
                                            {loading.standart ? <Skeleton width='120px' height='27px' /> : <div className="col__title">{generalDictionary.choose_color}</div>}
                                            {
                                                loading.lazy ? <Skeleton width='160px' height='44px' radius='10px' /> : (
                                                    <CatalogModal
                                                        activeCatalog={productCatalog}
                                                        activeLocale={activeLocale}
                                                        catalogData={catalogData}
                                                        catalogTranslateData={catalogTranslateData}
                                                        colorData={productCatalogColors}
                                                        colorTranslateData={colorTranslateData}
                                                        loading={loading}
                                                        selectedColor={selectedColor}
                                                        handleSelectColor={handleSelectColor}
                                                        textDictionary={textDictionary}
                                                        generalDictionary={generalDictionary}
                                                    />
                                                )
                                            }
                                        </Fragment>
                                    )
                                }
                                {activeProductData.catalog_id === 0 && productCustomColors.length > 0 && (
                                    <Fragment>
                                        {loading.standart ? <Skeleton width='120px' height='27px' /> : <div className="col__title">{generalDictionary.choose_color}</div>}
                                        <div className="product__custom__color__buttons">
                                            {
                                                productCustomColors.map((data) => (
                                                    <Fragment key={`custom-color-${data.id}`}>
                                                        {
                                                            loading.standart ? <Skeleton width='120px' height='30px' /> : (
                                                                <div className={`product__custom__color__button ${selectedColor && selectedColor.id === data.id ? 'active' : ''}`} onClick={() => handleSelectColor(data)}>
                                                                    <div className="color__value">
                                                                        <div className="color__value__inner" style={{ backgroundColor: `${data.color_code}` }}></div>
                                                                    </div>
                                                                    <div className="color__title">
                                                                        {color.getTranslate(data.id, activeLocale, "title")}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </Fragment>
                                                ))
                                            }
                                        </div>
                                    </Fragment>
                                )}

                            </div>
                            <div className="wrapper__left__bottom__col amount__basket">
                                {
                                    loading.lazy ? (
                                        <Fragment>
                                            <Skeleton width='100%' height='70px' radius='10px' />
                                            <Skeleton width='100%' height='70px' radius='10px' />
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <div className="product__amount__counter">
                                                <div className="counter__button" onClick={handleMinusButtonClick}><FaMinus /></div>
                                                <input type="number" name="" id="" max={activeProductData.stock} value={productAmount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeProductAmount(parseInt(e.target.value))} />
                                                <div className="counter__button" onClick={handlePlusButtonClick}><FaPlus /></div>
                                            </div>
                                            <button type='button' disabled={productAmount === 0 ? true : false} className={`basket__button ${productBasketStatus ? 'active' : ''} ${productAmount === 0 ? 'disabled' : ''}`} onClick={handleBasketConfirm}>
                                                {
                                                    productBasketStatus ? (
                                                        <div className="icon">
                                                            <PiShoppingCartSimpleLight />
                                                        </div>
                                                    ) : (
                                                        <span>{generalDictionary["add_basket"]}</span>
                                                    )
                                                }
                                            </button>
                                        </Fragment>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="wrapper__right">
                        <div className="product__image">
                            {loading.lazy ? <Skeleton width='100%' height='200px' height_md='300px' height_lg='400px' width_lg='400px' /> : <Image src={activeProductData.image} width={400} height={400} alt='product' />}
                        </div>
                    </div>
                </ProductDetailWrapper>
            </Container>
        </Section>
    )
}

export default React.memo(ProductDetailSection);
