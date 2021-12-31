import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  ELEMENT_LINK,
  ELEMENT_BLOCKQUOTE,
  MARK_CODE,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_HIGHLIGHT,
  MARK_UNDERLINE,
  StyledElement,
  StyledLeaf,
  LinkElement,
  BlockquoteElement,
  withProps,
  withPlaceholders,
} from '@udecode/plate'

import { css } from 'styled-components'

export const withStyledPlaceHolders = (components) =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type a paragraph',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H1,
      placeholder: 'Untitled',
      hideOnBlur: false,
    },
  ])

export const components = {
  [ELEMENT_BLOCKQUOTE]: withProps(BlockquoteElement, {
    styles: {
      root: css`
        border-left: 2px solid #7b61ff;
        color: #a1acb3;
      `,
    },
  }),
  [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
    as: 'p',
    styles: {
      root: css`m-0 py-1 px-0`,
    },
    prefixClassNames: 'p',
  }),
  [ELEMENT_H1]: withProps(StyledElement, {
    as: 'h1',
    styles: {
      root: css`
        margin: 2em 0 4px;
        font-size: 1.875em;
        font-weight: 500;
        line-height: 1.3;
      `,
    },
  }),
  [ELEMENT_H2]: withProps(StyledElement, {
    as: 'h2',
    styles: {
      root: css`
        margin: 1.4em 0 1px;
        font-size: 1.5em;
        font-weight: 500;
        line-height: 1.3;
      `,
    },
  }),
  [ELEMENT_H3]: withProps(StyledElement, {
    as: 'h3',
    styles: {
      root: css`
        margin: 1em 0 1px;
        font-size: 1.25em;
        font-weight: 500;
        line-height: 1.3;
        color: #434343;
      `,
    },
  }),
  [ELEMENT_H4]: withProps(StyledElement, {
    as: 'h4',
    styles: {
      root: css`
        margin: 0.75em 0 0;
        font-size: 1.1em;
        font-weight: 500;
        line-height: 1.3;
        color: #666666;
      `,
    },
  }),
  [ELEMENT_H5]: withProps(StyledElement, {
    as: 'h5',
    styles: {
      root: css`
        margin: 0.75em 0 0;
        font-size: 1.1em;
        font-weight: 500;
        line-height: 1.3;
        color: #666666;
      `,
    },
  }),
  [ELEMENT_H6]: withProps(StyledElement, {
    as: 'h6',
    styles: {
      root: css`
        margin: 0.75em 0 0;
        font-size: 1.1em;
        font-weight: 500;
        line-height: 1.3;
        color: #666666;
      `,
    },
  }),
  [ELEMENT_LINK]: LinkElement,
  [MARK_BOLD]: withProps(StyledLeaf, { as: 'strong' }),
  [MARK_CODE]: withProps(StyledLeaf, {
    as: 'code',
    styles: {
      root: [
        css`
          font-size: 85%;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          background-color: #fff2f9;
          color: #ff647c;
          border-radius: 0.2em;
          padding: 0.2em 0.4em;
          margin: 0.2em;
          line-height: normal;
        `,
      ],
    },
  }),

  [MARK_HIGHLIGHT]: withProps(StyledLeaf, {
    as: 'mark',
    styles: {
      root: css`
        background-color: #ffb800;
        color: #ffffff;
      `,
    },
  }),
  [MARK_ITALIC]: withProps(StyledLeaf, { as: 'em' }),

  [MARK_STRIKETHROUGH]: withProps(StyledLeaf, { as: 's' }),

  [MARK_UNDERLINE]: withProps(StyledLeaf, { as: 'u' }),
}
