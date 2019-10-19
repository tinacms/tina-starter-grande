import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider, css } from "styled-components"
import { CreateGlobalStyles, ThemeLight, ThemeDark } from "./style"
import { Header } from "./header"
import { Moon, Sun } from "styled-icons/boxicons-regular"

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
          <Header siteTitle={data.site.siteMetadata.title} />
          <main>
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
      </>
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
  max-width: 900px;
  margin: 0 auto;
`

const DarkModeToggle = styled.button`
  position: fixed;
  top: 0.75rem;
  right: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.5rem;
    height: 1.5rem;
    fill: currentColor;
    transition: all 150ms ${props => props.theme.easing};
    &:first-child {
      opacity: 0;
    }
    &:last-child {
      opacity: 1;
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
        }
        &:last-child {
          opacity: 0;
        }
      }
    `};
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
