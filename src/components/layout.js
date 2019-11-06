import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Wrapper, Main } from "../components/style"
import { SEO } from "../components/seo"
import { ThemeContext } from "../components/theme"
import { Hero } from "../components/hero"
import { removeNull } from "../components/helpers"

import { useJsonForm } from "gatsby-tinacms-json"

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
    }
  `)

  const [nav] = useJsonForm(data.nav, NavForm)
  const [globalTheme] = useJsonForm(data.theme, ThemeForm)

  const themeContext = React.useContext(ThemeContext)
  const theme = themeContext.theme

  return (
    <>
      {page.title && <SEO title={page.title} />}
      <Main>{children}</Main>
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
