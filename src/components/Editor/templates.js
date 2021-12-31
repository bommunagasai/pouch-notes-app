import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  MARK_BOLD,
  MARK_CODE,
  MARK_HIGHLIGHT,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate'
const createElement = (text, { type = ELEMENT_PARAGRAPH, mark } = {}) => {
  const leaf = { text }
  if (mark) {
    leaf[mark] = true
  }

  return {
    type,
    children: [leaf],
  }
}

export const TEMPLATES = {
  default: [
    createElement('', { type: ELEMENT_H1 }),
    createElement('', { type: ELEMENT_PARAGRAPH }),
  ],
}
