import { column_align_end, column_center, row_center, row_justify_end } from "@/src/styles";
import { styled } from "styled-components";

export const BasketContentWrapper = styled.div`
    width: 100%;
    ${column_center};
    gap: 20px;
    .basket__table__wrapper{
        width: 100%;
        overflow: auto;
        .basket__table{
            width: 100%;
            min-width: 1200px;
            tr {
                border-bottom: 1px solid ${props => props.theme.border_color_1};
            }
            th{
                font-weight: 700;
                text-align: center;
                padding: 10px 0;
            }
            .product__col{
                width: 100%;
                padding: 10px 0;
                ${column_center};
                gap: 5px;
                text-align: center;
            }
            .product__image{
                width: 90px;
                height: 90px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
            .product__title{
                font-weight: 600;
            }
            .product__price{
                font-weight: 600;
                color: ${props => props.theme.color_1};
            }
            .product__amount__counter{
                ${row_center};
                gap: 10px;
                .counter__button{
                    cursor: pointer;
                }
                input{
                    width: 40px;
                    text-align: center;
                    border: none;
                    outline: none;
                    background-color: transparent;
                    font-weight: 600;
                    color: ${props => props.theme.text_color_1};
                }
            }
            .product__stock{
                ${row_center};
                text-align: center;
                gap: 10px;
                margin-bottom: 10px;
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
            .product__delete__button{
                width: 30px;
                height: 30px;
                ${row_center};
                border-radius: 50px;
                color: #fff;
                background-color: ${props => props.theme.color_1};
                cursor: pointer;
                transition: all 0.2s;
                &:hover{
                    transform: scale(1.2);
                }
            }
        }
    }
    .basket__content__bottom{
        width: 100%;
        ${column_align_end};
        margin-top: 40px;
        gap: 25px;
        .total__payment{
            ${row_justify_end};
            gap: 20px;
            flex-wrap: wrap;
            .label{
                font-weight: 600;
            }
            .value{
                font-weight: 600;
                color: ${props => props.theme.color_1};
                margin-left: 50px;
            }
        }
        .basket__buttons{
            width: 100%;
            ${row_justify_end};
            flex-wrap: wrap;
            gap: 15px;
            .basket__button{
                width: 100%;
                max-width: 250px;
                border-radius: 10px;
                height: 56px;
                border: 1px solid ${props => props.theme.color_1};
                font-size: 18px;
                font-weight: 600;
                padding: 10px;
                ${row_center};
                cursor: pointer;
                &.clear{
                    color: ${props => props.theme.color_1};
                    &:hover{
                        animation: reset-btn-animation .2s ease 4;
                        background-color: #23272b;
                        border-color: #23272b;
                        color: #fff;
                    }
                }
                &.confirm{
                    background-color: ${props => props.theme.color_1};
                    color: #fff;
                }
            }
        }
    }
`;