import React from "react"
import { Overlay, Wrapper } from "./style"
import { Coffee } from "styled-icons/boxicons-regular"
import styled, { css } from "styled-components"
import { transparentize } from "polished"
import BackgroundImage from "gatsby-background-image"
import { Nav } from "./nav"
import { Context } from "./context"
import { Link } from "gatsby"

export const Header = styled(({ siteTitle, ...styleProps }) => {
  return (
    <Context.Consumer>
      {({ toggleDarkMode, isDarkMode }) => (
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
    </Context.Consumer>
  )
})`
  position: absolute;
  z-index: 100;
  width: 100%;
  top: 0;
  background-color: ${props => transparentize(0.95, props.theme.color.black)};
  box-shadow: inset 0 -1px 0 ${props => transparentize(0.9, props.theme.color.white)},
    0 1px 0 ${props => transparentize(0.9, props.theme.color.black)};

  ${props =>
    props.theme.header.overline &&
    css`
      border-top: 6px solid ${props => props.theme.color.primary};
    `};
`

export const SiteLink = styled(Link)`
  position: relative;
  line-height: 3rem;
  display: flex;
  align-items: center;
  align-self: stretch;
  color: ${props => props.theme.color.white} !important;
  text-decoration: none;
  margin: 0;
  transition: all 150ms ${p => p.theme.easing};
  z-index: 1;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    fill: ${props => props.theme.color.white};
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
`

export const HeaderWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
`
