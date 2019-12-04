import React from "react"
import { useAuthors } from "./useAuthors"

export const ListAuthors = ({ authorIDs }) => {
  const authors = useAuthors().filter(author =>
    authorIDs.find(id => id === author.id)
  )

  const authorList = authors.map((author, index) => {
    if (authors.length === index + 1) {
      return author.name
    } else {
      return author.name + ", "
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
      defaultItem: () => ({
        name: "New Author",
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        email: "",
        link: "",
      }),
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
