import { styled } from "styled-components";
import { column_center, row_between } from "../../helpers/mixin";

export const ArticleContainer = styled.div`
    width: 100%;
    ${column_center};
    gap: 40px;
    .article__row{
        width: 100%;
        ${column_center};
        gap: 30px;
        .article__row__column{
            width: 100%;
            ${column_center};
            gap: 20px;
            max-width: 650px;
            @media (min-width: 992px){
                align-items: flex-start;
                max-width: 100%;
            }
            img{
                width: 100%;
                height: auto;
                object-fit: contain;
            }
            .article__title{
                font-size: 16px;
                font-weight: 600px;
                @media (min-width: 768px){
                    font-size: 18px;
                }
            }
            .article__text{
                width: 100%:
                font-size: 12px;
                ul{
                    list-style: disc;
                }
                @media (min-width: 768px){
                    font-size: 14px;
                }
            }
        }
        &.two__column{
            @media(min-width: 992px){
                ${row_between};
                align-items: flex-start;
            }
            &:nth-child(even){
                @media (min-width: 992px){
                    flex-direction: row-reverse;
                }
            }
            .article__row__column{
                @media (min-width: 992px){
                    width: 47%;
                    &:first-child{
                        align-items: flex-start;
                    }
                    &:last-child{
                        align-items: flex-start;
                    }
                }
            }
        }
    }
`