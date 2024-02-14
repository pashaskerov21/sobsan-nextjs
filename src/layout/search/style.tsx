import { column_center, row_justify_start } from "@/src/styles";
import { styled } from "styled-components";

export const SearchMessage = styled.div`
    width: 100%;
    ${column_center};
    gap: 15px;
    text-align: center;
    @media (min-width: 992px){
        ${row_justify_start};
        text-align: start;
    }
    .title{
        font-size: 18px;
        font-weight: 500;
        @media (min-width: 992px){
            font-size: 24px;
        }
    }
    .loader__spin{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border-top: 3px solid ${props => props.theme.color_1};
        border-right: 3px solid ${props => props.theme.color_1};
        animation: loader 0.5s linear infinite;
    }
    @keyframes loader{
        100%{
            transform: rotate(360deg);
        }
    }
`