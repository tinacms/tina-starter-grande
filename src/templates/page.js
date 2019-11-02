import React, { useEffect, useMemo } from "react"
import { graphql } from "gatsby"
import { Paper, Headline, Title } from "../components/style"
import { SEO } from "../components/seo"
import { Form, FormBlock } from "../blocks/form"
import { Content, ContentBlock } from "../blocks/content"
import { Context } from "../components/context"

import { useJsonForm } from "gatsby-tinacms-json"

function Page(props) {
  const [page] = useJsonForm(props.data.page, PageForm)
  const blocks = page.blocks ? page.blocks : []

  const siteContext = React.useContext(Context)

  console.log("Page Theme: ")
  console.log(page.pageTheme)

  useEffect(() => siteContext.setPageTheme(page.pageTheme), [page.pageTheme])

  return (
    <>
      <SEO title={page.title} />
      {page.headline && <Headline>{page.headling}</Headline>}
      <Paper>
        <Title>{page.title}</Title>
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
      label: "Headline",
      name: "rawJson.headline",
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
    {
      label: "Page Theme",
      name: "rawJson.pageTheme",
      component: "group",
      fields: [
        {
          label: "Uppercase H2",
          name: "typography.uppercaseH2",
          component: "toggle",
        },
      ],
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

      ...pageTheme

      rawJson
      fileRelativePath
    }
  }
`
