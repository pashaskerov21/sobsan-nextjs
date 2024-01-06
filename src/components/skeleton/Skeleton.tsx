'use client'
import React from 'react'
import { SkeletonElement } from './style'

type SkeletonProps = {
    width?: string,
    max_width?: string,
    min_width?:string,
    width_sm?: string,
    width_md?: string,
    width_lg?: string,
    width_xl?: string,
    width_xxl?: string,
    height?: string,
    height_sm?: string,
    height_md?: string,
    height_lg?: string,
    height_xl?: string,
    height_xxl?: string,
    radius?: string,
    className?: string,
    margin?: string,
    padding?: string,
}

const Skeleton: React.FC<SkeletonProps> = ({
    height,
    height_sm,
    height_md,
    height_lg,
    height_xl,
    height_xxl,
    max_width,
    min_width,
    width,
    width_sm,
    width_md,
    width_lg,
    width_xl,
    width_xxl,
    radius,
    className,
    margin,
    padding,
}) => {
    return (
        <React.Fragment>
            <SkeletonElement
                className={className}
                $height={height}
                $height_sm={height_sm}
                $height_md={height_md}
                $height_lg={height_lg}
                $height_xl={height_xl}
                $height_xxl={height_xxl}
                $max_width={max_width}
                $min_width={min_width}
                $width={width}
                $width_sm={width_sm}
                $width_md={width_md}
                $width_lg={width_lg}
                $width_xl={width_xl}
                $width_xxl={width_xxl}
                $radius={radius}
                $margin={margin}
                $padding={padding}
            />
        </React.Fragment>
    )
}

export default React.memo(Skeleton)
