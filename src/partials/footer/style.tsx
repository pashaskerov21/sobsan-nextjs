import { column_center, column_justify_start, row_between, row_center, row_justify_end, row_justify_start } from "@/src/styles";
import styled from "styled-components";

export const FooterWrapper = styled.footer`
    width: 100%;
    .social-icons{
        ${row_center};
        gap: 8px;
        margin-top: 20px;
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
    .footer-top{
        width: 100%;
        .top-inner{
            width: 100%;
            display: grid;
            grid-template-columns: repeat(1,1fr);
            place-items: center;
            padding: 30px 0;
            gap: 30px;
            @media (width >= 576px){
                grid-template-columns: repeat(2,1fr);
            }
            @media (width >= 992px){
                grid-template-columns: repeat(4,1fr);
                padding: 60px 0;
            }
            @media (width >= 1200px){
                grid-template-columns: repeat(5,1fr);
                padding: 80px 0;
            }
            .col{
                width: 100%;
                height: 100%;
                ${column_justify_start};
                &:first-child{
                    @media (width >= 576px){
                        grid-column: 1 / 3;
                    }
                    @media (width >= 992px){
                        grid-column: 1 / 5;
                    }
                    @media (width >= 1200px){
                        grid-column: 1 / 2;
                    }
                }
            }
        }
    }
    .footer-links{
        width: 100%;
        ${column_center};
        gap: 7px;
        text-align: center;
        @media (width >= 992px){
            align-items: flex-start;
            text-align: start
        }
        .title{
            margin-bottom: 10px;
        }
        a{
            display: block;
            max-width: 150px;
            font-size: 14px;
            text-transform: capitalize;
            line-height: 20px;
            text-align: center;
            @media (width >= 992px){
                text-align: start;
            }
            &:hover{
                color: ${props => props.theme.color_1};
            }
        }
    }
    .footer-bottom{
        width: 100%;
        .bottom-inner{
            width: 100%;
            padding: 30px 0;
            border-top: 1px solid ${props => props.theme.border_color_1};
            ${column_center};
            gap: 30px;
            text-align: center;
            font-size: 14px;
            a{
                font-size: 14px;
                &:hover{
                    color: ${props => props.theme.color_1};
                }
            }
            .bottom-left,
            .bottom-right{
                ${column_center};
                gap: 7px;
                @media (width >= 768px){
                    flex-wrap: wrap;
                    max-width: 300px;
                }
            }
            @media (width >= 768px){
                ${row_between};
                .bottom-left{
                    ${row_justify_start};
                }
                .bottom-right{
                    ${row_justify_end};
                }
            }
        }
    }
`;