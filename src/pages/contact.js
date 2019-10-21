import React from "react"
import { Link } from "gatsby"
import { Site } from "../components/site"
import { SEO } from "../components/seo"
import styled, { css } from "styled-components"
import { mix, tint, shade, transparentize } from "polished"

const Contact = () => (
  <Site>
    <SEO title="Contact" />
    <h2>Contact Us</h2>
    <hr />

    <Form name="contact" method="POST" data-netlify="true">
      <FormField>
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autocorrect="off"
          autocomplete="name"
        />
      </FormField>

      <FormField>
        <label for="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          autocorrect="off"
          autocomplete="organization"
        />
      </FormField>

      <FormField>
        <label for="email">E-Mail</label>
        <input
          id="email"
          name="email"
          type="email"
          autocapitalize="off"
          autocorrect="off"
          autocomplete="email"
        />
      </FormField>

      <FormField>
        <label for="tel">Phone</label>
        <input
          id="tel"
          name="tel"
          type="tel"
          autocorrect="off"
          autocomplete="tel"
        />
      </FormField>

      <FormField wide>
        <label for="message">Message</label>
        <textarea cols="40" rows="5" name="message" id="message"></textarea>
      </FormField>

      <FormField>
        <button type="submit" value="Submit">
          Submit
        </button>
      </FormField>
    </Form>
  </Site>
)

export default Contact

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
  justify-items: stretch;

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    grid-template-columns: 1fr 1fr;
  }
`

export const FormField = styled.div`
  input,
  textarea {
    position: relative;
    line-height: 2rem;
    font-size: 1rem;
    padding: 0 0.5rem;
    border-radius: ${props => props.theme.radius.small};
    border: none;
    width: 100%;
    transition: box-shadow 150ms ${props => props.theme.easing};
    color: ${props => props.theme.color.foreground};
    background-color: ${props =>
      mix(0.95, props.theme.color.background, props.theme.color.foreground)};

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${props => props.theme.color.secondary};
    }
  }

  textarea {
    line-height: 1.5;
    padding: 0.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.25rem;
  }

  ${p =>
    p.wide &&
    css`
      flex-grow: 1;
    `};
`
