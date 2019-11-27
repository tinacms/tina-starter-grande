import React from "react"
import styled, { css } from "styled-components"
import { useAuthors } from "./useAuthors"

export const ListAuthors = ({ authorSlugs }) => {
  const authors = useAuthors()

  const postAuthors = authors.filter(author => {
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
