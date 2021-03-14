import { useTags } from "./useTags"

// Convert a list of tag IDs into a comma-delimited string.
export const ListTags = ({ tagIDs }) => {
  const tags = useTags().filter(tag =>
    tagIDs.find(id => id === tag.id)
  )

  const tagList = tags.map((tag, index) => {
    if (tags.length === index + 1) {
      return tag.text
    } else {
      return tag.text + ", "
    }
  })

  return tagList
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
