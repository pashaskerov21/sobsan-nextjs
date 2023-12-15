import { column_align_start, row_center } from "@/src/styles";
import styled from "styled-components";

export const LanguageDropdownWrapper = styled.div`
    cursor: pointer;
    position: relative;
    z-index: 100;
    .active-value{
        border: 1px solid ${props => props.theme.border_color_2};
        padding: 6px 10px;
        border-radius: 10px;
        ${row_center};
        gap: 6px;
        .lang{
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 600;
            color: ${props => props.theme.text_color_3};
        }
    }
    .menu{
        position: absolute;
        top: 97%;
        left: 0;
        width: 100%;
        ${column_align_start};
        padding: 3px 10px 10px;
        gap: 5px;
        border: 1px solid ${props => props.theme.border_color_2};
        background-color: ${props => props.theme.bg_color_1};
        border-top-color: transparent;
        border-radius: 0 0 10px 10px;
        display: none;
        a{
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 600;
            color: ${props => props.theme.text_color_3};
            width: 100%;
            &:hover{
                color:${props => props.theme.color_1};
            }
        }
    }
    &:hover{
        .active-value{
            border-bottom-color: transparent;
            border-radius: 10px 10px 0 0;
        }
        .menu{
            display: flex;
        }
    }
`