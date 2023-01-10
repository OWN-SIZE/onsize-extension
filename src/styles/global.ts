import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle: any = createGlobalStyle`
  ${reset};
  html,
  body {
    font-size:62.5%;
    margin: 0 auto;
    background-color: #F6F6F6;
  }

  #app-container{
    width:38rem;
    height:37.5rem;
    margin:0;
    padding:0;
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
