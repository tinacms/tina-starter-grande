import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Theme } from "./theme"

export const Context = React.createContext()

const isBrowser = typeof window !== "undefined"
const userPrefDark = isBrowser ? localStorage.getItem("isDarkMode") : false
const initialDarkMode = userPrefDark === "true" ? true : false

export class ContextProvider extends React.Component {
  state = {
    isDarkMode: initialDarkMode,
    globalTheme: this.props.globalTheme,
    pageTheme: {},
  }

  setPageTheme = pageTheme => {
    this.setState({
      pageTheme: pageTheme,
    })
  }

  toggleDarkMode = () => {
    const newMode = !this.state.isDarkMode

    this.setState({
      isDarkMode: newMode,
    })

    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", newMode)
    }
  }

  render() {
    const theme = Theme(
      this.state.globalTheme,
      this.state.pageTheme,
      this.state.isDarkMode
    )
    return (
      <Context.Provider
        value={{
          ...this.state,
          theme: theme,
          setPageTheme: this.setPageTheme,
          toggleDarkMode: this.toggleDarkMode,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}
