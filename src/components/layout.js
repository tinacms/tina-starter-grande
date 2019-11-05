import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  Headline,
  Textline,
  Actions,
  Hero,
  Wrapper,
  Overlay,
  LinkButton,
  HeroBackground,
} from "../components/style"
import { SEO } from "../components/seo"
import { ThemeContext } from "../components/theme"
import { removeNull } from "../components/helpers"

import { useJsonForm } from "gatsby-tinacms-json"

const merge = require("lodash.merge")

export const Layout = ({ page, children }) => {
  // const data = useStaticQuery(graphql`
  //   query LayoutQuery {
  //     nav: dataJson(fileRelativePath: { eq: "/data/menu.json" }) {
  //       menuItems {
  //         link
  //         label
  //       }

  //       rawJson
  //       fileRelativePath
  //     }
  //     theme: dataJson(fileRelativePath: { eq: "/data/theme.json" }) {
  //       ...globalTheme

  //       rawJson
  //       fileRelativePath
  //     }
  //   }
  // `)

  // const [nav] = useJsonForm(data.nav, NavForm)
  // const [globalTheme] = useJsonForm(data.theme, ThemeForm)

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
      <Hero large={hero.large}>
        <Wrapper>
          {hero.headline && <Headline>{hero.headline}</Headline>}
          {hero.textline && <Textline>{hero.textline}</Textline>}
          {hero.ctas && (
            <Actions>
              {Object.keys(hero.ctas).map(key => {
                return (
                  <LinkButton
                    primary={hero.ctas[key].primary}
                    to={hero.ctas[key].link}
                  >
                    {hero.ctas[key].label}
                    {hero.ctas[key].arrow && <span>&nbsp;&nbsp;→</span>}
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
      <Wrapper>{children}</Wrapper>
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
