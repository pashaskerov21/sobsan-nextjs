'use client'
import React from 'react'
import { ErrorMessage, Field } from 'formik'
import { FormikProps } from "formik";
import { FormComponentWrapper } from '../style';

export type InputControlProps = {
    name: string,
    label?: string,
    type?: "text" | "number" | "email" | "password",
    placeholder?: string,
    value?: string,
    formik?: FormikProps<any>,
}

const Input: React.FC<InputControlProps> = ({...rest }) => {
    const [invalidStatus, setInvalidStatus] = React.useState(false);
    React.useEffect(() => {
        if (rest.formik?.errors[rest.name] && rest.formik.touched[rest.name]) {
            setInvalidStatus(true)
        } else {
            setInvalidStatus(false);
        }
    }, [rest.formik])
    return (
        <FormComponentWrapper className={invalidStatus ? 'invalid' : ''} $hasValue={rest.formik?.values[rest.name] || rest.formik?.values[rest.name].length > 0 ? true : false}>
            <Field id={`input-${rest.type}-${rest.name}`} name={rest.name} type={rest.type} placeholder={rest.placeholder} value={rest.formik?.values.name} />
            <label htmlFor={`input-${rest.type}-${rest.name}`}>{rest.label}</label>
            <ErrorMessage name={rest.name}>
                {(message: string) => (
                    <div className='invalid__message'>{message}</div>
                )}
            </ErrorMessage>
        </FormComponentWrapper>
    )
}

export default React.memo(Input)
