import { useStaticQuery, graphql } from "gatsby"

export const useTags = () => {
  const { settingsJson } = useStaticQuery(
    graphql`
      query tagsQuery {
        settingsJson(
          fileRelativePath: { eq: "/content/settings/tags.json" }
        ) {
          ...tags
        }
      }
    `
  );

  return settingsJson.tags;
}

export const tagsFragment = graphql`
  fragment tags on SettingsJson {
    tags {
      id
      text
    }
  }
`
