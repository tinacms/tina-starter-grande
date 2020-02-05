import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Moon, Sun } from "styled-icons/boxicons-regular"
import styled, { css } from "styled-components"
import { mix, transparentize } from "polished"
import { Link } from "gatsby"

export const Nav = ({ toggleDarkMode, isDarkMode }) => {
  const data = useStaticQuery(graphql`
    query navQuery {
      settingsJson(fileRelativePath: { eq: "/content/settings/menu.json" }) {
        ...nav
      }
    }
  `)

  const [navOpen, setNavOpen] = useState(false)
  const toggleNavOpen = () => {
    setNavOpen(!navOpen)
  }

  const menu = data.settingsJson

  return (
    <>
      <StyledNavbar navOpen={navOpen} isDarkMode={isDarkMode}>
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
      </StyledNavbar>
      <NavToggle
        aria-label="Toggle Nav"
        onClick={toggleNavOpen}
        navOpen={navOpen}
      ></NavToggle>
    </>
  )
}

export const StyledNavbar = styled.ul`
  color: inherit;
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
      props.isDarkMode || props.theme.header.transparent
        ? mix(0.95, props.theme.color.black, props.theme.color.white)
        : mix(0.95, props.theme.color.white, props.theme.color.black)};
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

export const MenuItem = {
  name: "menuItem",
  key: "label",
  label: "Menu Item",
  component: "group",
  fields: [
    { name: "label", label: "Label", component: "text" },
    { name: "link", label: "Path", component: "text" },
  ],
}

export const MenuForm = {
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

export const NavItem = styled.li`
  flex: 0 0 auto;
  display: flex;
  align-items: stretch;
  color: inherit;
  @media (max-width: ${props => props.theme.breakpoints.small}) {
    &:not(:last-child) {
      border-bottom: 1px solid
        ${props => transparentize(0.85, props.theme.color.white)};
    }
  }
`

export const NavLink = styled(({ children, ...styleProps }) => (
  <Link activeClassName="active" {...styleProps} isCurrent>
    <span>{children}</span>
  </Link>
))`
  flex: 1 0 auto;
  line-height: ${props => props.theme.header.height};
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  text-decoration: none;
  color: inherit !important;
  opacity: 0.5;
  overflow: visible;
  transition: all 150ms ${p => p.theme.easing};
  z-index: 1;

  &:focus-visible {
    opacity: 1;
  }

  &:hover:not(.active) {
  }

  &:hover,
  &:active,
  &.active {
    opacity: 1;
  }

  &.active {
  }

  span {
    display: block;
    width: 100%;
  }

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    line-height: 1;
  }

  ${props =>
    props.theme.menu.style === "pill" &&
    css`
      padding: 0 1rem;

      &:before {
        content: "";
        position: absolute;
        display: block;
        top: 0rem;
        left: 0rem;
        right: 0rem;
        bottom: 0rem;
        opacity: 0;
        z-index: -1;
        background-color: ${props =>
          props.theme.header.transparent
            ? props.theme.color.background
            : transparentize(0.95, props.theme.color.foreground)};
        border: 1px solid
          ${props => transparentize(0.95, props.theme.color.foreground)};
        transition: all 150ms ${props => props.theme.easing};
      }

      &:focus-visible {
        opacity: 1;
        &:before {
          opacity: 0.15;
        }
      }

      &:hover:not(.active) {
        &:before {
          opacity: 0.15;
        }
      }

      &:hover,
      &:active,
      &.active {
        opacity: 1;

        &:before {
          opacity: 1;
        }
      }

      &.active {
        color: ${props =>
          props.theme.isDarkMode
            ? props.theme.color.foreground
            : props.theme.color.primary} !important;
        &:before {
          opacity: 1;
        }
      }

      @media (min-width: ${props => props.theme.breakpoints.small}) {
        &:before {
          top: 0.625rem;
          left: 0.25rem;
          right: 0.25rem;
          bottom: 0.625rem;
          border-radius: 3rem;
        }
      }
    `}

  ${props =>
    props.theme.menu.style === "glow" &&
    css`
      &:after {
        content: "";
        display: none;
        position: absolute;
        top: -6px;
        left: 0;
        width: 100%;
        height: 6px;
        background-color: ${props =>
          transparentize(0.85, props.theme.color.white)};
        transform: translate3d(0, -100%, 0);
        transition: all 150ms ${props => props.theme.easing};
      }

      &:before {
        content: "";
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          ${props =>
            transparentize(
              0.75,
              mix(0.25, props.theme.color.white, props.theme.color.black)
            )},
          transparent 1.5rem
        );
        opacity: 0;
        z-index: -1;
        transform: translate3d(0, -100%, 0);
        transition: all 150ms ${props => props.theme.easing};
      }

      &:focus-visible {
        opacity: 1;
        &:before {
          transform: translate3d(0, 0, 0);
          opacity: 0.5;
        }
      }

      &:hover:not(.active) {
        &:before {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        &:after {
          background-color: ${props =>
            transparentize(0.8, props.theme.color.black)};
        }
      }

      &:hover,
      &:active,
      &.active {
        opacity: 1;

        &:before {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        &:after {
          transform: translate3d(0, 0, 0);
        }
      }

      &.active {
        &:before {
          background: linear-gradient(
            to bottom,
            ${props =>
              transparentize(
                0.75,
                mix(0.5, props.theme.color.white, props.theme.color.black)
              )},
            transparent 1.5rem
          );
        }
      }

      @media (min-width: ${props => props.theme.breakpoints.small}) {
        &:after,
        &:before {
          display: block;
        }
      }
    `}
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
  color: inherit;
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
    props.theme.isDarkMode &&
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

export const navFragment = graphql`
  fragment nav on SettingsJson {
    menuItems {
      link
      label
    }
  }
`

export const NavForm = {
  label: "Menu",
  fields: [
    {
      label: "Main Menu",
      name: "rawJson.menuItems",
      component: "group-list",
      itemProps: item => ({
        label: item.label,
      }),
      fields: [
        {
          label: "Label",
          name: "label",
          component: "text",
          parse(value) {
            return value || ""
          },
        },
        {
          label: "Link",
          name: "link",
          component: "text",
          parse(value) {
            return value || ""
          },
        },
        {
          label: "Sub Menu",
          name: "subMenu",
          component: "group-list",
          itemProps: item => ({
            key: item.link,
            label: item.label,
          }),
          fields: [
            {
              label: "Label",
              name: "label",
              component: "text",
            },
            {
              label: "Link",
              name: "link",
              component: "text",
            },
            {
              label: "Sub Menu",
              name: "subMenu",
              component: "group-list",
              itemProps: item => ({
                key: item.link,
                label: item.label,
              }),
              fields: [
                {
                  label: "Label",
                  name: "label",
                  component: "text",
                },
                {
                  label: "Link",
                  name: "link",
                  component: "text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
