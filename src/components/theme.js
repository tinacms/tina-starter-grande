import React, { useMemo } from "react"
import { mix } from "polished"

export const Theme = (pageTheme = {}, isDarkMode) => {
  const merge = require("lodash.merge")
  const data = useStaticQuery(graphql`
    query ThemeQuery {
      themeJson: dataJson(fileRelativePath: { eq: "/data/theme.json" }) {
        color {
          primary
          black
          secondary
          white
        }
        header {
          overline
          layout
          background {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  const globalTheme = data.themeJson

  const BaseTheme = merge(globalTheme, pageTheme)

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
