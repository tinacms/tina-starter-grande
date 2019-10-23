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
        {data.posts.edges.forEach(({ node }) => (
          <div key={node.id}>
            <article>
              <header>
                <p>
                  <Link to={node.frontmatter.path}>
                    {node.frontmatter.title}
                  </Link>
                  <span>{node.frontmatter.date}</span>
                </p>
              </header>
              <p>
                {node.excerpt}
                <Link to={node.frontmatter.path}>Keep Reading →</Link>
              </p>
            </article>
          </div>
        ))}
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
