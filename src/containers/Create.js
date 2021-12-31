import React, { useReducer, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { withSizes } from 'react-sizes'
import {
  Container,
  Row,
  Col,
  SheetContainer,
  SpinLoader,
} from '@ds.crisp/react-components'
import { v1 as uuid } from 'uuid'

import { Color as ColorMap, getClassName } from '@ds.crisp/foundation'
import StoreManager from '../services/StoreManager'

import '@ds.crisp/scss/lib/Sheet.css'
import CreateNoteForm from '../components/CreateNoteForm'

import PlateEditor from '../components/Editor'
import { TEMPLATES } from '../components/Editor/templates'

const initialState = {
  saving: false,
  content: [],
  theme: 'dark',
  type: 'bulb',
  metaTitle: '',
  metaDescription: '',
  dialog: {
    show: false,
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'save_to_db_init':
      return {
        ...state,
        saving: true,
        content: action.payload,
        dialog: { ...state.dialog, show: true },
      }
    case 'close_create_form':
      return {
        ...state,
        dialog: { ...state.dialog, show: false },
      }
    default:
      return new Error('Unknown action')
  }
}

const Create = ({ isMobile }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const db = new StoreManager('NOTE_DB')
  const navigate = useNavigate()

  const openCreateForm = async (content) => {
    dispatch({ type: 'save_to_db_init', payload: content })
  }

  const saveToDb = async (formData) => {
    const { metaTitle, metaDescription, theme, type } = formData
    dispatch({ type: 'close_create_form' })
    try {
      await db.createNotes({
        content: state.content,
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
    <Container md className={getClassName({ fontColor: ColorMap.dark })}>
      <Row>
        <Col>
          <Suspense fallback={<SpinLoader />}>
            <PlateEditor
              id={uuid()}
              isMobile={isMobile}
              onSave={openCreateForm}
              goBack={() => navigate('/')}
              value={TEMPLATES.default}
            />
          </Suspense>
        </Col>
      </Row>
      <SheetContainer show={state.dialog.show} bottom>
        <CreateNoteForm
          title="Create Notes"
          hint="Would be usefull for search"
          formData={{ theme: state.theme, type: state.type }}
          onCancel={() => dispatch({ type: 'close_create_form' })}
          onSubmit={(formData) => saveToDb(formData)}
        />
      </SheetContainer>
    </Container>
  )
}

export default withSizes(({ width }) => ({ isMobile: width <= 576 }))(Create)
