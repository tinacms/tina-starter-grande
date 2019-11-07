import React from "react"

export function Content({ html }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    ></div>
  )
}

export const ContentBlock = {
  label: "Content",
  name: "content",
  key: "test",
  defaultItem: {
    content: "## Test",
  },
  fields: [{ name: "content", label: "Content", component: "markdown" }],
}
