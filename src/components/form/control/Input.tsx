'use client'
import React from 'react'
import { ErrorMessage, Field } from 'formik'
import { FormikProps } from "formik";
import { FormComponentWrapper } from '../style';

export type InputControlProps = {
    label: string,
    name: string,
    type?: "text" | "number" | "email" | "password",
    placeholder?: string,
    formik?: FormikProps<any>,
}

const Input: React.FC<InputControlProps> = ({ label, name, ...rest }) => {
    const [invalidStatus, setInvalidStatus] = React.useState(false);
    React.useEffect(() => {
        if (rest.formik?.errors[name] && rest.formik.touched[name]) {
            setInvalidStatus(true)
        } else {
            setInvalidStatus(false);
        }
    }, [rest.formik])
    return (
        <FormComponentWrapper className={invalidStatus ? 'invalid' : ''} $hasValue={rest.formik?.values[name].length > 0 ? true : false}>
            <Field id={name} name={name} {...rest} />
            <label htmlFor={name}>{label}</label>
            <ErrorMessage name={name}>
                {(message: string) => (
                    <div className='invalid__message'>{message}</div>
                )}
            </ErrorMessage>
        </FormComponentWrapper>
    )
}

export default React.memo(Input)
