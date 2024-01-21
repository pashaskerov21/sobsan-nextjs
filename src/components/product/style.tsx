import { column_align_start, column_center, column_justify_start, row_between, row_center, row_justify_start } from "@/src/styles";
import styled, { css } from "styled-components";

export const ProductCardWrapper = styled.div<{ $productsView?: "grid" | "list" }>`
    width: 100%;
    max-width: 350px;
    padding: 12px 12px 30px;
    ${column_center};
    position: relative;
    border: 1px solid ${props => props.theme.border_color_1};
    transition: all 0.3s;
    gap: 10px;
    margin: 10px 0;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 5px ${props => props.theme.shadow_color_1};
    }
    .card__top,
    .card__center,
    .card__bottom{
        width: 100%;
        ${column_center};
    }
    .product__badges{
        width: 100%;
        ${row_justify_start};
        gap: 10px;
        flex-wrap: wrap;
        min-height: 25px;
        margin-bottom: 10px;
        .product__badge{
            padding: 4px 8px;
            ${row_center};
            text-align: center;
            background-color: ${props => props.theme.color_1};
            color: #ffffff;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 5px;
            &.secondary{
                background-color: ${props => props.theme.color_2};
            }
        }
    }
    .product__image{
        width: 100%;
        height: 200px;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .product__brand{
        font-weight: 600;
        opacity: 0.7;
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
    }
    .product__title{
        text-align: center;
        font-weight: 600;
        min-height: 50px;
        margin-bottom: 5px;
    }
    .product__description{
        text-align: center;
        font-size: 13px;
        min-height: 80px;
        padding: 0 10px;
    }
    .product__price{
        ${row_center};
        gap: 15px;
        margin-bottom: 15px;
        .old_price{
            font-size: 18px;
            text-decoration: line-through;
            opacity: 0.5;
        }
        .main_price{
            color: ${props => props.theme.color_1};
            font-weight: 600;
            font-size: 18px;
        }
    }
    .product__stock{
        ${row_center};
        text-align: center;
        gap: 10px;
        opacity: 0.6;
        .icon{
            width: 20px;
            height: 20px;
            background-color: ${props => props.theme.color_3};
            border-radius: 50%;
            ${row_center};
            color: #ffffff;
            font-size: 12px;
        }
        .value{
            font-size: 14px;
        }
    }
    .card__buttons{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4,1fr);
        gap: 10px;
        margin-top: 20px;
        grid-template-areas: 
        "b b b b"
        "c c c w";
        div{
            &:nth-child(1){
                grid-area: b;
            }
            &:nth-child(2){
                grid-area: c;
            }
            &:nth-child(3){
                grid-area: w;
            }
        }
        .card__button{
            width: 100%;
            ${row_center};
            border-radius: 5px;
            min-height: 50px;
            border: 1px solid ${props => props.theme.border_color_1};
            padding: 10px;
            cursor: pointer;
            transition: box-shadow 0.3s;
            gap: 10px;
            .icon{
                color: ${props => props.theme.color_1};
            }
            .label{
                font-weight: 500;
                font-size: 14px;
            }
            &:hover{
                box-shadow: 0 0 5px ${props => props.theme.shadow_color_1};
            }
            &.comparison__button{
                .icon{
                    font-size: 24px;
                }
                &.active{
                    background-color: ${props => props.theme.color_1};
                    color: #ffffff;
                    .icon{
                        color: #ffffff;
                    }
                }
            }
            &.basket__button{
                ${row_between};
                background-color: ${props => props.theme.color_1};
                color: #ffffff;
                &:hover{
                    animation: pulse-red 1s ease infinite;
                }
                .icon{
                    color: #ffffff;
                    font-size: 24px;
                    transform: rotateY(-180deg);
                }
                .active-icon{
                    font-size: 28px;
                    opacity: 0;
                    animation: basket-icon 0.5s ease forwards;
                    display: none;
                }
                
                &.active{
                    justify-content: center;
                    background-color: ${props => props.theme.color_3};
                    .label,
                    .icon{
                        display: none
                    }
                    .active-icon{
                        display: block;
                    }
                    &:hover{
                        animation: pulse-green 1s ease infinite;
                    }
                }
            }
        }
    }

    ${props => props.$productsView === "list" && css`
        min-width: 900px;
        flex-direction: row;
        justify-content: flex-start;
        max-width: 100%;
        padding-bottom: 12px;
        .card__top{
            align-items: flex-start;
            max-width: 180px;
        }
        .card__center{
            align-items: flex-start;
        }
        .card__bottom{
            align-items: flex-start;
        }
        .product__badges{
            ${column_align_start};
        }
        .product__image{
            width: 150px;
            height: 150px;
        }
        .product__brand,
        .product__title,
        .product__description{
            text-align: start;
            padding: 0;
        }
        .card__buttons{
            grid-template-columns: repeat(3,1fr);
            grid-template-areas: 
            "b c w";
            .card__button{
                justify-content: center !important;
                .label{
                    display: none;
                }
                &.basket__button{
                    &.active{
                        .icon{
                            display: block;
                        }
                        .active-icon{
                            display: none;
                        }
                    }
                }
            }
        }
    `}
`;

