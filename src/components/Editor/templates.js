import {
  ELEMENT_H1,
  ELEMENT_PARAGRAPH,
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
    createElement('', { type: ELEMENT_PARAGRAPH }),
  ],
}
