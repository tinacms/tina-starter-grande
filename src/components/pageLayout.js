import React from "react"
import { Wrapper, Main } from "./style"
import { SEO } from "./seo"
import { ThemeContext } from "./theme"
import { Hero } from "./hero"
import { removeNull } from "./helpers"

const merge = require("lodash.merge")

export const PageLayout = ({ page, children }) => {
  const themeContext = React.useContext(ThemeContext)
  const theme = themeContext.theme
  const pageTitle =
    page && page.title
      ? page.title
      : page && page.frontmatter && page.frontmatter.title
      ? page.frontmatter.title
      : ""
  const pageHero = page.frontmatter ? page.frontmatter.hero : page.hero
  const hero = pageHero
    ? merge({}, theme.hero, removeNull(pageHero))
    : theme.hero

  return (
    <>
      {pageTitle && <SEO title={pageTitle} />}
      <Hero hero={hero} />
      <Main>
        <Wrapper>{children}</Wrapper>
      </Main>
    </>
  )
}
