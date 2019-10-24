import React from "react"
import { graphql } from "gatsby"
import { Paper, ArticleTitle, Meta } from "../components/style"
import { SEO } from "../components/seo"
import { Link } from "gatsby"

export default function List({ data }) {
  return (
    <>
      <SEO title={data.page.frontmatter.title} />
      {data.posts.edges.map(({ node }) => {
        return (
          <Paper article key={node.id}>
            <ArticleTitle>
              <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
            </ArticleTitle>
            <p>{node.excerpt}</p>
            <Meta>
              <span>{node.frontmatter.date}</span>
              <Link to={node.frontmatter.path}>Read Article →</Link>
            </Meta>
          </Paper>
        )
      })}
    </>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    page: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          excerpt
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
