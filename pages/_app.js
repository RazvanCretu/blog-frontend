import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../assets/js/theme";
import { GlobalStyle } from "../assets/js/global";
import withApollo from "../utils/apollo";
import Nav from "../components/nav";
import { useDarkMode } from "../utils/useDarkMode";
import { StylesProvider } from "@material-ui/core/styles";

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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Staatliches"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/react-typist@2.0.5/dist/Typist.css"
          type="text/css"
          charset="utf-8"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.5.4/dist/css/uikit.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.4/dist/js/uikit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.4/dist/js/uikit-icons.min.js"></script>
      </Head>
      <StylesProvider injectFirst>
        <ThemeProvider theme={themeMode}>
          <GlobalStyle />
          <Nav toggleTheme={toggleTheme} theme={theme} />
          <Component {...pageProps} theme={theme} />
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
};

// Wraps all components in the tree with the data provider
export default withApollo(App);
