import { LoadingType, LocaleType, OrderDataType, ProductDataType, ProductTranslateDataType, UserDataType } from '@/src/types'
import React, { Fragment } from 'react'
import ProductOrderRow from '../product/ProductOrderRow'
import { OrderHistoryWrapper } from './style'

type OrderHistoryProps = {
    activeLocale: LocaleType,
    activeUserData: UserDataType,
    orders: OrderDataType[],
    loading: LoadingType,
    productData: ProductDataType[],
    productTranslateData: ProductTranslateDataType[],
    generalDictionary: { [key: string]: string },
    titleDictionary: { [key: string]: string },
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
    activeLocale,
    activeUserData,
    orders,
    generalDictionary,
    loading,
    titleDictionary,
    productData,
    productTranslateData,
}) => {
    return (
        <OrderHistoryWrapper>
            {
                orders.map((data) => (
                    <div className="order__component" key={data.id}>
                        <div className="product__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>{generalDictionary["photo"]}</th>
                                        <th>{generalDictionary["title"]}</th>
                                        <th>{generalDictionary["price"]}</th>
                                        <th>{generalDictionary["number"]}</th>
                                        <th>{generalDictionary["total"]}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.basketData.map((data) => (
                                            <Fragment key={`order-product-${data.id}`}>
                                                <ProductOrderRow
                                                    activeLocale={activeLocale}
                                                    basketData={data}
                                                    productData={productData}
                                                    productTranslateData={productTranslateData}
                                                />
                                            </Fragment>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="order__details">
                            <div className="order__detail__row">
                                <div className="row__label">Sifariş verən şəxs</div>
                                <div className="row__value">{data.fullName}</div>
                            </div>
                            <div className="order__detail__row">
                                <div className="row__label">Sifarişin verilmə tarixi</div>
                                <div className="row__value">{data.date && new Date(data.date).toLocaleString()}</div>
                            </div>
                            <div className="order__detail__row">
                                <div className="row__label">Çatdırılma ünvanı</div>
                                <div className="row__value">{data.address}</div>
                            </div>
                            <div className="order__detail__row">
                                <div className="row__label">Çatdırılma qiyməti</div>
                                <div className="row__value">{data.delivery_payment?.toFixed(2)}</div>
                            </div>
                            <div className="order__detail__row">
                                <div className="row__label">Endirim</div>
                                <div className="row__value">{data.discount?.toFixed(2)}</div>
                            </div>
                            <div className="order__detail__row main">
                                <div className="row__label">Ümumi məbləğ</div>
                                <div className="row__value">{data.total_payment?.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </OrderHistoryWrapper>
    )
}

export default React.memo(OrderHistory)
