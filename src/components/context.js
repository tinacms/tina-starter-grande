import React from "react"

export const Context = React.createContext()

export class ContextProvider extends React.Component {
  state = {
    heroImage: "",
  }

  setHeroImage = image => {
    alert("test")
    this.setState({
      heroImage: image,
    })
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setHeroImage: this.setHeroImage,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}
