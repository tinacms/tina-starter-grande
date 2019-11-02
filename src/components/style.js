import React from "react"
import styled, { createGlobalStyle, css } from "styled-components"
import { mix, shade, transparentize } from "polished"
import Img from "gatsby-image"

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

export const PrismTheme = css`
  code[class*="language-"],
  pre[class*="language-"] {
    color: ${props => transparentize(0.1, props.theme.color.foreground)};
    font-family: "Hack", Monaco, "Courier New", Courier, monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    tab-size: 4;
    hyphens: none;
    border-radius: 0 ${props => props.theme.radius.small}
      ${props => props.theme.radius.small} 0;
    background-color: ${props =>
      mix(0.975, props.theme.color.background, props.theme.color.foreground)};
  }

  code[class*="language-"] {
    padding: 0 0.25em;
    margin: 0 0.125em;
    font-size: 0.9em;
    display: inline-block;
    border-radius: ${props => props.theme.radius.small};
    border: 1px solid
      ${props => transparentize(0.95, props.theme.color.foreground)};
  }

  pre[class*="language-"] {
    position: relative;
    border-radius: 0 ${props => props.theme.radius.small}
      ${props => props.theme.radius.small} 0;
    padding: 1em 0 1em 1em;
    margin: 0.5em 0;

    border-radius: 0.3em;
    font-size: 0.8em;
    padding: 1.5rem;
    border-top: 1px solid
      ${props => transparentize(0.95, props.theme.color.foreground)};
    border-bottom: 1px solid
      ${props => transparentize(0.95, props.theme.color.foreground)};

    code {
      display: block;
      font-size: 1em;
      padding: 0 1rem 0 0;
      margin: 0;
      border-radius: 0;
      border: none;
      background-color: transparent;
      overflow: auto;
      max-width: 100vw;
    }

    *:focus:not(.focus-visible) {
      outline: none;
    }
  }

  pre[class*="language-"].line-numbers {
    counter-reset: linenumber;
  }

  pre[class*="language-"].line-numbers > code {
    white-space: inherit;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    top: 1.5rem;
    pointer-events: none;
    font-size: 100%;
    width: 3em;
    letter-spacing: -1px;
    user-select: none;
    padding-left: 0.75rem;

    @media (min-width: ${props => props.theme.breakpoints.small}) {
      padding-left: 1.5rem;
    }

    @media (min-width: ${props => props.theme.breakpoints.large}) {
      padding-left: 2rem;
    }
  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: ${props => props.theme.color.foreground};
    opacity: 0.25;
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${props => props.theme.color.foreground};
    opacity: 0.5;
  }

  .token.punctuation {
    color: ${props => props.theme.color.foreground};
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${props => mix(0.85, "#F90B61", props.theme.color.foreground)};
  }

  .token.boolean,
  .token.number {
    color: ${props => mix(0.85, "#9458FF", props.theme.color.foreground)};
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${props => mix(0.85, "#91CA1E", props.theme.color.foreground)};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: ${props => props.theme.color.foreground};
  }

  .token.atrule,
  .token.attr-value,
  .token.function {
    color: ${props => mix(0.85, "#C6BE00", props.theme.color.foreground)};
  }

  .token.keyword {
    color: ${props => mix(0.85, "#F90B61", props.theme.color.foreground)};
  }

  .token.regex,
  .token.important {
    color: ${props => mix(0.85, "#FD8F0D", props.theme.color.foreground)};
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
`

