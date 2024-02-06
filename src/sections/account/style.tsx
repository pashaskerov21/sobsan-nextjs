import { column_center, row_between, row_center, row_justify_end, row_justify_start } from "@/src/styles";
import { styled } from "styled-components";

export const AccountFormWrapper = styled.div`
    width: 100%;
    ${column_center};
    gap: 30px;
    @media (min-width: 992px){
        ${row_between};
        align-items: stretch;
    }
    form{
        height: 100%;
    }
    .wrapper__right{
        width: 100%;
        background: url('/design/large-drop-bg.webp') no-repeat;
        background-size: contain;
        background-color: #ed3237 !important;
        ${column_center};
        gap: 30px;
        padding: 30px;
        .logo{
            padding: 20px 40px;
            background-color: #fff;
            img{
                object-fit: contain;
            }
        }
        .social-icons{
            ${row_center};
            gap: 15px;
            a{
                width: 30px;
                height: 30px;
                border-radius: 5px;
                ${row_center};
                background-color: #fff;
                color: ${props => props.theme.color_1};
                transition: all 0.2s;
                &:hover{
                    transform: scale(1.1)
                }
            }
        }
        .link__button{
            width: 100%;
            max-width: 200px;
            padding: 15px;
            background-color: #fff;
            color: ${props => props.theme.color_1};
            font-weight: 600;
            text-transform: capitalize;
            ${row_center};
            &:hover{
                animation: pulse-white 1s ease infinite;
            }
        }
    }
`;

export const AccountGeneralContainer = styled.div`
    width: 100%;
    ${column_center};
    gap: 30px;
    @media (min-width: 992px){
        ${row_between};
        align-items: flex-start;
    }
    .account__sidebar{
        position: fixed;
        top: 0;
        left: -100%;
        opacity: 0;
        transition: all 0.3s;
        width: 100%;
        max-width: 400px;
        height: 100vh;
        overflow: auto;
        background-color: ${props => props.theme.bg_color_1};
        z-index: 600;
        padding: 12px;
        &.active{
            left: 0;
            opacity: 1;
        }
        .account__sidebar__header{
            width: 100%;
            ${row_between};
            gap: 20px;
            padding: 15px 0;
            .title{
                font-size: 18px;
                font-weight: 600;
            }
            .close__button{
                font-size: 24px;
                cursor: pointer;
            }
        }
        .account__sidebar__body{
            width: 100%;
            ${column_center};
            gap: 30px;
        }
        @media (min-width: 992px){
            position: relative;
            top: 0;
            left: 0;
            opacity: 1;
            padding: 0;
            background-color: transparent;
            min-width: 350px;
            z-index: 1;
            .account__sidebar__header{
                display: none;
            }
        }
    }
    .container__left{
        @media (min-width: 992px){
            border: 1px solid ${props => props.theme.border_color_1};
            padding: 20px;
        }
    }
    .container__right{
        width: 100%;
        ${column_center};
        gap: 30px;
        @media (min-width: 992px){
            border: 1px solid ${props => props.theme.border_color_1};
            padding: 20px;
        }
        .container__right__header{
            width: 100%;
            ${row_between};
            gap: 30px;
            .title{
                font-size: 18px;
                font-weight: 600;
                @media (min-width: 992px){
                    font-size: 22px;
                }
            }
            .account__menu__button{
                font-size: 28px;
                @media (min-width: 992px){
                    display: none;
                }
            }
        }
        .container__right__body{
            width: 100%;
        }
    }
    .account__collapse{
            width: 100%;
            ${column_center};
            &__button{
                width: 100%;
                ${row_between};
                padding: 15px 12px;
                color: #fff;
                background-size: cover;
                background-image: url('/design/large-drop-bg.webp');
                background-color: #ed3237;
                cursor: pointer;
                .title{
                    font-weight: 600;
                }
            }
            &__inner{
                width: 100%;
                border: 1px solid ${props => props.theme.border_color_1};
            }
            .service__rows{
                width: 100%;
                ${column_center};
                .service__row{
                    width: 100%;
                    padding: 12px;
                    border-bottom: 1px solid ${props => props.theme.border_color_1};
                    font-weight: 600;
                    cursor: pointer;
                    ${row_justify_start};
                    .title{
                        transition: all 0.1s;
                    }
                    &.active{
                        color: ${props => props.theme.color_1};
                    }
                    &:hover{
                        .title{
                            color: ${props => props.theme.color_1};
                            transform: translateX(15px)
                        }
                    }
                }
            }
        }
`;