import React from "react"
import { graphql } from "gatsby"
import { Paper, ArticleTitle, Meta } from "../components/style"
import { SEO } from "../components/seo"
import { Link } from "gatsby"

export default function Post({ data }) {
  const { frontmatter, html } = data.markdownRemark

  return (
    <>
      <SEO title={frontmatter.title} />
      <Paper>
        <Meta>
          <span>{frontmatter.date}</span>
          <Link to="/blog">← Back to Blog</Link>
        </Meta>
        <h1>{frontmatter.title}</h1>
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
