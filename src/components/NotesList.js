import React from 'react'
import { Col } from '@ds.crisp/react-components'
import NoteItem from './NoteItem'

const NotesList = ({ colSize, list = [] }) => {
  return (
    <>
      {list.map((note) => (
        <Col size={colSize}>
          <NoteItem
            theme={note?.theme}
            type={note?.type}
            title={note?.metaTitle}
            subTitle={note?.metaDescription}
            pinned={note?.pinned}
            togglePin={note?.togglePin}
            deleteNotes={note?.deleteNotes}
            viewNotes={note?.viewNotes}
          />
        </Col>
      ))}
    </>
  )
}

export default NotesList
