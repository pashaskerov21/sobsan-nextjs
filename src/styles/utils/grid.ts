import styled, { css } from "styled-components";

interface GridProps {
    $col?: number,
}

const Grid = styled.div<GridProps>`
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
export default Grid