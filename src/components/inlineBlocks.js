import React from "react"
import { InlineBlocks, AddBlockMenu } from 'react-tinacms-blocks'

import { Title, TitleBlock } from "../blocks/title"
import EditToggle from '../components/editToggle'


const Blocks = ({form, blocks, page, isEditing, setIsEditing }) => {
  const BLOCK_COMPONENTS =  {
    TitleBlock: Title
  }
  return (
    <>
      <InlineBlocks
        form={form}
        name="rawJson.blocks"
        data={blocks}
        templates={ [TitleBlock] }
        components={BLOCK_COMPONENTS}
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
      <EditToggle isEditing={isEditing} setIsEditing={setIsEditing} />
    </>
  )
}

export default Blocks

