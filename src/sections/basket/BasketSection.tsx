'use client'
import React, { Fragment, useCallback } from 'react'
import { Container, Section } from '@/src/styles'
import { AccountDataType, BasketDataType, BrandDataType, BrandTranslateDataType, ColorDataType, ColorTranslateDataType, LoadingType, LocaleType, ProductDataType, ProductTranslateDataType, UserDataType } from '@/src/types'
import { BasketContentWrapper } from './style'
import { useLocalStorage } from 'usehooks-ts'
import { AlertComponent } from '@/src/styles/components/alert'
import { ProductRow, Skeleton } from '@/src/components'
import { useRouter } from 'next/navigation'
import { decryptData, encryptData } from '@/src/utils/crypto'

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
    const [paymentTotal, setPaymentTotal] = React.useState<number>(0);
    const [accountData, setAccountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const userData: UserDataType[] = accountData.users.map((data) => decryptData(data));


    React.useEffect(() => {
        if (basketStorage && basketStorage.length > 0) {
            let total = basketStorage.reduce((acc: number, data: BasketDataType) => acc + data.parameters.amount * data.parameters.price, 0);
            setPaymentTotal(total);
        }
    }, [basketStorage]);

    const handleBasketConfirm = useCallback(() => {
        if (accountData.activeUser) {
            const searchAccount: UserDataType | undefined = userData.find((data) => data.id === accountData.activeUser);
            if (searchAccount) {
                const updateUserData: UserDataType[] = userData.map((data) => data.id === searchAccount.id ?
                    {
                        ...data,
                        orders: {
                            ...data.orders,
                            product_payment: paymentTotal,
                            basketData: basketStorage.filter((data) => data.user === searchAccount.id),
                        }
                    } : data);
                const encryptedData:string[] = updateUserData.map((data) => encryptData(data));
                console.log(encryptedData)
                setAccountData((prev) => {
                    return {
                        ...prev,
                        users: encryptedData,
                    }
                });
                router.push(`/${activeLocale}/checkout`);
            }else{
                router.push(`/${activeLocale}/login`);
            }
        } else {
            router.push(`/${activeLocale}/login`);
        }
    }, [router, accountData.activeUser]);
    return (
        <Section $py={20}>
            <Container>
                {
                    basketStorage && basketStorage.length > 0 ? (
                        <BasketContentWrapper>
                            <div className="basket__table__wrapper">
                                {
                                    loading.lazy ? (
                                        <Fragment>
                                            <Skeleton min_width='1200px' width='100%' height='45px' margin='0 0 5px 0' />
                                            {
                                                basketStorage.map((data) => (
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
                                                    basketStorage.map((data) => (
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
                                                <div className='value'>{paymentTotal.toFixed(2)} AZN</div>
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
                        <AlertComponent>
                            {generalDictionary["no_product_in_basket"]}
                        </AlertComponent>
                    )
                }
            </Container>
        </Section>
    )
}



export default React.memo(BasketSection);
