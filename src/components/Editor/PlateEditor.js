import React, { useState } from 'react'
import {
  Plate,
  createPlugins,
  usePlateEditorRef,
  getPluginType,
  BlockToolbarButton,
  ELEMENT_BLOCKQUOTE,
  BalloonToolbar,
} from '@udecode/plate'

import { plugins } from './plugins'
import { components, withStyledPlaceHolders } from './components'

import {
  MarksToolbar,
  HeadingsToolbar,
  IndentToolbar,
  ListToolbar,
} from './toolbars'
import { Card } from '@ds.crisp/react-components'
import { Spacing } from '@ds.crisp/foundation'
import EditorHeader from './EditorHeader'
const PlateEditor = ({
  value,
  onChange = () => {},
  readOnly = false,
  goBack = () => {},
  onSave = () => {},
  isMobile = false,
  onUnlock = () => {},
  id,
}) => {
  const [content, setContent] = useState(value)

  const StaticToolbar = () => {
    const editor = usePlateEditorRef()
    return (
      <Card
        padding={Spacing.none}
        className="d-flex flex-wrap pna-editor-toolbar"
      >
        <MarksToolbar />
        <HeadingsToolbar />
        <BlockToolbarButton
          type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
          icon={<i className="ri-double-quotes-l" />}
        />
        <ListToolbar />
        <IndentToolbar />
      </Card>
    )
  }
  const { undo = () => {}, redo = () => {} } = usePlateEditorRef() || {}
  return (
    <>
      <EditorHeader
        onUndo={undo}
        onRedo={redo}
        readOnly={readOnly}
        goBack={goBack}
        onUnlock={onUnlock}
        onSave={() => onSave(content)}
      />
      {!readOnly && (
        <>
          <BalloonToolbar
            popperOptions={{
              placement: 'top',
            }}
            theme={'light'}
            arrow={false}
          >
            <MarksToolbar />
          </BalloonToolbar>
          <StaticToolbar />
        </>
      )}
      <Plate
        id={id}
        initialValue={value}
        plugins={createPlugins(plugins, {
          components: withStyledPlaceHolders(components),
        })}
        editableProps={{ readOnly, autoFocus: true }}
        onChange={(c) => {
          setContent(c)
          onChange(c)
        }}
      />
    </>
  )
}

export default PlateEditor
