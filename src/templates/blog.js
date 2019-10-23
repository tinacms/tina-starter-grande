import React from "react"
import { graphql } from "gatsby"
import { Paper } from "../components/style"
import { SEO } from "../components/seo"
import { Link } from "gatsby"

export default function Blog({ data }) {
  return (
    <>
      <SEO title={data.page.frontmatter.title} />
      <Paper>
        <div dangerouslySetInnerHTML={{ __html: data.page.html }}></div>
        {data.posts.edges.map(({ node }) => {
          return (
            <article key={node.id}>
              <h3>
                <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
              </h3>
              <p>{node.frontmatter.date}</p>
              <p>
                <Link to={node.frontmatter.path}>Keep Reading →</Link>
              </p>
            </article>
          )
        })}
      </Paper>
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
