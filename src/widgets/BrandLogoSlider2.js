/**
 * Brand Logo Set Slider
 */
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';


class BrandLogoSlider2 extends Component {
   render() {
    return (
            <Row>
            <Col md={4} >
                <div className="section-title mb-0">
                    <h2 className="font-bold">Our Brands and Partners</h2>
                </div>
                <p className="mb-4">We maintain the highest level of online payment security with complete
                    encryption and data security solutions to protect customer data</p>
                <p className="mb-0">If success is a process with a number of defined steps, then it is just like any other
                    process. So, what is the first step in any process?</p>
            </Col>
            <Col md={8}>
                <div className="ciyashop_clients ciyashop_clients-list-type-grid ciyashop_clients-grid-column-4">
                    <div className="our-clients boxed-list box-4">
                    <ul className="list-inline clearfix d-flex">
                        <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients01/03.png`)} width={100} height={65} alt /> </li>
                        <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients01/02.png`)} width={90} height={50} alt /> </li>
                        <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients01/01.png`)} width={90} height={65} alt /> </li>
                        <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients01/04.png`)} width={90} height={65} alt /> </li>
                        <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients01/06.png`)} width={90} height={65} alt /> </li>
                        <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients01/05.png`)} width={90} height={85} alt /> </li>
                        {/* <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients/07.png`)} width={112} height={65} alt /> </li>
                        <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients/08.png`)} width={112} height={65} alt /> </li>
                        <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients/09.png`)} width={112} height={65} alt /> </li>
                        <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients/10.png`)} width={112} height={65} alt /> </li>
                        <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients/11.png`)} width={112} height={65} alt /> </li>
                        <li>
                        <img className="img-fluid mx-auto" src={require(`../assets/images/clients/12.png`)} width={112} height={65} alt /> </li> */}
                    </ul>
                    </div>
                </div>
            </Col>
        </Row>
      )
   }
}

export default BrandLogoSlider2;
