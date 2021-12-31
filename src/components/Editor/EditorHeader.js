import { Color, getClassName, Spacing } from '@ds.crisp/foundation'
import React from 'react'

const EditorHeader = ({
  goBack = () => {},
  onSave = () => {},
  readOnly = false,
  onUnlock = () => {},
  onUndo = () => {},
  onRedo = () => {},
}) => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center ${readOnly && 'pna-editor-toolbar'} ${getClassName({
        paddingY: Spacing.xxs,
        backgroundColor: Color.white,
      })}`}
    >
      <span className="slate-HeaderButton active" onClick={goBack}>
        <i className="ri-arrow-left-s-line" />
      </span>
      <span>
        {!readOnly ? (
          <>
            <span className="slate-HeaderButton" onClick={onUndo}>
              <i className="ri-arrow-go-back-line" />
            </span>
            <span className="slate-HeaderButton" onClick={onRedo}>
              <i className="ri-arrow-go-forward-line" />
            </span>
            <span className="slate-HeaderButton" onClick={onSave}>
              <i className="ri-save-line" />
            </span>
          </>
        ) : (
          <span className="slate-HeaderButton" onClick={onUnlock}>
            <i className="ri-lock-2-line" />
          </span>
        )}
      </span>
    </div>
  )
}

export default EditorHeader
