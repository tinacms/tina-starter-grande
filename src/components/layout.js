import React, { useState, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import { Theme } from "./theme"
import { GlobalStyles, Main, Wrapper } from "./style"
import { Header, StyledHeader } from "./header"
import { Footer } from "./footer"
import Helmet from "react-helmet"
import slugify from "react-slugify"

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
      menuJson: dataJson(fileRelativePath: { eq: "/data/menu.json" }) {
        menuItems {
          link
          label
        }
      }
      themeJson: dataJson(fileRelativePath: { eq: "/data/theme.json" }) {
        color {
          primary
          black
          secondary
          white
        }
        header {
          overline
          sticky
          style
          defaultImage
        }
        hero {
          fade
          style
        }
        options {
          titlePlacement
          defaultTheme
          wideBlocks
        }
      }
      file: file(relativePath: { eq: "cafe.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const isBrowser = typeof window !== "undefined"
  const userPrefDark = isBrowser ? localStorage.getItem("isDarkMode") : false
  const [isDarkMode, setIsDarkMode] = useState(
    userPrefDark === "true" ? true : false
  )

  //const [userTheme] = useJsonForm(data.themeJson)
  const userTheme = data.themeJson
  console.log(userTheme)
  const theme = Theme(userTheme, isDarkMode)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", !isDarkMode)
    }
  }

  const [heroImage, setHeroImage] = useState(data.file.childImageSharp.fluid)

  const menuItems = data.menuJson

  return (
    <>
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/focus-visible@5.0.2/dist/focus-visible.min.js"></script>
      </Helmet>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <Page>
            <Header
              toggleDarkMode={toggleDarkMode}
              isDarkMode={isDarkMode}
              siteTitle={data.site.siteMetadata.title}
              heroImage={heroImage}
            />
            <Main>
              <Wrapper>{children}</Wrapper>
            </Main>
            <Footer />
          </Page>
        </>
      </ThemeProvider>
    </>
  )
}

// const filepath = title => {
//   return "content/posts/" + title.replace(/\s+/g, "-").toLowerCase() + ".md"
// }

// const CreatePostButton = createRemarkButton({
//   label: "New Post",
//   filename(form) {
//     let slug = slugify(form.title.toLowerCase())
//     return `content/posts/${slug}.md`
//   },
//   frontmatter(form) {
//     let slug = slugify(form.title.toLowerCase())
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve({
//           title: form.title,
//           date: new Date(),
//           template: "post",
//           path: `blog/${slug}`,
//         })
//       }, 1000)
//     })
//   },
//   body({ title }) {
//     return `## ${title}`
//   },
//   fields: [
//     { name: "title", label: "Title", component: "text", required: true },
//   ],
// })

// const CreatePageButton = createRemarkButton({
//   label: "New Page",
//   filename(form) {
//     let slug = slugify(form.title.toLowerCase())
//     return `content/${slug}.json`
//   },
//   frontmatter(form) {
//     let slug = slugify(form.title.toLowerCase())
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve({
//           title: form.title,
//           template: "page",
//           path: slug,
//           menu: form.menu,
//         })
//       }, 1000)
//     })
//   },
//   body({ title }) {
//     return `## ${title}`
//   },
//   fields: [
//     { name: "title", label: "Title", component: "text", required: true },
//     { name: "menu", label: "In Menu", component: "toggle", required: true },
//   ],
// })

// export default withPlugin(
//   withPlugin(Layout, CreatePostButton),
//   CreatePageButton
// )

export default Layout

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
