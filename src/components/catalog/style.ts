import { column_center } from "@/src/styles";
import styled from "styled-components";

export const CatalogAccordionBodyWrapper = styled.div`
    width: 100%;
    padding: 15px;
    ${column_center};
    position: relative;
    .note{
        width: 100%;
        padding: 12px;
        font-size: 14px;
        background-color: ${props => props.theme.bg_color_4};
    }
`