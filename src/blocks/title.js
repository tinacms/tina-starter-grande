import React from "react"
import styled, { css } from "styled-components"
import { TinaField } from "tinacms"
import { BlockWrapper } from 'react-tinacms-blocks'


import PlainTextInput from '../components/plainTextInput'

export function Title( props) {
  const data = props.data
  const page = props.page
  const centered = data.center ? data.center : false
  return (
    <BlockWrapper {...props}>
      <TinaField
        name={`${props.name}.${props.index}.title`}
        Component={PlainTextInput}
      >
        <StyledTitle center={centered}>
          {data && data.title ? data.title : page.title ? page.title : ""}
        </StyledTitle>
        {data && data.underline && <Hr center={centered} />}
      </TinaField>
    </ BlockWrapper>
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

export const TitleBlock = {
  type: "TitleBlock",
  label: "Title",
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
