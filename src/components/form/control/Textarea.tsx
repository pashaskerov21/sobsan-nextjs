'use client'
import React from 'react'
import { ErrorMessage, Field } from 'formik'
import { FormikProps } from "formik";
import { FormComponentWrapper } from '../style';


export type TextareaControlProps = {
    name: string,
    label?: string,
    placeholder?: string,
    formik?: FormikProps<any>,
    value?: string,
}

const Textarea: React.FC<TextareaControlProps> = ({ ...rest }) => {
    const [invalidStatus, setInvalidStatus] = React.useState(false);
    React.useEffect(() => {
        if (rest.formik?.errors[rest.name] && rest.formik.touched[rest.name]) {
            setInvalidStatus(true)
        } else {
            setInvalidStatus(false);
        }
    }, [rest.formik])
    return (
        <FormComponentWrapper className={invalidStatus ? 'invalid' : ''} $hasValue={rest.formik?.values[rest.name] || rest.formik?.values[rest.name]?.length > 0 ? true : false}>

            {rest.value ?
                <Field as="textarea" id={`text-area-${rest.name}`} name={rest.name} value={rest.value} /> :
                <Field as="textarea" id={`text-area-${rest.name}`} name={rest.name} />}
            <label htmlFor={`text-area-${rest.name}`}>{rest.label}</label>
            <ErrorMessage name={rest.name}>
                {(message: string) => (
                    <div className='invalid__message'>{message}</div>
                )}
            </ErrorMessage>
        </FormComponentWrapper>
    )
}

export default React.memo(Textarea)
