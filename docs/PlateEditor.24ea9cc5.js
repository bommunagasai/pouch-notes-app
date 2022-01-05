function e(e,t,o,r){Object.defineProperty(e,t,{get:o,set:r,enumerable:!0,configurable:!0})}var t=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequirec250;t.register("iBzcT",(function(o,r){var n;n=o.exports,Object.defineProperty(n,"__esModule",{value:!0,configurable:!0}),e(o.exports,"default",(function(){return p}));var a=t("k8UWl"),s=t("fd2wl"),l=t("25DGs"),i=t("33Vro"),c=t("2Me3D"),E=t("l9TBI"),d=t("9qkK4"),m=t("1j7Qj"),u=t("b7TrX");var p=({value:e,onChange:t=(()=>{}),readOnly:o=!1,goBack:r=(()=>{}),onSave:n=(()=>{}),onUnlock:p=(()=>{}),id:T})=>{const[h,L]=s.useState(e),f=()=>{const e=l.usePlateEditorRef();return a.jsxs(d.Card,{padding:m.Spacing.none,className:"d-flex flex-wrap pna-editor-toolbar",children:[a.jsx(E.MarksToolbar,{}),a.jsx(l.BlockToolbarButton,{type:l.getPluginType(e,l.ELEMENT_BLOCKQUOTE),icon:a.jsx("i",{className:"ri-double-quotes-l"})}),a.jsx(E.IndentToolbar,{})]})},{undo:g=(()=>{}),redo:_=(()=>{})}=l.usePlateEditorRef()||{};return a.jsxs(a.Fragment,{children:[a.jsx(u.default,{onUndo:g,onRedo:_,readOnly:o,goBack:r,onUnlock:p,onSave:()=>n(h)}),!o&&a.jsx(a.Fragment,{children:a.jsx(f,{})}),a.jsx(l.Plate,{id:T,initialValue:e,plugins:l.createPlugins(i.plugins,{components:c.withStyledPlaceHolders(c.components)}),editableProps:{readOnly:o,autoFocus:!0},onChange:e=>{L(e),t(e)}}),a.jsx("pre",{children:a.jsx("code",{children:JSON.stringify(h,null,4)})})]})}})),t.register("33Vro",(function(o,r){e(o.exports,"plugins",(function(){return s}));var n=t("25DGs");t("5dqcD");const a={types:[n.ELEMENT_BLOCKQUOTE,n.ELEMENT_TODO_LI],defaultType:n.ELEMENT_PARAGRAPH},s=(n.createResetNodePlugin({options:{rules:[{...a,hotkey:"Enter",predicate:n.isBlockAboveEmpty},{...a,hotkey:"Backspace",predicate:n.isSelectionAtBlockStart}]}}),n.createExitBreakPlugin({options:{rules:[{hotkey:"mod+enter"},{hotkey:"mod+shift+enter",before:!0},{hotkey:"enter",query:{start:!0,end:!0,allow:[n.ELEMENT_LI]}}]}}),n.createTrailingBlockPlugin({type:n.ELEMENT_PARAGRAPH}),n.createSoftBreakPlugin({options:{rules:[{hotkey:"shift+enter"},{hotkey:"enter",query:{allow:[n.ELEMENT_CODE_BLOCK,n.ELEMENT_BLOCKQUOTE,n.ELEMENT_TD]}}]}}),[n.createLinkPlugin(),n.createParagraphPlugin(),n.createIndentPlugin({inject:{props:{validTypes:[n.ELEMENT_PARAGRAPH,n.ELEMENT_H1,n.ELEMENT_H2,n.ELEMENT_H3,n.ELEMENT_H4,n.ELEMENT_H5,n.ELEMENT_H6]}}}),n.createIndentListPlugin(),n.createBoldPlugin(),n.createItalicPlugin(),n.createUnderlinePlugin(),n.createStrikethroughPlugin(),n.createCodePlugin(),n.createBlockquotePlugin(),n.createHighlightPlugin()])})),t.register("5dqcD",(function(e,o){var r=t("7v0qA"),n=t("25DGs");const a=[{mode:"mark",type:[n.MARK_BOLD,n.MARK_ITALIC],match:"***"},{mode:"mark",type:[n.MARK_UNDERLINE,n.MARK_ITALIC],match:"__*"},{mode:"mark",type:[n.MARK_UNDERLINE,n.MARK_BOLD],match:"__**"},{mode:"mark",type:[n.MARK_UNDERLINE,n.MARK_BOLD,n.MARK_ITALIC],match:"___***"},{mode:"mark",type:n.MARK_BOLD,match:"**"},{mode:"mark",type:n.MARK_UNDERLINE,match:"__"},{mode:"mark",type:n.MARK_ITALIC,match:"*"},{mode:"mark",type:n.MARK_ITALIC,match:"_"},{mode:"mark",type:n.MARK_STRIKETHROUGH,match:"~~"},{mode:"mark",type:n.MARK_SUPERSCRIPT,match:"^"},{mode:"mark",type:n.MARK_SUBSCRIPT,match:"~"},{mode:"mark",type:n.MARK_HIGHLIGHT,match:"=="},{mode:"mark",type:n.MARK_HIGHLIGHT,match:"≡"},{mode:"mark",type:n.MARK_CODE,match:"`"}],s=e=>n.unwrapList(e),l=(e,t)=>{if(e.selection){const o=n.getParent(e,e.selection);if(!o)return;const[r]=o;!n.isElement(r)||n.isType(e,r,n.ELEMENT_CODE_BLOCK)||n.isType(e,r,n.ELEMENT_CODE_LINE)||t()}},i=(e,t)=>{l(e,(()=>n.toggleList(e,{type:t})))},c=[{mode:"block",type:n.ELEMENT_LI,match:["* ","- "],preFormat:s,format:e=>i(e,n.ELEMENT_UL)},{mode:"block",type:n.ELEMENT_LI,match:["1. ","1) "],preFormat:s,format:e=>i(e,n.ELEMENT_OL)},{mode:"block",type:n.ELEMENT_TODO_LI,match:"[] "},{mode:"block",type:n.ELEMENT_TODO_LI,match:"[x] ",format:e=>n.setNodes(e,{type:n.ELEMENT_TODO_LI,checked:!0},{match:t=>r.Editor.isBlock(e,t)})}];n.ELEMENT_H1,n.ELEMENT_H2,n.ELEMENT_H3,n.ELEMENT_H4,n.ELEMENT_H5,n.ELEMENT_H6,n.ELEMENT_BLOCKQUOTE,n.ELEMENT_HR,n.ELEMENT_CODE_BLOCK,n.autoformatSmartQuotes,n.autoformatPunctuation,n.autoformatLegal,n.autoformatLegalHtml,n.autoformatArrow,n.autoformatMath})),t.register("2Me3D",(function(o,r){e(o.exports,"withStyledPlaceHolders",(function(){return s})),e(o.exports,"components",(function(){return l}));var n=t("25DGs"),a=t("eJaxH");const s=e=>n.withPlaceholders(e,[{key:n.ELEMENT_PARAGRAPH,placeholder:"Untitled",hideOnBlur:!1},{key:n.ELEMENT_H1,placeholder:"Untitled",hideOnBlur:!1}]),l={[n.ELEMENT_BLOCKQUOTE]:n.withProps(n.BlockquoteElement,{styles:{root:a.css`
        border-left: 2px solid #7b61ff;
        color: #a1acb3;
      `}}),[n.ELEMENT_PARAGRAPH]:n.withProps(n.StyledElement,{as:"p",styles:{root:a.css`m-0 py-1 px-0`},prefixClassNames:"p"}),[n.ELEMENT_H1]:n.withProps(n.StyledElement,{as:"h1",styles:{root:a.css`
        margin: 2em 0 4px;
        font-size: 1.875em;
        font-weight: 500;
        line-height: 1.3;
      `}}),[n.ELEMENT_H2]:n.withProps(n.StyledElement,{as:"h2",styles:{root:a.css`
        margin: 1.4em 0 1px;
        font-size: 1.5em;
        font-weight: 500;
        line-height: 1.3;
      `}}),[n.ELEMENT_H3]:n.withProps(n.StyledElement,{as:"h3",styles:{root:a.css`
        margin: 1em 0 1px;
        font-size: 1.25em;
        font-weight: 500;
        line-height: 1.3;
        color: #434343;
      `}}),[n.ELEMENT_H4]:n.withProps(n.StyledElement,{as:"h4",styles:{root:a.css`
        margin: 0.75em 0 0;
        font-size: 1.1em;
        font-weight: 500;
        line-height: 1.3;
        color: #666666;
      `}}),[n.ELEMENT_H5]:n.withProps(n.StyledElement,{as:"h5",styles:{root:a.css`
        margin: 0.75em 0 0;
        font-size: 1.1em;
        font-weight: 500;
        line-height: 1.3;
        color: #666666;
      `}}),[n.ELEMENT_H6]:n.withProps(n.StyledElement,{as:"h6",styles:{root:a.css`
        margin: 0.75em 0 0;
        font-size: 1.1em;
        font-weight: 500;
        line-height: 1.3;
        color: #666666;
      `}}),[n.ELEMENT_LINK]:n.LinkElement,[n.MARK_BOLD]:n.withProps(n.StyledLeaf,{as:"strong"}),[n.MARK_CODE]:n.withProps(n.StyledLeaf,{as:"code",styles:{root:[a.css`
          font-size: 85%;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          background-color: #fff2f9;
          color: #ff647c;
          border-radius: 0.2em;
          padding: 0.2em 0.4em;
          margin: 0.2em;
          line-height: normal;
        `]}}),[n.MARK_HIGHLIGHT]:n.withProps(n.StyledLeaf,{as:"mark",styles:{root:a.css`
        background-color: #ffb800;
        color: #ffffff;
      `}}),[n.MARK_ITALIC]:n.withProps(n.StyledLeaf,{as:"em"}),[n.MARK_STRIKETHROUGH]:n.withProps(n.StyledLeaf,{as:"s"}),[n.MARK_UNDERLINE]:n.withProps(n.StyledLeaf,{as:"u"})}})),t.register("l9TBI",(function(o,r){e(o.exports,"MarksToolbar",(function(){return s})),e(o.exports,"IndentToolbar",(function(){return l}));var n=t("k8UWl"),a=t("25DGs");const s=()=>{const e=a.usePlateEditorRef();return n.jsxs(n.Fragment,{children:[n.jsx(a.MarkToolbarButton,{type:a.getPluginType(e,a.MARK_BOLD),icon:n.jsx("i",{className:"ri-bold"})}),n.jsx(a.MarkToolbarButton,{type:a.getPluginType(e,a.MARK_ITALIC),icon:n.jsx("i",{className:"ri-italic"})}),n.jsx(a.MarkToolbarButton,{type:a.getPluginType(e,a.MARK_UNDERLINE),icon:n.jsx("i",{className:"ri-underline"})}),n.jsx(a.MarkToolbarButton,{type:a.getPluginType(e,a.MARK_STRIKETHROUGH),icon:n.jsx("i",{className:"ri-strikethrough-2"})}),n.jsx(a.MarkToolbarButton,{type:a.getPluginType(e,a.MARK_HIGHLIGHT),icon:n.jsx("i",{className:"ri-edit-fill"})}),n.jsx(a.MarkToolbarButton,{type:a.getPluginType(e,a.MARK_CODE),icon:n.jsx("i",{className:"ri-code-view"})}),n.jsx(a.LinkToolbarButton,{icon:n.jsx("i",{className:"ri-link"})})]})},l=()=>{const e=a.usePlateEditorRef();return n.jsxs(n.Fragment,{children:[n.jsx(a.ToolbarButton,{onMouseDown:t=>{t.preventDefault(),a.indent(e)},icon:n.jsx("i",{className:"ri-indent-increase"})}),n.jsx(a.ToolbarButton,{onMouseDown:t=>{t.preventDefault(),a.outdentList(e)},icon:n.jsx("i",{className:"ri-indent-decrease"})})]})}})),t.register("b7TrX",(function(o,r){e(o.exports,"default",(function(){return s}));var n=t("k8UWl"),a=t("1j7Qj");t("fd2wl");var s=({goBack:e=(()=>{}),onSave:t=(()=>{}),readOnly:o=!1,onUnlock:r=(()=>{}),onUndo:s=(()=>{}),onRedo:l=(()=>{})})=>n.jsxs("div",{className:`d-flex justify-content-between align-items-center ${o&&"pna-editor-toolbar"} ${a.getClassName({paddingY:a.Spacing.xxs,backgroundColor:a.Color.white})}`,children:[n.jsx("span",{className:"slate-HeaderButton active",onClick:e,children:n.jsx("i",{className:"ri-arrow-left-s-line"})}),n.jsx("span",{children:o?n.jsx("span",{className:"slate-HeaderButton",onClick:r,children:n.jsx("i",{className:"ri-lock-2-line"})}):n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"slate-HeaderButton",onClick:s,children:n.jsx("i",{className:"ri-arrow-go-back-line"})}),n.jsx("span",{className:"slate-HeaderButton",onClick:l,children:n.jsx("i",{className:"ri-arrow-go-forward-line"})}),n.jsx("span",{className:"slate-HeaderButton",onClick:t,children:n.jsx("i",{className:"ri-save-line"})})]})})]})}));
//# sourceMappingURL=PlateEditor.24ea9cc5.js.map
