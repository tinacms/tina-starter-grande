import React, { useState } from "react"
import styled, { css } from "styled-components"
import { FieldMeta } from "tinacms"
import authorsJson from "../../content/settings/authors"

export const AuthorsField = props => {
  const { input, field, form, meta } = props

  const addAuthor = React.useCallback(
    slug => {
      form.mutators.insert(field.name, 0, slug)
    },
    [field.name, form.mutators]
  )

  const [visible, setVisible] = React.useState(false)
  const authors = authorsJson.authors
  const authorSlugs = input.value || []

  return (
    <>
      <AuthorsHeader>
        <button onClick={() => setVisible(!visible)} open={visible}>
          Add Author
        </button>
        <BlockMenu open={visible}>
          <BlockMenuList>
            {authors.map(author => (
              <BlockOption
                onClick={() => {
                  addAuthor(author.slug)
                  setVisible(false)
                }}
              >
                {author.name}
              </BlockOption>
            ))}
          </BlockMenuList>
        </BlockMenu>
      </AuthorsHeader>
      <FieldMeta
        name={input.name}
        label={field.label}
        description={field.description}
        error={meta.error}
      >
        {authorSlugs.map(authorSlug => {
          const author = authors.find(author => author.slug === authorSlug)
          return <p>{author ? author.name : "error"}</p>
        })}
      </FieldMeta>
    </>
  )
}

const EmptyState = () => <p>There's no authors</p>

const AuthorsHeader = styled.div`
  position: relative;
`

const BlockMenu = styled.div`
  min-width: 12rem;
  border-radius: 0.25rem;
  border: 1px solid #efefef;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate3d(0, 0, 0) scale3d(0.5, 0.5, 1);
  opacity: 0;
  pointer-events: none;
  transition: all 150ms ease-out;
  transform-origin: 100% 0;
  background-color: white;
  overflow: hidden;
  z-index: 100;
  ${props =>
    props.open &&
    css`
      opacity: 1;
      pointer-events: all;
      transform: translate3d(0, 2.25rem, 0) scale3d(1, 1, 1);
    `};
`

const BlockMenuList = styled.div`
  display: flex;
  flex-direction: column;
`

const BlockOption = styled.button`
  position: relative;
  text-align: center;
  font-size: 0.8rem;
  padding: 0.75rem;
  font-weight: 500;
  width: 100%;
  background: none;
  cursor: pointer;
  outline: none;
  border: 0;
  transition: all 85ms ease-out;
  &:hover {
    background-color: #f6f6f9;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
`
