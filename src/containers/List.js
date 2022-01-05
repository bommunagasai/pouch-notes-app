import React, { useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { withSizes } from 'react-sizes'

import {
  Card,
  Col,
  Container,
  Icon,
  Image,
  Row,
  Text,
} from '@ds.crisp/react-components'

import NotesList from '../components/NotesList'
import StoreManager from '../services/StoreManager'

import PlateEditor from '../components/Editor'

/* usage in Component */

import {
  Color,
  FontSize,
  FontWeight,
  getClassName,
  Spacing,
} from '@ds.crisp/foundation'
import Header from '../components/Header'

import EMPTY_STREET from '../assets/images/empty-street.svg'
import Splash from './Splash'

const initialState = {
  loading: true,
  notesList: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loaded':
      return { ...state, loading: false, notesList: action.payload }
    case 'update_note':
      return {
        ...state,
        notesList: action.payload,
        dialog: { ...initialState.dialog },
      }
    default:
      throw new Error('Error: Unknown action')
  }
}

const AddNotesBtn = ({ onClick, className = '', isMobile }) => {
  return (
    <span onMouseEnter={() => PlateEditor.preload()}>
      <Card
        className={`pna-cursor-pointer pna-font-size-zero d-flex ${className}`}
        backgroundColor={Color['dark']}
        borderRadius={Spacing.xs}
        padding={Spacing.xs}
        onClick={onClick}
      >
        <Icon name="plus" color={Color.white} />
        {!isMobile ? (
          <Text
            fontColor={Color.white}
            className="d-inline-block mx-2"
            fontWeight={FontWeight.bold}
          >
            New Note
          </Text>
        ) : null}
      </Card>
    </span>
  )
}

const List = ({ isMobile, isTab, className }) => {
  const db = new StoreManager('NOTE_DB')
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()

  useEffect(() => {
    getAllNotes()
  }, [])

  const getAllNotes = async () => {
    try {
      await db.createOrFindDB()
      const { docs } = (await db.getAllNotes()) || { docs: [] }
      dispatch({ type: 'loaded', payload: docs?.reverse?.() || [] })
    } catch (err) {
      console.log(err)
    }
  }

  const togglePin = async ({ _id, _rev, pinned }) => {
    try {
      const updatedNote = await db.updateNote({ _id, _rev, pinned: !pinned })
      const updatedList = state.notesList.map((note) => {
        if (note._id == updatedNote.id) {
          note._rev = updatedNote.rev
          note.pinned = !note.pinned
        }
        return note
      })
      dispatch({ type: 'update_note', payload: updatedList })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteNotes = async ({ _id, _rev }) => {
    try {
      const deletedNote = await db.deleteNote({
        _id,
        _rev,
      })
      const updatedList = state.notesList.filter(
        (note) => note._id != deletedNote.id
      )
      dispatch({ type: 'update_note', payload: updatedList })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {state.loading ? (
        <Splash />
      ) : (
        <Container md>
          <Header
            navNode={
              !isMobile ? (
                <AddNotesBtn
                  onClick={() => navigate('/create')}
                  isMobile={isMobile}
                />
              ) : null
            }
          />
          <Row
            className={`pna-position-relative ${getClassName({
              marginT: Spacing.xxs,
            })}`}
            noGutters
          >
            {state.notesList?.length ? (
              <NotesList
                className={className}
                colSize={isMobile ? 6 : isTab ? 4 : 3}
                list={state.notesList.map((note) => ({
                  _id: note._id,
                  _rev: note._rev,
                  metaTitle: note?.metaTitle,
                  metaDescription: note?.metaDescription,
                  theme: note?.theme,
                  type: note?.type,
                  pinned: note?.pinned,
                  deleteNotes: () =>
                    deleteNotes({ _id: note._id, _rev: note._rev }),
                  togglePin: () =>
                    togglePin({
                      _id: note._id,
                      _rev: note?._rev,
                      pinned: note?.pinned,
                    }),
                  viewNotes: () => navigate(`/view/${note._id}`),
                }))}
              />
            ) : (
              <Col
                md={6}
                className={`pna-empty-state-container pna-text-center`}
              >
                <Image src={EMPTY_STREET} width="100%" height="inherit" alt='Notes list FTU'/>
                <Text
                  fontSize={FontSize.xl}
                  fontWeight={FontWeight.bold}
                  fontColor={Color.blue}
                  className={getClassName({
                    paddingY: Spacing.sm,
                  })}
                >
                  Your notes seems to be empty!
                </Text>
                <Text
                  fontSize={FontSize.sm}
                  fontWeight={FontWeight.light}
                  fontColor={Color.gray}
                >
                  Tap the '+' button below to create a new notes.
                </Text>
              </Col>
            )}
            {isMobile && (
              <AddNotesBtn
                className="pna-new-create-btn"
                onClick={() => navigate('/create')}
                isMobile={isMobile}
              />
            )}
          </Row>
        </Container>
      )}
    </>
  )
}

export default withSizes(({ width }) => ({
  isMobile: width <= 576,
  isTab: width < 768 && width > 576,
}))(List)
