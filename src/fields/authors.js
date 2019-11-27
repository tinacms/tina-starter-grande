import React from "react"
import { FieldMeta } from "tinacms"
import authorsJson from "../../content/settings/authors"

export const AuthorsField = props => {
  const authors = authorsJson.authors

  const authorSlugs = props.input.value || []

  return (
    <FieldMeta
      name={props.input.name}
      label={props.field.label}
      description={props.field.description}
      error={props.meta.error}
    >
      {authorSlugs.map(authorSlug => {
        const author = authors.find(author => author.slug === authorSlug)
        return <p>{author.name}</p>
      })}
    </FieldMeta>
  )
}

const EmptyState = () => <p>There's no authors</p>
