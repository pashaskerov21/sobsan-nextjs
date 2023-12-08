import { row_center } from "@/src/styles/mixin";
import styled from "styled-components";

export const ThemeButtonStyle = styled.div`
    min-width: 55px;
    max-width: 55px;
    max-height: 30px;
    min-height: 30px; 
    border: 1px solid ${props => props.theme.border_color_2};
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    .icon{
        
        ${row_center};
        font-size: 14px;
        position: absolute;
        top: 50%;
        left: 0;
        transition: all 0.3s;
        color: ${props => props.theme.text_color_3};
        svg{
            display: block;
        }
    }
    &.light{
        .icon{
            transform: translate(6px , -50%);
        }
    }
    &.dark{
        .icon{
            transform: translate(30px , -50%);
        }
    }
`;