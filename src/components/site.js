import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider, css } from "styled-components"
import { GlobalStyles, ThemeLight, ThemeDark } from "./style"
import { Moon, Sun, Coffee } from "styled-icons/boxicons-regular"
import { mix, tint, shade, transparentize } from "polished"
import BackgroundImage from "gatsby-background-image"
import { Link } from "gatsby"

export const Site = ({ backgroundImage, children }) => {
  const stored = localStorage.getItem("isDarkMode")
  const [isDarkMode, setIsDarkMode] = useState(stored === "true" ? true : false)
  const Theme = isDarkMode ? ThemeDark : ThemeLight

  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
        }
      }
      file(relativePath: { eq: "cafe.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Layout>
          <Header>
            <HeaderWrapper>
              <SiteTitle>
                <SiteLink to="/">
                  <Coffee />
                  {data.site.siteMetadata.title}
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
                    localStorage.setItem("isDarkMode", !isDarkMode)
                  }}
                  isDarkMode={isDarkMode}
                >
                  <Sun />
                  <Moon />
                </DarkModeToggle>
              </Navbar>
            </HeaderWrapper>
          </Header>
          <HeroBackgroundImage fluid={data.file.childImageSharp.fluid}>
            <Overlay />
          </HeroBackgroundImage>
          <Main>
            <Wrapper>{children}</Wrapper>
          </Main>
          <Footer>
            <Wrapper>
              © {new Date().getFullYear()} – Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a> by{" "}
              <a href="https://www.forestry.io">Forestry.io</a>
            </Wrapper>
          </Footer>
        </Layout>
      </>
    </ThemeProvider>
  )
}

export const Wrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    padding: 0 2rem;
  }
`

export const Header = styled.header`
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
  align-items: stretch;
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

  &:hover:not(.active) {
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

export const SiteLink = styled(Link)`
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

export const SiteTitle = styled.h1`
  margin: 0;
  flex: 0 0 auto;
  font-size: 1rem;
`

export const HeaderWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
`

export const DarkModeToggle = styled.button`
  position: relative;
  width: 1.5rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  margin-left: 1rem;
  color: ${props => props.theme.color.white};
  svg {
    position: absolute;
    top: calc(50% - 0.75rem);
    left: 0;
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

export const HeroBackgroundImage = styled(BackgroundImage)`
  position: absolute !important;
  width: 100%;
  height: 18rem;
  z-index: -1;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.color.black};
  opacity: 0.65;
`

export const Footer = styled.footer`
  font-size: 0.8rem;
  line-height: 3rem;
  text-align: center;
  height: 3rem;
  background-color: ${props =>
    transparentize(0.97, props.theme.color.foreground)};
  box-shadow: inset 0 1px 0
    ${props => transparentize(0.95, props.theme.color.foreground)};
`

export const Layout = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;

  ${Header} {
    flex: 0 0 auto;
  }
  main {
    flex: 1 0 auto;
  }
  footer {
    flex: 0 0 auto;
  }
`

export const Main = styled.main`
  padding: 6rem 0 4rem 0;
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
`

export const Button = styled.button`
  display: inline-block;
  position: relative;
  line-height: 2rem;
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

export const Paper = styled.div`
  background-color: ${props => props.theme.color.background};
  border: 1px solid
    ${props =>
      mix(0.93, props.theme.color.background, props.theme.color.foreground)};
  padding: 2rem 2rem;
  border-radius: ${props => props.theme.radius.small};

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    padding: 2.5rem 3rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.large}) {
    padding: 3rem 4rem;
  }
`

export const Banner = styled.div`
  position: relative;
  border-radius: ${props => props.theme.radius.small}
    ${props => props.theme.radius.small} 0 0;
  overflow: visible;
  flex: 0 0 auto !important;
  padding: 2rem 2rem;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    padding: 2.5rem 3rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.large}) {
    padding: 3rem 4rem;
  }

  > * {
    margin: 0;
  }

  & + ${Paper} {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  ${p =>
    p.big &&
    css`
      padding: 6rem 2rem 2rem 2rem;

      @media (min-width: ${props => props.theme.breakpoints.small}) {
        padding: 7rem 3rem 2.5rem 3rem;
      }

      @media (min-width: ${props => props.theme.breakpoints.large}) {
        padding: 8rem 4rem 3rem 4rem;
      }
    `};

  ${p =>
    p.underline &&
    css`
      &:after {
        content: "";
        display: block;
        position: absolute;
        bottom: -1px;
        width: 35%;
        min-width: 10rem;
        max-width: 100%;
        height: 2px;
        background-color: ${props => props.theme.color.secondary};
      }
    `};
`

export const BannerText = styled.div`
  h1,
  h2,
  h3 {
    color: ${props => props.theme.color.primary};
  }
  * {
    position: relative;
    display: inline-block;
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: -0.5rem;
      left: -0.75rem;
      right: -0.75rem;
      bottom: -0.5rem;
      background-color: ${props => props.theme.color.background};
      z-index: -1;
    }
  }
`

export const BannerImage = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;

  img {
    margin: 0;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    object-fit: cover;
  }
`
