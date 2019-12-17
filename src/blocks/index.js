import React from "react"
import { InlineBlocks, AddBlockMenu } from "react-tinacms-blocks"
import { TitleBlock, TitleForm } from "./title"
import { ImageBlock, ImageForm } from "./image"
import { FormBlock, FormForm } from "./form"
import { ContentBlock, ContentForm } from "./content"

export function PageBlocks({ form, data }) {
  return (
    <InlineBlocks
      form={form}
      name="rawFrontmatter.blocks"
      data={data}
      templates={BlockTemplates}
      components={BlockComponents}
      renderBefore={props => {
        if (!props.data || props.data.length < 1)
          return (
            <div style={{ position: "relative" }}>
              <AddBlockMenu
                insert={props.insert}
                index={props.index}
                templates={props.templates}
              />
            </div>
          )
      }}
    />
  )
}

const BlockTemplates = [TitleForm, ImageForm, FormForm, ContentForm]

const BlockComponents = {
  TitleForm: TitleBlock,
  FormForm: FormBlock,
  ContentForm: ContentBlock,
  ImageBlock: ImageBlock,
}
