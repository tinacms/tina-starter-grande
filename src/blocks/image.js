import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import get from "lodash.get"
import { BlockWrapper } from "react-tinacms-blocks"

export function ImageBlock({ data }) {
  return (
    data.image &&
    data.image.childImageSharp && (
      <BlockWrapper {...props}>
        <ImageWrapper>
          <Img fluid={data.image.childImageSharp.fluid} />
        </ImageWrapper>
      </BlockWrapper>
    )
  )
}

const ImageWrapper = styled.div`
  overflow: hidden;
`

export const ImageForm = {
  label: "Image",
  name: "image",
  key: "test",
  defaultItem: {
    image: "",
  },
  fields: [
    {
      label: "Image",
      name: "image",
      component: "image",
      parse: filename => `../images/${filename}`,
      uploadDir: () => `/content/images/`,
      previewSrc: (formValues, fieldProps) => {
        const pathName = fieldProps.input.name.replace("rawJson", "jsonNode")
        const imageNode = get(formValues, pathName)
        if (!imageNode || !imageNode.childImageSharp) return ""
        return imageNode.childImageSharp.fluid.src
      },
    },
  ],
}
