import styled, { css } from "styled-components";

export const Container = styled.div`
width: 100%;
margin: 0 auto;
padding: 0 12px;
@media (min-width: 576px){
    max-width: 540px;
}
@media (min-width: 768px){
    max-width: 720px;
}
@media (min-width: 992px){
    max-width: 960px;
}
@media (min-width: 1200px){
    max-width: 1140px;
}
@media (min-width: 1400px){
    max-width: 1320px;
}
`;

type GridProps = {
    $col?: number,
}
export const GridContainer = styled.div<GridProps>`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1,1fr);
    place-items: center;
    gap: 20px;
    ${
        props => props.$col === 4 && css`
            @media (min-width: 768px){
                grid-template-columns: repeat(2,1fr);
            }
            @media (min-width: 992px){
                grid-template-columns: repeat(3,1fr);
            }
            @media (min-width: 1400px){
                grid-template-columns: repeat(4,1fr);
            }
        `
    }
    ${
        props => props.$col === 5 && css`
            @media (min-width: 576px){
                grid-template-columns: repeat(2,1fr);
            }
            @media (min-width: 992px){
                grid-template-columns: repeat(3,1fr);
            }
            @media (min-width: 1200px){
                grid-template-columns: repeat(4,1fr);
            }
            @media (min-width: 1400px){
                grid-template-columns: repeat(5,1fr);
                gap: 20px;
            }
        `
    }
    ${
        props => props.$col === 6 && css`
            @media (min-width: 576px){
                grid-template-columns: repeat(2,1fr);
            }
            @media (min-width: 992px){
                grid-template-columns: repeat(3,1fr);
            }
            @media (min-width: 1200px){
                grid-template-columns: repeat(4,1fr);
            }
            @media (min-width: 1400px){
                grid-template-columns: repeat(5,1fr);
                gap: 20px;
            }
            @media (min-width: 1600px){
                grid-template-columns: repeat(6,1fr);
            }
        `
    }
`;