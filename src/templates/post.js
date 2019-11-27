import React from "react"
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
import { Layout } from "../components/layout"

import { TinaField } from "@tinacms/form-builder"
import { Wysiwyg } from "@tinacms/fields"
import { liveRemarkForm, DeleteAction } from "gatsby-tinacms-remark"

function Post(props) {
  const page = props.data.markdownRemark
  const { isEditing, setIsEditing } = props

  return (
    <Layout page={page}>
      <Paper>
        <Meta>
          <MetaSpan>{page.frontmatter.date}</MetaSpan>
          {page.frontmatter.authors && (
            <MetaSpan>
              <em>By</em>&nbsp;
              <ListAuthors authorSlugs={page.frontmatter.authors} />
            </MetaSpan>
          )}
          <MetaActions>
            <Link to="/blog">← Back to Blog</Link>
          </MetaActions>
        </Meta>
        <h1>
          <TinaField name="rawFrontmatter.title" Component={PlainText}>
            {page.frontmatter.title}
          </TinaField>
        </h1>
        <hr />
        <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
          <div
            dangerouslySetInnerHTML={{
              __html: page.html,
            }}
          />
        </TinaField>
        {page.frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
        {process.env.NODE_ENV !== "production" && (
          <EditButton
            isEditing={isEditing}
            onClick={() => setIsEditing(p => !p)}
          >
            {isEditing ? "Preview" : "Edit"}
          </EditButton>
        )}
      </Paper>
    </Layout>
  )
}

const PostForm = {
  actions: [DeleteAction],
  fields: [
    {
      label: "Title",
      name: "rawFrontmatter.title",
      component: "text",
    },
    {
      label: "Authors",
      name: "rawFrontmatter.authors",
      component: "authors",
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
      label: "Hero Image",
      name: "rawFrontmatter.hero.image",
      component: "image",
      parse: filename => `../images/${filename}`,
      uploadDir: () => `/content/images/`,
      previewSrc: formValues => {
        if (!formValues.frontmatter.hero || !formValues.frontmatter.hero.image)
          return ""
        return formValues.frontmatter.hero.image.childImageSharp.fluid.src
      },
    },
    {
      label: "Body",
      name: "rawMarkdownBody",
      component: "markdown",
    },
  ],
}

export default liveRemarkForm(Post, PostForm)

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

      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
    settingsJson(fileRelativePath: { eq: "/content/settings/authors.json" }) {
      ...authors
    }
  }
`
