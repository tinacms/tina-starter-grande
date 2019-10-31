import React, { useState, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import { Theme } from "./theme"
import { GlobalStyles, Main, Wrapper } from "./style"
import { Header, StyledHeader } from "./header"
import { Footer } from "./footer"
import Helmet from "react-helmet"
import slugify from "react-slugify"
import { ContextProvider, Context } from "./context"

import { createRemarkButton } from "gatsby-tinacms-remark"
import { withPlugin } from "react-tinacms"
import { useJsonForm } from "gatsby-tinacms-json"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/focus-visible@5.0.2/dist/focus-visible.min.js"></script>
      </Helmet>
      <ContextProvider>
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
