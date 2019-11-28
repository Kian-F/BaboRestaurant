import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


const SERVER_URL = "http://localhost:3000/user/token";

// const SERVER_URL = "https://restaurant-order-server.herokuapp.com/user/token";


class SignIn extends Component {
  constructor () {
    super();
    this.state ={
      email: '',
      password: '',
      errorMessage: ''
    }
  }

  _handleInputEmail = event => {
    this.setState( {email: event.target.value})
  }

  _handleInputPassword = event => {
    this.setState( {password: event.target.value})
  }

  _handleSubmit = event => {
    event.preventDefault();

    axios.post(SERVER_URL, {
      "auth": {
        "email": this.state.email,
        "password": this.state.password,
      }
    }).then( result => {
      localStorage.setItem("jwt", result.data.jwt)
      console.log(result.data.jwt)
      console.log("user logged in")
      this.props.history.push('/') //where is user taken
    })
    .catch( err => {
      this.setState({ errorMessage: 'Invalid email or password'})
    }) //error logic
  }


  render() {
    return (
      <div>
        <form>
          <label>Email: </label>
          <input type="text" placeholder="Email" required onInput={ this._handleInputEmail } />

          <label>Password:</label>
          <input type="password" placeholder="Password" required onInput={ this._handleInputPassword } />

          <input type="submit" placeholder="Log In" onClick={this._handleSubmit} />
        </form>
      </div>
    );
  }

}

export default withRouter(SignIn);