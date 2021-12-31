import {
  createParagraphPlugin,
  createHeadingPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createIndentPlugin,
  createIndentListPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createBlockquotePlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  createHighlightPlugin,
  createSoftBreakPlugin,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_TD,
  createExitBreakPlugin,
  createTrailingBlockPlugin,
  ELEMENT_LI,
  ELEMENT_TODO_LI,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  createResetNodePlugin, 
  createLinkPlugin,
} from '@udecode/plate'

import { autoformatRules } from './autoformatRules'
const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
};

export const webSpecificPlugins = [

  createResetNodePlugin({
    options: {
      rules: [
        {
          ...resetBlockTypesCommonRule,
          hotkey: 'Enter',
          predicate: isBlockAboveEmpty,
        },
        {
          ...resetBlockTypesCommonRule,
          hotkey: 'Backspace',
          predicate: isSelectionAtBlockStart,
        },
      ],
    },
  },),
  createSoftBreakPlugin({
    options: {
      rules: [
        { hotkey: 'shift+enter' },
        {
          hotkey: 'enter',
          query: {
            allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
          },
        },
      ],
    }
  }),
  createTrailingBlockPlugin({ type: ELEMENT_PARAGRAPH }),
  createExitBreakPlugin({
    options: {
      rules: [
        {
          hotkey: 'mod+enter',
        },
        {
          hotkey: 'mod+shift+enter',
          before: true,
        },
        {
          hotkey: 'enter',
          query: {
            start: true,
            end: true,
            allow: [ELEMENT_LI],
          },
        },
      ],
    },
  }),
]

export const plugins = [
  createLinkPlugin(),
  createParagraphPlugin(),
  createHeadingPlugin(),
  createCodeBlockPlugin(),
  createIndentPlugin({
    inject: {
      props: {
        validTypes: [
          ELEMENT_PARAGRAPH,
          ELEMENT_H1,
          ELEMENT_H2,
          ELEMENT_H3,
          ELEMENT_H4,
          ELEMENT_H5,
          ELEMENT_H6,
        ],
      },
    },
  }),
  createIndentListPlugin(),
  createBoldPlugin(),
  createItalicPlugin(),
  createUnderlinePlugin(),
  createStrikethroughPlugin(),
  createCodePlugin(),
  createBlockquotePlugin(),
  createHighlightPlugin(),
  createAutoformatPlugin({
    options: {
      rules: autoformatRules,
    },
  }),
]
