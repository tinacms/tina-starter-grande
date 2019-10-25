import React from "react"
import { graphql } from "gatsby"
import { Paper } from "../components/style"
import { SEO } from "../components/seo"
import { Form, FormBlock } from "../blocks/form"
import { Content, ContentBlock } from "../blocks/content"

import { remarkForm } from "gatsby-tinacms-remark"

function Page(props) {
  const page = props.data.markdownRemark
  const blocks = page.frontmatter.blocks || []

  return (
    <>
      <SEO title={page.frontmatter.title} />
      <Paper>
        {page.html && (
          <div dangerouslySetInnerHTML={{ __html: page.html }}></div>
        )}
        {blocks.map(({ _template, ...data }) => {
          switch (_template) {
            case "FormBlock":
              return <Form form={data} />
            case "ContentBlock":
              return <p>Content goes here lol</p>
            default:
              return "Error"
          }
        })}
      </Paper>
    </>
  )
}

const PageForm = {
  fields: [
    {
      label: "Title",
      name: "rawFrontmatter.title",
      component: "text",
    },
    {
      label: "In Menu",
      name: "rawFrontmatter.menu",
      component: "toggle",
    },
    {
      label: "Sections",
      name: "rawFrontmatter.blocks",
      component: "blocks",
      templates: {
        FormBlock,
        ContentBlock,
      },
    },
  ],
}

export default remarkForm(Page, PageForm)

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        blocks {
          _template
          name
          recipient
          fields {
            _template
            label
            inputType
            autocomplete
          }
        }
      }

      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
  }
`
