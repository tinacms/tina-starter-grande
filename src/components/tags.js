import React from "react"
import { Link } from "gatsby"
import { useTags } from "./useTags"

export const ListTags = ({ tagIDs }) => {
  const tags = useTags().filter(tag =>
    tagIDs.find(id => id === tag.id)
  )

  const tagList = tags.map((tag, index) => {
    const slug = ConvertTagTextToSlug(tag.text);
    if (tags.length === index + 1) {
      return <><Link to={`/blog/tag/${slug}`}>{tag.text}</Link></>
    } else {
      return <><Link to={`/blog/tag/${slug}`}>{tag.text}</Link>, </>
    }
  })

  return tagList
}

export const ConvertTagTextToSlug = (text) => {
  return text.toLowerCase().replace(" ", "-"); // TODO: Need more complex conversion from tag text to a URI slug.
}

export const TagsForm = {
  label: "Tags",
  fields: [
    {
      label: "Tags",
      name: "rawJson.tags",
      component: "group-list",
      itemProps: item => ({
        key: item.id,
        label: item.text,
      }),
      defaultItem: () => ({
        name: "New Tag",
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        text: "",
      }),
      fields: [
        {
          label: "Text",
          name: "text",
          component: "text",
          parse(value) {
            return value || ""
          },
        },
      ],
    },
  ],
}
