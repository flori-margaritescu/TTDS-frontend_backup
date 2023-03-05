// From website: https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/

import styled from 'styled-components';

export const Heading = styled.h1`
text-align: center;
color: green;
`;

export const Content = styled.div`
overflowY: scroll;
height: 2500px;
`;

export const Button = styled.div`
position: fixed;
width: 100%;
left: 50%;
bottom: 40px;
height: 20px;
font-size: 3rem;
z-index: 1;
cursor: pointer;
color: #50607a;
`
