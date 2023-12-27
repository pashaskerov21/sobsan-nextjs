import styled from "styled-components";

export const BannerSlide = styled.a`
    width: 100%;
    height: auto;
    border-radius: 10px;
    img{
        width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 10px;
        @media (width >= 992px){
            max-height: 500px;
            object-fit: cover;
        }
    }
`;