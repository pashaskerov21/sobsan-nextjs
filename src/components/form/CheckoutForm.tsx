'use client'
import React, { Fragment, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { AccountDataType, BasketDataType, LoadingType, LocaleType, OrderDataType, UserDataType } from '@/src/types'
import { useLocalStorage } from 'usehooks-ts'
import { Form, Formik, FormikHelpers } from 'formik'
import { FormWrapper } from './style'
import FormComponent from './FormComponent'
import { Account, Basket } from '@/src/class'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import Skeleton from '../skeleton/Skeleton'

type CheckoutFormProps = {
    activeLocale: LocaleType,
    loading: LoadingType,
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

type CheckoutFormValuesType = {
    firstName: string,
    lastName: string,
    address: string,
    phone: string | number,
    email: string,
    note: string,
    payment_type: "card" | "cash",
    delivery_type: "city" | "region",
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    activeLocale,
    formDictionary,
    generalDictionary,
    loading,
    titleDictionary,
}) => {
    const [accountData, setAccountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const [basketStorage, setBasketStorage] = useLocalStorage<BasketDataType[] | []>("basket", []);
    const router = useRouter();
    const account = new Account(accountData);
    const basket = new Basket(basketStorage, accountData);
    const activeUserData: UserDataType | undefined = account.getActiveUser();
    const activeOrderData: OrderDataType | undefined = account.getActiveOrder();
    const initialValues: CheckoutFormValuesType = {
        firstName: activeUserData ? activeUserData.profile.firstName : '',
        lastName: activeUserData ? activeUserData.profile.lastName : '',
        address: activeUserData ? activeUserData.profile.address ? activeUserData.profile.address : '' : '',
        phone: activeUserData ? activeUserData.profile.phone : '',
        email: activeUserData ? activeUserData.account.email : '',
        note: '',
        payment_type: 'cash',
        delivery_type: 'city',
    }
    const validationSchema = Yup.object({
        firstName: Yup.string().required(`${formDictionary.error.firstName_required}`),
        lastName: Yup.string().required(`${formDictionary.error.lastName_required}`),
        address: Yup.string().required(`${formDictionary.error.delivery_address_required}`),
        phone: Yup.string().required(`${formDictionary.error.phone_required}`),
        email: Yup.string().email(`${formDictionary.error.email_format}`).required(`${formDictionary.error.email_required}`),
        payment_type: Yup.string().required(`${formDictionary.error.payment_type_required}`),
        delivery_type: Yup.string().required(`${formDictionary.error.delivery_type_required}`),
    });

    const [paymentValues, setPaymentValues] = useState<{
        product_total: number,
        delivery: number,
        discount: number,
        payment_total: number
    }>({
        product_total: activeOrderData ? activeOrderData.product_payment ? activeOrderData.product_payment : 0 : 0,
        delivery: 5,
        discount: 0,
        payment_total: 0,
    });

    const handleChangeDeliveryType = (value: "city" | "region" | string) => {
        setPaymentValues((prev) => {
            return {
                ...prev,
                delivery: value === "city" ? 5 : 10,
            }
        })
    };

    console.log(activeOrderData)
    useEffect(() => {
        setPaymentValues((prev) => {
            return {
                ...prev,
                payment_total: paymentValues.product_total + paymentValues.delivery - paymentValues.discount,
            }
        })
    }, [paymentValues.product_total, paymentValues.delivery, paymentValues.discount]);

    const onSubmit = (values: CheckoutFormValuesType, actions: FormikHelpers<CheckoutFormValuesType>) => {
        if (activeOrderData) {
            const orderDate = new Date();
            const newOrderData: OrderDataType = {
                ...activeOrderData,
                status: true,
                fullName: `${values.lastName} ${values.firstName}`,
                address: values.address,
                phone: values.phone,
                email: values.email,
                note: values.note,
                payment_type: values.payment_type,
                delivery_type: values.delivery_type,
                discount: paymentValues.discount,
                delivery_payment: paymentValues.delivery,
                total_payment: paymentValues.payment_total,
                date: orderDate,
            }
            setAccountData(account.updateOrderData(newOrderData));
            setBasketStorage(basket.clear());
            Swal.fire({
                icon: "success",
                title: generalDictionary["congratulations"],
                text: generalDictionary["order_complete_message"],
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push(`/${activeLocale}/account`);
                    // actions.resetForm();
                }
            });
        }
    }
    return (
        <FormWrapper className='checkout__form'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formik => (
                        <Form autoComplete='off'>
                            <div className="checkout__form__left">
                                {
                                    loading.lazy ? (
                                        <Fragment>
                                            <Skeleton width='100%' height='70px' />
                                            <Skeleton width='100%' height='70px' />
                                            <Skeleton width='100%' height='70px' />
                                            <Skeleton width='100%' height='70px' />
                                            <Skeleton width='100%' height='70px' />
                                            <Skeleton width='100%' height='200px' />
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <FormComponent
                                                control='input'
                                                name='firstName'
                                                type='text'
                                                label={formDictionary.label.firstName + ' *'}
                                                formik={formik}
                                                value={formik.values.firstName}
                                            />
                                            <FormComponent
                                                control='input'
                                                name='lastName'
                                                type='text'
                                                label={formDictionary.label.lastName + ' *'}
                                                formik={formik}
                                                value={formik.values.lastName}
                                            />
                                            <FormComponent
                                                control='input'
                                                name='address'
                                                type='text'
                                                label={formDictionary.label.delivery_address + ' *'}
                                                formik={formik}
                                                value={formik.values.address}
                                            />
                                            <FormComponent
                                                control='input'
                                                name='phone'
                                                type='number'
                                                label={formDictionary.label.phone + ' *'}
                                                formik={formik}
                                                value={`${formik.values.phone}`}
                                            />
                                            <FormComponent
                                                control='input'
                                                name='email'
                                                type='email'
                                                label={formDictionary.label.email + ' *'}
                                                formik={formik}
                                                value={formik.values.email}
                                            />
                                            <FormComponent
                                                control='textarea'
                                                name='note'
                                                label={formDictionary.label.additional_notes}
                                                formik={formik}
                                            />
                                        </Fragment>
                                    )
                                }
                            </div>
                            <div className="checkout__form__right">
                                <div className="order__info__wrapper">
                                    {
                                        loading.lazy ? (
                                            <Fragment>
                                                <Skeleton width='200px' height='28px' />
                                                <Skeleton width='100%' height='50px' />
                                                <Skeleton width='100%' height='50px' />
                                                <Skeleton width='100%' height='50px' />
                                                <Skeleton width='100%' height='50px' />
                                                <Skeleton width='100%' height='50px' />
                                                <Skeleton width='100%' height='50px' />
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <div className="title">{generalDictionary['order_informations']}</div>
                                                <div className="info__row">
                                                    <div className="row__left">
                                                        {generalDictionary['total']}
                                                    </div>
                                                    <div className="row__right">
                                                        {paymentValues.product_total.toFixed(2)}AZN
                                                    </div>
                                                </div>
                                                <div className="info__row">
                                                    <div className="row__left">
                                                        {generalDictionary['delivery']}
                                                    </div>
                                                    <div className="row__right">
                                                        {paymentValues.delivery.toFixed(2)}AZN
                                                    </div>
                                                </div>
                                                <div className="info__row">
                                                    <div className="row__left">
                                                        {generalDictionary['discount']}
                                                    </div>
                                                    <div className="row__right">
                                                        {paymentValues.discount.toFixed(2)}AZN
                                                    </div>
                                                </div>
                                                <div className="info__row main">
                                                    <div className="row__left">
                                                        {generalDictionary['total_payment']}
                                                    </div>
                                                    <div className="row__right">
                                                        {paymentValues.payment_total.toFixed(2)}AZN
                                                    </div>
                                                </div>
                                                <div className="info__row">
                                                    <FormComponent
                                                        control='radio'
                                                        type='radio'
                                                        label={formDictionary.label['cash_payment']}
                                                        value="cash"
                                                        name='payment_type'
                                                        formik={formik}
                                                        checked={formik.values.payment_type === "cash"}

                                                    />
                                                    <FormComponent
                                                        control='radio'
                                                        type='radio'
                                                        label={formDictionary.label['card_payment']}
                                                        value="card"
                                                        name='payment_type'
                                                        formik={formik}
                                                        checked={formik.values.payment_type === "card"}
                                                    />
                                                </div>
                                                <div className="info__row">
                                                    <FormComponent
                                                        control='radio'
                                                        type='radio'
                                                        label={formDictionary.label['delivery_city']}
                                                        value="city"
                                                        name='delivery_type'
                                                        formik={formik}
                                                        handleInputChange={handleChangeDeliveryType}
                                                        checked={formik.values.delivery_type === "city"}
                                                    />
                                                    <FormComponent
                                                        control='radio'
                                                        type='radio'
                                                        label={formDictionary.label['delivery_region']}
                                                        value="region"
                                                        name='delivery_type'
                                                        formik={formik}
                                                        handleInputChange={handleChangeDeliveryType}
                                                        checked={formik.values.delivery_type === "region"}
                                                    />
                                                </div>
                                            </Fragment>
                                        )
                                    }
                                </div>
                                {
                                    loading.lazy ? <Skeleton width='100%' height='55px' /> : <button type='submit'>{generalDictionary["confirm_order"]}</button>
                                }
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </FormWrapper>
    )
}

export default React.memo(CheckoutForm)
