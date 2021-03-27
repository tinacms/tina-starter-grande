import { AuthorsField } from "./src/fields/authors"
import { TagsField } from "./src/fields/tags"

export const onClientEntry = () => {
  window.tinacms.fields.add({
    name: "authors",
    Component: AuthorsField,
  })
  window.tinacms.fields.add({
    name: "tags",
    Component: TagsField,
  })
}
