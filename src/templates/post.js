import React from "react"
import { graphql } from "gatsby"
import {
  Paper,
  PaperHeader,
  ArticleTitle,
  Meta,
  Link,
} from "../components/style"
import { SEO } from "../components/seo"

export default function Post({ data }) {
  const { frontmatter, html } = data.markdownRemark
  return (
    <>
      <SEO title={frontmatter.title} />
      <Paper>
        <ArticleTitle big>
          <a href="#">{frontmatter.title}</a>
        </ArticleTitle>
        <Meta>
          <span>{frontmatter.date}</span>
          <a href="/blog">← Back to Blog</a>
        </Meta>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Paper>
    </>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
