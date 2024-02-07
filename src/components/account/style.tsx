import { column_center, row_between } from "@/src/styles";
import { styled } from "styled-components";

export const OrderHistoryWrapper = styled.div`
    width: 100%;
    ${column_center};
    gap: 40px;
    .order__component{
        width: 100%;
        ${column_center};
        gap: 40px;
        border: 1px solid ${props => props.theme.border_color_1};
    }
    .product__table{
        width: 100%;
        overflow-x: auto;
        table{
            width: 100%;
            min-width: 700px;
            thead{
                th{
                    background-color: ${props => props.theme.color_1};
                    color: #fff;
                    padding: 6px;
                    text-align: center;
                    border-right: 1px solid ${props => props.theme.border_color_1};
                    &:last-child{
                        border-right: none;
                    }
                }
            }
            tbody{
                tr{
                    border-bottom: 1px solid ${props => props.theme.border_color_1};
                }
            }
            td{
                border-right: 1px solid ${props => props.theme.border_color_1};
                &:last-child{
                    border-right: none;
                }
            }
            .product__col{
                width: 100%;
                ${column_center};
            }
            .product__image{
                width: 70px;
                height: 70px;
                img{
                    width: 70px;
                    height: 70px;
                    object-fit: contain;
                }
            }
            .product__title{
                font-size: 14px;
                font-weight: 600;
            }
            .product__count{
                font-weight: 600;
                font-size: 14px;
            }
            .product__price{
                font-size: 14px;
                font-weight: 600;
                color: ${props => props.theme.color_1};
            }
        }
    }
    .order__details{
        width: 100%;
        ${column_center};
        gap: 10px;
        padding: 12px 15px;
        .order__detail__row{
            width: 100%;
            ${row_between};
            gap: 15px;
            flex-wrap: wrap;
            padding: 12px 0;
            border-bottom: 1px solid ${props => props.theme.border_color_1};
            &:last-child{
                border-bottom: none;
            }
            .row__label,
            .row__value{
                font-weight: 600;
            }
            &.main{
                .row__label,
                .row__value{
                    color: ${props => props.theme.color_1};
                }
            }
        }
    }
`