import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { css } from "styled-components"
import { Main } from "./style"
import { Header } from "./header"
import { Footer } from "./footer"
import { Theme } from "./theme"
import Helmet from "react-helmet"
import slugify from "react-slugify"

const MasterLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query MasterLayoutQuery {
      site: settingsJson(title: { ne: null }) {
        title
      }
    }
  `)

  return (
    <>
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/focus-visible@5.0.2/dist/focus-visible.min.js"></script>
      </Helmet>
      <Theme>
        <Site>
          <Header siteTitle={data.site.title} />
          {children}
          <Footer />
        </Site>
      </Theme>
    </>
  )
}

export default MasterLayout

export const Site = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;

  > ${Header} {
    flex: 0 0 auto;
  }

  > ${Footer} {
    flex: 0 0 auto;
  }

  > * {
    flex: 1 0 auto;
  }

  ${props =>
    props.theme.hero.parallax &&
    css`
      height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
      perspective: 1px;
      perspective-origin: top;
      scrollbar-width: none;
      -ms-overflow-style: none;

      ::-webkit-scrollbar {
        display: none;
      }
    `}
`
