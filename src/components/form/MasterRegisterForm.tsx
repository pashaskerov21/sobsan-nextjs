'use client'
import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { AccountDataType, LoadingType, LocaleType, UserDataType } from '@/src/types'
import { Form, Formik, FormikHelpers } from 'formik'
import { FormWrapper } from './style'
import FormComponent from './FormComponent'
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from 'usehooks-ts'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { Account } from '@/src/class'
import Skeleton from '../skeleton/Skeleton'

type FormProps = {
    loading: LoadingType,
    titleDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

type RegistrationFormValueType = {
    firstName: string,
    lastName: string,
    phone: string | number,
    email: string,
    password: string,
    password_confirm: string,
}

const MasterRegisterForm: React.FC<FormProps> = ({
    formDictionary,
    loading,
    titleDictionary,
}) => {

    const initialValues: RegistrationFormValueType = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        password_confirm: "",
    }
    const validationSchema = Yup.object({
        firstName: Yup.string().required(`${formDictionary.error.firstName_required}`),
        lastName: Yup.string().required(`${formDictionary.error.lastName_required}`),
        phone: Yup.string().required(`${formDictionary.error.phone_required}`),
        email: Yup.string().email(`${formDictionary.error.email_format}`).required(`${formDictionary.error.email_required}`),
        password: Yup.string()
            .required(`${formDictionary.error.password_required}`)
            .min(8, `${formDictionary.error.password_min_length}`)
            .matches(
                /^(?=.*[a-z])/,
                `${formDictionary.error.password_lowercase}`
            )
            .matches(
                /^(?=.*[A-Z])/,
                `${formDictionary.error.password_uppercase}`
            )
            .matches(
                /^(?=.*\d)/,
                `${formDictionary.error.password_digit}`
            )
            .matches(
                /^(?=.*[@$!%*?&])/,
                `${formDictionary.error.password_special_character}`
            ),
        password_confirm: Yup.string()
            .required(`${formDictionary.error.password_confirm_required}`)
            .min(8, `${formDictionary.error.password_min_length}`)
            .oneOf([Yup.ref('password')], `${formDictionary.error.password_confirm_match}`)
            .matches(
                /^(?=.*[a-z])/,
                `${formDictionary.error.password_lowercase}`
            )
            .matches(
                /^(?=.*[A-Z])/,
                `${formDictionary.error.password_uppercase}`
            )
            .matches(
                /^(?=.*\d)/,
                `${formDictionary.error.password_digit}`
            )
            .matches(
                /^(?=.*[@$!%*?&])/,
                `${formDictionary.error.password_special_character}`
            ),
    });

    const onSubmit = (values: RegistrationFormValueType, actions: FormikHelpers<RegistrationFormValueType>) => {
        actions.resetForm();
    }
    return (
        <FormWrapper className='master__form'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formik => (
                        <Form autoComplete='off'>
                            {
                                loading.lazy ? (
                                    <Fragment>
                                        <Skeleton width='100%' height='70px' />
                                        <Skeleton width='100%' height='70px' />
                                        <Skeleton width='100%' height='70px' />
                                        <Skeleton width='100%' height='70px' />
                                        <Skeleton width='100%' height='70px' />
                                        <Skeleton width='100%' height='70px' />
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <FormComponent
                                            control='input'
                                            name='firstName'
                                            type='text'
                                            label={formDictionary.label.your_firstName + ' *'}
                                            formik={formik}
                                        />
                                        <FormComponent
                                            control='input'
                                            name='lastName'
                                            type='text'
                                            label={formDictionary.label.your_lastName + ' *'}
                                            formik={formik}
                                        />
                                        <FormComponent
                                            control='input'
                                            name='phone'
                                            type='number'
                                            label={formDictionary.label.phone + ' *'}
                                            formik={formik}
                                        />
                                        <FormComponent
                                            control='input'
                                            name='email'
                                            type='email'
                                            label={formDictionary.label.email + ' *'}
                                            formik={formik}
                                        />
                                        <FormComponent
                                            control='input'
                                            name='password'
                                            type='password'
                                            label={formDictionary.label.password + ' *'}
                                            formik={formik}
                                        />
                                        <FormComponent
                                            control='input'
                                            name='password_confirm'
                                            type='password'
                                            label={formDictionary.label.password_confirm + ' *'}
                                            formik={formik}
                                        />
                                    </Fragment>
                                )
                            }
                            {
                                loading.lazy ?
                                    <Skeleton width='100%' height='55px' className='button__skeleton' />
                                    : <button type='submit'>{titleDictionary["registration"]}</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </FormWrapper>
    )
}

export default React.memo(MasterRegisterForm)
