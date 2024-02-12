import { column_center, row_between, row_center } from "@/src/styles";
import { css, styled } from "styled-components";

export const GalleryWrapper = styled.div<{ $type: number }>`
    width: 100%;
    ${column_center};
    gap: 30px;
    .gallery__buttons{
        width: 100%;
        ${column_center};
        position: relative;
        @media (min-width: 768px){
            ${row_between};
        }
        .gallery__button{
            width: 100%;
            height: 70px;
            ${row_center};
            padding: 10px;
            border: 1px solid ${props => props.theme.border_color_1};
            transition: all 0.3s;
            cursor: pointer;
            background: url('/design/large-drop-bg.webp');
            background-size: cover;
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
            height: 70px;
            position: absolute;
            top: 0;
            left: 0;
            
            background-color: #ed3237 !important;
            color: #fff;
            transition: all 0.3s;
            @media (min-width: 768px){
                width: 50%;
            }
            ${props => props.$type === 2 && css`
                top: 50%;
                @media (min-width: 768px){
                    top: 0;
                    left: 50%;
                }
            `}
        }
        .button__skeleton{
            &:first-child{
                margin-bottom: 2px;
            }
            @media (min-width: 768px){
                &:first-child{
                    margin-bottom: 0;
                    margin-right: 2px;
                }
            }
        }
    }
    .gallery__items{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 40px;
        @media(min-width: 768px){
            grid-template-columns: repeat(2,1fr);
        }
        @media(min-width: 992px){
            grid-template-columns: repeat(3,1fr);
        }
        .gallery__item{
            width: 100%;
            position: relative;
            .gallery__image{
                width: 100%;
                height: auto;
                object-fit: contain;
            }
            @media(min-width: 768px){
                height: 300px;
                .gallery__image{
                    height: 100%;
                    object-fit: cover;
                }
            }
            .item__hover{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.7);
                backdrop-filter: blur(10px);
                transition: all 0.3s;
                opacity: 0;
                ${row_center};
                .item__button{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: ${props => props.theme.color_1};
                    color: #fff;
                    animation: pulse-red 1s ease infinite;
                    transform: scale(0);
                    transition: all 0.3s;
                    ${row_center};
                    font-size: 20px;
                }
            }
            &:hover{
                .item__hover{
                    opacity: 1;
                    .item__button{
                        transform: scale(1);
                    }
                }
            }
        }
    }
`;