import { column_align_start, column_center, column_justify_start, row_between, row_center, row_justify_end, row_justify_start } from "@/src/styles/mixin";
import styled from "styled-components";


export const HeaderWrapper = styled.header`
    width: 100%;
    z-index: 200;
    ${column_center};
    .black-backdrop{
        @media (min-width: 1200px){
            display: none;
        }
    }
`;
export const TopNavbarWrapper = styled.nav`
    width: 100%;
    z-index: 10;
    .nav-inner{
        width: 100%;
        ${row_between};
        gap: 30px;
        padding: 10px 0;
        .left{
            ${row_justify_start};
            gap: 10px;
        }
        .right{
            ${row_justify_end};
            gap: 10px;
        }
        .menu-button{
            width: 30px;
            height: 30px;
            ${column_align_start};
            gap: 6px;
            cursor: pointer;
            .bar {
                width: 100%;
                height: 2px;
                border-radius: 10px;
                background-color: ${props => props.theme.text_color_1};
                cursor: pointer;             
                &:nth-child(1) {
                    width: 100%;
                }

                &:nth-child(2) {
                    width: 65%;
                }

                &:nth-child(3) {
                    width: 80%;
                }
            }
        }
        .page-links{
            ${row_justify_start};
            gap: 10px;
            a{
                font-size: 12px;
                text-transform: capitalize;
                color: ${props => props.theme.text_color_1};
                white-space: nowrap;
                position: relative;
                @media (min-width: 1400px){
                    font-size: 14px;
                }
                &::after{
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    left: 50%;
                    transform: translateX(-50%) scale(0);
                    width: 100%;
                    height: 1px;
                    background-color: ${props => props.theme.text_color_7};
                    transition: all 0.2s;
                }
                &:hover{
                    &::after{
                        transform: translateX(-50%) scale(1);
                    }
                }
            }
            .link-item{
                position: relative;
                ${row_center};
                gap: 3px;
                padding: 5px 0;
                svg{
                    color: ${props => props.theme.text_color_7};
                }
                .link-menu{
                    position: absolute;
                    top: 100%;
                    left: 0;
                    ${column_align_start};
                    padding: 15px 12px;
                    box-shadow: 0 0 10px ${props => props.theme.shadow_color_1};
                    gap: 15px;
                    border-radius: 10px;
                    display: none;
                    background-color: ${props => props.theme.bg_color_1};
                }
                &:hover{
                    .link-menu{
                        display: flex;
                    }
                }
            }
        }
        .general-icons{
            ${row_justify_end};
            gap: 10px;
            .icon{
                cursor: pointer;
                color: ${props => props.theme.text_color_7};
                font-size: 28px;
                ${row_center};
                gap: 5px;
                span{
                    font-size: 14px;
                    font-weight: 600;
                    color: ${props => props.theme.text_color_1};
                    white-space: nowrap;
                }
                &:hover{
                    span{
                        color: ${props => props.theme.text_color_7};
                    }
                }
            }
        }
        .social-icons{
            ${row_center};
            gap: 8px;
            a{
                font-size: 12px;
                width: 30px;
                height: 30px;
                ${row_center};
                background-color: ${props => props.theme.bg_color_8};
                color: ${props => props.theme.text_color_7};
                border-radius: 5px;
                box-shadow: 0 0 1px ${props => props.theme.shadow_color_1};
                &:hover{
                    box-shadow: 0 0 10px ${props => props.theme.shadow_color_1};
                }
            }
        }
    }
`;
export const BottomNavbarWrapper = styled.nav`
    width: 100%;
    .bottom-inner{
        position: fixed;
        top: 0;
        left: -100%;
        height: 100vh;
        overflow: auto;
        width: 100%;
        max-width: 450px;
        background-color: ${props => props.theme.bg_color_1};
        transition: all 0.3s;
        ${column_justify_start};
        padding: 15px;
        @media (min-width: 1200px){
            position: relative;
            top: 0;
            left: 0;
            opacity: 1;
            width: 100%;
            max-width: 100%;
            height: auto;
            ${row_between};
            padding: 12px 0;
        }
        .inner-left{
            width: 100%;
            ${row_between};
            .menu-items{
                ${row_justify_end};
                gap:10px;
                .login-link{
                    ${row_center};
                    gap: 5px;
                    .icon{
                        color: ${props => props.theme.color_1};
                        font-size: 26px;
                    }
                    span{
                        font-size: 14px;
                        font-weight: 600;
                    }
                }
                .close-button{
                    width: 40px;
                    height: 40px;
                    border: 1px solid ${props => props.theme.color_1};
                    border-radius: 50%;
                    ${row_center};
                    color: ${props => props.theme.color_1};
                    font-size: 20px;
                    cursor: pointer;
                    &:hover{
                        background-color: ${props => props.theme.color_1};
                        color: #ffffff;
                    }
                }
            }
            .menu-header-icons{
                ${row_justify_end};
                gap: 10px;
                margin-right: 40px;
                a{
                    width: 40px;
                    height: 40px;
                    ${row_center};
                    background-color: ${props => props.theme.color_1};
                    border-radius: 50%;
                    color: #ffffff;
                    font-size: 18px;
                    animation: pulse-red 1s ease infinite;
                }
            }
        }
        &.menuShow{
            left: 0;
            z-index: 650;
        }
    }
`;





