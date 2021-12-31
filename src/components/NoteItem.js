import React, { useState } from 'react'

import { Card, Icon, Text, Button } from '@ds.crisp/react-components'
import {
  Spacing,
  FontSize,
  Size,
  Color as ColorMap,
  FontWeight,
  getClassName,
} from '@ds.crisp/foundation'

const NoteItem = ({
  title = 'NA',
  subTitle = 'NA',
  type = 'idea',
  theme,
  pinned = false,
  deleteNotes,
  togglePin,
  viewNotes,
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const cardThemeProps = {
    backgroundColor:
      ColorMap[theme && theme != 'dark' ? `light-${theme}` : 'shine'],
    iconProps: {
      backgroundColor: ColorMap[theme ? 'white' : 'light-green'],
      color: ColorMap[theme || 'dark'],
    },
    textProps: {
      fontColor: ColorMap[theme || 'dark'],
    },
  }

  return (
    <Card
      borderRadius={Spacing.sm}
      backgroundColor={cardThemeProps.backgroundColor}
      className={getClassName({ margin: Spacing.xxs })}
    >
      <div className="mb-2 d-flex justify-content-between">
        <Icon
          name={type}
          color={cardThemeProps.iconProps.color}
          className={`pna-icon-class ${getClassName({
            fontSize: FontSize.xs,
            borderRadius: Spacing.xs,
            padding: Spacing.xxs,
            backgroundColor: cardThemeProps.iconProps.backgroundColor,
          })}`}
        />
        <span
          className="pna-text-end pna-cursor-pointer"
          onClick={() => {
            togglePin()
          }}
        >
          <Icon
            name="star"
            color={ColorMap[pinned ? 'yellow' : 'gray']}
            className={getClassName({
              fontSize: FontSize.xs,
              borderRadius: Spacing.xs,
              padding: Spacing.xxs,
            })}
          />
        </span>
      </div>
      <Text
        fontWeight={FontWeight.bold}
        fontColor={cardThemeProps.textProps.fontColor}
        className='pna-line-break-anywhere'
      >
        {title}
      </Text>
      <Text
        fontWeight={FontWeight.light}
        fontSize={FontSize.xs}
        fontColor={cardThemeProps.textProps.fontColor}
        className='pna-line-break-anywhere'
      >
        {subTitle}
      </Text>
      <div className="pna-text-end pna-cursor-pointer pna-position-relative">
        <span
          onClick={() => {
            viewNotes()
          }}
        >
          <Icon
            name="edit-2-outline"
            color={ColorMap['gray']}
            className={getClassName({
              fontSize: FontSize.xxs,
              borderRadius: Spacing.xs,
              padding: Spacing.xxs,
            })}
          />
        </span>
        <span onClick={() => setShowDeletePopup(!showDeletePopup)}>
          <Icon
            name="trash-2-outline"
            color={ColorMap[showDeletePopup ? 'red' :'gray']}
            className={getClassName({
              fontSize: FontSize.xs,
              borderRadius: Spacing.xs,
              padding: Spacing.xxs,
            })}
          />
        </span>
        {showDeletePopup && (
          <Card
            className="pna-delete-notes-popup"
            padding={Spacing.xs}
            borderRadius={Spacing.xxxs}
          >
            <Text
              fontWeight={FontWeight.medium}
              className={getClassName({ marginB: Spacing.sm })}
            >
              Do you want to delete?
            </Text>
            <div className="d-flex justify-content-between flex-wrap">
              <Button
                size={Size.sm}
                backgroundColor={ColorMap['light-red']}
                fontColor={ColorMap.dark}
                className={'pna-create-submit-btn mb-1'}
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </Button>
              <Button
                size={Size.sm}
                backgroundColor={ColorMap.red}
                className={'pna-create-submit-btn mb-1'}
                onClick={deleteNotes}
              >
                Delete
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Card>
  )
}

export default NoteItem
