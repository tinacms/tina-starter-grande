import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import { ThemeLight, ThemeDark } from "./theme"
import { GlobalStyles, Page, Main, Wrapper } from "./style"
import { Header } from "./header"
import { Footer } from "./footer"

const Layout = ({ children }) => {
  const stored =
    typeof window !== "undefined" ? localStorage.getItem("isDarkMode") : false
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
        <Page>
          <Header
            setIsDarkMode={setIsDarkMode}
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
