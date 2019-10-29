import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Wrapper, Overlay } from "./style"
import { Moon, Sun, Coffee } from "styled-icons/boxicons-regular"
import styled, { css } from "styled-components"
import { mix, tint, shade, transparentize } from "polished"
import BackgroundImage from "gatsby-background-image"
import { Link } from "gatsby"

import { useJsonForm } from "gatsby-tinacms-json"

export const Header = ({
  toggleDarkMode,
  isDarkMode,
  siteTitle,
  heroImage,
}) => {
  const [navOpen, setNavOpen] = useState(false)
  const toggleNavOpen = () => {
    setNavOpen(!navOpen)
  }

  const data = useStaticQuery(graphql`
    query headerQuery {
      dataJson {
        menuItems {
          label
          link
        }
      }
    }
  `)

  const MenuItem = {
    name: "menuItem",
    key: "label",
    label: "Menu Item",
    component: "group",
    fields: [
      { name: "label", label: "Label", component: "text" },
      { name: "link", label: "Path", component: "text" },
    ],
  }

  const MenuForm = {
    label: "Menu",
    fields: [
      {
        label: "Menu Items",
        name: "rawJson.menuItems",
        component: "blocks",
        templates: {
          MenuItem,
        },
      },
    ],
  }

  //const [menu] = useJsonForm(data.dataJson, MenuForm)
  const menu = data.dataJson

  return (
    <>
      <StyledHeader>
        <HeaderWrapper>
          <SiteTitle>
            <SiteLink to="/">
              <Coffee />
              {siteTitle}
            </SiteLink>
          </SiteTitle>
          <Navbar navOpen={navOpen}>
            {menu.menuItems.map(item => (
              <NavItem key={item.label}>
                <NavLink
                  onClick={toggleNavOpen}
                  partiallyActive={item.link === "/" ? false : true}
                  to={item.link}
                >
                  {item.label}
                </NavLink>
              </NavItem>
            ))}
            <NavItem>
              <DarkModeToggle
                aria-label="Toggle Dark Theme"
                onClick={toggleDarkMode}
                isDarkMode={isDarkMode}
              />
            </NavItem>
          </Navbar>
          <NavToggle
            aria-label="Toggle Nav"
            onClick={toggleNavOpen}
            navOpen={navOpen}
          ></NavToggle>
        </HeaderWrapper>
      </StyledHeader>
      <HeroBackgroundImage fluid={heroImage}>
        <Overlay />
      </HeroBackgroundImage>
    </>
  )
}

export const StyledHeader = styled.header`
  position: absolute;
  width: 100%;
  top: 0;
  background-color: ${props => transparentize(0.95, props.theme.color.black)};
  border-top: 6px solid ${props => props.theme.color.primary};
  box-shadow: inset 0 -1px 0 ${props => transparentize(0.9, props.theme.color.white)},
    0 1px 0 ${props => transparentize(0.9, props.theme.color.black)};
`

export const HeroBackgroundImage = styled(BackgroundImage)`
  position: relative !important;
  width: 100%;
  height: 12rem;
  z-index: -1;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    position: absolute !important;
    height: 18rem;
  }
`

export const Navbar = styled.ul`
  @media (max-width: ${props => props.theme.breakpoints.small}) {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate3d(0, 100%, 0);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    opacity: 0;
    z-index: 1000;
    background-color: ${props =>
      mix(0.95, props.theme.color.black, props.theme.color.white)};
    box-shadow: 0 1rem 2rem -0.5rem ${props => transparentize(0.5, props.theme.color.black)};
    transition: all 150ms ${p => p.theme.easing};
    pointer-events: none;
    ${props =>
      props.navOpen &&
      css`
        opacity: 1;
        pointer-events: all;
      `};
  }

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    display: flex;
    flex-direction: row;
    align-self: stretch;
    align-items: stretch;
    justify-content: flex-end;
    flex: 1 0 auto;
    margin: 0;
    opacity: 1;
    pointer-events: all;
  }
`

export const NavItem = styled.li`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  @media (max-width: ${props => props.theme.breakpoints.small}) {
    &:not(:last-child) {
      border-bottom: 1px solid
        ${props => transparentize(0.85, props.theme.color.white)};
    }
  }
`

export const NavLink = styled(props => (
  <Link activeClassName="active" {...props} isCurrent />
))`
  flex: 1 0 auto;
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
  overflow: visible;
  transition: all 150ms ${p => p.theme.easing};
  z-index: 1;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: -6px;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: ${props => transparentize(0.85, props.theme.color.white)};
    transform: translate3d(0, -100%, 0);
    transition: all 150ms ${props => props.theme.easing};
  }

  &:before {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.color.primary};
    opacity: 0;
    transition: all 150ms ${p => p.theme.easing};
    z-index: -1;
  }

  &:focus-visible {
    opacity: 1;
    &:before {
      opacity: 0.5;
    }
  }

  &:hover:not(.active) {
    &:after {
      background-color: ${props =>
        transparentize(0.85, props.theme.color.black)};
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

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    &:after {
      display: none;
    }
  }
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

export const NavToggle = styled(({ menuOpen, ...styleProps }) => {
  return (
    <button {...styleProps}>
      <span className="closed">Open Menu</span>
      <span className="open">Close Menu</span>
    </button>
  )
})`
  position: relative;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  margin-left: 1rem;
  font-size: 0.8rem;
  line-height: 1;
  align-self: stretch;
  text-transform: uppercase;
  color: ${props => props.theme.color.white};
  opacity: 0.5;
  overflow: visible;
  transition: all 150ms ${p => p.theme.easing};

  .open {
    display: none;
  }
  .closed {
    display: block;
  }

  &:focus {
    opacity: 1;
    text-decoration: underline;
  }

  &:hover {
    opacity: 1;
  }

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    display: none;
  }

  ${props =>
    props.navOpen &&
    css`
      .open {
        display: block;
      }
      .closed {
        display: none;
      }
    `};
`

export const DarkModeToggle = styled(({ ...styleProps }) => {
  return (
    <button {...styleProps}>
      <Sun />
      <Moon />
    </button>
  )
})`
  position: relative;
  flex: 0 0 auto;
  width: 100%;
  height: 2.75rem;
  align-self: stretch;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  color: ${props => props.theme.color.white};
  opacity: 0.5;
  overflow: hidden;
  transition: all 300ms ${props => props.theme.easing};
  transform-origin: 50% 50%;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    width: 1.5rem;
    height: 100%;
    margin-left: 1rem;
  }

  svg {
    position: absolute;
    top: calc(50% - 0.75rem);
    left: calc(50% - 0.75rem);
    width: 1.5rem;
    height: auto;
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

  &:focus-visible {
    transform: rotate(360deg);
    opacity: 1;
  }

  &:hover {
    opacity: 1;
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
