'use client'
import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { LoadingType, LocaleType } from '@/src/types'
import { Form, Formik, FormikHelpers } from 'formik'
import FormComponent from './FormComponent'
import { FormWrapper } from './style'
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
type LoginFormValueType = {
    phone: string,
    password: string,
}

const MasterLoginForm: React.FC<FormProps> = ({
    formDictionary,
    loading,
    titleDictionary,
}) => {
    const initialValues: LoginFormValueType = {
        phone: '',
        password: '',
    }
    const validationSchema = Yup.object({
        phone: Yup.string().required(`${formDictionary.error.phone_required}`),
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
    });

    const onSubmit = (values: LoginFormValueType, actions: FormikHelpers<LoginFormValueType>) => {
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
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <FormComponent
                                            control='input'
                                            name='phone'
                                            type='text'
                                            label={formDictionary.label.phone + ' *'}
                                            formik={formik}
                                        />
                                        <FormComponent
                                            control='input'
                                            name='password'
                                            type='password'
                                            label={formDictionary.label.password + ' *'}
                                            formik={formik}
                                        />
                                    </Fragment>
                                )
                            }
                            {
                                loading.lazy ?
                                    <Skeleton width='100%' height='55px' className='button__skeleton' />
                                    : <button type='submit'>{titleDictionary["login"]}</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </FormWrapper>
    )
}

export default React.memo(MasterLoginForm)
