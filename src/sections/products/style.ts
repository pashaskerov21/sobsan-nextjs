import { column_align_start, column_center, column_justify_start, column_start, row_align_start, row_between, row_center, row_justify_end, row_justify_start } from "@/src/styles";
import { styled } from "styled-components";

export const CategoryCoverImage = styled.div`
    width: 100%;
    position: relative;
    display: block;
    margin-bottom: 30px;
    img{
        width: 100%;
        height: auto;
        max-height: 500px;
        border-radius: 10px;
        object-fit: cover;
    }
`;

export const ProductGeneralContainer = styled.div`
    width: 100%;
    ${column_center};
    gap: 40px;
    @media (width >= 992px){
        ${row_between};
        align-items: stretch;
    }
    .show-filters-btn{
        width: 100%;
        padding: 15px;
        background-color: ${props => props.theme.color_1};
        color: #ffffff;
        ${row_center};
        gap: 10px;
        border-radius: 10px;
        cursor: pointer;
    }
    .container-right{
        width: 100%;
        ${column_justify_start};
        gap: 20px;
        @media (min-width: 992px){
            max-width: 70%;
        }
        .right-top{
            width: 100%;
            ${row_between};
            gap: 40px;
            .product-sort-filters{
                ${row_justify_start};
                gap: 15px;
                flex-wrap: wrap;
                .sort-filter-button{
                    ${row_justify_start};
                    font-size: 14px;
                    gap: 0px;
                    cursor: pointer;
                    user-select: none;
                    svg{
                        font-size: 16px;
                        color: ${props => props.theme.color_1};
                    }
                    &:hover{
                        color: ${props => props.theme.color_1};
                    }
                }
            }
            .layout-buttons{
                ${row_justify_end};
                gap: 10px;
                .layout-button{
                    ${row_center};
                    padding: 10px;
                    background-color: ${props => props.theme.bg_color_9};
                    border-radius: 5px;
                    cursor: pointer;
                    &.active{
                        background-color: ${props => props.theme.color_1};
                        color: #fff;
                    }
                }
            }
        }
    }
`;

export const ProductDetailWrapper = styled.div`
    width: 100%;
    ${column_center};
    gap: 40px;
    position: relative;
    @media (min-width: 992px){
        ${row_between};
        align-items: stretch;
    }
    .wrapper__left{
        width: 100%;
        ${column_start};
        gap: 30px;
        @media (min-width: 992px){
            width: 50%;
        }
        @media (min-width: 992px){
            width: 65%;
        }
    }
    .wrapper__right{
        width: 100%;
        border: 1px solid ${props => props.theme.border_color_1};
        ${column_center};
        padding: 10px;
        @media (min-width: 992px){
            width: 50%;
        }
        @media (min-width: 992px){
            width: 35%;
        }
        .product__image{
            width: 100%;
            max-height: 400px;
            max-width: 400px;
            img{
                width: 100%;
                height: auto;
                max-height: 400px;
                max-width: 400px;
                object-fit: contain;
            }
        }
    }
    .product__parameters{
        width: 100%;
        ${column_center};
        gap: 5px;
        padding-bottom: 30px;
        border-bottom: 1px solid ${props => props.theme.border_color_1};
        .product__parameter{
            width: 100%;
            ${row_between};
            gap: 10px;
            .parameter__key{
                width: 50%
                opacity: 0.6;
                text-transform: capitalize;
                font-size: 14px;
            }
            .parameter__value{
                width: 50%;
                font-weight: 600;
                text-transform: capitalize;
                font-size: 14px;
            }
        }
        .parameter__title{
            width: 100%;
            margin-top: 20px;
            font-size: 18px;
            font-weight: 600;
        }
    }
    .wrapper__left__bottom{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(1,1fr);
        gap: 30px;
        @media (min-width: 768px){
            grid-template-columns: repeat(2,1fr);
        }
        @media (min-width: 992px){
            grid-template-columns: repeat(1,1fr);
        }
        @media (min-width: 1200px){
            grid-template-columns: repeat(2,1fr);
        }
        .wrapper__left__bottom__col{
            ${column_start};
            gap: 10px;
            .col__title{
                font-weight: 600;
                font-size: 18px;
            }
            &.amount__basket{
                grid-column: span 1;
                @media (min-width: 576px){
                    flex-direction: row;
                }
                @media (min-width: 768px){
                grid-column: span 2;
                }
                @media (min-width: 992px){
                    grid-column: span 1;
                }
                @media (min-width: 1200px){
                    grid-column: span 2;
                }
            }
            
        }
        .product__weight__buttons{
            width: 100%;
            ${row_justify_start};
            flex-wrap: wrap;
            gap: 15px;
            .product__weight__button{
                ${row_center};
                text-align: center;
                font-weight: 600;
                padding: 10px 20px;
                border-radius: 10px;
                background-color: ${props => props.theme.bg_color_9};
                cursor: pointer;
                &.active{
                    background-color: ${props => props.theme.color_1};
                    color: #fff;
                }
            }
        }
        .product__custom__color__buttons{
            width: 100%;
            ${row_justify_start};
            flex-wrap: wrap;
            gap: 15px;
            .product__custom__color__button{
                ${row_justify_start};
                gap: 5px;
                cursor: pointer;
                .color__value{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    ${row_center};
                    border: 1px solid transparent;
                    &__inner{
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                    }
                }
                .color__title{
                    font-size: 12px;
                    font-weight: 600; 
                }
                &.active{
                    .color__value{
                        border-color: ${props => props.theme.color_1};
                    }
                }
            }
        }
        .product__stock{
            ${row_center};
            text-align: center;
            gap: 10px;
            margin-top: 30px;
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
        .product__price{
            ${row_justify_start};
            gap: 15px;
            margin-bottom: 15px;
            flex-wrap: wrap;
            .old_price{
                font-size: 18px;
                text-decoration: line-through;
                opacity: 0.5;
            }
            .main_price{
                color: ${props => props.theme.color_1};
                font-weight: 600;
                font-size: 24px;
            }
        }
        .product__amount__counter{
            width: 100%;
            height: 70px;
            ${row_center};
            gap: 20px;
            background-color: ${props => props.theme.bg_color_4};
            border-radius: 10px;
            padding: 10px;
            .counter__button{
                width: 30px;
                height: 30px;
                ${row_center};
                border-radius: 50%;
                background-color: #cfcfcf;
                color: #000;
                font-size: 12px;
                cursor: pointer;
                &:hover{
                    background-color: ${props => props.theme.color_1};
                    color: #fff;
                }
                &:active{
                    background-color: #cfcfcf;
                    color: #000;
                }
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
        .basket__button{
            width: 100%;
            height: 70px;
            ${row_center};
            gap: 20px;
            background-color: ${props => props.theme.color_1};
            border-radius: 10px;
            padding: 10px;
            color: #fff;
            font-weight: 600;
            font-size: 22px;
            cursor: pointer;
            .icon{
                display: none;
                font-size: 34px;
            }
            &.active{
                background-color: ${props => props.theme.color_3};
                span{
                    display: none;
                }
                .icon{
                    display: block;
                }
            }
            &.disabled{
                cursor: not-allowed !important;
                opacity: 0.6;
            }
        }
    }
`;