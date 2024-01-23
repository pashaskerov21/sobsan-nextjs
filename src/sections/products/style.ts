import { column_center, column_justify_start, column_start, row_align_start, row_between, row_center, row_justify_end, row_justify_start } from "@/src/styles";
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
`;