import { createGlobalStyle } from "styled-components";
import { column_between, row_center } from "./helpers/mixin";
import { PreloaderAnimation } from "./helpers/animation";


const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* border: 1px solid #ffffff; */
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
    width: 6px; 
    height: 6px;
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
.swiper{
    width: 100%;
    .swiper-slide{
        ${row_center};
    }
    &.pagination-true{
        padding-bottom: 20px;
        @media (width >= 992px){
            padding-bottom: 30px;
        }
    }
    .swiper-pagination{
        bottom: 0px;
        &-bullet{
            opacity: 1;
            transition: 0.3s;
            background-color: ${props => props.theme.bg_color_7};
            &-active{
                background-color: ${props => props.theme.color_1};
            }
        }
    }
}
.slick-slider{
    width: 100%;
    overflow: hidden;
    .slick-track{
        margin: 0;   
    }
    .slick-slide {
        padding: 0 10px;
        outline: none !important;
        div{
            outline: none !important;
        }
    }
    .slick-list {
        margin: 0 -10px;
        padding: 5px 0;
    }
    .slide-inner{
        display: flex !important;
        justify-content: center  !important;
    }
}

`;

export default GlobalStyles;