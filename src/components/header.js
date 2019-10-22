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

export const Header = ({
  toggleDarkMode,
  isDarkMode,
  siteTitle,
  backgroundImage,
  menuLinks,
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
            {menuLinks.map(link => (
              <NavItem key={link.name}>
                <NavLink to={link.link}>{link.name}</NavLink>
              </NavItem>
            ))}
            <DarkModeToggle onClick={toggleDarkMode} isDarkMode={isDarkMode} />
          </Navbar>
        </HeaderWrapper>
      </StyledHeader>
      <HeroBackgroundImage fluid={backgroundImage}>
        <Overlay />
      </HeroBackgroundImage>
    </>
  )
}
