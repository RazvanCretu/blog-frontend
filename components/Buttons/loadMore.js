import React from "react";
import { func, string } from "prop-types";
import { pulse } from "../../assets/js/keyframes.js";
import css from "styled-components";

const Container = css.div`
  display: flex;
  align: center;
  justify-content: center;
  height: 100px;
  width: 100%;
`;

const Posts = css.a`
  text-align: center;
  align-self: center;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 15px 20px;
  color: ${(props) => props.theme.button};
  box-shadow: none;
  font-weight: 1900;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: 0.5s;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 3px solid ${(props) => props.theme.button};
    border-left: 3px solid ${(props) => props.theme.button};
    transition: 0.5s;
    transition-delay: 0.5s;
  }

  &:hover:before {
    width: 100%;
    height: 100%;
    transition-delay: 0s;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-bottom: 3px solid ${(props) => props.theme.button};
    border-right: 3px solid ${(props) => props.theme.button};
    transition: 0.5s;
    transition-delay: 0.5s;
  }

  &:hover:after {
    width: 100%;
    height: 100%;
    transition-delay: 0s;
  }

  &:hover {
    background: ${(props) => props.theme.button};
    color: ${(props) => props.theme.body};
    transition-delay: 0.5s;
    text-decoration: none;
    box-shadow: 0 0px 25px ${(props) => props.theme.button};
  }
`;

const MorePosts = ({ toggle, text }) => {
  return (
    <Container>
      <Posts type="submit" onClick={toggle}>
        {text}
      </Posts>
    </Container>
  );
};

MorePosts.propTypes = {
  text: string.isRequired,
  toggle: func.isRequired,
};

export default MorePosts;
