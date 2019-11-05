import React from "react"
import { graphql } from "gatsby"
import {
  Paper,
  Meta,
  MetaSpan,
  MetaActions,
  DraftBadge,
  Content,
  Wrapper,
} from "../components/style"
import { Authors } from "../components/authors"
import { Link } from "gatsby"
import { Layout } from "../components/layout"

import { useRemarkForm } from "gatsby-tinacms-remark"

export default function Post({ data }) {
  const [page] = useRemarkForm(data.markdownRemark, PostForm)

  return (
    <Layout page={page}>
      <Paper>
        <Meta>
          <MetaSpan>{page.frontmatter.date}</MetaSpan>
          {page.frontmatter.authors && (
            <MetaSpan>
              <em>By</em>&nbsp;
              <Authors authorSlugs={page.frontmatter.authors} />
            </MetaSpan>
          )}
          <MetaActions>
            <Link to="/blog">← Back to Blog</Link>
          </MetaActions>
        </Meta>
        <h1>{page.frontmatter.title}</h1>
        <hr />
        <Content dangerouslySetInnerHTML={{ __html: page.html }}></Content>
        {page.frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
      </Paper>
    </Layout>
  )
}

const PostForm = {
  fields: [
    {
      label: "Title",
      name: "rawFrontmatter.title",
      component: "text",
    },
    {
      name: "rawFrontmatter.draft",
      component: "toggle",
      label: "Draft",
    },
    {
      label: "Date",
      name: "rawFrontmatter.date",
      component: "date",
    },
    {
      name: "rawFrontmatter.hero.image",
      component: "text",
      label: "Hero Image",
    },
    {
      label: "Hero Overlay",
      name: "rawFrontmatter.hero.overlay",
      component: "toggle",
    },
    {
      name: "rawFrontmatter.hero.large",
      component: "toggle",
      label: "Large Hero",
    },
    {
      label: "Body",
      name: "rawMarkdownBody",
      component: "markdown",
    },
  ],
}

export const postQuery = graphql`
  query($path: String!) {
    markdownRemark(
      published: { eq: true }
      frontmatter: { path: { eq: $path } }
    ) {
      id
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

      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
  }
`
