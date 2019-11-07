import React, { useState } from "react"
import { mix, getContrast } from "polished"
import styled, { ThemeProvider } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { GlobalStyles, Main, bestContrast } from "./style"

export const ThemeContext = React.createContext()

export const Theme = ({ children }) => {
  const data = useStaticQuery(graphql`
    query ThemeQuery {
      dataJson(fileRelativePath: { eq: "/data/theme.json" }) {
        ...globalTheme
      }
    }
  `)

  const isBrowser = typeof window !== "undefined"
  const userPrefDark = isBrowser ? localStorage.getItem("isDarkMode") : false
  const initialDarkMode = userPrefDark === "true" ? true : false

  const [darkMode, setDarkMode] = useState(initialDarkMode)

  const toggleDarkMode = () => {
    const newMode = !darkMode

    setDarkMode(newMode)

    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", newMode)
    }
  }

  const globalTheme = data.dataJson

  const theme = {
    isDarkMode: darkMode,
    color: {
      black: darkMode ? globalTheme.color.black : globalTheme.color.black,
      white: darkMode ? globalTheme.color.white : globalTheme.color.white,
      primary: globalTheme.color.primary,
      primaryContrast: bestContrast(
        globalTheme.color.primary,
        globalTheme.color.white,
        globalTheme.color.black
      ),
      secondary: globalTheme.color.secondary,
      secondaryContrast: bestContrast(
        globalTheme.color.secondary,
        globalTheme.color.white,
        globalTheme.color.black
      ),
      foreground: darkMode
        ? mix(0.8, globalTheme.color.white, globalTheme.color.black)
        : globalTheme.color.black,
      background: darkMode ? globalTheme.color.black : globalTheme.color.white,
      link: bestContrast(
        darkMode ? globalTheme.color.black : globalTheme.color.white,
        globalTheme.color.primary,
        globalTheme.color.secondary
      ),
    },
    easing: globalTheme.easing,
    breakpoints: globalTheme.breakpoints,
    radius: globalTheme.radius,
    header: globalTheme.header,
    menu: globalTheme.menu,
    hero: globalTheme.hero,
    typography: globalTheme.typography,
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        toggleDarkMode: toggleDarkMode,
        isDarkMode: darkMode,
      }}
    >
      <ThemeContext.Consumer>
        {({ theme }) => (
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyles />
              {children}
            </>
          </ThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  )
}

export const globalThemeFragment = graphql`
  fragment globalTheme on DataJson {
    color {
      black
      white
      primary
      secondary
    }
    easing
    breakpoints {
      small
      medium
      large
      huge
    }
    radius {
      small
    }
    header {
      overline
      transparent
      height
    }
    menu {
      style
    }
    hero {
      image {
        childImageSharp {
          fluid(quality: 70, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      large
      overlay
      overlap
      parallax
    }
    typography {
      uppercaseH2
    }
  }
`
