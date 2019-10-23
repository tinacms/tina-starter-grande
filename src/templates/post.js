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

export const postQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 140)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`
