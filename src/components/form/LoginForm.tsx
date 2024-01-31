'use client'
import React from 'react'
import * as Yup from 'yup'
import { LoadingType, LocaleType } from '@/src/types'
import { Form, Formik, FormikHelpers } from 'formik'
import FormComponent from './FormComponent'
import { FormWrapper } from './style'
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
type LoginFormValueType = {
    email: string,
    password: string,
}

const LoginForm: React.FC<FormProps> = ({
    activeLocale,
    formDictionary,
    loading,
    titleDictionary,
}) => {
    const initialValues: LoginFormValueType = {
        email: '',
        password: '',
    }
    const validationSchema = Yup.object({
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
    })

    const onSubmit = (values: LoginFormValueType, actions: FormikHelpers<LoginFormValueType>) => {
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
                            <button type='submit'>{titleDictionary["login"]}</button>
                        </Form>
                    )
                }
            </Formik>
        </FormWrapper>
    )
}

export default React.memo(LoginForm)
