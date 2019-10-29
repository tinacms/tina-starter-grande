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
        <ArticleTitle big>{frontmatter.title}</ArticleTitle>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Paper>
    </>
  )
}

export const pageQuery = graphql`
  query {
    markdownRemark {
      id
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
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
`
