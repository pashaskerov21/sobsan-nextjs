import { column_center, row_between, row_center } from "@/src/styles";
import { css, styled } from "styled-components";

export const MasterWrapper = styled.div<{$activeTab: number}>`
    width: 100%;
    ${column_center};
    gap: 40px;
    @media (min-width: 992px){
        ${row_between};
        align-items: stretch;
    }
    .wrapper__left{
        width: 100%;
        @media (min-width: 992px){
            width: 50%;
        }
        @media (min-width: 1200px){
            width: 40%;
        }
        @media (min-width: 1400px){
            width: 35%;
        }
    }
    .master__form__tab__buttons{
        width: 100%;
        ${column_center};
        position: relative;
        @media (min-width: 576px){
            ${row_between};
        }
        .form__tab__button{
            width: 100%;
            height: 55px;
            border: 1px solid ${props => props.theme.border_color_1};
            ${row_center};
            padding: 10px;
            text-align: center;
            cursor: pointer;
            transition: all 0.5s;
            &:nth-child(1){
                border-bottom: 0;
                @media (min-width: 768px){
                    border-bottom: 1px solid ${props => props.theme.border_color_1};
                    border-right: 0;
                }
            }
            &:nth-child(2){
                @media (min-width: 768px){
                    border-left: 0;
                }
            }
            &.active{
                color: #fff;
            }
        }
        .active__button__layer{
            z-index: -1;
            width: 100%;
            height: 55px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #ed3237 !important;
            color: #fff;
            transition: all 0.3s;
            @media (min-width: 576px){
                width: 50%;
            }
            ${props => props.$activeTab === 2 && css`
                top: 50%;
                @media (min-width: 576px){
                    top: 0;
                    left: 50%;
                }
            `}
        }
    }
    .wrapper__right{
        width: 100%;
        ${column_center};
        gap: 40px;
        .swiper{
            width: 100%;
        }
        @media (min-width: 992px){
            width: 50%;
        }
        @media (min-width: 1200px){
            width: 60%;
        }
        @media (min-width: 1400px){
            width: 65%;
        }
    }
    .master__image{
        width: 100%;
        img{
            width: 100%;
            height: auto;
            object-fit: contain;
        }
    };
    .master__content{
        width: 100%;
        ${column_center};
        gap: 20px;
        .content__title{
            width: 100%;
            text-align: center;
            font-size: 20px;
            font-weight: 600;
        }
        .content__text{
            font-size: 14px;
        }
    }
`;