import React from 'react'
import { LocaleType } from '@/src/types'
import { redirect } from 'next/navigation'

const MediaPage = ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    redirect(`/${lang}/media/actions`)
}

export default MediaPage
