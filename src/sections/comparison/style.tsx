import { column_center, row_center, row_justify_start, row_start } from "@/src/styles";
import { styled } from "styled-components";

export const ComparisonContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    ${row_start};
    padding-bottom: 30px;
    .comparison__col{
        min-width: 240px;
        max-width: 240px;
        position: relative;
        @media (min-width: 992px){
            min-width: 320px;
            max-width: 320px;
        }
        &__list{
            width: 100%;
            ${column_center};
            .list__item{
                width: 100%;
                height: 70px;
                ${row_justify_start};
                padding: 12px;
                &:first-child{
                    height: 200px;
                    background-color: transparent !important;
                }
                &:nth-child(odd){
                    background-color: ${props => props.theme.bg_color_6};
                }
            }
            &.product{
                .list__item{
                    justify-content: center;
                };
                .remove__button{
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background-color: ${props => props.theme.color_1};
                    color: #fff;
                    ${row_center};
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.3s;
                    transform: scale(0);
                    opacity: 0;
                }
                &:hover{
                    .remove__button{
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            }
        }
    }
    .product__image{
        width: 200px;
        height: 200px;
        img{
            width: 200px;
            height: 200px;
        }
    }
    .product__brand{
        font-size: 14px;
        opacity: 0.7;
    }
    .product__title,
    .product__code,
    .product__price{
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        @media (min-width: 992px){
            font-size: 16px;
        }
    }
    .product__price{
        color: ${props => props.theme.color_1};
    }
    .basket__button{
        width: 100%;
        max-width: 250px;
        height: 36px;
        padding: 10px;
        ${row_center};
        background-color:${props => props.theme.color_1};
        color: #fff;
    }
`
