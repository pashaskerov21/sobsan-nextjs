import styled from "styled-components";

const Container = styled.div`
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
/* @media (min-width: 1600px){
    max-width: 1520px;
} */
`;
export default Container