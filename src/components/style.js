import React from "react"
import styled, { createGlobalStyle, css } from "styled-components"
import { mix, tint, shade, transparentize } from "polished"

export const ThemeLight = {
  color: {
    black: "#111111",
    white: "#F9F9F9",
    primary: "#006341",
    foreground: "#111111",
    background: "#F9F9F9",
    link: "#006341",
  },
  easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
}

export const ThemeDark = {
  color: {
    black: "#111111",
    white: "#F9F9F9",
    primary: "#006341",
    foreground: "#F9F9F9",
    background: "#111111",
    link: "#006341",
  },
  easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
}

export const Reset = css`
  /*! minireset.css v0.0.5 | MIT License | github.com/jgthms/minireset.css */
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }

  ul {
    list-style: none;
  }

  button,
  input,
  select,
  textarea {
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }

  iframe {
    border: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
    text-align: left;
  }
`

export const CreateGlobalStyles = theme => createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

${Reset}

html {
  font-size: 125%;
  font-family: 'Lato', -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans",
  "Droid Sans", "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: ${theme.color.foreground};
  background-color: ${mix(0.9, theme.color.background, theme.color.primary)};
}

h1, h2, h3, h4, h5, h6, ul, ol, p {
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.8rem;
  text-transform: uppercase;
  word-spacing: 1px;
  font-weight: 700;
}

h3 {
  font-size: 1.4rem;
  word-spacing: 1px;
  font-weight: 700;
}

ul, ol {
  padding-left: 1rem;;
}

a, a:visited {
  color: ${theme.color.link};
  text-decoration-color: ${transparentize(0.75, theme.color.link)};
  transition: all 150ms ${theme.easing};
  &:hover {
    color: ${tint(7, theme.color.link)};
    text-decoration-color: ${transparentize(0.5, theme.color.link)};
  }
  &:focus {
    color: ${tint(0.1, theme.color.link)};
    text-decoration-color: ${theme.color.link};
  }
  &:active {
    color: ${shade(0.1, theme.color.link)};
    text-decoration-color: ${theme.color.link};
  }
}
`
