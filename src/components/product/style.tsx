import { column_center, row_between, row_center, row_justify_start } from "@/src/styles";
import styled from "styled-components";

export const ProductCardWrapper = styled.div`
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
        width: 100%;
        text-align: center;
        font-weight: 600;
        min-height: 50px;
        margin-bottom: 5px;
    }
    .product__description{
        width: 100%;
        text-align: center;
        font-size: 13px;
        min-height: 80px;
        padding: 0 10px;
    }
    .product__price{
        width: 100%;
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
        width: 100%;
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
                }
                
                &.active{
                    justify-content: center;
                    background-color: ${props => props.theme.color_3};
                    &:hover{
                        animation: pulse-green 1s ease infinite;
                    }
                }
            }
        }
    }
`;