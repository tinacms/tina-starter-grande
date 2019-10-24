import React from "react"
import { Button, Form, FormField } from "./style"

export function ContactForm({ form }) {
  return (
    <Form
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
    </Form>
  )
}
