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
  IndentToolbar,
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
        <BlockToolbarButton
          type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
          icon={<i className="ri-double-quotes-l" />}
        />
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
          {/* <BalloonToolbar
            popperOptions={{
              placement: 'top',
            }}
            theme={'light'}
            arrow={false}
          >
            <MarksToolbar />
          </BalloonToolbar> */}
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
      <pre>
        <code>
          {JSON.stringify(content, null, 4)}
        </code>
      </pre>
    </>
  )
}

export default PlateEditor
