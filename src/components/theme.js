import React from "react"
import styled, { createGlobalStyle, css } from "styled-components"
import { mix, tint, shade, transparentize } from "polished"

const BaseTheme = {
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
}

export const ThemeLight = {
  color: {
    black: BaseTheme.color.black,
    white: BaseTheme.color.white,
    primary: BaseTheme.color.primary,
    secondary: BaseTheme.color.secondary,
    foreground: BaseTheme.color.black,
    background: BaseTheme.color.white,
    link: BaseTheme.color.secondary,
  },
  easing: BaseTheme.easing,
  breakpoints: BaseTheme.breakpoints,
  radius: BaseTheme.radius,
}

export const ThemeDark = {
  color: {
    black: BaseTheme.color.black,
    white: mix(0.7, BaseTheme.color.white, BaseTheme.color.secondary),
    primary: BaseTheme.color.primary,
    secondary: BaseTheme.color.secondary,
    foreground: mix(0.7, BaseTheme.color.white, BaseTheme.color.secondary),
    background: BaseTheme.color.black,
    link: BaseTheme.color.secondary,
  },
  easing: BaseTheme.easing,
  breakpoints: BaseTheme.breakpoints,
  radius: BaseTheme.radius,
}
