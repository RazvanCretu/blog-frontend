import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../assets/js/theme";
import { GlobalStyle } from "../assets/js/global";
import withApollo from "../utils/apollo";
import Nav from "../components/nav";
import { useDarkMode } from "../utils/useDarkMode";

const App = ({ Component, pageProps, apollo }) => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ApolloProvider client={apollo}>
      <Head>
        <title>Strapi blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Staatliches"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.5.4/dist/css/uikit.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.4/dist/js/uikit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.4/dist/js/uikit-icons.min.js"></script>
      </Head>

      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <Nav toggleTheme={toggleTheme} theme={theme} />
        <Component {...pageProps} theme={theme} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

// Wraps all components in the tree with the data provider
export default withApollo(App);
