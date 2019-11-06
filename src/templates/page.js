import React from "react"
import { graphql } from "gatsby"
import { Paper, Title } from "../components/style"
import { Form, FormBlock } from "../blocks/form"
import { Content, ContentBlock } from "../blocks/content"
import { Layout } from "../components/layout"

import { useJsonForm } from "gatsby-tinacms-json"

export default function Page({ data }) {
  const [page] = useJsonForm(data.page, PageForm)
  const blocks = page.blocks ? page.blocks : []

  return (
    <Layout page={page}>
      <Paper>
        {page.title && page.displayTitle && (
          <>
            <Title>{page.title}</Title>
            <hr />
          </>
        )}
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
    </Layout>
  )
}

const PageForm = {
  label: "Page",
  fields: [
    {
      label: "Title",
      name: "rawJson.title",
      component: "text",
    },
    {
      label: "Display Title",
      name: "rawJson.displayTitle",
      component: "toggle",
    },
    {
      label: "Hero",
      name: "rawJson.hero",
      component: "group",
      fields: [
        {
          label: "Headline",
          name: "headline",
          component: "text",
        },
        {
          label: "Textline",
          name: "textline",
          component: "text",
        },
        {
          label: "Image",
          name: "image",
          component: "image",
          parse: filename => `${filename}`,
          uploadDir: () => `/content/pages/`,
          previewSrc: formValues => {
            console.log(formValues)
            if (!formValues.jsonNode.hero || !formValues.jsonNode.hero.image)
              return ""
            return formValues.jsonNode.hero.image.childImageSharp.fluid.src
          },
        },
        {
          label: "Actions",
          name: "ctas",
          component: "group-list",
          itemProps: item => ({
            key: item.link,
            label: item.label,
          }),
          fields: [
            {
              label: "Label",
              name: "label",
              component: "text",
            },
            {
              label: "Link",
              name: "link",
              component: "text",
            },
            {
              label: "Primary",
              name: "primary",
              component: "toggle",
            },
            {
              label: "Arrow",
              name: "arrow",
              component: "toggle",
            },
          ],
        },
        {
          label: "Large",
          name: "large",
          component: "toggle",
        },
      ],
    },
    {
      label: "Page Sections",
      name: "rawJson.blocks",
      component: "blocks",
      templates: {
        FormBlock,
        ContentBlock,
      },
    },
  ],
}

export const pageQuery = graphql`
  query($path: String!) {
    page: pagesJson(path: { eq: $path }) {
      title
      displayTitle
      hero {
        headline
        textline
        large
        overlay
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        ctas {
          label
          link
          primary
          arrow
        }
      }
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

      rawJson
      fileRelativePath
    }
  }
`
