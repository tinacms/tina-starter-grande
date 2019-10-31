import React, { useMemo } from "react"
import { mix } from "polished"

export const Theme = (userTheme = {}, isDarkMode) => {
  const merge = require("lodash.merge")

  const DefaultTheme = {
    mode: "default",
    color: {
      black: "#131110",
      white: "#f7f7f7",
      primary: "#007043",
      secondary: "#B8A45D",
    },
    easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
    breakpoints: {
      small: "600px",
      medium: "1200px",
      large: "1600px",
      huge: "2200px",
    },
    radius: {
      small: "3px",
    },
    header: {
      overline: false,
      defaultImage: "cafe.jpg",
      layout: "default",
    },
  }

  const BaseTheme = merge(DefaultTheme, userTheme)

  const ThemeLight = {
    mode: "light",
    color: {
      black: BaseTheme.color.black,
      white: BaseTheme.color.white,
      primary: BaseTheme.color.primary,
      secondary: BaseTheme.color.secondary,
      foreground: BaseTheme.color.black,
      background: BaseTheme.color.white,
      link: BaseTheme.color.primary,
    },
    easing: BaseTheme.easing,
    breakpoints: BaseTheme.breakpoints,
    radius: BaseTheme.radius,
    header: BaseTheme.header,
  }

  const ThemeDark = {
    mode: "dark",
    color: {
      black: BaseTheme.color.black,
      white: mix(0.7, BaseTheme.color.white, BaseTheme.color.secondary),
      primary: BaseTheme.color.primary,
      secondary: BaseTheme.color.secondary,
      foreground: mix(0.7, BaseTheme.color.white, BaseTheme.color.secondary),
      background: BaseTheme.color.black,
      link: BaseTheme.color.primary,
    },
    easing: BaseTheme.easing,
    breakpoints: BaseTheme.breakpoints,
    radius: BaseTheme.radius,
    header: BaseTheme.header,
  }

  return isDarkMode ? ThemeDark : ThemeLight
}

// export const query = graphql`
//   fragment SiteInformation on Site {
//     siteMetadata {
//       title
//       siteDescription
//     }
//   }
// `
