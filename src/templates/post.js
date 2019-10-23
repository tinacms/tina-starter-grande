import React from "react"
import { graphql } from "gatsby"
import { Paper } from "../components/style"
import { SEO } from "../components/seo"

export default function Post({ data }) {
  const { frontmatter, html } = data.markdownRemark
  return (
    <>
      <SEO title={frontmatter.title} />
      <Paper dangerouslySetInnerHTML={{ __html: html }}></Paper>
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
        date
        title
      }
    }
  }
`
