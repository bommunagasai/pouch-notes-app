import React, { useReducer, useEffect, Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { withSizes } from 'react-sizes'
import { v1 as uuid } from 'uuid';

import StoreManager from '../services/StoreManager'

import { Container, Row, Col, SheetContainer, SpinLoader } from '@ds.crisp/react-components'
import PlateEditor from '../components/Editor'

import Splash from './Splash'
import CreateNoteForm from '../components/CreateNoteForm'

const initialState = {
  loading: true,
  _id: null,
  doc: [],
  readOnly: true,
  dialog: { show: false },
  updateContent: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loaded':
      const { doc, _id } = action.payload
      return {
        ...state,
        loading: false,
        doc,
        _id,
      }
    case 'unlock_editor':
      return { ...state, readOnly: false }
    case 'save_to_db_init':
      return {
        ...state,
        updateContent: action.payload,
        dialog: { ...state.dialog, show: true },
      }
    case 'close_create_form':
      return {
        ...state,
        dialog: { ...state.dialog, show: false },
      }
    default:
      return new Error('Unkown action type')
  }
}

const Update = ({
  isMobile
}) => {
  const { noteId } = useParams()
  const db = new StoreManager('NOTE_DB')
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()
  useEffect(() => {
    getNote(noteId)
  }, [])

  const getNote = async (noteId) => {
    try {
      await db.createOrFindDB()
      const noteDetails = await db.getNote(noteId)

      dispatch({
        type: 'loaded',
        payload: {
          _id: noteId,
          doc: noteDetails?.docs,
        },
      })
    } catch (err) {
      console.log(err)
      dispatch({ type: 'db_init_failed' })
    }
  }

  const openUpdateForm = async (content) => {
    dispatch({ type: 'save_to_db_init', payload: content })
  }

  const saveToDb = async (formData) => {
    const { metaTitle, metaDescription, theme, type } = formData
    dispatch({ type: 'close_create_form' })
    try {
      await db.updateNote({
        _id: state._id,
        _rev: state?.doc?.[0]?._rev,
        content: state.updateContent,
        metaTitle,
        metaDescription,
        theme,
        type,
      })
      navigate('/')
    } catch (err) {
      console.log(err)
      dispatch({ type: 'save_to_db_failed' })
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          {state.loading ? (
            <Splash />
          ) : state.doc?.length ? (
            <>
              <Suspense fallback={<SpinLoader/>}>
                <PlateEditor
                  id={uuid()}
                  isMobile={isMobile}
                  readOnly={state.readOnly}
                  value={state?.doc?.[0]?.content}
                  onUnlock={() => dispatch({ type: 'unlock_editor' })}
                  onSave={openUpdateForm}
                  goBack={() => navigate('/')}
                />
              </Suspense>
              <SheetContainer show={state.dialog.show} bottom>
                {state.dialog.show && (
                  <CreateNoteForm
                    title="Update Notes"
                    hint="Would be usefull for search"
                    formData={{
                      metaTitle: state?.doc?.[0]?.metaTitle,
                      metaDescription: state?.doc?.[0]?.metaDescription,
                      theme: state?.doc?.[0]?.theme,
                      type: state?.doc?.[0]?.type,
                    }}
                    onCancel={() => dispatch({ type: 'close_create_form' })}
                    onSubmit={(formData) => saveToDb(formData)}
                  />
                )}
              </SheetContainer>
            </>
          ) : (
            <p>Not Foun</p>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default withSizes(({ width }) => ({ isMobile: width <= 576 }))(Update)
