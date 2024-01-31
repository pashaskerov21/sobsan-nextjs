import { column_center, row_between, row_center } from "@/src/styles";
import { styled } from "styled-components";

export const AccountFormWrapper = styled.div`
    width: 100%;
    ${column_center};
    gap: 30px;
    @media (min-width: 992px){
        ${row_between};
        align-items: stretch;
    }
    form{
        height: 100%;
    }
    .wrapper__right{
        width: 100%;
        background: url('/design/large-drop-bg.webp') no-repeat;
        background-size: cover;
        background-color: #ed3237 !important;
        ${column_center};
        gap: 30px;
        padding: 30px;
        .logo{
            padding: 20px 40px;
            background-color: #fff;
            img{
                object-fit: contain;
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
        .link__button{
            width: 100%;
            max-width: 200px;
            padding: 15px;
            background-color: #fff;
            color: ${props => props.theme.color_1};
            font-weight: 600;
            text-transform: capitalize;
            ${row_center};
            &:hover{
                animation: pulse-white 1s ease infinite;
            }
        }
    }
`;