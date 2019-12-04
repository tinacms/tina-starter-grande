import { AuthorsField } from "./src/fields/authors"

export const onClientEntry = () => {
  window.tinacms.fields.add({
    name: "authors",
    Component: AuthorsField,
  })
}
