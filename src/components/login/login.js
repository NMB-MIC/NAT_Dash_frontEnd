import React, { Component } from "react";
import Swal from "sweetalert2";
import {OK, server, APP_TITLE, key, YES } from "../../constance/constance";
import { httpClient } from "../../utils/HttpClient";

import * as moment from "moment";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {

      username: "",
      password: "",
      empNumber: "", 

    }
  };

  autoLogin = async (history) => {
    return () => {
      // alert('autoLogin say : '+localStorage.getItem(key.LOGIN_PASSED))
      if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
        setTimeout(() => history.push("/home"), 100);
      }
    };
  };

  componentDidMount() {
    //this.props.autoLogin(this.props.history);
    this.autoLogin();
  }
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // this.props.login(this.props.history, this.state);
      this.doLogin();
    }
  };
  doLogin = async () => {
    let Login_result = await httpClient.post(server.LOGIN_URL, this.state);
   
    if (Login_result.data.api_result !== OK) {
      console.log(Login_result.data);
      Swal.fire({
        icon: "error",
        title: "Log in Fail",
        text: Login_result.data.error,
      });

      return;
    } else {
      // console.log(Login_result.data.result.levelUser);
      // return
      if (Login_result.data.result.levelUser === "Guest") {
        Swal.fire({
          icon: "warning",
          title: "Unauthorized User",
          text: "Please contact the administrator for permission.",
        });
  
        return;
      } else {
        Swal.fire({
          icon: "success",
          title: "Welcome to the web-site of",
          //text: { APP_TITLE }.APP_TITLE,
          showConfirmButton: false,
          // timer: 100000,
        });
        localStorage.setItem(key.LOGIN_PASSED, YES);
        localStorage.setItem(key.USER_EMP, Login_result.data.result.empNumber);
        localStorage.setItem(key.TIME_LOGIN, moment());
        localStorage.setItem(key.USER_LV, Login_result.data.result.levelUser);
        window.location.replace("../home");
      }
    }
  };
  render() {
    return (
      <div class="login-page">
        <div className="login-box">
          <div className="login-logo"></div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <h1 className="login-box-msg"> NAT Division</h1>
              <p className="login-box-msg">Please Log-in</p>

              <div className="input-group mb-3">
                <input
                  autoFocus
                  value={this.state.empNumber}
                  type="text"
                  className="form-control"
                  placeholder="User Name"
                  onChange={(e) => {
                    this.setState({ empNumber: e.target.value.toUpperCase() });
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  value={this.state.password}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                  onKeyPress={this.handleKeyPress}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8"></div>
                {/* /.col */}
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={(e) => {
                      e.preventDefault();
                      this.doLogin();
                      // this.props.login(this.props.history, this.state);
                    }}
                  >
                    Log In
                  </button>
                </div>
                {/* /.col */}
              </div>

              <p className="mb-0">
                <a href="/register" className="text-center">
                  Register a new user
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Login;
