import React from "react"
import { PageTitle } from "../components/style"

export function Title({ page, data }) {
  return (
    <>
      <PageTitle>
        {data && data.title ? data.title : page.title ? page.title : ""}
      </PageTitle>
      {data && data.underline && <hr />}
    </>
  )
}

export const TitleBlock = {
  label: "Title",
  name: "title",
  defaultItem: {
    _template: "TitleBlock",
    title: "",
    underline: true,
  },
  fields: [
    { name: "title", label: "Title", component: "text" },
    { name: "underline", label: "Underline", component: "toggle" },
  ],
}
