import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Wrapper } from "./site"
import styled from "styled-components"

export const Header = styled(({ siteTitle, ...styleProps }) => (
  <header {...styleProps}>
    <Wrapper>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
    </Wrapper>
  </header>
))`
  h1 {
    font-size: 1rem;
  }
`

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