export const GlobalStyles = createGlobalStyle`
  ${Reset}

  html {
    font-size: 100%;
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

    @media (min-width: ${props => props.theme.breakpoints.small}) {
      font-size: 125%;
    }


    @media (min-width: ${props => props.theme.breakpoints.huge}) {
      font-size: 140%;
    }

    ${props =>
      props.theme.mode === "dark" &&
      css`
        background-color: ${props => props.theme.color.background};
      `};
      
  }

  ${PrismTheme}

  blockquote {
    font-size: 1.2rem;
    padding: 1rem 1.5rem;
    border-radius: 0 ${props => props.theme.radius.small} ${props =>
  props.theme.radius.small} 0;
    background-color: ${props =>
      transparentize(0.95, props.theme.color.foreground)};
    box-shadow: -6px 0 0 ${props => props.theme.color.primary};
    margin-left: 6px;
    &:not(:first-child) {
      margin-top: 1.6rem;
    }
    &:not(:last-child) {
      margin-bottom: 1.6rem;
    }
    *:last-child {
      margin-bottom: 0 !important;
    }
  }

  p {
    font-size: 1em;
    letter-spacing: 0.2px;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1.5rem;
  }

  li:not(:last-child):not([class]) {
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 2.2em;
    line-height: 1.2;
    word-spacing: 1px;
    font-weight: 500;

    + hr {
      margin: 2.4rem 0;
    }
  }

  h2 {
    font-size: 1.8em;
    line-height: 1.2;
    word-spacing: 1px;
    font-weight: 700;

    ${props =>
      props.theme.typography.uppercaseH2 &&
      css`
        text-transform: uppercase;
      `};
  }

  h3 {
    font-size: 1.4em;
    word-spacing: 1px;
    font-weight: 700;
  }

  h1, h2, h3 {
    a:not([class]) {
      color: inherit !important;
    }
    a:not([class]):not(:hover) {
      text-decoration: none;
      color: inherit !important;
      text-decoration-color: transparent !important;
    }
  }

  ul:not([class]),
  ol:not([class]) {
    padding-left: 1em;
    margin-bottom: 1.5rem;
  }

  ol:not([class]) {
    counter-reset: counter;
    list-style: none;
    li:not([class]) {
      counter-increment: counter;
      &:before {
        content: counter(counter) " –";
        color: ${props => props.theme.color.secondary};
        font-weight: 700;
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
        font-weight: 700;
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
      color: ${props => shade(0.1, props.theme.color.link)};
      text-decoration-color: ${props =>
        transparentize(0.5, props.theme.color.link)};
    }
    &:focus {
      color: ${props => shade(0.1, props.theme.color.link)};
      text-decoration-color: ${props => shade(0.1, props.theme.color.link)};
    }
    &:active {
      color: ${props => shade(0.1, props.theme.color.link)};
      text-decoration-color: ${props => props.theme.color.link};
    }
  }

  hr {
    width: 35%;
    min-width: 10rem;
    max-width: 100%;
    border: none;
    margin: 1.6rem 0;
    border-top: 2px solid ${props => props.theme.color.secondary};
  }
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 896px;
  margin: 0 auto;
  padding: 0 1em;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    padding: 0 2rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.large}) {
    max-width: 1024px;
  }

  @media (min-width: ${props => props.theme.breakpoints.huge}) {
    max-width: 1280px;
  }
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.color.black};
  opacity: 0.7;
`

export const Image = styled(Img)``

export const Content = styled.div``

export const Paper = styled.div`
  position: relative;
  background-color: ${props => props.theme.color.background};
  border-radius: ${props => props.theme.radius.small};
  box-shadow: 0 0.5rem 1rem -0.5rem ${props =>
    transparentize(0.9, props.theme.color.black)};
  padding: 2rem;
  margin: 0 -1rem;

  ${props =>
    props.article &&
    css`
      flex-grow: 0 !important;
      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    `};

  ${props =>
    props.theme.mode === "dark" &&
    css`
      background-color: ${props =>
        mix(0.95, props.theme.color.background, props.theme.color.foreground)};
    `};

  > *:last-child, ${Content} > *:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    padding: 2.5rem 3rem;
    margin: 0;
  }

  @media (min-width: ${props => props.theme.breakpoints.large}) {
    padding: 3.5rem 4rem;
  }

  pre[class*="language-"] {
    border-radius: 0;
    padding-left: 2rem;
    padding-right: 0rem;

    @media (min-width: ${props => props.theme.breakpoints.small}) {
      margin: 2.5rem -3rem !important;
      padding-left: 3rem;
    }

    @media (min-width: ${props => props.theme.breakpoints.large}) {
      margin: 3.5rem -4rem !important;
      padding-left: 4rem;
    }
  }

  ${Image}, .gatsby-resp-image-wrapper, pre[class*="language-"] {
    margin: 2rem -2rem !important;
    overflow: hidden;

    @media (min-width: ${props => props.theme.breakpoints.small}) {
      margin: 2.5rem -3rem !important;
    }

    @media (min-width: ${props => props.theme.breakpoints.large}) {
      margin: 3.5rem -4rem !important;
    }
  }

  /* > *:first-child {
    ${Image}, .gatsby-resp-image-wrapper {
      margin-top: -1.5rem !important;
      border-radius: ${props => props.theme.radius.small}
        ${props => props.theme.radius.small} 0 0;

      @media (min-width: ${props => props.theme.breakpoints.small}) {
        margin-top: -2.5rem !important;
        border-radius: ${props => props.theme.radius.small}
          ${props => props.theme.radius.small} 0 0;
      }

      @media (min-width: ${props => props.theme.breakpoints.large}) {
        margin-top: -3.5rem !important;
        border-radius: ${props => props.theme.radius.small}
          ${props => props.theme.radius.small} 0 0;
      }
    }
  } */
`

