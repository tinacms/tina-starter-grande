import React from "react"
import styled, { css } from "styled-components"
import { useAuthors } from "./useAuthors"

export const ListAuthors = ({ authorIDs }) => {
  const authors = useAuthors()

  const authorList = authorIDs.map((authorID, index) => {
    const author = authors.find(author => author.id === authorID)
    const authorName = author && author.name ? author.name : ""
    if (!author) return ""
    if (authorIDs.length === index + 1) {
      return authorName
    } else {
      return authorName + ", "
    }
  })

  return authorList
}

export const AuthorsForm = {
  label: "Authors",
  fields: [
    {
      label: "Authors",
      name: "rawJson.authors",
      component: "group-list",
      itemProps: item => ({
        key: item.id,
        label: item.name,
      }),
      defaultItem: {
        name: "",
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        email: "",
        link: "",
      },
      fields: [
        {
          label: "Name",
          name: "name",
          component: "text",
        },
        {
          label: "Email",
          name: "email",
          component: "text",
        },
        {
          label: "Link",
          name: "link",
          component: "text",
        },
      ],
    },
  ],
}
