'use client'
import React from 'react'
import Input, { InputControlProps } from './control/Input'
import Textarea, { TextareaControlProps } from './control/Textarea'

type FormControlProps = | InputControlProps | TextareaControlProps

const FormControl: React.FC<FormControlProps & { control: "input" | "textarea" }> = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
      return <Textarea {...rest} />
    default:
      return null
  }
}

export default React.memo(FormControl)
