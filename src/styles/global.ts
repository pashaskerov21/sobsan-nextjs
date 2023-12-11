import { createGlobalStyle } from "styled-components";
import { column_between, row_center } from "./mixin";
import { preloaderAnimation } from "./animation";

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* border: 1px solid red; */
}
html{
    scroll-behavior: smooth;
}
body{
    ${column_between}
    width: 100%;
    min-height: 100vh;
    background-color: ${props => props.theme.bg_color_1};
    color: ${props => props.theme.text_color_1};
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
}
::-webkit-scrollbar{
    width: 10px; 
    height: 10px;
}
::-webkit-scrollbar-thumb{
    background-color: ${props => props.theme.color_1};
}
::-webkit-scrollbar-track{
    background-color: ${props => props.theme.bg_color_1};
}
::selection {
    background: ${props => props.theme.color_1};
    color: #ffffff;
}
a, a:hover, a:active, a:visited {
    text-decoration: none;
    color: inherit;
}
a{
    transition: all 0.2s;
    font-family: 'Montserrat', sans-serif;
}
p{
  margin: 0;
}
ul{
  list-style: none;
}
button{
  background-color: transparent;
  border: none;
  outline: none;
  transition: all 0.2s;
  font-family: 'Montserrat', sans-serif;
}
header, main, section, footer{
  width: 100%;
}
svg{
    display: block;
    user-select: none;
}
img{
    user-select: none;
    display:block;
}
input{
    border: none;
    outline: none;
    &::placeholder{
        user-select: none;
    }
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        display: none;
    }
}

.preloader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    background-color: ${props => props.theme.bg_color_1};
    z-index: 99999;
    ${row_center};
    &::after{
        content: '';
        border-top: 5px solid ${props => props.theme.color_1};
        border-right: 5px solid ${props => props.theme.color_1};
        border-radius: 50%;
        ${row_center};
        width: 150px;
        height: 150px;
        animation: ${preloaderAnimation} 0.7s linear infinite;
    }
}
`;

export default GlobalStyles;