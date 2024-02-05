'use client'
import React from 'react'
import Input, { InputControlProps } from './control/Input'
import Radio, { RadioControlProps } from './control/Radio'
import Textarea, { TextareaControlProps } from './control/Textarea'

type FormControlProps =
  | InputControlProps
  | TextareaControlProps
  | RadioControlProps

const FormControl: React.FC<FormControlProps & { control: "input" | "textarea" | "radio" }> = ({ ...rest }) => {
  switch (rest.control) {
    case 'input':
      return <Input {...rest as InputControlProps} />
    case 'textarea':
      return <Textarea {...rest as TextareaControlProps} />
    case 'radio':
      return <Radio {...rest as RadioControlProps} />
    default:
      return null
  }
}

export default React.memo(FormControl)
