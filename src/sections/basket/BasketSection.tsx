'use client'
import React, { Fragment, useCallback } from 'react'
import { Container, Section } from '@/src/styles'
import { AccountDataType, BasketDataType, BrandTranslateDataType, ColorDataType, ColorTranslateDataType, LoadingType, LocaleType, OrderDataType, ProductDataType, ProductTranslateDataType, UserDataType } from '@/src/types'
import { BasketContentWrapper } from './style'
import { useLocalStorage } from 'usehooks-ts'
import { AlertComponent } from '@/src/styles/components/alert'
import { ProductRow, Skeleton } from '@/src/components'
import { useRouter } from 'next/navigation'
import { Account, Basket } from '@/src/class'
import { v4 as uuidv4 } from 'uuid';


type SectionProps = {
    activeLocale: LocaleType,
    loading: LoadingType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    brandTranslateData: BrandTranslateDataType[],
    colorData: ColorDataType[],
    colorTranslateData: ColorTranslateDataType[],
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    handleClearStorage: () => void,
}

const BasketSection: React.FC<SectionProps> = ({
    activeLocale,
    generalDictionary,
    loading,
    productData,
    productTranslateData,
    brandTranslateData,
    colorData,
    colorTranslateData,
    titleDictionary,
    handleClearStorage,
}) => {
    const router = useRouter();
    const [basketStorage] = useLocalStorage<BasketDataType[]>("basket", []);
    const [basketTotal, setBasketTotal] = React.useState<number>(0);
    const [accountData, setAccountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const account = new Account(accountData);
    const basket = new Basket(basketStorage, accountData);
    const basketData: BasketDataType[] = basket.data();
    const activeUser: UserDataType | undefined = account.getActiveUser();

    React.useEffect(() => {
        if (basketData && basketData.length > 0) {
            let total = basketData.reduce((acc: number, data: BasketDataType) => acc + data.parameters.amount * data.parameters.price, 0);
            setBasketTotal(total);
        }
    }, [basketData]);

    const handleBasketConfirm = useCallback(() => {
        if (activeUser) {
            const newOrder: OrderDataType = {
                id: uuidv4(),
                status: false,
                product_payment: basketData.reduce((acc: number, data: BasketDataType) => acc + data.parameters.amount * data.parameters.price, 0),
                basketData: basketData,
            }
            setAccountData(account.addNewOrder(newOrder));
            router.push(`/${activeLocale}/basket/checkout`);
        } else {
            router.push(`/${activeLocale}/login`);
        }
    }, [router, accountData.activeUser]);
    return (
        <Section $py={20}>
            <Container>
                {
                    basketData && basketData.length > 0 ? (
                        <BasketContentWrapper>
                            <div className="basket__table__wrapper">
                                {
                                    loading.lazy ? (
                                        <Fragment>
                                            <Skeleton min_width='1200px' width='100%' height='45px' margin='0 0 5px 0' />
                                            {
                                                basketData.map((data) => (
                                                    <Fragment key={`skeleton-${data.id}`}>
                                                        <Skeleton min-width='1200px' width='100%' height='110px' margin='0 0 3px 0' />
                                                    </Fragment>
                                                ))
                                            }
                                        </Fragment>
                                    ) : (
                                        <table className='basket__table'>
                                            <thead>
                                                <tr>
                                                    <th>{generalDictionary["photo"]}</th>
                                                    <th>{generalDictionary["product_name_brand"]}</th>
                                                    <th>{generalDictionary["color"]}</th>
                                                    <th>{generalDictionary["weight"]}</th>
                                                    <th>{generalDictionary["price"]}</th>
                                                    <th>{generalDictionary["amount_stock"]}</th>
                                                    <th>{generalDictionary["total"]}</th>
                                                    <th>{generalDictionary["delete"]}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    basketData.map((data) => (
                                                        <Fragment key={`product-row-${data.id}`}>
                                                            <ProductRow
                                                                activeLocale={activeLocale}
                                                                basketData={data}
                                                                productData={productData}
                                                                productTranslateData={productTranslateData}
                                                                brandTranslateData={brandTranslateData}
                                                                colorData={colorData}
                                                                colorTranslateData={colorTranslateData}
                                                                generalDictionary={generalDictionary}
                                                            />
                                                        </Fragment>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    )
                                }
                            </div>
                            <div className="basket__content__bottom">
                                {
                                    loading.lazy ? (
                                        <Fragment>
                                            <Skeleton width='100%' max_width='300px' height='25px' />
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <div className="total__payment">
                                                <div className="label">{generalDictionary['total_payment']}:</div>
                                                <div className='value'>{basketTotal.toFixed(2)} AZN</div>
                                            </div>
                                        </Fragment>
                                    )
                                }
                                <div className="basket__buttons">
                                    {
                                        loading.lazy ? (
                                            <Fragment>
                                                <Skeleton width='100%' max_width='250px' height='56px' radius='10px' />
                                                <Skeleton width='100%' max_width='250px' height='56px' radius='10px' />
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <div className="basket__button clear" onClick={handleClearStorage}>{generalDictionary["clear_basket"]}</div>
                                                <div className="basket__button confirm" onClick={handleBasketConfirm}>{generalDictionary["confirm"]}</div>
                                            </Fragment>
                                        )
                                    }
                                </div>
                            </div>
                        </BasketContentWrapper>
                    ) : (
                        <Fragment>
                            {
                                loading.standart ? <Skeleton width='100%' height='45px' radius='10px' /> : (
                                    <AlertComponent>
                                        {generalDictionary["no_product_in_basket"]}
                                    </AlertComponent>
                                )
                            }
                        </Fragment>
                    )
                }
            </Container>
        </Section>
    )
}



export default React.memo(BasketSection);