export const LeftFilterWrapper = styled.div`
    width: 100%;
    max-width: 400px;
    background-color: ${props => props.theme.bg_color_1};
    height: 100vh;
    overflow: auto;
    position: fixed;
    top: 0;
    left: -100%;
    opacity: 0;
    transition: all 0.3s;
    z-index: 350;
    ${column_justify_start};
    gap: 20px;
    padding: 20px 15px;
    &.active{
        left: 0;
        opacity: 1;
    }
    .lfw-header{
        width: 100%;
        ${row_between};
        
        .lfwh-title{
            font-weight: 600;
            font-size: 18px;
            text-transform: capitalize;
        }
        .close-button{
            min-width: 30px;
            min-height: 30px;
            border: 1px solid ${props => props.theme.text_color_7};
            border-radius: 50%;
            ${row_center};
            color: ${props => props.theme.text_color_7};
            font-size: 16px;
            cursor: pointer;
            &:hover{
                background-color: ${props => props.theme.text_color_7};
                color: ${props => props.theme.text_color_8};
            }
        }
    }
    .lfw-body{
        width: 100%;
        ${column_center};
        gap: 30px;
    }
    .product-filter-form{
        width: 100%;
        ${column_center};
        gap: 30px;
    }
    .filter-item{
        width: 100%;
        ${column_align_start};
        gap: 10px;
        .filter-title{
            font-weight: 600;
        }
    }
    .range-filter {
        width: 100%;
        position: relative;
        margin-top: 10px;
        ${column_center};

        .range-inputs {
            position: relative;
            width: 100%;
            min-height: 20px;
            margin-bottom: 15px;

            input[type='range'] {
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                outline: none;
                -webkit-appearance: none;

                &::-webkit-slider-runnable-track {
                    background: ${props => props.theme.color_1};
                    width: 100%;
                    height: 6px;
                }

                &::-webkit-slider-thumb {
                    position: relative;
                    width: 20px;
                    height: 20px;
                    background-color: #fff;
                    box-shadow: 0 0 5px ${props => props.theme.color_1};
                    color: ${props => props.theme.color_1};
                    z-index: 2;
                    margin-top: -7px;
                    -webkit-appearance: none;
                    border-radius: 50%;
                    transition: all 0.2s;
                    border: 1px solid transparent;

                    &:hover {
                        border-color: ${props => props.theme.color_1};
                        box-shadow: none;
                    }
                }
            }
        }

        .result-inputs {
            width: 100%;
            ${row_between}

            .item {
                ${row_center};
                gap: 5px;
                span{
                    font-weight: 600;
                }
            }

            input {
                width: 65px;
                text-align: center;
                outline: none;
                border: none;
                border-radius: 5px;
                padding: 5px;
                font-weight: 600;
                background-color: ${props => props.theme.color_1};
                color: #fff;

                &::-webkit-inner-spin-button,
                &::-webkit-outer-spin-button {
                    display: none;
                }
            }
        }
    }
    .filter-checkbox-buttons{
        width: 100%;
        ${row_justify_start};
        gap: 15px;
        flex-wrap: wrap;
        .filter-checkbox-button{
            input{
                &:checked{
                    ~label{
                        background-color: ${props => props.theme.color_1};
                        color: #fff;
                    }
                }
            }
            label{
                ${row_center};
                padding: 10px 20px;
                background-color: ${props => props.theme.bg_color_9};
                text-align: center;
                border-radius: 10px;
                user-select: none;
                transition: all 0.2s;
                cursor: pointer;
            }
        }
    }
    .form-buttons {
        width: 100%;
        ${row_center};
        padding-bottom: 50px;

        button {
            width: 100%;
            padding: 15px;
            border-radius: 10px;
            

            &.submit {
                background-color: ${props => props.theme.color_1};
                color: #fff;
                margin-right: 5px;
                border: 1px solid ${props => props.theme.color_1};
            }

            &.reset {
                margin-left: 5px;
                border: 1px solid ${props => props.theme.border_color_3};
                color: ${props => props.theme.text_color_7};
                &:hover {
                    border-color: #23272B;
                    background-color: #23272B;
                    color: #fff;
                    animation: reset-btn-animation 0.2s ease 4;
                }
            }
        }
    }
    @media (width >= 992px){
        position: relative;
        left: 0;
        opacity: 1;
        padding: 0;
        max-width: 320px;
        height: auto;
        overflow: visible;
        z-index: 1;
        .lfw-header{
            display: none;
        }
    }
`;



export const ProductGridWrapper = styled.div<{ $productsView: "grid" | "list" }>`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    place-items: center;
    ${props => props.$productsView === "grid" && css`
        @media (width >= 768px){
            grid-template-columns: 1fr 1fr;
        }
        @media (width >= 1200px){
            grid-template-columns: 1fr 1fr 1fr;
        }
    `}
    ${
        props => props.$productsView === "list" && css`
            overflow-x: auto;
        `
    }
`;

export const ProductPaginationWrapper = styled.div`
    width: 100%;
    ${row_center};
    gap: 10px;
    .numbers{
        ${row_center};
        gap: 10px;
        flex-wrap: wrap;
    }
    button{
        width: 30px;
        height: 30px;
        border-radius: 10px;
        border: 1px solid ${props => props.theme.border_color_1};
        color: ${props => props.theme.color_1};
        font-size: 12px;
        ${row_center};
        &.active{
            background-color: ${props => props.theme.color_1};
            color: #fff;
        }
    }
`