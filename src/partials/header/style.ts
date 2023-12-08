import { column_align_start, column_center, row_between, row_center, row_justify_end, row_justify_start } from "@/src/styles/mixin";
import styled from "styled-components";


export const HeaderWrapper = styled.header`
    width: 100%;
    z-index: 200;
    ${column_center};
`;
export const TopNavbarWrapper = styled.nav`
    width: 100%;
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
                }
                &:hover{
                    span{
                        color: ${props => props.theme.text_color_7};
                    }
                }
            }
        }
    }
`;
export const BottomNavbarWrapper = styled.nav``;





