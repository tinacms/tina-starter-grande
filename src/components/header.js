import React from "react"
import {
  StyledHeader,
  HeaderWrapper,
  SiteTitle,
  SiteLink,
  Navbar,
  NavItem,
  NavLink,
  DarkModeToggle,
  HeroBackgroundImage,
  Overlay,
} from "./style"
import { Coffee } from "styled-icons/boxicons-regular"
import { ThemeLight, ThemeDark } from "./theme"

export const Header = ({
  setIsDarkMode,
  isDarkMode,
  setTheme,
  siteTitle,
  backgroundImage,
}) => {
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
          <Navbar>
            <NavItem>
              <NavLink to="/">home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/page">page</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/blog">blog</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact">contact</NavLink>
            </NavItem>
            <DarkModeToggle
              onClick={() => {
                setIsDarkMode(!isDarkMode)
                setTheme(!isDarkMode ? ThemeDark : ThemeLight)
                if (typeof window !== "undefined") {
                  localStorage.setItem("isDarkMode", !isDarkMode)
                }
              }}
              isDarkMode={isDarkMode}
            />
          </Navbar>
        </HeaderWrapper>
      </StyledHeader>
      <HeroBackgroundImage fluid={backgroundImage}>
        <Overlay />
      </HeroBackgroundImage>
    </>
  )
}
