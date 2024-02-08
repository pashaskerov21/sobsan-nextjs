import React from 'react'
import { SectionTitleWrapper } from './style'

const SectionTitle: React.FC<{ title: string, className?: 'color__white' }> = ({ title, className }) => {
    return (
        <SectionTitleWrapper className={className}>
            {title}
        </SectionTitleWrapper>
    )
}

export default React.memo(SectionTitle)
