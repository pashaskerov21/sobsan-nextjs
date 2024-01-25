import { column_center, column_justify_start, row_center } from "@/src/styles";
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

export const CatalogModalWrapper = styled.div`
    z-index: 900;
    width: 95%;
    max-width: 900px;
    min-height: 200px;
    max-height: 90vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: ${props => props.theme.bg_color_1};
    border-radius: 10px;
    opacity: 0;
    animation: catalogmodalanimation 0.3s ease forwards;
    overflow: auto;
    .catalog__modal__close__button{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 1px solid ${props => props.theme.text_color_2};
        background-color: ${props => props.theme.bg_color_1};
        ${row_center};
        font-size: 18px;
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        transition: all 0.3s;
        z-index: 99;
        
        &:hover{
            background-color: ${props => props.theme.color_1};
            border-color: ${props => props.theme.color_1};
            color: #fff;
        }
        @media (min-width: 576px){
            top: 15px;
            right: 15px;
        }
        
    }
    .catalog__modal__inner{
        width: 100%;
        /* max-height: 90vh; */
        
        ${column_center};
        gap: 15px;
        padding: 20px 10px;
    }
    .color__swiper{
        width: 100%;
        padding-bottom: 50px;
        .swiper-button-prev,
        .swiper-button-next{
            color: ${props => props.theme.text_color_2};
            &::after{
                display: none;
            }
        }
        .color__slide{
            width: 100%;
            ${row_center};
            img{
                width: 150px;
                height: 150px;
                object-fit: contain;
            }
        }
    }
    .catalog__title{
        width: 100%;
        ${row_center};
        text-align: center;
        padding: 15px;
        min-height: 40px;
        font-size: 18px;
        font-weight: 600;
        background: url('/design/large-drop-bg.webp') #ed3237 !important;
        background-repeat: no-repeat;
        background-size: cover;
        color: #ffffff !important;
    }
    .catalog__color__wrapper{
        width: 100%;
        max-height: 150px;
        overflow: auto;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0px;
        @media (min-width: 576px){
            grid-template-columns: repeat(3, 1fr);
        }
        @media (min-width: 768px){
            grid-template-columns: repeat(5, 1fr);
            max-height: 250px;
        }
        .color__item{
            width: 100%;
            ${column_center};
            gap: 5px;
            .color__item__image{
                width: 100%;
                ${row_center};
                padding: 10px;
                img{
                    width: 100px;
                    height: 100px;
                    object-fit: contain;
                }
            }
            .color__item__title{
                width: 100%;
                ${column_justify_start};
                min-height: 40px;
                font-size: 14px;
                font-weight: 500;
            }
        }
    }
    .catalog__modal__text{
        width: 100%;
        font-style: italic;
        font-size: 12px;
        opacity: 0.7;
    }
    .catalog__modal__confirm__button{
        width: 100%;
        min-height: 45px;
        padding: 12px;
        background-color: ${props => props.theme.color_1};
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        ${row_center};
    }
`