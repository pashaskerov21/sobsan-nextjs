import { column_center, row_center } from "@/src/styles";
import { styled } from "styled-components";

export const Error404Wrapper = styled.div`
    width: 100%;
    padding: 40px;
    ${column_center};
    gap: 20px;
    text-align: center;
    .error_code{
        font-size: 90px;
        font-weight: 900;
        color: ${props => props.theme.color_1};
    }
    .error_text{
        font-size: 20px;
        font-weight: 500;
    }
    a{
        margin-top: 20px;
        width: 100%;
        max-width: 250px;
        min-height: 40px;
        padding: 15px;
        font-size: 20px;
        font-weight: 500;
        ${row_center};
        background-color:${props => props.theme.color_1};
        color: #fff;
        border-radius: 10px;
        &:hover{
            animation: pulse-red 1s ease infinite;
        }
    }
`