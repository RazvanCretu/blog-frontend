import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Toggle from "./Buttons/modeButton";
import styled from "styled-components";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Box from "@material-ui/core/Box";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
// import fetch from 'isomorphic-unfetch';
import axios from 'axios';

const NavContainer = styled.div`
  background: ${(props) => props.theme.navBar.bgPrimary};
  position: sticky;
  top: 0;
  z-index: 100;
  & nav li a {
    color: ${(props) => props.theme.text} !important;
  }
`;

const StyledBar = styled(AppBar)`
  display: flex;
  & div {
    justify-content: space-between;
  }
`;

const StyledButton = styled(Button)`
  margin-left: auto;
`;

const StyledSwitch = styled(Switch)`

  margin: 0px auto;
`;


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? document.body : undefined,
  });

  document.body;

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Nav = ({ toggleTheme, theme, props }) => {
  const router = useRouter();

  const auth = () => {
    axios.get ('http://localhost:1337/connect/google')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  })

  };

  return (
    <NavContainer>
      {/* <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                <a>Strapi Blog</a>
              </Link>
            </li>
          </ul>
        </div>
        <Toggle toggleTheme={toggleTheme} theme={theme} />
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li className={router.pathname === `/categories` ? "active" : ""}>
              <Link href="/categories">
                <a className="uk-link-reset">Categories</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav> */}

      <HideOnScroll {...props}>
        <StyledBar>
          <Toolbar>
            <Box>
              <Link href="/">
                <Typography variant="h6">
                  <a>Strapi Blog</a>
                </Typography>
              </Link>
            </Box>

            <StyledSwitch
              checked={theme === "dark" ? true : false}
              onChange={toggleTheme}
              inputProps={{ "aria-label": "primary checkbox" }}
            />

            <StyledButton color="inherit">
              <Link href="/">
                <a className="uk-link-reset">Categories</a>
              </Link>
            </StyledButton>
            <StyledButton color="inherit">
              <Link href="" >
                <a className="uk-link-reset" onClick={auth} >Log In</a>
              </Link>
            </StyledButton>
          </Toolbar>
        </StyledBar>
      </HideOnScroll>
    </NavContainer>
  );
};

// Nav.getStaticProps = 

// async function() {
//   const res = await axios.get('http://localhost:1337/connect/google')
//   const data = await res.data

// }

export default Nav;
