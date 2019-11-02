import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Theme } from "./theme"
import { removeNull } from "./helpers"

export const Context = React.createContext()

const isBrowser = typeof window !== "undefined"
const userPrefDark = isBrowser ? localStorage.getItem("isDarkMode") : false
const initialDarkMode = userPrefDark === "true" ? true : false

export class ContextProvider extends React.Component {
  state = {
    isDarkMode: initialDarkMode,
    pageTheme: {},
  }

  setPageTheme = pageTheme => {
    const newPageTheme = pageTheme ? removeNull(pageTheme) : {}
    this.setState({
      ...this.state,
      pageTheme: {
        ...newPageTheme,
      },
    })
    console.log(this.state)
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
      this.props.globalTheme,
      this.state.pageTheme,
      this.state.isDarkMode
    )
    return (
      <Context.Provider
        value={{
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
