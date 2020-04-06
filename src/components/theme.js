import React, { useState } from "react"
import { mix } from "polished"
import { ThemeProvider } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { GlobalStyles, bestContrast } from "./style"
import { createGlobalStyle } from "styled-components"

export const ThemeContext = React.createContext()

export const Theme = ({ children }) => {
  const data = useStaticQuery(graphql`
    query ThemeQuery {
      settingsJson(fileRelativePath: { eq: "/content/settings/theme.json" }) {
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

  const globalTheme = data.settingsJson

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
              <TinaOverrideGlobalStyle primary={theme.color.primary} />
              <GlobalStyles />
              {children}
            </>
          </ThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  )
}

const TinaOverrideGlobalStyle = createGlobalStyle`
  :root {
    --tina-color-primary-light: ${props => props.primary};
    --tina-color-primary: ${props => props.primary};
    --tina-color-primary-dark: ${props => props.primary};
  }
`

export const globalThemeFragment = graphql`
  fragment globalTheme on SettingsJson {
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
      underline
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

export const ThemeForm = {
  label: "Theme",
  fields: [
    {
      label: "Color",
      name: "rawJson.color",
      component: "group",
      fields: [
        {
          label: "Black",
          name: "black",
          component: "color",
          colorFormat: "hex",
        },
        {
          label: "White",
          name: "white",
          component: "color",
          colorFormat: "hex",
        },
        {
          label: "Primary",
          name: "primary",
          component: "color",
          colorFormat: "hex",
        },
        {
          label: "Secondary",
          name: "secondary",
          component: "color",
          colorFormat: "hex",
        },
      ],
    },
    {
      label: "Header",
      name: "rawJson.header",
      component: "group",
      fields: [
        {
          label: "Overline",
          name: "overline",
          component: "toggle",
          parse(value) {
            return value || false
          },
        },
        {
          label: "Underline",
          name: "underline",
          component: "toggle",
          parse(value) {
            return value || false
          },
        },
        {
          label: "Transparent",
          name: "transparent",
          component: "toggle",
          parse(value) {
            return value || false
          },
        },
        {
          label: "Height",
          name: "height",
          component: "text",
          parse(value) {
            return value || ""
          },
        },
      ],
    },
    {
      label: "Menu",
      name: "rawJson.menu",
      component: "group",
      fields: [
        {
          label: "Style",
          description: "Options are 'pill' and 'glow'",
          name: "style",
          component: "text",
          parse(value) {
            return value || ""
          },
        },
      ],
    },
    {
      label: "Hero",
      name: "rawJson.hero",
      component: "group",
      fields: [
        {
          label: "Default Image",
          name: "image",
          component: "text",
          parse(value) {
            return value || ""
          },
        },
        {
          label: "Overlay",
          name: "overlay",
          component: "toggle",
          parse(value) {
            return value || false
          },
        },
        {
          label: "Large",
          name: "large",
          component: "toggle",
          parse(value) {
            return value || false
          },
        },
        {
          label: "Overlap",
          name: "overlap",
          component: "text",
          parse(value) {
            return value || ""
          },
        },
        {
          label: "Parallax",
          name: "parallax",
          component: "toggle",
          parse(value) {
            return value || false
          },
        },
      ],
    },
    {
      label: "Typography",
      name: "rawJson.typography",
      component: "group",
      fields: [
        {
          label: "Uppercase H2",
          name: "uppercaseH2",
          component: "toggle",
          parse(value) {
            return value || false
          },
        },
      ],
    },
  ],
}
