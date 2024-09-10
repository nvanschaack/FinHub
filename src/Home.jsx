import React from 'react';
import Widget from "./components/Widget.jsx"
import Sofr from "./pages/Sofr.jsx"
import Cop from "./pages/Cop.jsx"
import EuroToUs from "./pages/EuroToUs.jsx"
import Sp500 from "./pages/Sp500.jsx"
import Tytr from "./pages/Tytr.jsx"
import Vix from "./pages/Vix.jsx"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {

  return (
    <>
      <main className="d-flex">
        {/* <Widget /> */}
        <Container  >
          <Row >
            <Col className="col-sm-12 col-12">
               <Sofr />
              <Cop />
              <EuroToUs />
              <Sp500 />
              <Tytr />
              <Vix />
            </Col>        
          </Row>
        </Container>
      
      </main>
    </>
  )
}

export default Home
