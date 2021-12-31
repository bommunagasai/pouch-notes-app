import {
  MarkToolbarButton,
  getPluginType,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_CODE,
  usePlateEditorRef,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  BlockToolbarButton,
  ToolbarButton,
  toggleIndentList,
  indent,
  outdentList,
  MARK_HIGHLIGHT,
  LinkToolbarButton,
} from '@udecode/plate'

export const MarksToolbar = () => {
  const editor = usePlateEditorRef()
  return (
    <>
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<i className="ri-bold" />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<i className="ri-italic" />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<i className="ri-underline" />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_STRIKETHROUGH)}
        icon={<i className="ri-strikethrough-2" />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_HIGHLIGHT)}
        icon={<i className="ri-edit-fill" />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_CODE)}
        icon={<i className="ri-code-view" />}
      />
      <LinkToolbarButton icon={<i className='ri-link'/>}/>
    </>
  )
}

export const HeadingsToolbar = () => {
  const editor = usePlateEditorRef()
  return (
    <>
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H1)}
        icon={<i className="ri-h-1" />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H2)}
        icon={<i className="ri-h-2" />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H3)}
        icon={<i className="ri-h-3" />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H4)}
        icon={<i className="ri-h-4" />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H5)}
        icon={<i className="ri-h-5" />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H6)}
        icon={<i className="ri-h-6" />}
      />
    </>
  )
}

export const ListToolbar = () => {
  const editor = usePlateEditorRef()
  return (
    <>
      <ToolbarButton
        onMouseDown={(e) => {
          e.preventDefault()
          toggleIndentList(editor, {
            listStyleType: 'disc',
          })
        }}
        icon={<i className="ri-list-unordered" />}
      />
      <ToolbarButton
        onMouseDown={(e) => {
          e.preventDefault()
          toggleIndentList(editor, {
            listStyleType: 'decimal',
          })
        }}
        icon={<i className="ri-list-ordered" />}
      />
    </>
  )
}

export const IndentToolbar = () => {
  const editor = usePlateEditorRef()
  return (
    <>
      <ToolbarButton
        onMouseDown={(e) => {
          e.preventDefault()
          indent(editor)
        }}
        icon={<i className="ri-indent-increase" />}
      />
      <ToolbarButton
        onMouseDown={(e) => {
          e.preventDefault()
          outdentList(editor)
        }}
        icon={<i className="ri-indent-decrease" />}
      />
    </>
  )
}
