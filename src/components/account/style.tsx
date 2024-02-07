import { column_center } from "@/src/styles";
import { styled } from "styled-components";

export const OrderHistoryWrapper = styled.div`
    width: 100%;
    ${column_center};
    gap: 40px;
    .order__component{
        width: 100%;
    }
    .product__table{
        width: 100%;
        overflow-x: auto;
        table{
            width: 100%;
            min-width: 700px;
            thead{
                th{
                    background-color: ${props => props.theme.color_1};
                    color: #fff;
                    padding: 6px;
                    text-align: center;
                }
            }
        }
    }
`