import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export const Authors = ({ authorSlugs }) => {
  const data = useStaticQuery(graphql`
    query authorQuery {
      authorsJson: dataJson(fileRelativePath: { eq: "/data/authors.json" }) {
        authors {
          email
          name
          slug
        }
      }
    }
  `)

  const allAuthors = data.authorsJson.authors
  const postAuthors = allAuthors.filter(author => {
    return authorSlugs.indexOf(author.slug) > -1 ? true : false
  })

  console.log(postAuthors)

  return postAuthors.map((author, i) => {
    if (postAuthors.length === i + 1) {
      return author.name
    } else {
      return author.name + ", "
    }
  })
}
