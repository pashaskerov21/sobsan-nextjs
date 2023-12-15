import styled from "styled-components";
import { column_center, row_between } from "../../helpers/mixin";

type AccordionWrapperProps = {
    $activeBodyHeight: number | null, 
}

export const AccordionWrapper = styled.div<AccordionWrapperProps>`
    width: 100%;
    position: relative;
    ${column_center};
    border: 1px solid ${props => props.theme.border_color_1};
    border-radius: 10px;
    .accordion-item{
        width: 100%;
        position: relative;
        ${column_center};
        .accordion-button{
            width: 100%;
            ${row_between};
            gap: 30px;
            padding: 15px;
            border-top: 1px solid ${props => props.theme.border_color_2};
            cursor: pointer;
            .button-title{
                font-weight: 600;
            }
            .button-icon{
                font-size: 14px;
                svg{
                    transition: all 0.2s;
                }
            }
        }
        .accordion-body{
            width: 100%;
            opacity: 0;
            height: 0;
            overflow: hidden;
            transition: all 0.3s;
            border-top: 1px solid ${props => props.theme.border_color_2};
        }
        &.active{
            .accordion-button{
                background: url('/design/large-drop-bg.webp') ${props => props.theme.color_1};
                background-repeat: no-repeat;
                background-size: cover;
                color: #ffffff;
                .button-icon{
                    svg{
                        transform: rotate(-180deg)
                    }
                }
            }
            .accordion-body{
                height: ${props => props.$activeBodyHeight}px;
                overflow: visible;
                opacity: 1;
            }
        }
        &:first-child{
            .accordion-button{
                border-top: none
            }
        }
        
    }
`;

