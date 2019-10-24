import React, { useState, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import { Theme } from "./theme"
import { GlobalStyles, Main, Wrapper } from "./style"
import { Header, StyledHeader } from "./header"
import { Footer } from "./footer"
import { createRemarkButton } from "gatsby-tinacms-remark"
import { withPlugin } from "react-tinacms"

const Layout = ({ children }) => {
  const isBrowser = typeof window !== "undefined"
  const userPrefDark = isBrowser ? localStorage.getItem("isDarkMode") : false
  const [isDarkMode, setIsDarkMode] = useState(
    userPrefDark === "true" ? true : false
  )
  const theme = Theme(isDarkMode)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", !isDarkMode)
    }
  }

  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
      file(relativePath: { eq: "cafe.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Page>
          <Header
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            siteTitle={data.site.siteMetadata.title}
            backgroundImage={data.file.childImageSharp.fluid}
            menuLinks={data.site.siteMetadata.menuLinks}
          />
          <Main>
            <Wrapper>{children}</Wrapper>
          </Main>
          <Footer />
        </Page>
      </>
    </ThemeProvider>
  )
}

const filepath = title => {
  return "content/posts/" + title.replace(/\s+/g, "-").toLowerCase() + ".md"
}

const CreatePostPlugin = createRemarkButton({
  label: "Create Post",
  filename({ title }) {
    filepath({ title })
  },
  frontmatter({ title }) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title,
          date: new Date(),
          template: "post",
          path: filepath(title),
        })
      }, 1000)
    })
  },
  body({ title }) {
    return `## ${title}`
  },
  fields: [
    { name: "title", label: "Title", component: "text", required: true },
  ],
})

export default withPlugin(Layout, CreatePostPlugin)

export const Page = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;

  ${StyledHeader} {
    flex: 0 0 auto;
  }
  main {
    flex: 1 0 auto;
  }
  footer {
    flex: 0 0 auto;
  }
`
