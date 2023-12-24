import styled from "styled-components";
import { column_center, row_between } from "../../helpers/mixin";



export const AccordionContainer = styled.div`
    width: 100%;
    .accordion{
        width: 100%;
        background-color: transparent !important;
        border-color: ${props => props.theme.border_color_1};
        color: ${props => props.theme.text_color_1} !important;
        .accordion-item{
            background-color: transparent !important;
            border-color: ${props => props.theme.border_color_1};
            color: ${props => props.theme.text_color_1} !important;
            box-shadow: none;
        }
        &-button{
            width: 100%;
            ${row_between};
            gap: 30px;
            background-color: transparent !important;
            border-color: ${props => props.theme.border_color_1};
            color: ${props => props.theme.text_color_1} !important;
            box-shadow: none;
            &::after{
                display: none;
            }
            svg{
                transition: all 0.2s;
            }
            &:not(.collapsed){
                background: url('/design/large-drop-bg.webp') #ed3237 !important;
                background-repeat: no-repeat;
                background-size: cover;
                color: #ffffff !important;
                box-shadow: none;
                svg{
                    transform: rotate(-180deg)
                }
            }
        }
        .accordion-body{
            color: ${props => props.theme.text} !important;
        }
    }
`;

