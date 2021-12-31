import React from 'react'
import clsx from 'clsx'

import {
  Container,
  Row,
  Tag,
  Text,
} from '@ds.crisp/react-components'
import {
  FontIcon,
  FontWeight,
  Color as ColorMap,
  getClassName,
  Spacing,
} from '@ds.crisp/foundation'

import '@ds.crisp/scss/lib/SearchBar.css'
import '@ds.crisp/scss/lib/Grid.css'
import '@ds.crisp/scss/lib/Tag.css'
import '@ds.crisp/scss/lib/Utilities.css'
import '@ds.crisp/scss/lib/Color.css'
import '@ds.crisp/scss/lib/Icons.css'

const Header = ({ appName = 'Notes App', navNode }) => {
  const headerClassName = clsx(
    'pna-header-container',
    getClassName({
      paddingY: Spacing.xxs,
    })
  )
  return (
    <header className={headerClassName}>
      <Container md>
        <Row className='justify-content-between'>
          <Tag backgroundColor={ColorMap['light-blue']} className="my-auto">
            <Text fontWeight={FontWeight.bold} fontColor={ColorMap.dark}>
              {appName}
            </Text>
          </Tag>
          {navNode}
          {/* <Col md={6}>
            <SearchBar
              placeholder="Search using keywords.."
              startIcon={{ name: FontIcon.search, color: ColorMap.dark }}
              endIcon={{
                name: FontIcon['options-2-outline'],
                color: ColorMap.dark,
                backgroundColor: ColorMap['light-blue'],
                onClick: (e) => console.log(e),
              }}
              backgroundColor={ColorMap['shine']}
            />
          </Col> */}
        </Row>
      </Container>
    </header>
  )
}

export default Header
