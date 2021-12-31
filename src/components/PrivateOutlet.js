import React, { useEffect, useReducer } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import StoreManager from '../services/StoreManager'
import Splash from '../containers/Splash'

const initialState = {
  loading: true,
  appSettings: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loaded':
      return { ...state, loading: false, ...action.payload }
    default:
      throw new Error('Error: Unknown action')
  }
}

const PrivateOutlet = ({redirectTo}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const db = new StoreManager('NOTE_DB')
  useEffect(() => initializeDb(), [])

  const initializeDb = async () => {
    try {
      await db.createOrFindDB()
      const appSettings = await db.getAppSettings()
      dispatch({
        type: 'loaded',
        payload: {
          appSettings,
        },
      })
    } catch (err) {
      if (err.name == 'not_found') {
        dispatch({
          type: 'loaded',
          payload: {
            appSettings: false,
          },
        })
      }
      dispatch({ type: 'db_init_failed' })
    }
  }
  return state.loading ? (
    <Splash />
  ) : state.appSettings ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} />
  )
}

export default PrivateOutlet
