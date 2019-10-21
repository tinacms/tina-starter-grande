import React from "react"
import { StyledFooter, Wrapper } from "./style"

export const Footer = () => {
  return (
    <StyledFooter>
      <Wrapper>
        © {new Date().getFullYear()} – Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a> <span>by </span>
        <a href="https://www.forestry.io">Forestry.io</a>
      </Wrapper>
    </StyledFooter>
  )
}
