import React from "react"
import { Wrapper } from "./style"
import { Coffee } from "styled-icons/boxicons-regular"
import styled, { css } from "styled-components"
import { transparentize } from "polished"
import { Nav } from "./nav"
import { ThemeContext } from "./theme"
import { Link } from "gatsby"

export const Header = styled(({ siteTitle, ...styleProps }) => {
  return (
    <ThemeContext.Consumer>
      {({ toggleDarkMode, isDarkMode, theme }) => (
        <header {...styleProps}>
          <HeaderWrapper>
            <SiteTitle>
              <SiteLink to="/">
                <Coffee />
                {siteTitle}
              </SiteLink>
            </SiteTitle>
            <Nav toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          </HeaderWrapper>
        </header>
      )}
    </ThemeContext.Consumer>
  )
})`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: ${props => props.theme.header.height};
  top: 0;
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.foreground};

  ${props =>
    props.theme.header.overline &&
    css`
      border-top: 6px solid ${props => props.theme.color.primary};
    `};

  ${props =>
    props.theme.header.underline &&
    css`
      box-shadow: inset 0 -1px 0 ${props => transparentize(0.9, props.theme.color.white)},
        0 1px 0 ${props => transparentize(0.9, props.theme.color.black)};
    `};

  ${props =>
    props.theme.header.transparent &&
    css`
      background-color: ${props =>
        transparentize(0.9, props.theme.color.black)};
      color: ${props => props.theme.color.white};
    `};
`

export const SiteLink = styled(Link)`
  position: relative;
  line-height: 3rem;
  display: flex;
  align-items: center;
  align-self: stretch;
  color: inherit !important;
  text-decoration: none;
  margin: 0;
  transition: all 150ms ${p => p.theme.easing};
  z-index: 1;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    fill: currentColor;
  }
  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: -1rem;
    width: calc(100% + 2rem);
    height: 100%;
    background-color: ${props => props.theme.color.primary};
    opacity: 0;
    transition: all 150ms ${p => p.theme.easing};
    z-index: -1;
  }

  &:focus-visible {
    &:after {
      opacity: 0.5;
    }
  }
`

export const SiteTitle = styled.h1`
  margin: 0;
  flex: 0 0 auto;
  font-size: 1rem;
  align-self: stretch;
  display: flex;
`

export const HeaderWrapper = styled(Wrapper)`
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`
