import React from "react"
import styled, { createGlobalStyle, css } from "styled-components"

export const Theme = {
  color: {
    primary: {
      light: "#2296FE",
      medium: "#0084ff",
      dark: "#0574E4",
    },
  },
}

function primary(value = "medium") {
  return props => props.theme.color["primary"][value]
}

export const color = {
  primary: primary,
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

export const GlobalStyles = createGlobalStyle`
  ${Reset}

  html {
    font-size: 125%;
    font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
    line-height: 1.5;
    color: #111111;
    background-color: #F3F3F3;
  }

  h1, h2, h3, h4, h5, h6, ul, ol, p {
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
  }
`
