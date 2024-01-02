import { Color } from '@/src/class'
import { ColorDataType, ColorTranslateDataType, ColorTranslationProps, LocaleType } from '@/src/types'
import React from 'react'

type TranslationProps = {
  activeLocale: LocaleType,
  activeColorData: ColorDataType,
  colorData: ColorDataType[],
  colorTranslateData: ColorTranslateDataType[],
}

const ColorTranslation: React.FC<TranslationProps> = ({
  activeColorData,
  activeLocale,
  colorData,
  colorTranslateData,
}) => {
  const color = new Color(colorData, colorTranslateData);
  const activeTranslateData: ColorTranslateDataType | undefined = color.getTranslate(activeColorData.id, activeLocale);
  if (activeTranslateData) {
    return (
      <React.Fragment>{activeTranslateData.title}</React.Fragment>
    )
  } else {
    return (
      <React.Fragment></React.Fragment>
    )
  }
}

export default React.memo(ColorTranslation)
