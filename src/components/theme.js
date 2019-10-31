import React from "react"
import { mix } from "polished"

export const Theme = (globalTheme, pageTheme, isDarkMode) => {
  const merge = require("lodash.merge")
  const removeEmpty = obj => {
    const newObj = {}

    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === "object") {
        newObj[key] = removeEmpty(obj[key]) // recurse
      } else if (obj[key] != null) {
        newObj[key] = obj[key] // copy value
      }
    })

    return newObj
  }

  const BaseTheme = merge(globalTheme, removeEmpty(pageTheme))

  console.log("(In Theme) Base Theme: ")
  console.log(BaseTheme)

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
