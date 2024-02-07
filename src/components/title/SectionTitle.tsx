import React from 'react'
import { SectionTitleWrapper } from './style'

const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
        <SectionTitleWrapper>
            {title}
        </SectionTitleWrapper>
    )
}

export default React.memo(SectionTitle)
