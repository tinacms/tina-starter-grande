import React from "react"

export const SiteContext = React.createContext()

export class SiteProvider extends React.Component {
  state = {
    heroImage: "",
  }

  setHeroImage = image => {
    this.setState({
      heroImage: image,
    })
  }

  render() {
    return (
      <SiteContext.Provider
        value={{
          ...this.state,
          setHeroImage: this.setHeroImage,
        }}
      >
        {this.props.children}
      </SiteContext.Provider>
    )
  }
}
