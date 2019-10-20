import React, { useState, useMemo } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider, css } from "styled-components"
import { CreateGlobalStyles, ThemeLight, ThemeDark } from "./style"
import { Header } from "./header"
import { Wrapper } from "./ui"
import { tint, shade, transparentize } from "polished"

export const Site = ({ children }) => {
  const stored = localStorage.getItem("isDarkMode")
  const [isDarkMode, setIsDarkMode] = useState(stored === "true" ? true : false)
  const Theme = isDarkMode ? ThemeDark : ThemeLight
  const GlobalStyles = CreateGlobalStyles(Theme)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles theme={Theme} />
        <Layout>
          <Header
            siteTitle={data.site.siteMetadata.title}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <HeroImage>
            <img
              src="https://source.unsplash.com/tKN1WXrzQ3s/1680x360"
              alt=""
            />
          </HeroImage>
          <Main>
            <Wrapper>
              <PageWrapper>{children}</PageWrapper>
            </Wrapper>
          </Main>
          <Footer>
            <Wrapper>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </Wrapper>
          </Footer>
        </Layout>
      </>
    </ThemeProvider>
  )
}

export const PageWrapper = styled.div`
  background-color: ${props => props.theme.color.background};
  padding: 2rem 3rem;
  margin-bottom: 0rem;
  border-radius: 3px;
`

export const HeroImage = styled.div`
  position: absolute;
  width: 100%;
  height: 18rem;
  z-index: -1;
  background-color: ${props => transparentize(0.1, props.theme.color.black)};
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    object-fit: cover;
    opacity: 0.3;
  }
`

export const Footer = styled.footer`
  font-size: 0.8rem;
  line-height: 3rem;
  height: 3rem;
  background-color: ${props =>
    transparentize(0.95, props.theme.color.foreground)};
  border-top: 1px solid
    ${props => transparentize(0.95, props.theme.color.foreground)};
`

export const Layout = styled.div`
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
  ${PageWrapper} {
    flex: 1 0 auto;
  }
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
