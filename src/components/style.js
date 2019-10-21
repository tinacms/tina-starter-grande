import React from "react"
import styled, { createGlobalStyle, css } from "styled-components"
import { mix, tint, shade, transparentize } from "polished"

const BaseTheme = {
  color: {
    black: "#131110",
    white: "#f7f7f7",
    primary: "#007043",
    secondary: "#B8A45D",
  },
  easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
  breakpoints: {
    small: "600px",
    medium: "1200px",
    large: "1600px",
  },
  radius: {
    small: "3px",
  },
}

export const ThemeLight = {
  color: {
    black: BaseTheme.color.black,
    white: BaseTheme.color.white,
    primary: BaseTheme.color.primary,
    secondary: BaseTheme.color.secondary,
    foreground: BaseTheme.color.black,
    background: BaseTheme.color.white,
    link: BaseTheme.color.secondary,
  },
  easing: BaseTheme.easing,
  breakpoints: BaseTheme.breakpoints,
  radius: BaseTheme.radius,
}

export const ThemeDark = {
  color: {
    black: BaseTheme.color.black,
    white: mix(0.7, BaseTheme.color.white, BaseTheme.color.secondary),
    primary: BaseTheme.color.primary,
    secondary: BaseTheme.color.secondary,
    foreground: mix(0.7, BaseTheme.color.white, BaseTheme.color.secondary),
    background: BaseTheme.color.black,
    link: BaseTheme.color.secondary,
  },
  easing: BaseTheme.easing,
  breakpoints: BaseTheme.breakpoints,
  radius: BaseTheme.radius,
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
  @import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

  ${Reset}

  html {
    font-size: 125%;
    font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    line-height: 1.5;
    color: ${props => props.theme.color.foreground};
    background-color: ${props =>
      mix(0.95, props.theme.color.background, props.theme.color.foreground)};

    /* Hide Scrollbar */
    ::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  body {
    min-width: 440px;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  p {
    margin-bottom: 1rem;
  }

  h2:not([class]) {
    font-size: 1.8rem;
    line-height: 1.2;
    text-transform: uppercase;
    word-spacing: 1px;
    font-weight: 700;
  }

  h3:not([class]) {
    font-size: 1.4rem;
    word-spacing: 1px;
    font-weight: 700;
  }

  ul:not([class]),
  ol:not([class]) {
    padding-left: 1rem;
  }

  ol:not([class]) {
    counter-reset: counter;
    list-style: none;
    li:not([class]) {
      counter-increment: counter;
      &:before {
        content: counter(counter) " –";
        color: ${props => props.theme.color.secondary};
        font-weight: bold;
        margin-right: 0.25rem;
      }
    }
  }

  ul:not([class]) {
    list-style-type: none;
    li:not([class]) {
      &:before {
        content: "–";
        color: ${props => props.theme.color.secondary};
        font-weight: bold;
        margin-right: 0.25rem;
      }
    }
  }

  a:not([class]),
  a:not([class]):visited {
    color: ${props => props.theme.color.link};
    text-decoration-color: ${props =>
      transparentize(0.75, props.theme.color.link)};
    transition: all 150ms ${props => props.theme.easing};
    &:hover {
      color: ${props => tint(7, props.theme.color.link)};
      text-decoration-color: ${props =>
        transparentize(0.5, props.theme.color.link)};
    }
    &:focus {
      color: ${props => tint(0.1, props.theme.color.link)};
      text-decoration-color: ${props => props.theme.color.link};
    }
    &:active {
      color: ${props => shade(0.1, props.theme.color.link)};
      text-decoration-color: ${props => props.theme.color.link};
    }
  }

  hr:not([class]) {
    width: 35%;
    min-width: 10rem;
    max-width: 100%;
    border: none;
    margin: 1.5rem 0;
    border-top: 2px solid ${props => props.theme.color.secondary};
  }
`
