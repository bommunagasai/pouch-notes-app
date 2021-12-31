import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'

import {
  Color,
  Card as Toolbar,
  Card,
  Tag,
  Icon,
} from '@ds.crisp/react-components'
import {
  Color as ColorMap,
  FontSize,
  getClassName,
  Size,
  Spacing,
} from '@ds.crisp/foundation'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const COLOR_MARKS = ['color-blue', 'color-red', 'color-green', 'color-yellow']

const TextEditor = ({
  content = [
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    },
  ],
  onChange = () => {},
  readOnly = false,
  goBack = () => {},
  onSave = () => {},
  isMobile = false,
  onUnlock = () => {},
}) => {
  const [value, setValue] = useState(content)
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value)
        onChange(value)
      }}
    >
      <Toolbar
        padding={Spacing.none}
        backgroundColor={ColorMap.white}
        className={`${readOnly ? '' : 'pna-editor-toolbar'} pt-2`}
      >
        <Header
          goBack={goBack}
          onSave={() => onSave(value)}
          onUnlock={onUnlock}
          readOnly={readOnly}
        />
        {!readOnly && (
          <>
            <MarkButton format="bold" icon="ri-bold" isMobile={isMobile} />
            <MarkButton format="italic" icon="ri-italic" isMobile={isMobile} />
            <MarkButton
              format="underline"
              icon="ri-underline"
              isMobile={isMobile}
            />
            <MarkButton format="code" icon="ri-code-view" isMobile={isMobile} />
            <MarkButton format="tag" icon="ri-hashtag" isMobile={isMobile} />
            <ColorButton format="color-blue" icon="blue" isMobile={isMobile} />
            <ColorButton format="color-red" icon="red" isMobile={isMobile} />
            <ColorButton
              format="color-green"
              icon="green"
              isMobile={isMobile}
            />
            <ColorButton
              format="color-yellow"
              icon="yellow"
              isMobile={isMobile}
            />
            <BlockButton
              format="heading-one"
              icon="ri-h-1"
              isMobile={isMobile}
            />
            <BlockButton
              format="heading-two"
              icon="ri-h-2"
              isMobile={isMobile}
            />
            <BlockButton
              format="block-quote"
              icon="ri-double-quotes-l"
              isMobile={isMobile}
            />
            <BlockButton
              format="numbered-list"
              icon="ri-list-ordered"
              isMobile={isMobile}
            />
            <BlockButton
              format="bulleted-list"
              icon="ri-list-unordered"
              isMobile={isMobile}
            />
          </>
        )}
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Drop some nice ideas"
        spellCheck
        autoFocus
        readOnly={readOnly}
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  const isColorMark = COLOR_MARKS.includes(format)
  isColorMark && COLOR_MARKS.forEach((c) => Editor.removeMark(editor, c))
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  )

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.tag) {
    children = (
      <mark
        className={getClassName({
          paddingX: Spacing.xxs,
          paddingY: Spacing.xxxs,
          backgroundColor: ColorMap['light-red'],
          fontColor: ColorMap.red,
          marginY: Spacing.xxs,
        })}
      >
        {children}
      </mark>
    )
  }

  if (leaf['color-blue']) {
    children = (
      <span className={getClassName({ fontColor: ColorMap['blue'] })}>
        {children}
      </span>
    )
  }

  if (leaf['color-red']) {
    children = (
      <span className={getClassName({ fontColor: ColorMap['red'] })}>
        {children}
      </span>
    )
  }

  if (leaf['color-green']) {
    children = (
      <span className={getClassName({ fontColor: ColorMap['green'] })}>
        {children}
      </span>
    )
  }

  if (leaf['color-yellow']) {
    children = (
      <span className={getClassName({ fontColor: ColorMap['yellow'] })}>
        {children}
      </span>
    )
  }

  return <span {...attributes}>{children}</span>
}

const Header = ({
  goBack = () => {},
  onSave = () => {},
  readOnly = false,
  onUnlock = () => {},
}) => {
  const editor = useSlate()
  return (
    <Card className="d-flex justify-content-between" padding={Spacing.none}>
      <IconBox onMouseDown={goBack}>
        <Icon name="arrow-ios-back" />
      </IconBox>
      <Card padding={Spacing.none}>
        {readOnly ? (
          <IconBox isActive={false} onMouseDown={onUnlock}>
            <Icon name="lock" />
          </IconBox>
        ) : (
          <>
            <IconBox isActive={false} onMouseDown={() => editor.undo()}>
              <Icon name="corner-up-left" />
            </IconBox>
            <IconBox isActive={false} onMouseDown={() => editor.redo()}>
              <Icon name="corner-up-right" />
            </IconBox>
            <IconBox isActive={false} onMouseDown={onSave}>
              <Icon name="checkmark-circle" />
            </IconBox>
          </>
        )}
      </Card>
    </Card>
  )
}

const IconBox = ({
  isActive = true,
  onMouseDown = () => {},
  children,
  isMobile = false,
}) => {
  return (
    <span
      onMouseDown={(event) => {
        event.preventDefault()
        onMouseDown()
      }}
      className="pna-cursor-pointer"
    >
      <Card
        backgroundColor={isActive ? ColorMap['light-blue'] : ColorMap.white}
        className={`d-inline-block pna-font-size-zero ${getClassName({
          margin: Spacing.xxxs,
        })}`}
        borderRadius={isMobile ? Spacing.xxxs : Spacing.xxs}
        padding={isMobile ? Spacing.xxs : Spacing.xs}
      >
        {children}
      </Card>
    </span>
  )
}

const BlockButton = ({ format, icon, isMobile }) => {
  const editor = useSlate()
  return (
    <IconBox
      onMouseDown={() => toggleBlock(editor, format)}
      format={format}
      isActive={isBlockActive(editor, format)}
      isMobile={isMobile}
    >
      <i
        className={`${icon} ${getClassName({
          fontColor: isBlockActive(editor, format)
            ? ColorMap.blue
            : ColorMap.dark,
          fontSize: FontSize.lg,
        })}`}
      />
    </IconBox>
  )
}

const MarkButton = ({ format, icon, isMobile }) => {
  const editor = useSlate()
  return (
    <IconBox
      onMouseDown={() => toggleMark(editor, format)}
      format={format}
      isActive={isMarkActive(editor, format)}
      isMobile={isMobile}
    >
      <i
        className={`${icon} ${getClassName({
          fontColor: isMarkActive(editor, format)
            ? ColorMap.blue
            : ColorMap.dark,
          fontSize: FontSize.lg,
        })}`}
      />
    </IconBox>
  )
}

const ColorButton = ({ format, icon, isMobile }) => {
  const editor = useSlate()
  return (
    <IconBox
      onMouseDown={() => toggleMark(editor, format)}
      format={format}
      isActive={isMarkActive(editor, format)}
      isMobile={isMobile}
    >
      <Color
        color={icon}
        width={Spacing.sm}
        height={Spacing.sm}
        className={getClassName({ borderRadius: Spacing.xxxs })}
      />
    </IconBox>
  )
}

export default TextEditor
