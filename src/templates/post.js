import React from "react"
import { graphql } from "gatsby"
import {
  Paper,
  Meta,
  MetaSpan,
  MetaActions,
  DraftBadge,
  Content,
  Hero,
  HeroBackground,
  Wrapper,
  Overlay,
} from "../components/style"
import { Authors } from "../components/authors"
import { SEO } from "../components/seo"
import { Link } from "gatsby"
import { Context } from "../components/context"
import { removeNull } from "../components/helpers"

import { remarkForm } from "gatsby-tinacms-remark"

const merge = require("lodash.merge")

const Post = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  const siteContext = React.useContext(Context)
  const theme = siteContext.theme
  const hero = frontmatter.hero
    ? merge({}, theme.hero, removeNull(frontmatter.hero))
    : theme.hero

  return (
    <Context.Consumer>
      {({ theme }) => (
        <>
          <SEO title={frontmatter.title} />
          <Hero large={hero.large}>
            {hero.overlay && <Overlay />}
            {hero.image && (
              <HeroBackground
                fluid={hero.image.childImageSharp.fluid}
              ></HeroBackground>
            )}
          </Hero>
          <Wrapper>
            <Paper>
              <Meta>
                <MetaSpan>{frontmatter.date}</MetaSpan>
                {frontmatter.authors && (
                  <MetaSpan>
                    <em>By</em>&nbsp;
                    <Authors authorSlugs={frontmatter.authors} />
                  </MetaSpan>
                )}
                <MetaActions>
                  <Link to="/blog">← Back to Blog</Link>
                </MetaActions>
              </Meta>
              <h1>{frontmatter.title}</h1>
              <hr />
              <Content dangerouslySetInnerHTML={{ __html: html }}></Content>
              {frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
            </Paper>
          </Wrapper>
        </>
      )}
    </Context.Consumer>
  )
}

const PostForm = {
  fields: [
    {
      label: "Title",
      name: "rawFrontmatter.title",
      component: "text",
    },
    {
      name: "rawFrontmatter.draft",
      component: "toggle",
      label: "Draft",
    },
    {
      label: "Date",
      name: "rawFrontmatter.date",
      component: "date",
    },
    {
      name: "rawFrontmatter.hero.image",
      component: "text",
      label: "Hero Image",
    },
    {
      label: "Hero Overlay",
      name: "rawFrontmatter.hero.overlay",
      component: "toggle",
    },
    {
      name: "rawFrontmatter.hero.large",
      component: "toggle",
      label: "Large Hero",
    },
    {
      label: "Body",
      name: "rawMarkdownBody",
      component: "markdown",
    },
  ],
}

export default remarkForm(Post, PostForm)

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(
      published: { eq: true }
      frontmatter: { path: { eq: $path } }
    ) {
      id
      html

      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        draft
        authors
        hero {
          large
          overlay
          image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }

      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
  }
`
