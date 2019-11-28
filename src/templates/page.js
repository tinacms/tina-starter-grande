import React from "react"
import { graphql } from "gatsby"
import { Paper } from "../components/style"
import { Form, FormBlock } from "../blocks/form"
import { Title, TitleBlock } from "../blocks/title"
import { Image, ImageBlock } from "../blocks/image"
import { Content, ContentBlock } from "../blocks/content"
import { PageLayout } from "../components/pageLayout"

export default function Page({ data }) {
  const page = data.page
  const blocks = page.blocks ? page.blocks : []

  return (
    <PageLayout page={page}>
      <Paper>
        {blocks &&
          blocks.map(({ _template, ...data }, i) => {
            switch (_template) {
              case "TitleBlock":
                return <Title page={page} data={data} />
              case "ImageBlock":
                return <Image data={data} />
              case "FormBlock":
                return <Form form={data} />
              case "ContentBlock":
                if (data.content && page.childrenPagesJsonBlockMarkdown[i])
                  return (
                    <Content
                      data={data}
                      html={
                        page.childrenPagesJsonBlockMarkdown[i]
                          .childMarkdownRemark.html
                      }
                    />
                  )
                break
              default:
                return true
            }
          })}
      </Paper>
    </PageLayout>
  )
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
        title
        underline
        center
        recipient
        fields {
          label
          inputType
          autocomplete
        }
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      childrenPagesJsonBlockMarkdown {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
