/**
 *  Account Page Order History
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import OrderData from "../../api/userOrder";
import Sitebar from "./Sitebar";
import { getCustomerOrder } from "../../actions/Order/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import QrCodeScreen from "../Qrcode";
class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      Order: OrderData,
      ViewOrder: "",
      viewQRCode: "",
      qrCodeValue: "",
      lineIndex: "",
    };
    this.toggle = this.toggle.bind(this);
    this.props.getCustomerOrder(this.props?.user?.email);
  }
  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }
  onViewOrder(data) {
    this.setState({
      ...this.state,
      ViewOrder: data,
    });
    this.toggle();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    function getDate(data, date) {
      let newDate = new Date(data);
      newDate.setDate(newDate.getDate());
      return (
        newDate.getDate() +
        date +
        " " +
        months[newDate.getMonth()] +
        " " +
        newDate.getFullYear()
      );
    }

    // console.log(
    //   "this is order history",
    //   this.props?.orderHistory?.results[this.state.test]
    // );
    const OrderHistory = this.state.Order;
    const ViewOrderdata = this.state.ViewOrder;
    // const ShippingAddress= this.props?.orderHistory?.results[this.state.test]?.shippingAddress
    let results;
    if (Number.isInteger(parseInt(this.state.lineIndex))) {
      results =
        this.props?.orderHistory?.results[parseInt(this.state.lineIndex)];
    }

    console.log("this is results", results);

    return (
      <div>
        <div className="inner-intro">
          <Container>
            <QrCodeScreen
              value={this.state.qrCodeValue}
              isOpen={this.state.viewQRCode}
              onClose={() => {
                this.setState({ viewQRCode: !this.state.viewQRCode });
              }}
            />
            <Row className="intro-title align-items-center">
              <Col md={6} className="text-left">
                <div className="intro-title-inner">
                  <h1>My Account</h1>
                </div>
              </Col>
              <Col md={6} className="text-right">
                <ul className="ciyashop_breadcrumbs page-breadcrumb breadcrumbs">
                  <li className="home">
                    <span>
                      <Link className="bread-link bread-home" to="/">
                        Home
                      </Link>
                    </span>
                  </li>
                  <li>
                    <span>My Account</span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section-ptb">
          <Container>
            <Row>
              <Sitebar />
              <Col lg={9} className="mt-4 mt-lg-0">
                <Row>
                  <Col lg={12}>
                    <div className="table-responsive">
                      <table class="table orderhistory-table mb-0">
                        <thead class="thead-light">
                          <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            {/* <th scope="col">Order Type</th> */}
                            {/* <th scope="col">Shipping</th> */}
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        {this.props.orderHistory !== null &&
                        Array.isArray(this.props.orderHistory.results) ? (
                          <tbody>
                            {this.props.orderHistory.results.map(
                              (Ordervalue, index) => (
                                <tr>
                                  <td>{Ordervalue.orderNumber}</td>
                                  <td>
                                    {getDate(
                                      Ordervalue.lineItems[0].addedAt,
                                      0
                                    )}
                                  </td>
                                  <td>{Ordervalue.orderState}</td>
                                  {/* <td style={{ textTransform: "capitalize" }}>
                                  {Ordervalue.fulfill_type.replace(/_/g, " ")}
                                </td> */}

                                  {/* <td>{Ordervalue.status}</td> */}
                                  <td>
                                  ${Ordervalue.totalPrice.centAmount / 100}
                                  </td>
                                  <td>
                                    <Link
                                      className="action-button"
                                      onClick={() => {
                                        this.setState({ lineIndex: index });

                                        this.setState(
                                          { qrCodeValue: Ordervalue.order_no },
                                          () => {
                                            this.setState({ modal: true });
                                            // this.setState({test:index})
                                            // this.setState((prevState) => ({ prevState.key1 : value3 }))
                                            // console.log("this is index",this.state.test)
                                            // this.updateState
                                          }
                                        );
                                      }}
                                      href="#"
                                    >
                                      View
                                    </Link>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        ) : null}
                      </table>
                    </div>
                  </Col>
                </Row>
                {/* modal-view */}
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className="modal-view modal-lg modal-dialog-centered"
                >
                  <ModalHeader toggle={this.toggle}></ModalHeader>
                  {ViewOrderdata !== null ? (
                    <ModalBody>
                      <div className="success-screen">
                        {/* <div className="thank-you text-center">
                          <i className="fa fa-check-circle-o" size='20'></i>
                          <h1 className="text-white">Thank You</h1>
                          <span>
                            Success! We received your payment. Your order will
                            be processed soon.
                          </span>
                          <strong className="text-white">
                            Transaction ID:{ViewOrderdata.orderid}
                          </strong>
                        </div> */}
                        <div className="delivery p-4 p-md-5 bg-light text-center">
                          <span className="h5">Expected Date Of Delivery</span>
                          <h2 className="mb-0 mt-2">
                            {/* {ViewOrderdata.date} */}
                            {getDate(results?.versionModifiedAt, 5)}
                          </h2>
                        </div>
                        <div className="pt-4 px-4 pt-md-5 px-md-5 pb-3">
                          <Row>
                            <Col lg={6}>
                              <h6>Ship To</h6>
                              <ul className="list-unstyled mb-0">
                                {/* <li>Dr.Reddy's</li>
                                <li>#1457</li>
                                <li>126-632-2345</li>
                                <li>support@drreddy.com</li>
                                <li>
                                  1635 Franklin Street Montgomery, Near Sherwood
                                  Mall. AL 36104
                                </li> */}
                                <li>{results?.shippingAddress.firstName}</li>
                                <li>{results?.shippingAddress.streetName}</li>
                                <li>{results?.shippingAddress.city}</li>
                                <li>
                                  {results?.shippingAddress.state}-
                                  {results?.shippingAddress.postalCode}
                                </li>
                              </ul>
                            </Col>
                            <Col lg={6} className="text-lg-right mt-4 mt-lg-0">
                              <h6>Summary</h6>
                              <ul className="list-unstyled mb-0">
                                <li>
                                  <span>Order ID:</span>{" "}
                                  <strong>{results?.orderNumber}</strong>
                                </li>
                                <li>
                                  <span>Order Date:</span>{" "}
                                  <strong>
                                    {getDate(results?.versionModifiedAt, 0)}
                                  </strong>
                                </li>
                                <li>
                                  <span>Order Total:</span>{" "}
                                  <strong>
                                    $
                                    {/* {ViewOrderdata.price +
                                      ViewOrderdata.tax +
                                      50}
                                    .00 */}
                                    {/* {this.props?.orderHistory?.results[
                                      this.state.test
                                    ].totalPrice.centAmount / 100} */}
                                    {results?.totalPrice.centAmount / 100}
                                  </strong>
                                </li>
                              </ul>
                            </Col>
                          </Row>
                        </div>
                        <div className="ordered-detail">
                          <h5 className="mb-4">Your Ordered Details</h5>
                          <div className="table-responsive">
                            <table class="table mb-0">
                              <thead class="thead-light">
                                <tr>
                                  <th scope="col">Product Name</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Price</th>
                                </tr>
                              </thead>

                              <tbody>
                                {results?.lineItems?.map((each) => {
                                  return (
                                    <tr className="ordered-item">
                                      {/* <td className="ordered-image">
                                    <img
                                      alt="img 01"
                                      src={require(`../../assets/images/shop/img-02.jpg`)}
                                      className="img-fluid"
                                    />
                                  </td> */}
                                      <td
                                        className="ordered-name"
                                        style={{ textAlign: "start" }}
                                      >
                                        {/* <h6 className="mb-0">Product Name</h6> */}
                                        <span>{each?.name?.en}</span>
                                      </td>
                                      <td className="ordered-quantity">
                                        {/* <h6 className="mb-0">Quantity</h6> */}
                                        <span>{each.quantity}</span>
                                      </td>
                                      <td className="ordered-price">
                                        {/* <h6 className="mb-0">Price</h6> */}
                                        <span>
                                          ${each.totalPrice.centAmount / 100}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                          <div className="table-responsive">
                            <table class="table total-table table-borderless mt-4 mb-0">
                              <tbody>
                                <tr>
                                  <td>Subtotal</td>
                                  <td className="text-right">
                                    ${ViewOrderdata.price}{" "}
                                    {/* {this.props?.orderHistory?.results[
                                      this.state.test
                                    ].totalPrice.centAmount / 100} */}
                                    {results?.totalPrice.centAmount / 100}
                                  </td>
                                </tr>
                                {/* <tr>
                                  <td>Shipping</td>
                                  <td className="text-right">$50.00</td>
                                </tr> */}
                                <tr>
                                  <td>Tax(GST)</td>
                                  <td className="text-right">
                                    ${ViewOrderdata.tax}
                                  </td>
                                </tr>
                                <tr className="border-top">
                                  <td>
                                    <strong className="h5">Total</strong>
                                  </td>
                                  <td className="text-right h5">
                                    <strong>
                                      $
                                      {/* {ViewOrderdata.price +
                                        ViewOrderdata.tax +
                                        50}
                                      .00 */}
                                      {/* {this.props?.orderHistory?.results[
                                        this.state.test
                                      ].totalPrice.centAmount / 100} */}
                                      {results?.totalPrice.centAmount / 100}
                                    </strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                  ) : null}
                </Modal>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orderHistory: state.orderHistory.orderHistory || [],
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCustomerOrder,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
