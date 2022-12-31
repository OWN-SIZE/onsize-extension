import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle: any = createGlobalStyle`
  ${reset};
  html{
    font-size:62.5%;
  }

  html,
  body {
    max-width: 100vw;
    margin: 0 auto;
  }

  body{
    width:38rem;
    height:38rem;
    border:1px solid black;
  }
  
  * {
    box-sizing: border-box;
  }
  button {
    cursor: pointer;
    border: none;
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 0;
  }
  input {
    -webkit-appearance: none;
    -webkit-border-radius: 0;
  }
  input:focus {
    outline: none;
  }
  textarea {
    box-sizing: border-box;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  textarea:focus {
    outline: none;
  }
  a {
    text-decoration:none;
  }
  input[disabled] {
    background-color: white;
  }
`;

export default GlobalStyle;
