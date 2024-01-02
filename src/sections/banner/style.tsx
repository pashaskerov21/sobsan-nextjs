import { column_center, row_around, row_between, row_center, row_evenly, row_justify_end, row_justify_start } from "@/src/styles";
import styled from "styled-components";

export const BannerSlide = styled.a`
    width: 100%;
    height: auto;
    border-radius: 10px;
    img{
        width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 10px;
        @media (width >= 992px){
            max-height: 500px;
            object-fit: cover;
        }
    }
`;

export const ProductBannerWrapper = styled.div`
    width: 100%;
    ${column_center};
    .swiper-pagination{
        &-bullet{
            background-color: rgba(0,0,0,0.7);
            &-active{
                background-color: #ffffff
            }
        }
    }
    .top{
        width: 100%;
        min-height: 300px;
        padding: 30px 0;
        background: url('/design/large-drop-bg.webp'), linear-gradient(to bottom, #ffc073 -24%, #ed3237 95%);
        background-position: top center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 10px 10px 0 0;
        @media (width >= 992px){
            padding: 50px 0;
        }
        .banner-slide{
            width: 100%;
            ${column_center};
            gap: 40px;
            @media (width >= 992px){
                ${row_around};
            }
            @media (width >= 1200px){
                ${row_evenly};
            }
            .content{
                width: 100%;
                ${column_center};
                gap: 20px;
                text-align: center;
                color: #ffffff;
                max-width: 500px;
                .title{
                    font-size: 18px;
                    font-weight: 600;
                    text-align: center;
                    @media (width >= 992px){
                        font-size: 22px;
                    }
                }
                .text{
                    text-align: center;
                    padding: 0 20px;
                    min-height: 250px;
                }
                .order-btn{
                    ${row_center};
                    padding: 10px 30px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    color: #ed3237;
                    text-align: center;
                    font-size: 18px;
                    font-weight: 600;
                    &:hover{
                        animation: pulse-white 1s ease forwards;
                    }
                }
            }
            .banner-image{
                width: 100%;
                max-width: 400px;
                img{
                    width: 100%;
                    height: auto;
                    object-fit: contain;
                }
            }
        }
    }
    .bottom{
        width: 100%;
        min-height: 100px;
        padding: 25px 10px;
        background: linear-gradient(to bottom,rgb(186, 34, 34),#ed3237);
        border-radius: 0 0 10px 10px;
        ${column_center};
        gap: 40px;
        @media (width >= 992px){
            ${row_around};
        }
        a{
            color: #ffffff;
        }
        &_left{
            text-align: center;
            a{
                font-weight: 600;
            }
            @media (width >= 992px){
                ${row_justify_start};
                gap: 15px;
                text-align: start;
            }
        }
        &_right{
            ${column_center};
            gap: 10px;
            @media (width >= 992px){
                ${row_justify_end};
                gap: 20px;

            }
            a{
                ${row_center};
                gap: 10px;
                .icon{
                    width: 35px;
                    height: 35px;
                    background-color: ${props => props.theme.color_1};
                    ${row_center};
                    border-radius: 50%;
                    animation: pulse-white 1s ease infinite;
                    font-size: 14px;
                }
            }
        }
    }
`