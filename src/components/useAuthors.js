import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export const useAuthors = () => {
  const { settingsJson } = useStaticQuery(
    graphql`
      query authorsQuery {
        settingsJson {
          ...authors
        }
      }
    `
  )

  console.log(settingsJson)

  return settingsJson.authors
}

export const authorsFragment = graphql`
  fragment authors on SettingsJson {
    authors {
      email
      name
      slug
      link
    }
  }
`
