import { ErrorMessage, Field, FormikProps } from 'formik'
import React, { Fragment } from 'react'
import { FormBoxComponentWrapper } from '../style'

export type RadioControlProps = {
  label: string,
  name: string,
  type: "radio",
  value: string,
  checked?: boolean,
  handleInputChange?: (value: string) => void,
  formik?: FormikProps<any>,
}

const Radio: React.FC<RadioControlProps> = ({ ...rest }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    rest.formik?.handleChange(e);
    rest.handleInputChange?.(e.target.value);
  };
  return (
    <Fragment>
      <FormBoxComponentWrapper className="radio__component">
        <Field id={`${rest.name}-${rest.value}`} name={rest.name} type={rest.type} value={rest.value} checked={rest.checked} onChange={handleChange} />
        <label htmlFor={`${rest.name}-${rest.value}`}>{rest.label}</label>
      </FormBoxComponentWrapper>
      <ErrorMessage name={rest.name}>
        {(message: string) => (
          <div className='invalid__message'>{message}</div>
        )}
      </ErrorMessage>
    </Fragment>
  )
}

export default React.memo(Radio);
