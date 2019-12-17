import React from "react"
import styled, { css } from "styled-components"
import { BlockWrapper } from "react-tinacms-blocks"

export function ContentBlock(props) {
  const centered = data.center ? data.center : false
  return (
    <BlockWrapper {...props}>
      <StyledContent
        center={centered}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      ></StyledContent>
    </BlockWrapper>
  )
}

const StyledContent = styled.div`
  ${props =>
    props.center &&
    css`
      text-align: center;
    `};
`

export const ContentForm = {
  label: "Content",
  name: "content",
  key: "test",
  defaultItem: {
    content: "",
    center: false,
  },
  fields: [
    { name: "content", label: "Content", component: "markdown" },
    { name: "center", label: "Center", component: "toggle" },
  ],
}
