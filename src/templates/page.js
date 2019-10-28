import React from "react"
import { graphql } from "gatsby"
import { Paper } from "../components/style"
import { SEO } from "../components/seo"
import { Form, FormBlock } from "../blocks/form"
import { Content, ContentBlock } from "../blocks/content"

// import { remarkForm } from "gatsby-tinacms-remark"

function Page(props) {
  const page = props.data.page
  const blocks = page.blocks

  return (
    <>
      <SEO title={page.title} />
      <Paper>
        {blocks &&
          blocks.map(({ _template, ...data }) => {
            switch (_template) {
              case "FormBlock":
                return <Form form={data} />
              case "ContentBlock":
                return <p>{data.content}</p>
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

export default Page

export const pageQuery = graphql`
  query($path: String!) {
    page: pageJson(path: { eq: $path }) {
      title
      content
      blocks {
        _template
        content
      }
    }
  }
`
