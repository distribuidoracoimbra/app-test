import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* :focus {
    outline: 0;
    box-shadow: 0 0 0 2px #0181FE;
  } */

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;  
  }
`
