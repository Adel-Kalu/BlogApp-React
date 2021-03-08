import "./App.css";
import AuthorList from "./AuthorList";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from "./user/Register";
import Login from "./user/Login";
import axios from "axios";

import React, { Component } from "react";
import { decode } from "jsonwebtoken";
import { Alert, Fade } from "react-bootstrap";

export default class App extends Component {
  state = {
    isAuth: false,
    user: null,
    message: null,
    successMessage: null,
  };

  componentDidMount() {
    let token = localStorage.getItem("token");

    if (token != null) {
      let user = decode(token);

      if (user) {
        this.setState({
          isAuth: true,
          user: user,
        });
      } else if (!user) {
        localStorage.removeItem("token");
        this.setState({
          isAuth: false,
        });
      }
    }
  }

  registerHandler = (user) => {
    axios
      .post("blogapp/user/registration", user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loginHandler = (user) => {
    axios
      .post("blogapp/user/authenticate", user)
      .then((response) => {
        console.log(response);
        console.log(response.data.token);

        if (response.data.token != null) {
          localStorage.setItem("token", response.data.token);
          let user = decode(response.data.token);

          this.setState({
            isAuth: true,
            user: user,
            successMessage: "Successfully logged in!!!",
            message: null
          });
        } else {
          this.setState({
            isAuth: false,
            user: null,
            message: "Incorrect username or password",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isAuth: false,
          message: "Error Occured. Please try again later!!!",
        });
      });
  };

  onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.setState({
      isAuth: false,
      user: null,
    });
  };

  render() {
    const { isAuth } = this.state;

    const message = this.state.message ? (
      <Alert variant="danger">{this.state.message}</Alert>
    ) : null;

    const successMessage = this.state.successMessage ? (
      <Alert variant="success">{this.state.successMessage}</Alert>
    ) : null;

    return (
      <Router>
        <nav>
          {message} {successMessage}

          {isAuth ? (
            <div>
              {this.state.user ? "Welcome " + this.state.user.sub : null} {"  "}
              <Link to="/logout" onClick={this.onLogoutHandler}>
                Logout
              </Link>{" "}
            </div>
          ) : (
            <div>
              <Link to="/register">Register</Link> {"  "}
              <Link to="/login">Login</Link> {"  "}
            </div>
          )}
        </nav>
        <div>
          <Route
            path="/register"
            component={() => <Register register={this.registerHandler} />}
          ></Route>

          <Route
            path="/login"
            component={() =>
              isAuth ? <AuthorList /> : <Login login={this.loginHandler} />
            }
          ></Route>
        </div>

 
      </Router>
    );
  }
}
