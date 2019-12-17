import React from "react"
import styled, { css } from "styled-components"
import { TinaField } from "tinacms"
import { BlockWrapper } from "react-tinacms-blocks"
import { PlainInput } from "../components/plainInput"

export function TitleBlock({ page, data }) {
  const centered = data.center ? data.center : false
  return (
    <BlockWrapper {...props}>
      <StyledTitle center={centered}>
        <TinaField
          name={`${props.name}.${props.index}.text`}
          Component={PlainInput}
        >
          {data && data.title ? data.title : page.title ? page.title : ""}
        </TinaField>
      </StyledTitle>
      {data && data.underline && <Hr center={centered} />}
    </BlockWrapper>
  )
}

const StyledTitle = styled.h2`
  font-size: 2.2em;
  line-height: 1.2;
  word-spacing: 1px;
  font-weight: 700;

  ${props =>
    props.center &&
    css`
      text-align: center;
    `};
`

const Hr = styled.hr`
  margin: 2.2rem 0;

  ${props =>
    props.center &&
    css`
      margin-left: auto;
      margin-right: auto;
    `};
`

export const TitleForm = {
  label: "Title",
  name: "title",
  defaultItem: {
    title: "",
    center: false,
    underline: true,
  },
  fields: [
    { name: "title", label: "Title", component: "text" },
    { name: "center", label: "Center", component: "toggle" },
    { name: "underline", label: "Underline", component: "toggle" },
  ],
}
