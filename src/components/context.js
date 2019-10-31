import React from "react"
import { Theme } from "./theme"

export const Context = React.createContext()

const isBrowser = typeof window !== "undefined"
const userPrefDark = isBrowser ? localStorage.getItem("isDarkMode") : false
const initialDarkMode = userPrefDark === "true" ? true : false
const defaultTheme = Theme(initialDarkMode)

export class ContextProvider extends React.Component {
  state = {
    isDarkMode: initialDarkMode,
    theme: defaultTheme,
  }

  setPageTheme = pageTheme => {
    this.setState({
      theme: Theme(pageTheme, this.state.isDarkMode),
    })
  }

  toggleDarkMode = () => {
    this.setState({
      isDarkMode: !this.state.isDarkMode,
    })

    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", !this.state.isDarkMode)
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
