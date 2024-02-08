import { column_align_start, row_center } from "@/src/styles";
import { styled } from "styled-components";

export const SuggestionWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    gap: 40px;
    @media (min-width: 768px){
        grid-template-columns: repeat(2,1fr)
    }
    @media (min-width: 1200px){
        grid-template-columns: repeat(3,1fr)
    }
    @media (min-width: 1400px){
        grid-template-columns: repeat(4,1fr)
    }
    .suggestion__item{
        width: 100%;
        ${column_align_start};
        gap: 15px;
        @media (min-width: 1400px){
            &:nth-child(1),
            &:nth-child(6){
                grid-column: span 2;
            }
        }
        .suggestion__item__image{
            width: 100%;
            height: 300px;
            position: relative;
            transition: all 0.3s;
            .image__hover{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.7);
                backdrop-filter: blur(10px);
                opacity: 0;
                transition: all 0.3s;
                ${row_center};
                overflow: hidden;
                .title{
                    color: #fff;
                    font-weight: 600;
                    text-align: center;
                    opacity: 0;
                    transition: all 0.3s;
                    transform: translateY(150px);
                }
            }
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .suggestion__item__content{
            width: 100%;
            ${column_align_start};
            gap: 10px;
            transition: all 0.3s;
            overflow: hidden;
            .up__title{
                color: #fff;
                font-weight: 600;
                opacity: 0.7;
                transition: all 0.3s;
            }
            .main__title{
                color: #fff;
                font-weight: 600;
                font-size: 18px;
                transition: all 0.3s;
            }
        }
        &:hover{
            .suggestion__item__image{
                transform: scale(0.9);
                .image__hover{
                    opacity: 1;
                    .title{
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
            .suggestion__item__content{
                .up__title,
                .main__title{
                    transform: translateX(20px);
                }
            }
        }
    }
`