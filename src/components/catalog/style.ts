import { column_center, row_center } from "@/src/styles";
import styled from "styled-components";

export const CatalogAccordionBodyInner = styled.div`
    width: 100%;
    padding: 15px;
    ${column_center};
    position: relative;
    .note{
        width: 100%;
        padding: 12px;
        font-size: 12px;
        background-color: ${props => props.theme.bg_color_4};
        @media (width >= 768px){
            font-size: 14px;
        }
    }
`

export const ColorWrapper = styled.div`
    width: 100%;
    padding: 20px 0;
    gap: 20px;
    .color-item{
        width: 50%;
        display: inline-block;
        vertical-align: top;
        margin-bottom: 20px;
        padding: 0 10px;
        &.secondary{
            
            .image{
                border-radius: 20px 20px 0 0;
                box-shadow: 0 0 10px ${props => props.theme.shadow_color_1};
                img{
                    border-radius: 20px 20px 0 0;
                    box-shadow: 0 0 10px ${props => props.theme.shadow_color_1};
                    max-height: 150px;
                }
            }
            .info{
                box-shadow: 0 0 10px ${props => props.theme.shadow_color_1};
                background-color: ${props => props.theme.bg_color_1};
                border-radius: 0 0 20px 20px;
                padding: 10px;
            }
        }
        @media (width >= 576px){
            width: 33.3333%;
        }
        @media (width >= 768px){
            width: 25%;
        }
        @media (width >= 1200px){
            width: 20%;
        }
        @media (width >= 1400px){
            width: 16.6666%;
        }
        .image{
            width: 100%;
            img{
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }
        .info{
            padding: 15px 10px;
            ${column_center};
            font-size: 12px;
            text-align: center;
            @media (width >= 768px){
                font-size: 14px;
            }
        }
    }
    .subcolors{
        width: 100%;
        float: left;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap: 10px;
        padding: 25px 10px;
        background-color: ${props => props.theme.bg_color_4};
        transition: all 0.3s;
        margin-bottom: 20px;
        @media (width >= 576px){
            grid-template-columns: repeat(4,1fr);
        }
        @media (width >= 1200px){
            ${row_center};
        }
        .color-item{
            width: 100%;
            margin: 0;
            &.secondary{
                .info{
                    box-shadow: none;
                }
            }
            @media (width >= 1200px){
                width: 20%;
            }
            @media (width >= 1200px){
                width: 16%;
            }
        }
    }
`;