import React, {Component} from 'react';
import PaymentForm from './PaymentForm';
import {Link} from 'react-router-dom';
import UserForm from './UserForm';
import OrderSummary from './OrderSummary';
import DropdownTime from './DropdownTime';
import {withRouter} from 'react-router-dom';
import babbologo from "../babbologo.png"
import axios from 'axios';

// const SERVER_URL = "http://localhost:3000/products";
const SERVER_URL = "https://restaurant-order-server.herokuapp.com/products";
// const SERVER_URL_MAKEORDER = "http://localhost:3000/orders/generate_order";
const SERVER_URL_MAKEORDER = "https://restaurant-order-server.herokuapp.com/orders/generate_order";


class CheckOut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderItems: {},
      allProducts: [],
      delivery: '',
      paymentOption: "Cash",
      totalPrice: 0,
      time: '',
      name: '',
      phone_number: '',
      email: '',
      address: '',
      userInfo: false
    };

    this.onRadioChange = this.onRadioChange.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleCardDetails = this._handleCardDetails.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this._handleUserInfo = this._handleUserInfo.bind(this);
    // this.render = this.render.bind(this);
  }

  componentDidMount() {
    //Gets shopping cart from local storage
    const orderItems = JSON.parse(localStorage.getItem('orderItems'));
    //Gets delivery status from local storage
    const delivery = JSON.parse(localStorage.getItem('delivery'));
    //Gets payment option from local storage
    const paymentOption = JSON.parse(localStorage.getItem('paymentOption'));
    //sets state of all variables
    this.setState({ orderItems, delivery, paymentOption });

    this.fetchProducts();
  }

  //get all products
  fetchProducts() {
    axios.get(SERVER_URL).then( (results) => {
      const allProducts = results.data;
      this.setState({allProducts: allProducts});
    })
  }

  onRadioChange(event) {
    console.log(event.target.value);
    const value = event.target.value;
    //get value of button and set state
    const delivery = value === 'Delivery';
    this.setState({delivery});
    //sets delivery state in local storage
    localStorage.setItem('delivery', JSON.stringify({delivery}));
    console.log(delivery);
    this.calculateTotal(delivery, this.state.allProducts, this.state.orderItems);
  }

  calculateTotal(delivery, allProducts, orderItems) {
    let total = 0;
    if (Object.keys(orderItems).length > 0){
      total = Object.entries(orderItems).reduce(
        (result, [id, quantity]) => {
          const item = allProducts.find( p => p.id.toString() === id);
          return result + (item.price * quantity);
        },
        0);
    }
    const totalPrice = delivery ? total += 5 : total;
    console.log(totalPrice);
    this.setState({totalPrice: totalPrice});
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice) );
  }


  updateTime(timeOrder) {
    console.log(timeOrder);
    // //save stime in state
    this.setState({time: timeOrder});
    //save time to local storage
    const time = JSON.stringify(timeOrder);
    localStorage.setItem('time', time);
    // this.render();
  }

  _handleUserInfo(userInfo){
    console.log("userInfo", userInfo);
    this.setState({user_id: userInfo[0], name: userInfo[1], phone_number: userInfo[2], email: userInfo[3], address: userInfo[4], userInfo: true});

    localStorage.setItem('name', JSON.stringify(userInfo[1]));
    localStorage.setItem('phone_number', JSON.stringify(userInfo[2]));
    localStorage.setItem('email', JSON.stringify(userInfo[3]));
  }

  _handleChange(event) {
    //sets state of payment type
    this.setState({paymentOption: event.target.value})
    //saves payment type to local storage
    let paymentStatus = JSON.stringify(event.target.value);
    localStorage.setItem('paymentOption', JSON.stringify(paymentStatus));
  }



  _handleCardDetails(token) {
    if (token && this.state.userInfo) {
      this.createOrder();
    } else {
      window.alert("Please fill in contact details.")
    }
  }

  createOrder() {
    if (this.state.userInfo) {
      console.log("user details all in");
      console.log("will make request");

      //send data to back to make order, user, line-items
      const orderItems = this.state.orderItems;
      const kind = this.state.delivery ? "Delivery" : "Pick-up";
      const total_price = this.state.totalPrice;
      const user_id = this.state.user_id;
      const name = this.state.name;
      const phone_number = this.state.phone_number;
      const email = this.state.email;
      const address = this.state.address;

      console.log("user if a string?", user_id);

      axios.post(SERVER_URL_MAKEORDER, {
        orderItems: orderItems,
        kind: kind,
        total_price: total_price,
        user_id: user_id,
        // name: name,
        // phone_number: phone_number,
        // email: email,
        // address: address
      }).then( result => {
        console.log( "order created", result.data );
        localStorage.setItem('order_id', JSON.stringify(result.data.id));

        const user_id = result.data.user_id;
        this.setState({user_id: user_id});
        localStorage.setItem('user_id', user_id);
        this.props.history.push('/ordercomplete');

      }).catch( error => {
        window.alert("Order submission failed. Please try again.");
      });

    }
    else {
      window.alert("Please fill in all details required for your order.")
    }


  }


  render() {

    return (
      <div>

        <Link to="/">
          <img src={babbologo} alt="Home" className="navbar-brand" />
        </Link>

        <div id="main">

          <div id="forms">

            <Link className="back" to="/menu">Back to Menu</Link>

            {this.state.delivery !== "" && this.state.time ? "" :
            (<div><form id="delivery-form">
              <div className="custom-control custom-radio custom-control-inline">
                <label>
                  <input type="radio" value="Pick-up" checked={this.state.delivery === false} onChange={this.onRadioChange}/>
                  Pick-up
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <label>
                  <input type="radio" value="Delivery" checked={this.state.delivery === true} onChange={this.onRadioChange}/>
                  Delivery
                </label>
              </div>
            </form>


            <div id="time-form">
              <h4>Time for order:</h4>
              <DropdownTime onChange={this.updateTime} /><br/>
            </div></div>)}

            {this.state.time ?
              <div>
              {!this.state.userInfo ?
                <div><h4>Customer contact details:</h4>
                <UserForm onSubmit={this._handleUserInfo} delivery={this.state.delivery} /></div>
                : ""}
              </div> : "" }


            {this.state.userInfo ?
            <div>
            <h4>Payment option:</h4><br/>
            <form id="payment-form">
                <div id="option" className="custom-control custom-radio custom-control-inline">
                  <label>
                    <input type="radio" value="Cash" checked={this.state.paymentOption === "Cash"} onChange={this._handleChange}/>
                    Cash
                  </label>
                </div>
                <div id="option" className="custom-control custom-radio custom-control-inline">
                  <label>
                    <input type="radio" value="Card" checked={this.state.paymentOption === "Card"} onChange={this._handleChange}/>
                    Card
                  </label>
                </div>

              {this.state.paymentOption === "Card" ?
              <PaymentForm id="stripe" onChange={this._handleCardDetails} orderItems={this.state.orderItems} totalPrice={this.state.totalPrice} />
              :
              <button onClick={this.createOrder}  className="pay">Submit Order
              </button>}
            </form>
            </div>
            : ""}

          </div>


          <div className="orderSummary">
            <OrderSummary deliveryStatus={this.state.delivery} time={this.state.time} />
          </div>

        </div>
      </div>

    );
  }
}


export default withRouter(CheckOut);
