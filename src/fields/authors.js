import React from "react"
import styled, { css } from "styled-components"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { AddIcon, DragIcon, ReorderIcon, TrashIcon } from "@tinacms/icons"
import { IconButton } from "@tinacms/styles"

export const AuthorsField = (props) => {
  const { input, field, form } = props
  const [visible, setVisible] = React.useState(false)
  const authors = field.authors
  const authorIDs = input.value || []

  const addAuthor = React.useCallback(
    (authorID) => {
      form.mutators.insert(field.name, 0, authorID)
    },
    [field.name, form.mutators]
  )

  return (
    <>
      <AuthorsHeader>
        <FieldLabel>Authors</FieldLabel>
        <IconButton
          primary
          small
          onClick={() => setVisible(!visible)}
          open={visible}
        >
          <AddIcon />
        </IconButton>
        <AuthorMenu open={visible}>
          <AuthorMenuList>
            {authors.map((author) => (
              <AuthorOption
                onClick={() => {
                  addAuthor(author.id)
                  setVisible(false)
                }}
              >
                {author.name}
              </AuthorOption>
            ))}
          </AuthorMenuList>
        </AuthorMenu>
      </AuthorsHeader>
      <Droppable droppableId={field.name} type={field.name}>
        {(provider) => (
          <AuthorList ref={provider.innerRef}>
            {authorIDs.length === 0 && (
              <EmptyList>There's no authors</EmptyList>
            )}
            {authorIDs.map((authorID, index) => {
              const author = authors.find((author) => author.id === authorID)
              return (
                <AuthorListItem
                  author={author}
                  form={form}
                  field={field}
                  index={index}
                ></AuthorListItem>
              )
            })}
            {provider.placeholder}
          </AuthorList>
        )}
      </Droppable>
    </>
  )
}

const AuthorListItem = ({ author, form, field, index }) => {
  const removeAuthor = React.useCallback(() => {
    form.mutators.remove(field.name, index)
  }, [form, field, index])

  return (
    <Draggable
      key={index}
      type={field.name}
      draggableId={`${field.name}.${index}`}
      index={index}
    >
      {(provider, snapshot) => (
        <ListItem
          ref={provider.innerRef}
          isDragging={snapshot.isDragging}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
        >
          <DragHandle />
          <ItemLabel>
            {author && author.name ? (
              author.name
            ) : (
              <Placeholder>Unknown Author</Placeholder>
            )}
          </ItemLabel>
          <DeleteButton onClick={removeAuthor}>
            <TrashIcon />
          </DeleteButton>
        </ListItem>
      )}
    </Draggable>
  )
}

const AuthorList = styled.div`
  margin-bottom: 1.5rem;
`

const Placeholder = styled.span`
  opacity: 0.3;
  text-transform: italic;
`

const ItemLabel = styled.label`
  margin: 0;
  font-size: var(--tina-font-size-2);
  font-weight: 500;
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: center;
  color: inherit;
  transition: all 85ms ease-out;
  text-align: left;
  padding: 0 0.5rem;
  pointer-events: none;

  ${(props) =>
    props.error &&
    css`
      color: var(--tina-color-error) !important;
    `};
`

const DragHandle = styled(function DragHandle({ ...styleProps }) {
  return (
    <div {...styleProps}>
      <DragIcon />
      <ReorderIcon />
    </div>
  )
})`
  margin: 0;
  flex: 0 0 auto;
  width: 2rem;
  position: relative;
  fill: inherit;
  padding: 0.75rem 0;
  transition: all 85ms ease-out;
  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1.25rem;
    height: 1.25rem;
    transform: translate3d(-50%, -50%, 0);
    transition: all 85ms ease-out;
  }
  svg:last-child {
    opacity: 0;
  }
`

const DeleteButton = styled.button`
  text-align: center;
  flex: 0 0 auto;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0.75rem 0.5rem;
  margin: 0;
  transition: all 85ms ease-out;
  &:hover {
    background-color: var(--tina-color-grey-2);
  }
`

const ListItem = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: white;
  border: 1px solid var(--tina-color-grey-2);
  margin: 0 0 -1px 0;
  overflow: visible;
  line-height: 1.35;
  padding: 0;
  font-size: var(--tina-font-size-2);
  font-weight: 500;

  ${ItemLabel} {
    color: #282828;
    align-self: center;
    max-width: 100%;
  }

  svg {
    fill: var(--tina-color-grey-3);
    width: 1.25rem;
    height: auto;
    transition: fill 85ms ease-out;
  }

  &:hover {
    background-color: var(--tina-color-grey-1);
    cursor: grab;

    ${ItemLabel} {
      color: var(--tina-color-primary);
    }
    ${DeleteButton} {
      svg {
        fill: var(--tina-color-grey-4);
      }
      &:hover {
        svg {
          fill: var(--tina-color-grey-8);
        }
      }
    }
    ${DragHandle} {
      svg {
        fill: var(--tina-color-grey-8);
      }
      svg:first-child {
        opacity: 0;
      }
      svg:last-child {
        opacity: 1;
      }
    }
  }

  &:first-child {
    border-radius: 0.25rem 0.25rem 0 0;
  }

  &:nth-last-child(2) {
    border-radius: 0 0 0.25rem 0.25rem;
    &:first-child {
      border-radius: var(--tina-radius-small);
    }
  }

  ${(p) =>
    p.isDragging &&
    css`
      border-radius: var(--tina-radius-small);
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.12);

      svg {
        fill: var(--tina-color-grey-8);
      }
      ${ItemLabel} {
        color: var(--tina-color-primary);
      }

      ${DragHandle} {
        svg:first-child {
          opacity: 0;
        }
        svg:last-child {
          opacity: 1;
        }
      }
    `};
`

const EmptyList = styled.div`
  text-align: center;
  border-radius: var(--tina-radius-small);
  background-color: var(--tina-color-grey-2);
  color: var(--tina-color-grey-4);
  line-height: 1.35;
  padding: 0.75rem 0;
  font-size: var(--tina-font-size-2);
  font-weight: 500;
`

const AuthorsHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`

const FieldLabel = styled.label`
  margin: 0;
  font-size: var(--tina-font-size-2);
  font-weight: 500;
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  transition: all 85ms ease-out;
  text-align: left;

  ${(props) =>
    props.error &&
    css`
      color: var(--tina-color-error) !important;
    `};
`

const AuthorMenu = styled.div`
  min-width: 12rem;
  border-radius: var(--tina-radius-big);
  border: 1px solid var(--tina-color-grey-2);
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate3d(0, 0, 0) scale3d(0.5, 0.5, 1);
  opacity: 0;
  pointer-events: none;
  transition: all 150ms ease-out;
  transform-origin: 100% 0;
  box-shadow: var(--tina-shadow-big);
  background-color: white;
  overflow: hidden;
  z-index: 100;
  ${(props) =>
    props.open &&
    css`
      opacity: 1;
      pointer-events: all;
      transform: translate3d(0, 2.25rem, 0) scale3d(1, 1, 1);
    `};
`

const AuthorMenuList = styled.div`
  display: flex;
  flex-direction: column;
`

const AuthorOption = styled.button`
  position: relative;
  text-align: center;
  font-size: var(--tina-font-size-0);
  padding: var(--tina-padding-small);
  font-weight: 500;
  width: 100%;
  background: none;
  cursor: pointer;
  outline: none;
  border: 0;
  transition: all 85ms ease-out;
  &:hover {
    color: var(--tina-color-primary);
    background-color: var(--tina-color-grey-1);
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--tina-color-grey-2);
  }
`
