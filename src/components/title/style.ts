import { column_align_start, column_center, row_between, row_center, row_justify_start } from "@/src/styles";
import styled from "styled-components";

export const PageTitleWrapper = styled.div`
    width: 100%;
    position: relative;
    /* margin-bottom: 20px; */
    .inner{
        width: 100%;
        ${column_center};
        text-align: center;
        padding: 15px 0;
        gap: 10px;
        @media (width >= 992px){
            ${column_align_start};
            text-align: start;
            border-bottom: 1px solid ${props => props.theme.border_color_1};
        }
        .title{
            text-transform: capitalize;
            font-weight: 500;
        }
        .breadcrumbs{
            width: 100%;
            ${row_center};
            flex-wrap: wrap;
            gap: 3px;
            @media (width >= 992px){
                ${row_justify_start}
            }
            a{
                text-transform: capitalize;
                font-size: 12px;
                color: ${props => props.theme.text_color_9};
                display: block;
                transition: all 0.3s;
                text-align: center;
                &:hover{
                    opacity: 1;
                    color: ${props => props.theme.color_1};
                }
                @media (width >= 992px){
                    text-align: start;
                }
            }
            svg{
                font-size: 10px;
                display: block;
                color: ${props => props.theme.text_color_9};
                opacity: 0.6;
            }
        }
        .pagetitle__bottom{
            width: 100%;
            ${column_center};
            gap: 5px;
            @media (min-width: 992px){
                ${row_between};
                gap: 30px;
            }
        }
        .product__buttons{
            ${row_center};
            gap: 10px;
            .product__button{
                font-size: 26px;
                display: block;
                cursor: pointer;
                &.active{
                    color: ${props => props.theme.color_1};
                }
            }
        }
    }
`

export const SectionTitleWrapper = styled.h2`
    width: 100%;
    text-align: center;
    ${row_center};
    margin-bottom: 25px;
    @media (width >= 992px){
        text-align: start;
        justify-content:flex-start;
    }
`