import { column_align_start, column_center, column_justify_start, row_between, row_center, row_justify_start } from "@/src/styles";
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
    &.checkout__form{
        form{
            width: 100%;
            ${column_center};
            gap: 40px;
            padding: 0;
            border: none;
            .checkout__form__left{
                width: 100%;
                ${column_center};
                gap: 30px;
            }
            .checkout__form__right{
                width: 100%;
                ${column_justify_start};
                border: 1px solid ${props => props.theme.border_color_1};
                padding: 30px;
                gap: 40px;
                button[type="submit"]{
                    max-width: 100%;
                    align-self: center;
                }

            }
            .order__info__wrapper{
                width: 100%;
                ${column_center};
                gap: 20px;
                .title{
                    width: 100%;
                    text-align: center;
                    font-weight: 600;
                    font-size: 18px;
                }
                .info__row{
                    width: 100%;
                    ${row_between};
                    flex-wrap: wrap;
                    gap: 25px;
                    font-weight: 600;
                    padding: 12px 0;
                    border-bottom: 1px solid ${props => props.theme.border_color_1};
                    &.main{
                        color: ${props => props.theme.color_1};
                    }
                }
            }
            @media (min-width: 992px){
                ${row_between};
                align-items: flex-start;
            }
            
        }
    }
    &.accout__update__form{
        form{
            width: 100%;
            ${column_center};
            gap: 40px;
            padding: 0;
            border: none;
            button{
                max-width: 100%;
            }
            .form__components__grid{
                display: grid;
                grid-template-columns: 1fr;
                gap: 25px;
                padding: 25px 15px;
                @media (min-width: 768px){
                    grid-template-columns: 1fr 1fr;
                    .grid__col{
                        &.full{
                            grid-column: span 2;
                        }
                    }
                }
                @media (min-width: 992px){
                    grid-template-columns: 1fr;
                    .grid__col{
                        &.full{
                            grid-column: span 1;
                        }
                    }
                }
                @media (min-width: 1200px){
                    grid-template-columns: 1fr 1fr;
                    .grid__col{
                        &.full{
                            grid-column: span 2;
                        }
                    }
                }
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
            top: 4px;
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
                top: 4px;
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
    textarea{
        width: 100%;
        background-color: transparent !important;
        outline: none;
        border: 1px solid ${props => props.theme.border_color_1} !important;
        caret-color: ${props => props.theme.color_1} !important;
        color: ${props => props.theme.text_color_1} !important;
        padding: 30px 15px 15px;
        min-height: 200px;
        resize: none;
        &:focus{
            &~label{
                top: 4px;
                font-size: 13px;
            }
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
export const FormBoxComponentWrapper = styled.div`
    ${row_justify_start};
    gap: 6px;
    input{
        appearance: none;
        position: relative;
        width: 20px;
        height: 20px;
        border: 1px solid ${props => props.theme.color_1};
        border-radius: 50%;
        &::after{
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        &:checked{
            background-color: ${props => props.theme.color_1};
            &::after{
                background-color: #fff;
            }
        }
    }
`;

export const RadioInputRows = styled.div`
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.border_color_1} !important;
    padding: 30px 15px 15px;
    ${row_justify_start};
    gap: 15px;
    flex-wrap: wrap;
`