export const Main = styled.main`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  ${Wrapper} {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  ${Paper} {
    flex: 1 0 auto;
  }

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    padding: 6rem 0 4rem 0;

    ${props =>
      props.theme.header.layout === "hero" &&
      css`
        padding: 12rem 0 4rem 0;
      `};
  }
`

export const Button = styled.button`
  display: inline-block;
  position: relative;
  line-height: 2.25rem;
  font-size: 1rem;
  padding: 0 1rem;
  text-align: center;
  min-width: 8rem;
  border-radius: ${props => props.theme.radius.small};
  border: none;
  transition: all 150ms ${props => props.theme.easing};
  color: ${props => props.theme.color.white};
  background-color: ${props => transparentize(0.8, props.theme.color.black)};
  border-bottom: 3px solid
    ${props => transparentize(0.8, props.theme.color.black)};
  cursor: pointer;
  z-index: 1;
  box-shadow: 0 3px 4px ${props => transparentize(0.8, props.theme.color.black)};
  text-shadow: 0 1px 1px
    ${props => transparentize(0.5, props.theme.color.black)};

  &:after,
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: ${props => props.theme.radius.small}
      ${props => props.theme.radius.small} 0 0;
    transition: all 150ms ${props => props.theme.easing};
  }

  &:after {
    box-shadow: inset 0 0 3px
      ${props => transparentize(0.6, props.theme.color.black)};
  }

  &:before {
    background-color: ${props => props.theme.color.foreground};
    opacity: 0;
  }

  &:hover {
    &:before {
      opacity: 0.15;
    }
  }

  &:active {
    &:before {
      opacity: 0;
    }
    &:after {
      opacity: 0;
    }
    box-shadow: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.color.secondary};
  }

  ${p =>
    p.primary &&
    css`
      background-color: ${props => props.theme.color.primary};
      color: ${props => props.theme.color.white};
    `};
`

export const Meta = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  a:not(:hover) {
    text-decoration: none;
  }
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

export const MetaActions = styled.span`
  opacity: 1;
  flex: 1 0 auto;
  display: flex;
  justify-content: flex-end;
`

export const MetaSpan = styled.span`
  justify-self: flex-start;
  opacity: 0.5;
  position: relative;
  em {
    font-style: normal;
    opacity: 0.5;
  }
  svg {
    opacity: 0.5;
    width: 1.4em;
    margin-top: -0.2em;
    &:not(:last-child) {
      margin-right: 1em;
    }
  }
  &:not(:last-child) {
    margin-right: 1em;
  }
  &:not(:first-child) {
    padding-left: 1rem;
    &:before {
      content: "—";
      position: absolute;
      opacity: 0.5;
      left: 0;
      transform: translate3d(-50%, 0, 0);
    }
  }
  &:last-child {
    flex: 1 0 auto;
  }
`

export const DraftBadge = styled.span`
  display: inline-block;
  line-height: 1;
  text-transform: uppercase;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0 ${props => props.theme.radius.small} 0
    ${props => props.theme.radius.small};
  color: ${props => props.theme.color.white};
  background: ${props => props.theme.color.primary};
  position: absolute;
  top: 0;
  right: 0;
`

export const Headline = styled.h2`
  font-size: 2.6em;
  line-height: 1.2;
  word-spacing: 1px;
  font-weight: 500;
`

export const Title = styled.h2`
  font-size: 2.2em;
  line-height: 1.2;
  word-spacing: 1px;
  font-weight: 700;

  + hr {
    margin: 2.4rem 0;
  }
`
