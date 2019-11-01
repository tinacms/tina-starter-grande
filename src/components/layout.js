import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import { GlobalStyles, Main, Wrapper } from "./style"
import { Header, StyledHeader } from "./header"
import { Footer } from "./footer"
import Helmet from "react-helmet"
import slugify from "react-slugify"
import { removeNull } from "./helpers"
import { ContextProvider, Context } from "./context"

import { createRemarkButton } from "gatsby-tinacms-remark"
import { withPlugin } from "react-tinacms"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
      dataJson(fileRelativePath: { eq: "/data/theme.json" }) {
        color {
          black
          white
          primary
          secondary
        }
        easing
        breakpoints {
          small
          medium
          large
          huge
        }
        radius {
          small
        }
        header {
          overline
          layout
          background {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  const globalTheme = data.dataJson

  return (
    <>
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/focus-visible@5.0.2/dist/focus-visible.min.js"></script>
      </Helmet>
      <ContextProvider globalTheme={globalTheme}>
        <Context.Consumer>
          {({ theme }) => (
            <ThemeProvider theme={theme}>
              <>
                <GlobalStyles />
                <Page>
                  <Header siteTitle={data.site.siteMetadata.title} />
                  <Main>
                    <Wrapper>{children}</Wrapper>
                  </Main>
                  <Footer />
                </Page>
              </>
            </ThemeProvider>
          )}
        </Context.Consumer>
      </ContextProvider>
    </>
  )
}

const CreatePostButton = createRemarkButton({
  label: "New Post",
  filename(form) {
    let slug = slugify(form.title.toLowerCase())
    return `content/posts/${slug}.md`
  },
  frontmatter(form) {
    let slug = slugify(form.title.toLowerCase())
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: form.title,
          date: new Date(),
          type: "post",
          path: `/blog/${slug}`,
          draft: true,
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

export default withPlugin(Layout, CreatePostButton)

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
