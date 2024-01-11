import { column_center, row_between, row_center } from "@/src/styles";
import { styled } from "styled-components";

export const CategoryCoverImage = styled.div`
    width: 100%;
    position: relative;
    display: block;
    margin-bottom: 30px;
    img{
        width: 100%;
        height: auto;
        max-height: 500px;
        border-radius: 10px;
        object-fit: cover;
    }
`;

export const ProductGeneralContainer = styled.div`
    width: 100%;
    ${column_center};
    gap: 40px;
    @media (width >= 992px){
        ${row_between};
        align-items: stretch;
    }
    .show-filters-btn{
        width: 100%;
        padding: 15px;
        background-color: ${props => props.theme.color_1};
        color: #ffffff;
        ${row_center};
        gap: 10px;
        border-radius: 10px;
        cursor: pointer;
    }
`;