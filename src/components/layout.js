import React, { useState, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import { ThemeLight, ThemeDark } from "./theme"
import { GlobalStyles, Page, Main, Wrapper } from "./style"
import { Header } from "./header"
import { Footer } from "./footer"

const Layout = ({ children }) => {
  const userPrefDark =
    typeof window !== "undefined" ? localStorage.getItem("isDarkMode") : false
  const [isDarkMode, setIsDarkMode] = useState(
    userPrefDark === "true" ? true : false
  )
  const [theme, setTheme] = useState(isDarkMode ? ThemeDark : ThemeLight)

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
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Page>
          <Header
            setIsDarkMode={setIsDarkMode}
            setTheme={setTheme}
            isDarkMode={isDarkMode}
            siteTitle={data.site.siteMetadata.title}
            backgroundImage={data.file.childImageSharp.fluid}
          />
          <Main>
            <Wrapper>{children}</Wrapper>
          </Main>
          <Footer />
        </Page>
      </>
    </ThemeProvider>
  )
}

export default Layout
