import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  a11yDark,
  a11yLight,
} from "../node_modules/react-syntax-highlighter/dist/esm/styles/hljs";
import styled, { withTheme } from "styled-components";
import { lightTheme } from "../assets/js/theme";

const Syntax = styled(SyntaxHighlighter)`
  code:nth-child(1) {
    user-select: none;
  }
`;

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: null,
  };

  render() {
    const { language, value, theme } = this.props;

    return (
      <Syntax
        language={language}
        style={theme === lightTheme ? a11yLight : a11yDark}
        showLineNumbers={true}
      >
        {value}
      </Syntax>
    );
  }
}

export default withTheme(CodeBlock);
