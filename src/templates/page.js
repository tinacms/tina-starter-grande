import React, { useEffect, useMemo } from "react"
import { graphql } from "gatsby"
import {
  Paper,
  Headline,
  Textline,
  Actions,
  Title,
  Hero,
  Wrapper,
  Overlay,
  LinkButton,
  HeroBackground,
} from "../components/style"
import { SEO } from "../components/seo"
import { Form, FormBlock } from "../blocks/form"
import { Content, ContentBlock } from "../blocks/content"
import { Context } from "../components/context"
import { removeNull } from "../components/helpers"

import { useJsonForm } from "gatsby-tinacms-json"

const merge = require("lodash.merge")

function Page(props) {
  const [page] = useJsonForm(props.data.page, PageForm)
  const [nav] = useJsonForm(props.data.nav, NavForm)
  const [globalTheme] = useJsonForm(props.data.theme, ThemeForm)

  const blocks = page.blocks ? page.blocks : []

  const siteContext = React.useContext(Context)
  const theme = siteContext.theme
  const hero = page.hero
    ? merge({}, theme.hero, removeNull(page.hero))
    : theme.hero

  return (
    <>
      <SEO title={page.title} />
      <Hero large={hero.large}>
        <Wrapper>
          {hero.headline && <Headline>{hero.headline}</Headline>}
          {hero.textline && <Textline>{hero.textline}</Textline>}
          {hero.ctas && hero.ctas.length > 0 && (
            <Actions>
              {hero.ctas.map(cta => {
                return (
                  <LinkButton primary={cta.primary} to={cta.link}>
                    {cta.label}
                  </LinkButton>
                )
              })}
            </Actions>
          )}
        </Wrapper>
        {hero.overlay && <Overlay />}
        {hero.image && (
          <HeroBackground
            fluid={hero.image.childImageSharp.fluid}
          ></HeroBackground>
        )}
      </Hero>
      <Wrapper>
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
      </Wrapper>
    </>
  )
}

const NavForm = {
  label: "Main Menu",
  fields: [
    {
      label: "Main Menu",
      name: "rawJson.menuItems",
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
          label: "Sub Menu",
          name: "subMenu",
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
              label: "Sub Menu",
              name: "subMenu",
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
              ],
            },
          ],
        },
      ],
    },
  ],
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
      label: "Hero",
      name: "rawJson.hero",
      component: "group",
      fields: [
        {
          label: "Large",
          name: "large",
          component: "toggle",
        },
        {
          label: "Overlay",
          name: "overlay",
          component: "toggle",
        },
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
          component: "text",
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
    {
      label: "Page Settings",
      name: "rawJson",
      component: "group",
      fields: [
        {
          label: "Page Title",
          name: "displayTitle",
          component: "toggle",
        },
      ],
    },
  ],
}

const ThemeForm = {
  label: "Global Theme",
  fields: [
    {
      label: "Color",
      name: "rawJson.color",
      component: "group",
      fields: [
        {
          label: "Black",
          name: "black",
          component: "text",
        },
        {
          label: "White",
          name: "white",
          component: "text",
        },
        {
          label: "Primary",
          name: "primary",
          component: "text",
        },
        {
          label: "Secondary",
          name: "secondary",
          component: "text",
        },
      ],
    },
    {
      label: "Header",
      name: "rawJson.header",
      component: "group",
      fields: [
        {
          label: "Overline",
          name: "overline",
          component: "toggle",
        },
        {
          label: "Transparent",
          name: "transparent",
          component: "toggle",
        },
      ],
    },
    {
      label: "Hero",
      name: "rawJson.hero",
      component: "group",
      fields: [
        {
          label: "Overlay",
          name: "overlay",
          component: "toggle",
        },
        {
          label: "Large",
          name: "large",
          component: "toggle",
        },
        {
          label: "Default Image",
          name: "image",
          component: "text",
        },
      ],
    },
    {
      label: "Typography",
      name: "rawJson.typography",
      component: "group",
      fields: [
        {
          label: "Uppercase H2",
          name: "uppercaseH2",
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
    nav: dataJson(fileRelativePath: { eq: "/data/menu.json" }) {
      menuItems {
        link
        label
      }

      rawJson
      fileRelativePath
    }
    theme: dataJson(fileRelativePath: { eq: "/data/theme.json" }) {
      ...globalTheme

      rawJson
      fileRelativePath
    }
  }
`
