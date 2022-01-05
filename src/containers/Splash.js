import React from 'react'
import { Col, Container, Image, Row } from '@ds.crisp/react-components'

import SPLASH_SVG from '../assets/images/splash.svg'
import { getClassName, Spacing } from '@ds.crisp/foundation'

const Splash = () => {
  return (
    <Container>
      <Row className={getClassName({ marginT: Spacing.xl })}>
        <Col md={6} className='pna-empty-state-container pna-text-center'>
          <Image src={SPLASH_SVG}  height={250} width='inherit' alt='Splash image'/>
        </Col>
      </Row>
    </Container>
  )
}

export default Splash
