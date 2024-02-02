import { column_align_start, column_center, row_center } from "@/src/styles";
import { css, styled } from "styled-components";

export const FormWrapper = styled.div`
    width: 100%;
    position: relative;
    form{
        width: 100%;
        ${column_center};
        gap: 30px;
        padding: 20px;
        border: 1px solid ${props => props.theme.border_color_1};
        @media (min-width: 576px){
            padding: 40px;
        }
        .button__skeleton{
            align-self: flex-start;
        }
        button[type="submit"]{
            width: 100%;
            max-width: 200px;
            padding: 15px;
            background-color: ${props => props.theme.color_1};
            color: #fff;
            font-weight: 600;
            align-self: flex-start;
            text-transform: capitalize;
            ${row_center};
            &:hover{
                animation: pulse-red 1s ease infinite;
            }
        }
    }
`
type FormComponentProps = {
    $hasValue: boolean,
}
export const FormComponentWrapper = styled.div<FormComponentProps>`
    width: 100%;
    ${column_align_start};
    position: relative;
    label{
        transition: all 0.3s;
        position: absolute;
        top: 25px;
        left: 15px;
        ${props => props.$hasValue && css`
            top: 5px;
            font-size: 13px;
        `}
    }
    input{
        width: 100%;
        background-color: transparent !important;
        outline: none;
        border-bottom: 1px solid ${props => props.theme.border_color_1} !important;
        caret-color: ${props => props.theme.color_1} !important;
        color: ${props => props.theme.text_color_1} !important;
        padding: 30px 15px 15px;
        &:focus{
            &~label{
                top: 5px;
                font-size: 13px;
            }
        }
        &:-webkit-autofill{
            width: 100%;
            background-color: transparent !important;
            outline: none;
            border-bottom: 1px solid ${props => props.theme.border_color_1} !important;
            caret-color: ${props => props.theme.color_1} !important;
            color: ${props => props.theme.text_color_1} !important;
            padding: 25px 15px 15px;
        }
    }
    .invalid__message{
        font-size: 14px;
        margin-top: 15px;
        margin-left: 15px;
        color: ${props => props.theme.color_1};
    }
    &.invalid{
        input{
            border-bottom: 1px solid ${props => props.theme.color_1} !important;
        }
    }
`