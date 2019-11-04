import React from "react"
import { Theme } from "./theme"

export const Context = React.createContext()

const isBrowser = typeof window !== "undefined"
const userPrefDark = isBrowser ? localStorage.getItem("isDarkMode") : false
const initialDarkMode = userPrefDark === "true" ? true : false

export class ContextProvider extends React.Component {
  state = {
    isDarkMode: initialDarkMode,
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
    const theme = Theme(this.props.globalTheme, this.state.isDarkMode)
    return (
      <Context.Provider
        value={{
          theme: theme,
          toggleDarkMode: this.toggleDarkMode,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}
