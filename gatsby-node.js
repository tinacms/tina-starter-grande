const path = require(`path`)

// exports.onCreateNode = ({
//   node,
//   actions,
//   createNodeId,
//   createContentDigest,
// }) => {
//   const { createNode, createNodeField } = actions

//   if (node.internal.type === `PageJson`) {
//     const textNode = {
//       id: createNodeId(`${node.id} markdown field`),
//       children: [],
//       parent: node.id,
//       internal: {
//         content: node.content,
//         mediaType: `text/markdown`, // Important!
//         contentDigest: createContentDigest(node.content),
//         type: `${node.internal.type}Markdown`,
//       },
//     }

//     createNode(textNode)

//     // Add link to the new node
//     createNodeField({
//       node,
//       name: `markdownContent___NODE`, // Before the ___NODE: Name of the new fields
//       value: textNode.id, // Connects both nodes
//     })
//   }
// }

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      pages: allPageJson(filter: { path: { ne: null } }) {
        edges {
          node {
            path
          }
        }
      }
      posts: allMarkdownRemark(
        filter: { frontmatter: { path: { ne: null } } }
      ) {
        edges {
          node {
            frontmatter {
              path
              type
            }
          }
        }
      }
      lists: allListJson(filter: { path: { ne: null } }) {
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
    createPage({
      path: node.path,
      component: path.resolve(`src/templates/page.js`),
      context: {},
    })
  })

  result.data.posts.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`src/templates/post.js`),
      context: {},
    })
  })

  result.data.lists.edges.forEach(({ node }) => {
    const listPageTemplate = path.resolve(`src/templates/list.js`)
    const listType = node.listType
    const allPosts = result.data.posts.edges
    const posts = allPosts.filter(post => post.type === listType)
    const postsPerPage = 2
    const numPages = Math.ceil(posts.length / postsPerPage)
    const slug = node.path

    Array.from({ length: numPages }).forEach((_, i) => {
      const currentPage = i + 1
      const isFirstPage = i === 0

      createPage({
        path: isFirstPage
          ? node.path
          : `${String(node.path)}/${String(currentPage)}`,
        component: listPageTemplate,
        context: {
          listType: listType,
          slug: slug,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numPages,
          currentPage: currentPage,
        },
      })
    })
  })
}
