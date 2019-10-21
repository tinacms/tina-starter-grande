import React from "react"
import { Link } from "gatsby"
import { Wrapper } from "./ui"
import styled, { css } from "styled-components"
import { Moon, Sun, Coffee } from "styled-icons/boxicons-regular"
import { tint, shade, transparentize } from "polished"

export const Header = styled(
  ({ siteTitle, isDarkMode, setIsDarkMode, ...styleProps }) => (
    <header {...styleProps}>
      <HeaderWrapper>
        <SiteTitle>
          <SiteLink to="/">
            <Coffee />
            {siteTitle}
          </SiteLink>
        </SiteTitle>
        <Navbar>
          <NavItem>
            <NavLink to="/">home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/blog">blog</NavLink>
          </NavItem>
          <DarkModeToggle
            onClick={() => {
              setIsDarkMode(!isDarkMode)
              localStorage.setItem("isDarkMode", !isDarkMode)
            }}
            isDarkMode={isDarkMode}
          >
            <Sun />
            <Moon />
          </DarkModeToggle>
        </Navbar>
      </HeaderWrapper>
    </header>
  )
)`
  position: absolute;
  width: 100%;
  top: 0;
  background-color: ${props => transparentize(0.95, props.theme.color.black)};
  border-top: 6px solid ${props => props.theme.color.primary};
  box-shadow: inset 0 -1px 0 ${props => transparentize(0.9, props.theme.color.white)},
    0 1px 0 ${props => transparentize(0.9, props.theme.color.black)};
`

export const Navbar = styled.ul`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin: 0;
`

export const NavItem = styled.li`
  flex: 0 0 auto;
`

export const NavLink = styled(props => (
  <Link activeClassName="active" {...props} isCurrent />
))`
  line-height: 3rem;
  padding: 0 0.75rem;
  display: block;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  text-decoration: none;
  color: ${p => p.theme.color.white} !important;
  opacity: 0.5;
  overflow: hidden;
  transition: all 150ms ${p => p.theme.easing};

  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: ${props => props.theme.color.primary};
    transform: translate3d(0, 100%, 0);
    transition: all 150ms ${props => props.theme.easing};
  }

  &:hover {
    &:after {
      opacity: 0.3;
    }
  }

  &:hover,
  &:active,
  &.active {
    opacity: 1;

    &:after {
      transform: translate3d(0, 0, 0);
    }
  }
`

const SiteLink = styled(Link)`
  line-height: 36px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.white} !important;
  text-decoration: none;
  margin: 0;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    fill: ${props => props.theme.color.white};
  }
`

const SiteTitle = styled.h1`
  margin: 0;
  flex: 0 0 auto;
  font-size: 1rem;
`

const HeaderWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
`

const DarkModeToggle = styled.button`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  margin-left: 1rem;
  color: ${props => props.theme.color.white};
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.5rem;
    height: 1.5rem;
    fill: currentColor;
    transition: all 150ms ${props => props.theme.easing};
    transform-origin: 50% 50%;
    &:first-child {
      opacity: 0;
      transform: rotate(-90deg);
    }
    &:last-child {
      opacity: 1;
      transform: rotate(0deg);
    }
  }

  &:focus {
    outline: none;
  }

  ${props =>
    props.isDarkMode &&
    css`
      svg {
        &:first-child {
          opacity: 1;
          transform: rotate(0deg);
        }
        &:last-child {
          opacity: 0;
          transform: rotate(90deg);
        }
      }
    `};
`
