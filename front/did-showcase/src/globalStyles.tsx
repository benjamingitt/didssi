import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`  
  * {
    box-sizing: border-box;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;
