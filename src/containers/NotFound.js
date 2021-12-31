import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  Row,
  Col,
  Image,
  H,
  Text,
  Button,
} from '@ds.crisp/react-components'

import '@ds.crisp/scss/lib/Grid.css'
import '@ds.crisp/scss/lib/Utilities.css'
import '@ds.crisp/scss/lib/Loader.css'
import '@ds.crisp/scss/lib/Button.css'

import NOT_FOUND from '../assets/images/not-found.svg'
import {
  Color,
  FontSize,
  FontWeight,
  getClassName,
  Spacing,
} from '@ds.crisp/foundation'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Row className={getClassName({ marginT: Spacing.xxl })}>
        <Col
          md={6}
          className={`pna-text-center ${getClassName({ padding: Spacing.xl })}`}
        >
          <Image
            src={NOT_FOUND}
            width="100%"
            height="inherit"
            alt="Onboarding"
          />
        </Col>
        <Col md={5} className="align-self-center">
          <H
            level={3}
            fontWeight={FontWeight.bold}
            className={getClassName({ marginB: Spacing.sm })}
            fontColor={Color['medium-gray']}
          >
            Oops!
          </H>
          <Text
            level={5}
            fontColor={Color.metal}
            fontSize={FontSize.xl}
            className={getClassName({ marginY: Spacing.sm })}
          >
            We couldn't find the page that you are looking for
          </Text>
          <Button
            backgroundColor={Color.dark}
            onClick={() => navigate('/')}
            className="pna-get-started-btn"
          >
            <Text
              fontSize={FontSize.lg}
              fontColor={Color.shine}
              fontWeight={FontWeight.bold}
            >
              Back to Home
            </Text>
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
