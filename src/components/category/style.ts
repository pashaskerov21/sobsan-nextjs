import { column_align_start, column_center, column_start, row_between, row_justify_end } from "@/src/styles";
import { css, styled } from "styled-components";

type CategoryWrapperProps = {
    $parentComponent: 'header' | 'filters',
}

export const CategoryWrapper = styled.div<CategoryWrapperProps>`
    width: 100%;
    ${column_align_start};
    .category-item{
        width: 100%;
        ${column_center};
        .main-row{
            width: 100%;
            ${row_between};
            border-bottom: 1px solid ${props => props.theme.border_color_1};
            padding: 8px 12px;
            position: relative;
            a{
                display: block;
                text-transform: capitalize;
                font-size: 12px;
                &:hover{
                    color: ${props => props.theme.color_1};
                }
                @media (width >= 400px){
                    font-size: 14px;
                }
            }
            .arrow-btn{
                min-width: 60px;
                height: 100%;
                z-index: 10;
                ${row_justify_end};
                color: ${props => props.theme.color_1};
                cursor: pointer;
                flex-grow: 1;
                &.active{
                    svg{
                        transition: all 0.2s;
                        transform: rotate(90deg);
                    }
                }
            }
            &:hover{
                background-color: ${props => props.theme.color_1};
                a{
                    color: #fff;
                }
                .arrow-btn{
                    color: #fff;
                }
            }
            &.active{
                background-color: ${props => props.theme.color_1};
                a{
                    color: #fff;
                }
                .arrow-btn{
                    color: #fff;
                }
            }
        }
    }
    ${props => props.$parentComponent === "header" && css`
        @media (width >= 1200px){
            ${row_between};
            gap: 20px;
            align-self: stretch;
            height: 100%;
            min-width: 750px;
            background-color: ${props => props.theme.bg_color_1};
            .category-item{
                width: auto;
                height: 100%;
                .main-row{
                    border: none;
                    padding: 0;
                    &:hover{
                        background-color: transparent;
                        padding: 0;
                        a{
                            color: ${props => props.theme.color_1};
                        }
                    }
                    .arrow-btn{
                        display: none;
                    }
                }
            }
        }
    `};
    ${props => props.$parentComponent === "filters" && css`
        @media (width >= 992px){
            border-left: 1px solid ${props => props.theme.border_color_1};
            border-right: 1px solid ${props => props.theme.border_color_1};
            .category-item{
                position: relative;
                .main-row{
                    .arrow-btn{
                        &.active{
                            svg{
                                transform: rotate(0);
                            }
                        }
                    }
                }
            }
        }
    `}
`;

type AltCategoryWrapperProps = {
    $active: boolean,
    $level: number;
    $parentComponent: 'header' | 'filters',
}

export const AltCategoryWrapper = styled.div<AltCategoryWrapperProps>`
    z-index: 100;
    width: 100%;
    display: ${props => props.$active ? 'block' : 'none'};
    .main-row{
        a{
            padding-left: ${props => props.$level * 15}px !important;
        }
    };
    ${props => props.$parentComponent === "header" && css`
        ${props.$level === 1 ? css`
        @media (width >= 1200px){
                position: absolute;
                top: 90%;
                left: 0;
                width: 100%;
                min-height: 300px;
                border-radius: 20px;
                box-shadow: 0 0 10px ${props => props.theme.shadow_color_1};
                padding: 30px;
                display: ${props.$active ? 'grid' : 'none'};
                grid-template-columns: repeat(3,1fr);
                background-color: ${props => props.theme.bg_color_1};
                @media (width >= 1400px){
                    grid-template-columns: repeat(4,1fr);
                }   
                .category-item{
                    ${column_start};          
                    .main-row{
                        margin-bottom: 15px !important;           
                        a{
                            font-size: 18px;
                            font-weight: 600;
                            text-decoration: underline;
                        }
                    }
                }
            }
        ` : css`
        @media (width >= 1200px){
                display: block;
                .category-item{
                    height: auto;   
                    .main-row{
                        margin-bottom: 2px !important;
                        a{
                            font-size: 14px !important;
                            font-weight: 500 !important;
                            text-decoration: none !important;
                        }
                    }
                }
            } 
        `}
    `};
    ${props => props.$parentComponent === "filters" && css`
        @media (width >= 992px){
            /* display: block; */
            position: absolute;
            top: 0;
            left: 100%;
            background-color: ${props => props.theme.bg_color_1};
            border: 1px solid ${props => props.theme.border_color_1};
            border-bottom: none;
            .main-row{
                a{
                    padding-left: 0;
                }
            }
        }
        
        
    `}
`;