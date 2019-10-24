const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      lists: allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "list" } } }
      ) {
        edges {
          node {
            frontmatter {
              path
              template
            }
          }
        }
      }
      posts: allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "post" } } }
      ) {
        edges {
          node {
            frontmatter {
              path
              template
            }
          }
        }
      }
      pages: allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "page" } } }
      ) {
        edges {
          node {
            frontmatter {
              path
              template
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.pages.edges.forEach(({ node }) => {
    if (node.frontmatter.path) {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.template)}.js`
        ),
        context: {}, // additional data can be passed via context
      })
    }
  })

  result.data.posts.edges.forEach(({ node }) => {
    if (node.frontmatter.path) {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.template)}.js`
        ),
        context: {}, // additional data can be passed via context
      })
    }
  })

  result.data.lists.edges.forEach(({ node }) => {
    const posts = result.data.posts.edges
    const postsPerPage = 6
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? node.frontmatter.path
            : `${String(node.frontmatter.path)}/${String(i + 1)}`,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.template)}.js`
        ),
        context: {
          slug: node.frontmatter.path,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })
}
