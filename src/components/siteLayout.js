import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { css } from "styled-components"
import { Header } from "./header"
import { Footer } from "./footer"
import { Theme } from "./theme"
import Helmet from "react-helmet"
import slugify from "react-slugify"

import { createRemarkButton } from "gatsby-tinacms-remark"
import { JsonCreatorPlugin } from "gatsby-tinacms-json"
import { withPlugin } from "tinacms"

const MasterLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query MasterLayoutQuery {
      site: settingsJson(
        fileRelativePath: { eq: "/content/settings/site.json" }
      ) {
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

const CreatePageButton = new JsonCreatorPlugin({
  label: "New Page",
  filename(form) {
    let slug = slugify(form.title.toLowerCase())
    return `content/pages/${slug}.json`
  },
  fields: [
    { name: "title", label: "Title", component: "text", required: true },
    { name: "path", label: "Path", component: "text", required: true },
  ],
  data(form) {
    return {
      title: form.title,
      path: form.path,
    }
  },
})

export default withPlugin(MasterLayout, [CreatePostButton, CreatePageButton])

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
