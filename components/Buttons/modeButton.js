// Toggle.js
import React from "react";
import { func, string } from "prop-types";
import styled, { withTheme } from "styled-components";
// Import a couple of SVG files we'll use in the design: https://www.flaticon.com
import MoonIcon from "../../assets/icons/moon.svg";
import SunIcon from "../../assets/icons/sun.svg";

// Toggle.styled.js
const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 6rem;
  height: 3rem;

  svg {
    height: auto;
    width: 2.5rem;
    transition: all 0.3s linear;

    // sun icon
    &:first-child {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(0)" : "translateY(100px)"};
    }

    // moon icon
    &:nth-child(2) {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(-100px)" : "translateY(0)"};
    }
  }
`;

const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";
  return (
    <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
      <SunIcon />
      <MoonIcon />
    </ToggleContainer>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default withTheme(Toggle);
