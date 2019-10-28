import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Paper, ArticleTitle, Meta } from "../components/style"
import { SEO } from "../components/seo"
import { Link } from "gatsby"

export default function List({ data, pageContext }) {
  const { slug, currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? slug : slug + "/" + (currentPage - 1).toString()
  const nextPage = slug + "/" + (currentPage + 1).toString()

  return (
    <>
      <SEO title={data.page.title} />
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
      <ListNav>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← Newer
          </Link>
        )}
        {!isLast && (
          <Link to={nextPage} rel="next">
            Older →
          </Link>
        )}
      </ListNav>
    </>
  )
}

export const listPageQuery = graphql`
  query($type: String!, $slug: String!, $skip: Int!, $limit: Int!) {
    page: listJson(path: { eq: $slug }) {
      title
      path
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { type: { eq: $type } } }
      limit: $limit
      skip: $skip
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

export const ListNav = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  a {
    display: inline-block;
    padding: 0.5rem 1rem;
  }
`
