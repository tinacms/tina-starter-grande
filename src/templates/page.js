import React from "react"
import { graphql } from "gatsby"
import { Paper } from "../components/style"
import { SEO } from "../components/seo"
import { Form, formBlock } from "../blocks/form"

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
            case "formBlock":
              return <Form form={data} />
            case "hrBlock":
              return <hr />
            default:
              return "Error"
          }
        })}
      </Paper>
    </>
  )
}

const hrBlock = { name: "hr" }

const PageForm = {
  fields: [
    {
      label: "Title",
      name: "rawFrontmatter.title",
      component: "text",
    },
    {
      label: "Sections",
      name: "rawFrontmatter.blocks",
      component: "blocks",
      templates: {
        formBlock,
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
            id
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
