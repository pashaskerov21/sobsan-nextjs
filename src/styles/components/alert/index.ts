import { styled } from "styled-components";
import { row_center } from "../../helpers/mixin";

export const AlertComponent = styled.div`
    width: 100%;
    min-height: 45px;
    border-radius: 10px;
    background-color: ${props => props.theme.color_1};
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    ${row_center};
    text-align: center;
`;