import React from "react"
import styled, { css } from "styled-components"
import { useAuthors } from "./useAuthors"

export const ListAuthors = ({ authorSlugs }) => {
  const authors = useAuthors()

  const authorList = authorSlugs.map((authorSlug, index) => {
    const author = authors
      ? authors.find(author => author.slug === authorSlug)
      : authorSlug
    const authorName = author.name ? author.name : author
    if (authorSlugs.length === index + 1) {
      return authorName
    } else {
      return authorName + ", "
    }
  })

  return authorList
}
