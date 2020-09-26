import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    a {
    text-decoration: none;
  }
  
  h1 {
    font-family: Staatliches;
    font-size: 120px;
    color: ${({ theme }) => theme.text};s
  }
  
  #category {
    font-family: Staatliches;
    font-weight: 500;
  }
  
  .active {
      color: red !important;
      background: blue;
  }

  #title {
    letter-spacing: 0.4px;
    font-size: 22px;
    font-size: 1.375rem;
    line-height: 1.13636;
  }
  
  #banner {
    margin: 20px;
    height: 800px;
  }
  
  #editor {
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.75;
  }
  
  .uk-navbar-container {
    font-family: Staatliches;
  }
  
  img:hover {
    opacity: 1;
    transition: opacity 0.25s cubic-bezier(0.39, 0.575, 0.565, 1);
  }



  html, body {
    margin: 0;
    height: 100%;
    position: fixed;
    width: 100%;
}



  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
    overflow:auto;
  }

  html,
  div#__next {
      min-width: 100% !important;
  }

  html {
    overflow:hidden;
  }

  div#__next {
    position:absolute;
}
   
  nav {
    justify-content:center;
    align-items:center;
    min-height: 6vh;
    display: flex;
    flex-wrap: wrap;
    top: 0;
    position: sticky;
}

  a:hover {
  text-decoration: none;
}

  .MuiAppBar-root {
    background: ${({ theme }) => theme.navBar.bgPrimary} !important;
    a {
      color: ${({ theme }) => theme.text};
    }
    transition: all 0.25s linear;
  }
`;
