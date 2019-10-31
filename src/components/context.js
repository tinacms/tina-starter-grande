import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Theme } from "./theme"

export const Context = React.createContext()

const isBrowser = typeof window !== "undefined"
const userPrefDark = isBrowser ? localStorage.getItem("isDarkMode") : false
const initialDarkMode = userPrefDark === "true" ? true : false

export class ContextProvider extends React.Component {
  state = {
    isDarkMode: initialDarkMode,
    pageTheme: {},
    theme: Theme(this.props.globalTheme, {}, initialDarkMode),
  }

  setPageTheme = pageTheme => {
    this.setState({
      pageTheme: pageTheme,
      theme: Theme(this.props.globalTheme, pageTheme, this.state.isDarkMode),
    })
  }

  toggleDarkMode = () => {
    const newMode = !this.state.isDarkMode

    this.setState({
      isDarkMode: newMode,
      theme: Theme(this.props.globalTheme, this.state.pageTheme, newMode),
    })

    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", newMode)
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setPageTheme: this.setPageTheme,
          toggleDarkMode: this.toggleDarkMode,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}
