'use client'
import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { LoadingType, LocaleType } from '@/src/types'
import { Form, Formik, FormikHelpers } from 'formik'
import Swal from 'sweetalert2'
import { FormWrapper } from './style'
import Skeleton from '../skeleton/Skeleton'
import FormComponent from './FormComponent'

type FormProps = {
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
type ContactFormValuesType = {
    fullName: string,
    email: string,
    message: string,
}

const ContactForm: React.FC<FormProps> = ({
    activeLocale,
    formDictionary,
    generalDictionary,
    loading,
    titleDictionary,
}) => {
    const initialValues: ContactFormValuesType = {
        fullName: '',
        email: '',
        message: '',
    };
    const validationSchema = Yup.object({
        fullName: Yup.string().required(`${formDictionary.error.fullName_required}`),
        email: Yup.string().email(`${formDictionary.error.email_format}`).required(`${formDictionary.error.email_required}`),
        message: Yup.string().required(`${formDictionary.error.message_required}`),
    });

    const onSubmit = (values: ContactFormValuesType, actions: FormikHelpers<ContactFormValuesType>) => {
        Swal.fire({
            icon: "success",
            title: generalDictionary["congratulations"],
            text: generalDictionary["message_send_successfull"],
        });
        actions.resetForm();
    }
    return (
        <FormWrapper className='contact__form'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formik => (
                        <Form>
                            {
                                loading.lazy ? (
                                    <Fragment>
                                        <Skeleton width='100%' height='70px' />
                                        <Skeleton width='100%' height='70px' />
                                        <Skeleton width='100%' height='200px' />
                                        <Skeleton width='100%' height='55px' />
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <div className="contact__text">{generalDictionary['contact_info_text']}</div>
                                        <FormComponent
                                            control='input'
                                            name='fullName'
                                            type='text'
                                            label={formDictionary.label.fullName + ' *'}
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
                                            control='textarea'
                                            name='message'
                                            label={formDictionary.label.message + ' *'}
                                            formik={formik}
                                        />
                                        <button type='submit'>{generalDictionary["send"]}</button>
                                    </Fragment>
                                )
                            }
                        </Form>
                    )
                }
            </Formik>
        </FormWrapper>
    )
}

export default React.memo(ContactForm)
