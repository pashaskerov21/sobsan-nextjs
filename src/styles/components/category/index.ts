import styled from "styled-components";
import { row_center, row_justify_start } from "../../helpers/mixin";

export const CategoryButtonWrapper = styled.div`
    width: 100%;
    padding: 20px 0;
    margin-bottom: 20px;
    ${row_justify_start};
    overflow: auto;
    gap: 15px;
    &::-webkit-scrollbar{
        width: 4px; 
        height: 4px;
    }
    button{
        width: auto;
        padding: 10px 20px;
        border-radius: 10px;
        font-weight: 600;
        ${row_center};
        background-color: ${props => props.theme.bg_color_9};
        color: ${props => props.theme.text_color_3};
        text-transform: capitalize;
        font-size: 14px;
        white-space: nowrap;
        cursor: pointer;
        &:hover,
        &.active{
            background-color: ${props => props.theme.color_1};
            color: #ffffff;
        }
        
    }
`