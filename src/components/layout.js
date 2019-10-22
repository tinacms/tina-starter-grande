import React, { useState, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import { Theme } from "./theme"
import { GlobalStyles, Page, Main, Wrapper } from "./style"
import { Header } from "./header"
import { Footer } from "./footer"

const Layout = ({ children }) => {
  const isBrowser = typeof window !== "undefined"
  const userPrefDark = isBrowser ? localStorage.getItem("isDarkMode") : false
  const [isDarkMode, setIsDarkMode] = useState(
    userPrefDark === "true" ? true : false
  )
  const theme = Theme(isDarkMode)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", !isDarkMode)
    }
  }

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
            toggleDarkMode={toggleDarkMode}
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
