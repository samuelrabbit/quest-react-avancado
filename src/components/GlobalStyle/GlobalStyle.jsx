import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) =>
      theme === "light" ? "#ffffff" : "#333333"};
    color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
    font-family: 'Arial', sans-serif;
  }

 
  a {
    text-decoration: none;
  color: ${({ theme }) => (theme === "light" ? "#007bff" : "#61dafb")};
  }


  h1{
    font-size: 30px;
    text-transform: uppercase;
  }

    h2{
    font-size: 25px;
    text-transform: uppercase;
    padding-top: 15px;
  }

  h3 {
    font-size: 20px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  ul{
  padding: 0px 20px 20px 20px;
   list-style-type: square;
  }

  li{
    text-transform: capitalize;
    padding: 5px;
}
  button {
    background-color: ${({ theme }) =>
      theme === "light" ? "#007bff" : "#61dafb"};
    color: ${({ theme }) => (theme === "light" ? "#fff" : "#000")};
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.6;
  }
`;

export default GlobalStyle;
