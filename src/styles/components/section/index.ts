import styled, { css } from "styled-components";


type SectionProps = {

    $bgColor?: string, 

    $py?: number,
    $py_sm?: number,
    $py_md?: number,
    $py_lg?: number,
    $py_xl?: number,
    $py_xxl?: number,

    $mt?: number,
    $mt_sm?: number,
    $mt_md?: number,
    $mt_lg?: number,
    $mt_xl?: number,
    $mt_xxl?: number,

    $mb?: number,
    $mb_sm?: number,
    $mb_md?: number,
    $mb_lg?: number,
    $mb_xl?: number,
    $mb_xxl?: number,
}

const Section = styled.section<SectionProps>`
    width: 100%;
    position: relative;
    ${
        props => props.$bgColor && css`
            background-color: ${props.$bgColor};
        `
    }
    ${
        props => props.$py && css`
            padding-top: ${props.$py}px;
            padding-bottom: ${props.$py}px;
        `
    }
    ${
        props => props.$py_sm && css`
            @media (min-width: 576px){
                padding-top: ${props.$py_sm}px;
                padding-bottom: ${props.$py_sm}px;
            }
        `
    }
    ${
        props => props.$py_md && css`
            @media (min-width: 768px){
                padding-top: ${props.$py_md}px;
                padding-bottom: ${props.$py_md}px;
            }
        `
    }
    ${
        props => props.$py_lg && css`
            @media (min-width: 992px){
                padding-top: ${props.$py_lg}px;
                padding-bottom: ${props.$py_lg}px;
            }
        `
    }
    ${
        props => props.$py_xl && css`
            @media (min-width: 1200px){
                padding-top: ${props.$py_xl}px;
                padding-bottom: ${props.$py_xl}px;
            }
        `
    }
    ${
        props => props.$py_xxl && css`
            @media (min-width: 1400px){
                padding-top: ${props.$py_xxl}px;
                padding-bottom: ${props.$py_xxl}px;
            }
        `
    }

    ${
        props => props.$mt && css`
            margin-top: ${props.$mt}px;
        `
    }
    ${
        props => props.$mt_sm && css`
            @media (min-width: 576px){
                margin-top: ${props.$mt_sm}px;
            }
        `
    }
    ${
        props => props.$mt_md && css`
            @media (min-width: 768px){
                margin-top: ${props.$mt_md}px;
            }
        `
    }
    ${
        props => props.$mt_lg && css`
            @media (min-width: 992px){
                margin-top: ${props.$mt_lg}px;
            }
        `
    }
    ${
        props => props.$mt_xl && css`
            @media (min-width: 1200px){
                margin-top: ${props.$mt_xl}px;
            }
        `
    }
    ${
        props => props.$mt_xxl && css`
            @media (min-width: 1400px){
                margin-top: ${props.$mt_xxl}px;
            }
        `
    }
    ${
        props => props.$mb && css`
            margin-bottom: ${props.$mb}px;
        `
    }
    ${
        props => props.$mb_sm && css`
            @media (min-width: 576px){
                margin-top: ${props.$mb_sm}px;
            }
        `
    }
    ${
        props => props.$mb_md && css`
            @media (min-width: 768px){
                margin-top: ${props.$mb_md}px;
            }
        `
    }
    ${
        props => props.$mb_lg && css`
            @media (min-width: 992px){
                margin-top: ${props.$mb_lg}px;
            }
        `
    }
    ${
        props => props.$mb_xl && css`
            @media (min-width: 1200px){
                margin-top: ${props.$mb_xl}px;
            }
        `
    }
    ${
        props => props.$mb_xxl && css`
            @media (min-width: 1400px){
                margin-top: ${props.$mb_xxl}px;
            }
        `
    }
    &.room__section{
        animation: room-background 10s linear infinite;
    }
`;

export default Section;