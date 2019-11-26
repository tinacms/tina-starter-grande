import React from "react"
import styled, { css } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

export const useAuthors = () => {
  const { settingsJson } = useStaticQuery(
    graphql`
      query authorsQuery {
        settingsJson(
          fileRelativePath: { eq: "/content/settings/authors.json" }
        ) {
          ...authors
        }
      }
    `
  )
  return settingsJson.authors
}

export const ListAuthors = ({ authorSlugs }) => {
  const authorsJson = useAuthors()

  const postAuthors = authorsJson.filter(author => {
    return authorSlugs.indexOf(author.slug) > -1 ? true : false
  })

  return postAuthors.map((author, i) => {
    if (postAuthors.length === i + 1) {
      return author.name
    } else {
      return author.name + ", "
    }
  })
}

export const authorsFragment = graphql`
  fragment authors on SettingsJson {
    authors {
      email
      name
      slug
    }
  }
`
