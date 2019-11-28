import React, { useMemo } from "react"
import { graphql } from "gatsby"
import {
  Paper,
  Meta,
  MetaSpan,
  MetaActions,
  DraftBadge,
  EditButton,
  Content,
  Wrapper,
  PlainText,
} from "../components/style"
import { ListAuthors } from "../components/authors"
import { Link } from "gatsby"
import { PageLayout } from "../components/pageLayout"
import { useAuthors } from "../components/useAuthors"

function Post(props) {
  const page = props.data.markdownRemark

  return (
    <PageLayout page={page}>
      <Paper>
        <Meta>
          <MetaSpan>{page.frontmatter.date}</MetaSpan>
          {page.frontmatter.authors && page.frontmatter.authors.length > 0 && (
            <MetaSpan>
              <em>By</em>&nbsp;
              <ListAuthors authorIDs={page.frontmatter.authors} />
            </MetaSpan>
          )}
          <MetaActions>
            <Link to="/blog">← Back to Blog</Link>
          </MetaActions>
        </Meta>
        <h1>{page.frontmatter.title}</h1>
        <hr />
        <div
          dangerouslySetInnerHTML={{
            __html: page.html,
          }}
        />
        {page.frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
      </Paper>
    </PageLayout>
  )
}

export default Post

export const postQuery = graphql`
  query($path: String!) {
    markdownRemark(
      published: { eq: true }
      frontmatter: { path: { eq: $path } }
    ) {
      id
      excerpt(pruneLength: 160)
      html

      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        draft
        authors
        hero {
          large
          overlay
          image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
    settingsJson {
      ...authors
    }
  }
`
