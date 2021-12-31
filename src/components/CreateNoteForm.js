import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Text,
  Card,
  Button,
  SheetHeader,
  SheetFooter,
  Color,
  Icon,
} from '@ds.crisp/react-components'
import {
  Color as ColorMap,
  FontWeight,
  FontSize,
  getClassName,
  Spacing,
  Size,
} from '@ds.crisp/foundation'

import Input from '../components/Input'
import Textarea from '../components/Textarea'
import { TEXT_HYPHEN_UNDERSCORE_SPACE } from '../constants/regex'

const COLOR_THEMES = ['blue', 'red', 'green', 'yellow']
const ICON_TYPES = ['bulb', 'book', 'bookmark', 'gift']

const CreateNoteForm = ({
  title,
  hint,
  formData: formDataProp,
  onCancel,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(formDataProp)
  const [err, setErr] = useState(null)

  const onChange = (formValue) => {
    setErr(null)
    setFormData({ ...formData, ...formValue })
  }

  const validateFormData = (formData) => {
    const { metaTitle, metaDescription } = formData || {}
    let err = {}
    if (!metaTitle) {
      err.metaTitle = 'This field can not be empty'
    } else if (!TEXT_HYPHEN_UNDERSCORE_SPACE.test(metaTitle.trim())) {
      err.metaTitle = 'Only - and _ are allowed'
    } else if (metaTitle.trim().length > 32) {
      err.metaTitle = 'Max length 42'
    } else if (metaTitle.trim().length < 4) {
      err.metaTitle = 'Min length 4 after trim'
    }

    if (metaDescription && metaDescription.trim().length) {
      if (!TEXT_HYPHEN_UNDERSCORE_SPACE.test(metaDescription.trim())) {
        err.metaDescription = 'Only - and _ are allowed'
      } else if (metaDescription.trim().length > 60) {
        err.metaDescription = 'Max length 60'
      } else if (metaDescription.trim().length < 4) {
        err.metaDescription = 'Min length 4 after trim'
      }
    }

    return err.metaTitle || err.metaDescription ? err : false
  }

  const onSave = () => {
    const err = validateFormData(formData)
    if (!err) {
      onSubmit(formData)
    } else {
      setErr(err)
    }
  }

  return (
    <Container>
      <Row>
        <Col md={8} />
        <Col md={4} className={getClassName({ marginB: Spacing.sm })}>
          <Card
            padding={Spacing.none}
            borderRadius={Spacing.sm}
            className="pna-create-note-form-container"
          >
            <SheetHeader
              className={`pna-sheet-header-border ${getClassName({
                padding: Spacing.sm,
                backgroundColor: ColorMap.white,
                borderRadiusT: Spacing.sm,
              })}`}
            >
              <Text fontWeight={FontWeight.bold}>{title}</Text>
            </SheetHeader>
            <div className={getClassName({ padding: Spacing.sm })}>
              <Text
                fontSize={FontSize.sm}
                fontWeight={FontWeight.light}
                className={getClassName({
                  paddingB: Spacing.xxxs,
                  mardingX: Spacing.sm,
                })}
              >
                Title
              </Text>
              <Input
                placeholder="Enter Title"
                onChange={(e) => {
                  onChange({ metaTitle: e.target.value })
                }}
                defaultValue={formData?.metaTitle}
              />
              {err?.metaTitle && (
                <Text fontColor={ColorMap.red} fontSize={FontSize.xs}>
                  {err?.metaTitle}
                </Text>
              )}
              <Text
                fontSize={FontSize.sm}
                fontWeight={FontWeight.light}
                className={getClassName({
                  marginB: Spacing.xxxs,
                  marginT: Spacing.xs,
                })}
              >
                Description
              </Text>
              <Textarea
                placeholder="Enter Description"
                onChange={(e) => {
                  onChange({ metaDescription: e.target.value })
                }}
                defaultValue={formData?.metaDescription}
              />
              {err?.metaDescription && (
                <Text fontColor={ColorMap.red} fontSize={FontSize.xs}>
                  {err?.metaDescription}
                </Text>
              )}
              <Row>
                <Col>
                  <Text
                    fontSize={FontSize.sm}
                    fontWeight={FontWeight.light}
                    className={getClassName({
                      marginB: Spacing.xxxs,
                      marginT: Spacing.xs,
                    })}
                  >
                    Theme
                  </Text>
                  {COLOR_THEMES.map((c) => (
                    <Card
                      className="pna-font-size-zero d-inline-block"
                      backgroundColor={
                        ColorMap[formData?.theme === c ? 'light-blue' : 'white']
                      }
                      borderRadius={Spacing.xxs}
                      padding={Spacing.xxs}
                      onClick={() => onChange({ theme: c })}
                    >
                      <Color
                        color={ColorMap[c]}
                        className={getClassName({ borderRadius: Spacing.xxxs })}
                      />
                    </Card>
                  ))}
                </Col>
                <Col>
                  <Text
                    fontSize={FontSize.sm}
                    fontWeight={FontWeight.light}
                    className={getClassName({
                      marginB: Spacing.xxxs,
                      marginT: Spacing.xs,
                    })}
                  >
                    Type
                  </Text>
                  {ICON_TYPES.map((i) => (
                    <Card
                      className="pna-font-size-zero d-inline-block mb-2"
                      backgroundColor={
                        ColorMap[formData?.type === i ? 'light-blue' : 'white']
                      }
                      borderRadius={Spacing.xxs}
                      padding={Spacing.xxs}
                      onClick={() => onChange({ type: i })}
                    >
                      <Icon
                        name={i}
                        color={ColorMap[formData?.type === i ? 'blue' : 'dark']}
                        size={FontSize.base}
                      />
                    </Card>
                  ))}
                </Col>
              </Row>

              {hint && (
                <Card
                  backgroundColor={ColorMap['light-yellow']}
                  borderRadius={Spacing.xxs}
                  className={`pna-font-size-zero d-flex`}
                >
                  <Icon
                    name="info-outline"
                    color={ColorMap.dark}
                    size={FontSize.base}
                  />
                  <Text
                    className="d-inline-block"
                    fontSize={FontSize.xs}
                    fontColor={ColorMap.dark}
                    fontWeight={FontWeight.light}
                    className={getClassName({ marginL: Spacing.xxs })}
                  >
                    {hint}
                  </Text>
                </Card>
              )}
            </div>
            <SheetFooter
              className={`pna-text-end pna-sheet-footer-border ${getClassName({
                padding: Spacing.sm,
                backgroundColor: ColorMap.white,
              })}`}
            >
              <Button
                size={Size.sm}
                backgroundColor={ColorMap['light-blue']}
                fontColor={ColorMap.dark}
                className={'pna-create-submit-btn mr-3'}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                size={Size.sm}
                backgroundColor={ColorMap.dark}
                className={'pna-create-submit-btn'}
                onClick={onSave}
              >
                Save
              </Button>
            </SheetFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateNoteForm
