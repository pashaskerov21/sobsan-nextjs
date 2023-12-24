import { Color } from '@/src/class'
import { ColorTranslateDataType, ColorTranslationProps } from '@/src/types'
import React from 'react'

const ColorTranslation:React.FC<ColorTranslationProps> = ({
    activeColorData,
    activeLocale,
    colorData,
    colorTranslateData,
}) => {
    const color = new Color(colorData, colorTranslateData);
    const activeTranslateData: ColorTranslateDataType | undefined = color.getTranslate(activeColorData.id, activeLocale);
  if(activeTranslateData){
    return (
        <React.Fragment>{activeTranslateData.title}</React.Fragment>
      )
  }else{
    return (
        <React.Fragment></React.Fragment>
      )
  }
}

export default React.memo(ColorTranslation)
