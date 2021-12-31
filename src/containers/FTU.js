import React from 'react'

import {
  Container,
  Row,
  Col,
  H,
  Image,
  Text,
  Button,
} from '@ds.crisp/react-components'

import '@ds.crisp/scss/lib/Grid.css'
import '@ds.crisp/scss/lib/Utilities.css'
import '@ds.crisp/scss/lib/Loader.css'
import '@ds.crisp/scss/lib/Button.css'

import FTU_SVG from '../assets/images/ftu-main.svg'
import {
  Color,
  FontSize,
  FontWeight,
  getClassName,
  Spacing,
} from '@ds.crisp/foundation'


const FTU = ({
  tryNow,
}) => {
  return (
    <Container>
      <Row className={getClassName({ marginT: Spacing.xxl })}>
        <Col md={6} className={`pna-text-center ${getClassName({ padding: Spacing.xl })}`}>
          <Image
            src={FTU_SVG}
            width="100%"
            height="inherit"
            alt="Onboarding"
          />
        </Col>
        <Col md={5} className="align-self-center">
          <Text
            fontSize={FontSize.xl}
            fontWeight={FontWeight.bold}
            className={getClassName({ marginB: Spacing.sm })}
          >
            The simplest way to keep notes
          </Text>
          <Text className={getClassName({ marginB: Spacing.sm })}>
            With Notes App, your data sits in a local browser storage. Never leave your life's work held hostage in the cloud again.
          </Text>
          <Button backgroundColor={Color.violet} onClick={tryNow} className='pna-get-started-btn'>
            <Text
              fontSize={FontSize.lg}
              fontColor={Color.shine}
              fontWeight={FontWeight.bold}
            >
              TRY NOW
            </Text>
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default FTU
