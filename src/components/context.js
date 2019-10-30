import React from "react"

export const Context = React.createContext()

export class ContextProvider extends React.Component {
  state = {
    heroImage: "",
    defaultHeroImage: "",
  }

  setHeroImage = image => {
    this.setState({
      heroImage: image,
    })
  }

  setDefaultHeroImage = image => {
    this.setState({
      defaultHeroImage: image,
    })
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setHeroImage: this.setHeroImage,
          setDefaultHeroImage: this.setDefaultHeroImage,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}
