import React from "react"
import { mix } from "polished"
import { graphql } from "gatsby"

export const Theme = (globalTheme, isDarkMode) => {
  const ThemeLight = {
    isDarkMode: false,
    color: {
      black: globalTheme.color.black,
      white: globalTheme.color.white,
      primary: globalTheme.color.primary,
      secondary: globalTheme.color.secondary,
      foreground: globalTheme.color.black,
      background: globalTheme.color.white,
      link: globalTheme.color.primary,
    },
    easing: globalTheme.easing,
    breakpoints: globalTheme.breakpoints,
    radius: globalTheme.radius,
    header: globalTheme.header,
    menu: globalTheme.menu,
    hero: globalTheme.hero,
    typography: globalTheme.typography,
  }

  const ThemeDark = {
    isDarkMode: true,
    color: {
      black: globalTheme.color.black,
      white: mix(0.7, globalTheme.color.white, globalTheme.color.secondary),
      primary: globalTheme.color.primary,
      secondary: globalTheme.color.secondary,
      foreground: mix(
        0.7,
        globalTheme.color.white,
        globalTheme.color.secondary
      ),
      background: globalTheme.color.black,
      link: globalTheme.color.primary,
    },
    easing: globalTheme.easing,
    breakpoints: globalTheme.breakpoints,
    radius: globalTheme.radius,
    header: globalTheme.header,
    menu: globalTheme.menu,
    hero: globalTheme.hero,
    typography: globalTheme.typography,
  }

  return isDarkMode ? ThemeDark : ThemeLight
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
    }
    typography {
      uppercaseH2
    }
  }
`
