import React from "react"
import { graphql } from "gatsby"
import { Paper } from "../components/style"
import { SEO } from "../components/seo"
import { Form } from "../components/form"

import { remarkForm } from "gatsby-tinacms-remark"

function Page({ data }) {
  const { frontmatter, html } = data.markdownRemark

  return (
    <>
      <SEO title={frontmatter.title} />
      <Paper>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
        {frontmatter.form && <Form form={frontmatter.form} />}
      </Paper>
    </>
  )
}

let PageForm = {
  fields: [
    {
      label: "Title",
      name: "rawFrontmatter.title",
      component: "text",
    },
    {
      label: "Body",
      name: "rawMarkdownBody",
      component: "markdown",
    },
    {
      label: "Form",
      name: "frontmatter.form",
      component: "group",
      fields: [
        { name: "name", label: "Name", component: "text" },
        {
          name: "recipient",
          label: "Recipient",
          component: "text",
        },
        {
          label: "Fields",
          name: "fields",
          component: "group-list",
          defaultItem: {
            id: "name",
            label: "Name",
            inputType: "text",
            autocomplete: "name",
          },
          itemProps: item => ({
            key: item.id,
            label: item.label,
          }),
          fields: [
            { name: "id", label: "ID", component: "text" },
            { name: "label", label: "Label", component: "text" },
            { name: "inputType", label: "Input Type", component: "text" },
            { name: "autocomplete", label: "Autocomplete", component: "text" },
          ],
        },
      ],
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
        form {
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
