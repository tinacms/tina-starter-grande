import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import {
  Paper,
  Meta,
  MetaSpan,
  MetaActions,
  DraftBadge,
} from "../components/style"
import { ListAuthors } from "../components/authors"
import { Link } from "gatsby"
import { PageLayout } from "../components/pageLayout"

export default function List({ data, pageContext }) {
  const page = data.page
  const authors = data.authors

  const { slug, limit, skip, numPages, currentPage } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? slug : slug + "/" + (currentPage - 1).toString()
  const nextPage = slug + "/" + (currentPage + 1).toString()
  page.title = isFirst ? page.title : page.title + " - " + currentPage

  return (
    <PageLayout page={page}>
      <>
        {data.posts &&
          data.posts.edges.map(item => {
            return (
              <Paper article key={item.node.id}>
                {item.node.frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
                <h2>
                  <Link to={item.node.frontmatter.path}>
                    {item.node.frontmatter.title}
                  </Link>
                </h2>
                <p>{item.node.excerpt}</p>
                <Meta>
                  <MetaSpan>{item.node.frontmatter.date}</MetaSpan>
                  {item.node.frontmatter.authors && (
                    <MetaSpan>
                      <em>By</em>&nbsp;
                      <ListAuthors authorIDs={item.node.frontmatter.authors} />
                    </MetaSpan>
                  )}
                  <MetaActions>
                    <Link to={item.node.frontmatter.path}>Read Article →</Link>
                  </MetaActions>
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
    </PageLayout>
  )
}

export const pageQuery = graphql`
  query($listType: String!, $slug: String!, $skip: Int!, $limit: Int!) {
    page: pagesJson(path: { eq: $slug }) {
      path
      title
      hero {
        headline
        textline
        large
        overlay
        ctas {
          label
          link
          primary
          arrow
        }
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
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
            authors
          }
        }
      }
    }
    authors: settingsJson {
      ...authors
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
