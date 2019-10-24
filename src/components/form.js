import React from "react"
import { Button } from "./style"
import styled, { css } from "styled-components"
import { mix, tint, shade, transparentize } from "polished"

export function Form({ form }) {
  return (
    <StyledForm
      name="contact"
      action="https://formspree.io/{form.recipient}"
      method="POST"
    >
      {form.fields.map(field => {
        if (field.inputType === "textarea") {
          return (
            <FormField wide>
              <label for="{field.id}">{field.label}</label>
              <textarea
                cols="40"
                rows="5"
                name="{field.id}"
                id="{field.id}"
              ></textarea>
            </FormField>
          )
        } else {
          return (
            <FormField>
              <label for="{field.id}">{field.label}</label>
              <input
                id="{field.id}"
                name="{field.id}"
                type="{field.inputType}"
                autocorrect="off"
                autocomplete="{field.autocomplete | ``}"
              />
            </FormField>
          )
        }
      })}
      <FormField wide>
        <Button primary type="submit" value="Submit">
          Submit
        </Button>
      </FormField>
    </StyledForm>
  )
}

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1.5rem;
  justify-items: stretch;

  @media (min-width: ${props => props.theme.breakpoints.medium}) {
    grid-template-columns: 1fr 1fr;
  }
`

export const FormField = styled.div`
  input,
  textarea {
    position: relative;
    line-height: 2.25rem;
    font-size: 1rem;
    padding: 0 0.625rem;
    border-radius: ${props => props.theme.radius.small};
    border: none;
    width: 100%;
    transition: box-shadow 150ms ${props => props.theme.easing};
    color: ${props => props.theme.color.foreground};
    background-color: ${props =>
      mix(0.95, props.theme.color.background, props.theme.color.foreground)};

    &:focus {
      box-shadow: 0 0 0 3px ${props => props.theme.color.secondary};
    }
  }

  textarea {
    line-height: 1.5;
    padding: 0.5rem 0.625rem;
    resize: vertical;
  }

  label {
    display: block;
    margin-bottom: 0.25rem;
  }

  ${p =>
    p.wide &&
    css`
      @media (min-width: ${props => props.theme.breakpoints.medium}) {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    `};
`
