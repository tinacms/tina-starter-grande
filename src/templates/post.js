import React, { useEffect } from "react"
import { graphql } from "gatsby"
import {
  Paper,
  Meta,
  MetaSpan,
  MetaActions,
  DraftBadge,
  Content,
} from "../components/style"
import { Authors } from "../components/authors"
import { SEO } from "../components/seo"
import { Link } from "gatsby"
import { Context } from "../components/context"

import { remarkForm } from "gatsby-tinacms-remark"

const Post = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  const siteContext = React.useContext(Context)
  const pageTheme = {}

  useEffect(() => siteContext.setPageTheme(pageTheme), [pageTheme, siteContext])

  return (
    <>
      <SEO title={frontmatter.title} />
      <Paper>
        <Meta>
          <MetaSpan>{frontmatter.date}</MetaSpan>
          {frontmatter.authors && (
            <MetaSpan>
              <em>By</em>&nbsp;
              <Authors authorSlugs={frontmatter.authors} />
            </MetaSpan>
          )}
          <MetaActions>
            <Link to="/blog">← Back to Blog</Link>
          </MetaActions>
        </Meta>
        <h1>{frontmatter.title}</h1>
        <hr />
        <Content dangerouslySetInnerHTML={{ __html: html }}></Content>
        {frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
      </Paper>
    </>
  )
}

const PostForm = {
  fields: [
    {
      label: "Title",
      name: "rawFrontmatter.title",
      component: "text",
    },
    {
      name: "frontmatter.draft",
      component: "toggle",
      label: "Draft",
    },
    {
      label: "Date",
      name: "rawFrontmatter.date",
      component: "date",
    },
    {
      label: "Body",
      name: "rawMarkdownBody",
      component: "markdown",
    },
  ],
}

export default remarkForm(Post, PostForm)

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(
      published: { eq: true }
      frontmatter: { path: { eq: $path } }
    ) {
      id
      html

      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        draft
        authors
      }

      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
  }
`
