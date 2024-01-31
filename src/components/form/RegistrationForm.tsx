'use client'
import React from 'react'
import * as Yup from 'yup'
import { LoadingType, LocaleType } from '@/src/types'
import { Form, Formik, FormikHelpers } from 'formik'
import { FormWrapper } from './style'
import FormComponent from './FormComponent'
import Skeleton from '../skeleton/Skeleton'

type FormProps = {
    activeLocale: LocaleType,
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
    address: string,
    email: string,
    password: string,
    password_confirm: string,
}

const RegistrationForm: React.FC<FormProps> = ({
    activeLocale,
    formDictionary,
    loading,
    titleDictionary,
}) => {
    const initialValues: RegistrationFormValueType = {
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
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
    })
    const onSubmit = (values: RegistrationFormValueType, actions: FormikHelpers<RegistrationFormValueType>) => {
        console.log(values);
        actions.resetForm();
    }
    return (
        <FormWrapper className='login__form'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formik => (
                        <Form>
                            <FormComponent
                                control='input'
                                name='firstName'
                                type='text'
                                label={formDictionary.label.firstName + ' *'}
                                formik={formik}
                            />
                            <FormComponent
                                control='input'
                                name='lastName'
                                type='text'
                                label={formDictionary.label.lastName + ' *'}
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
                                name='address'
                                type='text'
                                label={formDictionary.label.address}
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
                            <button type='submit'>{titleDictionary["registration"]}</button>
                        </Form>
                    )
                }
            </Formik>
        </FormWrapper>
    )
}

export default React.memo(RegistrationForm)
