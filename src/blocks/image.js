import React from "react"

export function Image({ data }) {}

export const ImageBlock = {
  label: "Image",
  name: "image",
  key: "test",
  defaultItem: {
    content: "cafe.jpg",
  },
  fields: [
    { name: "image", label: "Image", component: "text" },
    { name: "caption", label: "Caption", component: "text" },
  ],
}
