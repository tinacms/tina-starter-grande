import React, { useState, useMemo } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider, css } from "styled-components"
import { GlobalStyles, ThemeLight, ThemeDark } from "./style"
import { Header } from "./header"
import { Wrapper, Paper } from "./ui"
import { mix, tint, shade, transparentize } from "polished"

export const Site = ({ children }) => {
  const stored = localStorage.getItem("isDarkMode")
  const [isDarkMode, setIsDarkMode] = useState(stored === "true" ? true : false)
  const Theme = isDarkMode ? ThemeDark : ThemeLight

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
        <GlobalStyles />
        <Layout>
          <Header
            siteTitle={data.site.siteMetadata.title}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <BackgroundImage>
            <img
              src="https://source.unsplash.com/tKN1WXrzQ3s/1680x600"
              alt=""
            />
          </BackgroundImage>
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

export const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 18rem;
  z-index: -1;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => transparentize(0.3, props.theme.color.black)};
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    object-fit: cover;
  }
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
