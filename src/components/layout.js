import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Wrapper, Main } from "../components/style"
import { SEO } from "../components/seo"
import { ThemeContext } from "../components/theme"
import { Hero } from "../components/hero"
import { removeNull } from "../components/helpers"

import { useJsonForm } from "gatsby-tinacms-json"

const merge = require("lodash.merge")

export const Layout = ({ page, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
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
      site: dataJson(fileRelativePath: { eq: "/data/site.json" }) {
        title
        description
        author

        rawJson
        fileRelativePath
      }
    }
  `)

  const [nav] = useJsonForm(data.nav, NavForm)
  const [globalTheme] = useJsonForm(data.theme, ThemeForm)
  const [site] = useJsonForm(data.site, SiteForm)

  const themeContext = React.useContext(ThemeContext)
  const theme = themeContext.theme
  const pageTitle = page.title
    ? page.title
    : page.frontmatter.title
    ? page.frontmatter.title
    : false
  const pageHero = page.frontmatter ? page.frontmatter.hero : page.hero
  const hero = pageHero
    ? merge({}, theme.hero, removeNull(pageHero))
    : theme.hero

  return (
    <>
      {pageTitle && <SEO title={pageTitle} />}
      <Hero hero={hero} />
      <Main>
        <Wrapper>{children}</Wrapper>
      </Main>
    </>
  )
}

const SiteForm = {
  label: "Site",
  fields: [
    {
      label: "Title",
      name: "rawJson.title",
      component: "text",
    },
    {
      label: "Description",
      name: "rawJson.description",
      component: "text",
    },
    {
      label: "Author",
      name: "rawJson.author",
      component: "text",
    },
  ],
}

const NavForm = {
  label: "Menu",
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

const ThemeForm = {
  label: "Theme",
  fields: [
    {
      label: "Color",
      name: "rawJson.color",
      component: "group",
      fields: [
        {
          label: "Black",
          name: "black",
          component: "color",
          colorFormat: "hex",
        },
        {
          label: "White",
          name: "white",
          component: "color",
          colorFormat: "hex",
        },
        {
          label: "Primary",
          name: "primary",
          component: "color",
          colorFormat: "hex",
        },
        {
          label: "Secondary",
          name: "secondary",
          component: "color",
          colorFormat: "hex",
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
        {
          label: "Height",
          name: "height",
          component: "text",
        },
      ],
    },
    {
      label: "Menu",
      name: "rawJson.menu",
      component: "group",
      fields: [
        {
          label: "Style",
          description: "Options are 'pill' and 'glow'",
          name: "style",
          component: "text",
        },
      ],
    },
    {
      label: "Hero",
      name: "rawJson.hero",
      component: "group",
      fields: [
        {
          label: "Default Image",
          name: "image",
          component: "text",
        },
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
          label: "Overlap",
          name: "overlap",
          component: "text",
        },
        {
          label: "Parallax",
          name: "parallax",
          component: "toggle",
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
