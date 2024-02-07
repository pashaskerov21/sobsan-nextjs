import { LoadingType, LocaleType, OrderDataType, UserDataType } from '@/src/types'
import React from 'react'
import { OrderHistoryWrapper } from './style'

type OrderHistoryProps = {
    activeLocale: LocaleType,
    activeUserData: UserDataType,
    orders: OrderDataType[],
    loading: LoadingType,
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
                            </table>
                        </div>
                    </div>
                ))
            }
        </OrderHistoryWrapper>
    )
}

export default React.memo(OrderHistory)
