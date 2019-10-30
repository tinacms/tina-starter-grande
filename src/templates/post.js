import React from "react"
import { graphql } from "gatsby"
import { Paper, Meta, DraftBadge, Content } from "../components/style"
import { SEO } from "../components/seo"
import { Link } from "gatsby"

import { remarkForm } from "gatsby-tinacms-remark"

const Post = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <>
      <SEO title={frontmatter.title} />
      <Paper>
        <Meta>
          <span>{frontmatter.date}</span>
          <Link to="/blog">← Back to Blog</Link>
        </Meta>
        <h1>
          {frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
          {frontmatter.title}
        </h1>
        <hr />
        <Content dangerouslySetInnerHTML={{ __html: html }}></Content>
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
      }

      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
  }
`
