import { column_around, column_center, row_between, row_center } from "@/src/styles";
import { styled } from "styled-components";

export const ContactWrapper = styled.div`
    width: 100%;
    ${column_center};
    gap: 40px;
    @media (min-width: 992px){
        ${row_between};
        align-items: stretch;
    }
    .wrapper__left{
        width: 100%;
    }
    .wrapper__right{
        width: 100%;
        background: url('/design/large-drop-bg.webp') no-repeat;
        background-size: cover;
        background-color: #ed3237 !important;
        ${column_around};
        gap: 30px;
        padding: 30px;
    }
    .contact__item{
        ${column_center};
        gap: 20px;
        text-align: center;
        padding: 10px 30px;
        .item__icon{
            font-size: 30px;
        }
        .item__value{
            font-weight: 500;
        }
    }
    .social-icons{
        ${row_center};
        gap: 15px;
        a{
            width: 30px;
            height: 30px;
            border-radius: 5px;
            ${row_center};
            background-color: #fff;
            color: ${props => props.theme.color_1};
            transition: all 0.2s;
            &:hover{
                transform: scale(1.1)
            }
        }
    }
`;