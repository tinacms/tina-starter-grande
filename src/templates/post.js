import React, { useMemo } from "react"
import { graphql } from "gatsby"
import {
  Paper,
  Meta,
  MetaSpan,
  MetaActions,
  DraftBadge,
} from "../components/style"
import { EditToggle } from "../components/editToggle"
import { ListAuthors } from "../components/authors"
import { Link } from "gatsby"
import { PageLayout } from "../components/pageLayout"
import { TinaField, TinaForm } from "@tinacms/form-builder"
import { Wysiwyg } from "@tinacms/fields"
import { useLocalRemarkForm, DeleteAction } from "gatsby-tinacms-remark"
import { InlineForm, InlineTextField } from "react-tinacms-inline"
import { useAuthors } from "../components/useAuthors"

function Post(props) {
  const page = props.data.markdownRemark
  // const form = useRemark()

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
        {/* {page.frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
          {process.env.NODE_ENV !== "production" && <EditToggle />} */}
      </Paper>
    </PageLayout>
  )
}

// function RemarkForm(props) {
//   const authors = useAuthors()
//   const PostForm = useMemo(() => {
//     return {
//       actions: [DeleteAction],
//       fields: [
//         {
//           label: "Title",
//           name: "rawFrontmatter.title",
//           component: "text",
//         },
//         {
//           label: "Authors",
//           name: "rawFrontmatter.authors",
//           component: "authors",
//           authors: authors,
//         },
//         {
//           name: "rawFrontmatter.draft",
//           component: "toggle",
//           label: "Draft",
//         },
//         {
//           label: "Date",
//           name: "rawFrontmatter.date",
//           component: "date",
//         },
//         {
//           label: "Hero Image",
//           name: "rawFrontmatter.hero.image",
//           component: "image",
//           parse: (filename) => `../images/${filename}`,
//           uploadDir: () => `/content/images/`,
//           previewSrc: (formValues) => {
//             if (
//               !formValues.frontmatter.hero ||
//               !formValues.frontmatter.hero.image
//             )
//               return ""
//             return formValues.frontmatter.hero.image.childImageSharp.fluid.src
//           },
//         },
//         {
//           label: "Body",
//           name: "rawMarkdownBody",
//           component: "markdown",
//         },
//       ],
//     }
//   }, [authors])
//   const [markdownRemark, form] = useLocalRemarkForm(
//     props.data.markdownRemark,
//     PostForm
//   )

//   return (
//     <TinaForm form={form}>
//       {(editingProps) => {
//         return (
//           <Post
//             {...props}
//             data={{ ...props.data, markdownRemark }}
//             {...editingProps}
//           />
//         )
//       }}
//     </TinaForm>
//   )
// }

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

      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
    settingsJson(fileRelativePath: { eq: "/content/settings/authors.json" }) {
      ...authors
    }
  }
`
