const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      pages: allPageJson {
        edges {
          node {
            path
          }
        }
      }
      posts: allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
      lists: allListJson {
        edges {
          node {
            path
            listType
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
    if (node.path) {
      createPage({
        path: node.path,
        component: path.resolve(`src/templates/page.js`),
        context: {},
      })
    }
  })

  result.data.posts.edges.forEach(({ node }) => {
    if (node.frontmatter.path) {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(`src/templates/post.js`),
        context: {},
      })
    }
  })

  result.data.lists.edges.forEach(({ node }) => {
    const listType = node.listType
    const allPosts = result.data.posts.edges
    const posts = allPosts.filter(function(node) {
      return node.type === listType
    })
    const postsPerPage = 2
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      const currentPage = i + 1
      const isFirstPage = i === 0

      createPage({
        path: isFirstPage
          ? node.path
          : `${String(node.path)}/${String(currentPage)}`,
        component: path.resolve(`src/templates/list.js`),
        context: {
          type: listType,
          slug: node.path,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: currentPage,
        },
      })
    })
  })
}
