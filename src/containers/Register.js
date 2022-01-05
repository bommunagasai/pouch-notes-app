import React, { useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Color as ColorMap,
  FontSize,
  FontWeight,
  getClassName,
  Size,
  Spacing,
} from '@ds.crisp/foundation'
import {
  Card,
  Container,
  Row,
  Col,
  Text,
  Button,
  Color,
  SpinLoader,
  Image,
} from '@ds.crisp/react-components'

import Input from '../components/Input'
import Header from '../components/Header'
import FTU from './FTU'
import Splash from './Splash'

import StoreManager from '../services/StoreManager'

import FTU_SVG from '../assets/images/ftu-main-2.svg'
import { TEXT_HYPHEN_UNDERSCORE_SPACE } from '../constants/regex'

const THEMES = ['dark', 'blue', 'green', 'red', 'yellow', 'violet']
const initialState = {
  loading: true,
  appSettings: false,
  showFTU: true,
  errors: {},
  disableSubmitBtn: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loaded':
      return { ...state, loading: false, ...action.payload }
    case 'hide_ftu':
      return { ...state, showFTU: false }
    case 'update_settings':
      return {
        ...state,
        appSettings: state.appSettings
          ? { ...state.appSettings, ...action.payload }
          : action.payload,
      }
    case 'update_settings_in_db_init':
      return { ...state, disableSubmitBtn: true }
    case 'update_settings_in_db_failed':
      return { ...state, disableSubmitBtn: false }
    case 'validation_error':
      return { ...state, errors: action.payload, disableSubmitBtn: false }
    case 'reset_errors':
      return { ...state, errors: initialState.errors }
    default:
      throw new Error('Error: Unknown action')
  }
}

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [username, setUsername] = useState(null)
  const db = new StoreManager('NOTE_DB')
  const navigate = useNavigate()

  useEffect(() => getSettings(), [])

  const getSettings = async () => {
    try {
      await db.createOrFindDB()
      const appSettings = await db.getAppSettings()
      dispatch({
        type: 'loaded',
        payload: {
          appSettings,
          showFTU: false,
        },
      })
    } catch (err) {
      if (err.name == 'not_found') {
        dispatch({
          type: 'loaded',
          payload: {
            appSettings: false,
            showFTU: true,
          },
        })
      } else {
        dispatch({ type: 'db_init_failed' })
      }
    }
  }

  const validateUsername = (username) => {
    if (!username) return 'This field can not be empty.'

    if (!TEXT_HYPHEN_UNDERSCORE_SPACE.test(username.trim()))
      return 'Only - and _ are allowed'

    if (username.trim().length > 24) return 'Max length 24'
  }

  const onSubmit = async () => {
    dispatch({ type: 'update_settings_in_db_init' })
    const errMsg = validateUsername(username || state.appSettings?.username)
    if (!errMsg) {
      try {
        await db.updateAppSettings({
          username: username || state.appSettings.username,
          theme: state.appSettings?.theme,
          _rev: state.appSettings?._rev,
        })
        navigate('/')
      } catch (err) {
        console.log(err)
        dispatch({ type: 'update_settings_in_db_failed' })
      }
    } else {
      dispatch({
        type: 'validation_error',
        payload: { username: errMsg },
      })
    }
  }
  return state.loading ? (
    <Splash />
  ) : state.showFTU ? (
    <FTU tryNow={() => dispatch({ type: 'hide_ftu' })} />
  ) : (
    <Container>
      <Header />
      <Row>
        <Col md={6} className={getClassName({ padding: Spacing.md })}>
          <Image src={FTU_SVG} width="100%" height="320px" alt="Explore" />
        </Col>
        <Col md={4} className={getClassName({ paddingT: Spacing.md })}>
          <Card
            padding={Spacing.md}
            borderRadius={Spacing.sm}
            backgroundColor={ColorMap['light-blue']}
          >
            <Text
              fontSize={FontSize.sm}
              fontWeight={FontWeight.light}
              className={getClassName({ marginB: Spacing.xxs })}
            >
              Username
            </Text>
            <Input
              placeholder="Enter Username"
              onChange={(e) => {
                setUsername(e.target.value)
                dispatch({ type: 'reset_errors' })
              }}
              defaultValue={state.appSettings?.username}
            />
            {state.errors?.username && (
              <Text fontColor={ColorMap.red} fontSize={FontSize.xs}>
                {state.errors?.username}
              </Text>
            )}
            <Text
              fontSize={FontSize.sm}
              fontWeight={FontWeight.light}
              className={getClassName({
                marginB: Spacing.xxs,
                marginT: Spacing.xs,
              })}
            >
              Theme
            </Text>
            {THEMES.map((color) => (
              <Card
                className="pna-font-size-zero d-inline-block pna-cursor-pointer"
                backgroundColor={
                  state.appSettings?.theme == color
                    ? ColorMap['light-gray']
                    : ColorMap['light-blue']
                }
                padding={Spacing.xxs}
                borderRadius={Spacing.md}
                onClick={() =>
                  dispatch({
                    type: 'update_settings',
                    payload: { theme: color },
                  })
                }
              >
                <Color
                  width={Spacing.md}
                  height={Spacing.md}
                  color={color}
                  className="d-inline-block"
                  className={getClassName({ borderRadius: Spacing.sm })}
                />
              </Card>
            ))}
            <Button
              backgroundColor={ColorMap.violet}
              className={`pna-settings-submit-btn ${getClassName({
                marginY: Spacing.md,
              })}`}
              onClick={onSubmit}
              size={Size.sm}
            >
              <div
                className={getClassName({
                  fontSize: FontSize.lg,
                  fontColor: ColorMap.shine,
                  fontWeight: FontWeight.bold,
                })}
              >
                {state.disableSubmitBtn ? (
                  <>
                    ...
                    <SpinLoader size={Size.sm} color={ColorMap.white} />
                  </>
                ) : (
                  'Submit'
                )}
              </div>
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
