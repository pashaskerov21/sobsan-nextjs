import { column_align_start, column_center, column_justify_start, column_start, row_between, row_center, row_justify_end, row_justify_start } from "@/src/styles/mixin";
import styled, { css } from "styled-components";


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
        padding: 15px 10px;
        @media (min-width: 1200px){
            position: relative;
            top: 0;
            left: 0;
            opacity: 1;
            width: 100%;
            max-width: 100%;
            height: auto;
            ${row_between};
            padding: 0;
            align-items: stretch;
            overflow: visible;
        }
        .inner-left{
            width: 100%;
            ${row_between};
            .menu-items{
                ${row_justify_end};
                gap:10px;
                padding-left: 10px;
                @media (width >= 400px){
                    gap: 20px;
                }
                .login-link{
                    ${row_center};
                    gap: 5px;
                    .icon{
                        color: ${props => props.theme.color_1};
                        font-size: 26px;
                    }
                    span{
                        white-space: nowrap;
                        font-size: 12px;
                        font-weight: 600;
                        @media (width >= 400px){
                            font-size: 14px;
                        }
                    }
                }
                .close-button{
                    width: 30px;
                    height: 30px;
                    border: 1px solid ${props => props.theme.text_color_7};
                    border-radius: 50%;
                    ${row_center};
                    color: ${props => props.theme.text_color_7};
                    font-size: 16px;
                    cursor: pointer;
                    &:hover{
                        background-color: ${props => props.theme.text_color_7};
                        color: #ffffff;
                    }
                    @media (width >= 400px){
                        width: 40px;
                        height: 40px;
                        font-size: 20px;
                    }
                }
            }
            .menu-header-icons{
                ${row_justify_end};
                gap: 10px;
                margin-right: 10px;
                @media (width >= 400px){
                    margin-right: 20px;
                }
                a{
                    width: 25px;
                    height: 25px;
                    ${row_center};
                    background-color: ${props => props.theme.color_1};
                    border-radius: 50%;
                    color: #ffffff;
                    font-size: 12px;
                    animation: pulse-red 1s ease infinite;
                    @media (width >= 400px){
                        width: 35px;
                        height: 35px;
                        font-size: 16px;
                    }
                }
            }
        }
        .inner-center{
            width: 100%;
            ${column_center};
            padding: 25px 0;
            @media (width >= 1200px){
                padding: 0;
            }
        }
        &.menuShow{
            left: 0;
            z-index: 650;
        }
    }
`;



export const CategoryWrapper = styled.div`
    width: 100%;
    ${column_align_start};
    
    @media (width >= 1200px){
        ${row_between};
        gap: 20px;
        align-self: stretch;
        height: 100%;
        min-width: 750px;
        background-color: ${props => props.theme.bg_color_1};
        
    }
    .category-item{
        width: 100%;
        ${column_center};
       
        @media (width >= 1200px){
            width: auto;
            height: 100%;
        }
        .main-row{
            width :100%;
            ${row_between};
            border-bottom: 1px solid ${props => props.theme.border_color_1};
            padding: 8px 0;
            position: relative;
            
            @media (width >= 1200px){
                border: none;
                padding: 0;
            }
            a{
                text-transform: capitalize;
                font-size: 12px;
                @media (width >= 400px){
                    font-size: 14px;
                }
            }
            .arrow-btn{
                position: absolute;
                top: 0;
                right: 0;
                min-width: 60px;
                height: 100%;
                z-index: 10;
                ${row_justify_end};
                color: ${props => props.theme.color_1};
                cursor: pointer;
                @media (width >= 1200px){
                    display: none;
                }
                &.active{
                    svg{
                        transition: all 0.2s;
                        transform: rotate(90deg);
                    }
                }
            }
        }

    }
`;

type AltCategoryWrapperProps = {
    $active: boolean,
    $level: number;
} 
export const AltCategoryWrapper = styled.div<AltCategoryWrapperProps>`
    width: 100%;
    display: ${props => props.$active ? 'block' : 'none'};
    .category-item{
        .main-row{
            padding-left: ${props => props.$level * 15}px;
            @media (width >= 1200px){
                padding-left: 0; 
            }
        }
    }
    ${
        props => props.$level === 1 ? css`
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            min-height: 300px;
            border-radius: 20px;
            box-shadow: 0 0 10px ${props => props.theme.shadow_color_1};
            padding: 30px;
            display: ${props.$active ? 'grid' : 'none'};
            grid-template-columns: repeat(3,1fr);
            @media (width >= 1400px){
                grid-template-columns: repeat(4,1fr);
            }
            .category-item{
                ${column_start};          
                .main-row{
                    margin-bottom: 15px !important;           
                    a{
                        font-size: 18px;
                        font-weight: 600;
                        text-decoration: underline;
                    }
                }
            }
        ` : css`
            display: block;
            .category-item{
                height: auto;   
                .main-row{
                    margin-bottom: 2px !important;
                    a{
                        font-size: 14px !important;
                        font-weight: 500 !important;
                        text-decoration: none !important;
                    }
                }
            }
        `
    }
`;
