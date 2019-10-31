import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { Paper } from "../components/style"
import { SEO } from "../components/seo"
import { Form, FormBlock } from "../blocks/form"
import { Content, ContentBlock } from "../blocks/content"
import { Context } from "../components/context"

import { useJsonForm } from "gatsby-tinacms-json"

function Page(props) {
  const [page] = useJsonForm(props.data.page, PageForm)
  const blocks = page.blocks ? page.blocks : []

  const pageContext = React.useContext(Context)
  const pageTheme = page.theme
  useEffect(() => pageContext.setPageTheme(pageTheme), [pageTheme])

  return (
    <>
      <SEO title={page.title} />
      <Paper>
        <h2>{page.title}</h2>
        <hr />
        {blocks &&
          blocks.map(({ _template, ...data }, i) => {
            switch (_template) {
              case "FormBlock":
                return <Form form={data} />
              case "ContentBlock":
                if (data.content)
                  return (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          page.childrenPagesJsonBlockMarkdown[i]
                            .childMarkdownRemark.html,
                      }}
                    ></div>
                  )
                break
              default:
                return true
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
      childrenPagesJsonBlockMarkdown {
        childMarkdownRemark {
          html
        }
      }

      theme {
        color {
          primary
          black
          secondary
          white
        }
        header {
          overline
          layout
          background {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }

      rawJson
      fileRelativePath
    }
  }
`
