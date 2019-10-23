import React, { useState } from "react"
import {
  StyledHeader,
  HeaderWrapper,
  SiteTitle,
  SiteLink,
  Navbar,
  NavItem,
  NavLink,
  NavToggle,
  DarkModeToggle,
  HeroBackgroundImage,
  Overlay,
} from "./style"
import { Coffee } from "styled-icons/boxicons-regular"

export const Header = ({
  toggleDarkMode,
  isDarkMode,
  siteTitle,
  backgroundImage,
  menuLinks,
}) => {
  const [navOpen, setNavOpen] = useState(false)
  const toggleNavOpen = () => {
    setNavOpen(!navOpen)
  }

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
            {menuLinks.map(link => (
              <NavItem key={link.name}>
                <NavLink onClick={toggleNavOpen} to={link.link}>
                  {link.name}
                </NavLink>
              </NavItem>
            ))}
            <NavItem>
              <DarkModeToggle
                onClick={toggleDarkMode}
                isDarkMode={isDarkMode}
              />
            </NavItem>
          </Navbar>
          <NavToggle onClick={toggleNavOpen} navOpen={navOpen}></NavToggle>
        </HeaderWrapper>
      </StyledHeader>
      <HeroBackgroundImage fluid={backgroundImage}>
        <Overlay />
      </HeroBackgroundImage>
    </>
  )
}
