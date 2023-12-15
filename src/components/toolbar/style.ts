import { column_align_start, column_center, row_center, row_justify_start } from "@/src/styles";
import styled from "styled-components";

export const CenterToolbarWrapper = styled.div`
    position: fixed;
    top: 50%;
    right: 0;
    z-index: 100;
    min-width: 300px;
    transform: translate(248px, -50%);
    ${column_align_start};
    gap: 10px;
    @media (min-width: 992px){
        transform: translate(240px, -50%);
    }
    .toolbar-card {
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 0 5px ${props => props.theme.shadow_color_1};
        padding: 8px 3px;
        background-color: ${props => props.theme.bg_color_2};
        transition: all 0.3s;
        ${row_justify_start};
        @media (min-width: 992px){
            padding: 10px 5px;
        }
        .icon {
            width: 35px;
            height: 35px;
            ${row_center};
            position: relative;
            margin-right: 10px;
            font-size: 26px;
            @media (min-width: 992px){
                width: 40px;
                height: 40px;
                font-size: 28px
            }

            img {
                transform: rotateY(180deg);
            }

            .amount {
                position: absolute;
                top: 0;
                right: -5px;
                min-width: 16px;
                min-height: 16px;
                background-color: ${props => props.theme.color_1};
                color: #ffffff;
                ${row_center};
                font-size: 10px;
                border-radius: 50%;
                line-height: 0;
                font-weight: 500;
                padding: 3px;
                @media (min-width: 992px){
                    width: 20px;
                    height: 20px;
                    font-size: 12px;
                }
            }
        }
        a {
            color: ${props => props.theme.text_color_1};
            text-transform: capitalize;
            font-weight: 600;
            opacity: 0;
            min-width: 120px;
            font-size: 14px;
        }
        &:hover {
            transform: translateX(-120px);

            a {
                opacity: 1;
            }
        }
        &.active {
            transform: translateX(-120px);

            a {
                opacity: 1;
            }
        }
    }
`;
export const BottomToolbarWrapper = styled.div`
    position: fixed;
    bottom: 25px;
    right: 25px;
    ${column_center};
    z-index: 100;
    gap: 10px;
    @media (min-width: 992px){
        bottom: 50px;
        gap: 20px;
    }
    .scroll-button{
        margin-bottom: 20px;
        width: 30px;
        height: 30px;
        background-color: ${props => props.theme.color_1};
        color: #fff;
        box-shadow: 0 0 10px ${props => props.theme.shadow_color_1};
        border-radius: 50%;
        font-size: 16px;
        ${row_center};
        cursor: pointer;
        @media (min-width: 992px){
            width: 40px;
            height: 40px;
            font-size: 18px;
        }
        &:hover{
            animation: pulse-red 1s ease infinite;
        }
    }
    .hot-line {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: ${props => props.theme.color_1};
        color: #fff;
        font-weight: 600;
        ${row_center};
        padding: 5px;
        font-size: 12px;
        @media (min-width: 992px){
            width: 65px;
            height: 65px;
            font-size: 14px;
        }

        &::before,
        &::after {
            content: '';
            border: 1px solid;
            border-color: ${props => props.theme.color_1} transparent;
            position: absolute;
        }

        &::before {
            top: -8px;
            bottom: -8px;
            left: -8px;
            right: -8px;
            border-radius: 50%;
            animation: spin-line 4s linear infinite;
        }

        &::after {
            top: -16px;
            bottom: -16px;
            left: -16px;
            right: -16px;
            border-radius: 50%;
            animation: spin-line 5s linear infinite;
        }
    }
`;