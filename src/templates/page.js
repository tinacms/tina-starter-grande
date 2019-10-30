import React from "react"
import { graphql } from "gatsby"
import { Paper } from "../components/style"
import { SEO } from "../components/seo"
import { Form, FormBlock } from "../blocks/form"
import { Content, ContentBlock } from "../blocks/content"

import { useJsonForm } from "gatsby-tinacms-json"

function Page(props) {
  const [page] = useJsonForm(props.data.page, PageForm)
  const blocks = page.blocks ? page.blocks : []

  return (
    <>
      <SEO title={page.title} />
      <Paper>
        <h2>{page.title}</h2>
        <hr />
        {blocks &&
          blocks.map(({ _template, ...data }, i) => {
            {
              console.log(_template)
              console.log(data)
            }
            switch (_template) {
              case "FormBlock":
                return <Form form={data} />
              case "ContentBlock":
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        page.childPagesJsonBlockMarkdown[i].childMarkdownRemark
                          .html,
                    }}
                  ></div>
                )
              default:
                return <p>Undefined block</p>
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
      name: "rawJson.title",
      component: "text",
    },
    {
      label: "Sections",
      name: "rawJson.blocks",
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
    page: pagesJson(path: { eq: $path }) {
      title
      content
      blocks {
        _template
        content
        name
        recipient
        fields {
          label
          inputType
          autocomplete
        }
      }
      childPagesJsonBlockMarkdown {
        childMarkdownRemark {
          html
        }
      }
      rawJson
      fileRelativePath
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
