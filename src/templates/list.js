import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Paper, Meta, DraftBadge } from "../components/style"
import { SEO } from "../components/seo"
import { Link } from "gatsby"

export default function List({ data, pageContext }) {
  console.log(data)
  const { slug, limit, skip, numPages, currentPage } = pageContext
  const isFirst = currentPage === 1
  const pageTitle = isFirst
    ? data.page.title
    : data.page.title + " - " + currentPage
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? slug : slug + "/" + (currentPage - 1).toString()
  const nextPage = slug + "/" + (currentPage + 1).toString()

  return (
    <>
      <SEO title={pageTitle} />
      {data.posts &&
        data.posts.edges.map(item => (
          <Paper article key={item.node.id}>
            <h2>
              {item.node.frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
              <Link to={item.node.frontmatter.path}>
                {item.node.frontmatter.title}
              </Link>
            </h2>
            <p>{item.node.excerpt}</p>
            <Meta>
              <span>{item.node.frontmatter.date}</span>
              <Link to={item.node.frontmatter.path}>Read Article →</Link>
            </Meta>
          </Paper>
        ))}
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

export const pageQuery = graphql`
  query($listType: String!, $slug: String!, $skip: Int!, $limit: Int!) {
    page: listsJson(path: { eq: $slug }) {
      path
      title
      listType
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { type: { eq: $listType } }
        published: { eq: true }
      }
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
            draft
          }
        }
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

export const ListNav = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  a {
    display: inline-block;
    padding: 0.5rem 1rem;
  }
`
