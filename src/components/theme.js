import React from "react"
import { mix } from "polished"

export const Theme = isDarkMode => {
  const merge = require("lodash.merge")

  const UserTheme = {
    /* These would come from a config */
    color: {
      black: "#131110",
      white: "#f7f7f7",
      primary: "#007043",
      secondary: "#B8A45D",
    },
  }

  const DefaultTheme = {
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
    },
    radius: {
      small: "3px",
    },
    header: {
      style: "transparent", // transparent, opaque (responds to darkmode), white, black, primary
      sticky: false,
      overline: true,
    },
    hero: {
      style: "backdrop", // backdrop, banner, hybrid
      fade: true,
    },
    options: {
      titlePlacement: "page", // page, hero
      defaultTheme: "light", // light, dark
      wideBlocks: true, // for images, code
      wrapCode: false,
    },
  }

  // const BaseTheme = React.useMemo(merge(DefaultTheme, UserTheme), [
  //   DefaultTheme,
  //   UserTheme,
  // ])
  const BaseTheme = merge(DefaultTheme, UserTheme)

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
  }

  return isDarkMode ? ThemeDark : ThemeLight
}
