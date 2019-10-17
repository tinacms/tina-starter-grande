import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import { GlobalStyles, Theme } from "./style"
import { Header } from "./header"

export const Page = ({ children }) => {
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
      <GlobalStyles />
      <Layout>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>
          <Wrapper>{children}</Wrapper>
        </main>
        <footer>
          <Wrapper>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Wrapper>
        </footer>
      </Layout>
    </ThemeProvider>
  )
}

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

export const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
