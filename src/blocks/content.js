import React from "react"
import styled, { css } from "styled-components"

export function Content({ data, html }) {
  const centered = data.center ? data.center : false
  return (
    <StyledContent
      center={centered}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    ></StyledContent>
  )
}

const StyledContent = styled.div`
  ${props =>
    props.center &&
    css`
      text-align: center;
    `};
`

export const ContentBlock = {
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
