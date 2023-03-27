import React, { Component } from "react";
import { httpClient } from "../../utils/HttpClient";
import Swal from "sweetalert2";
import { OK, server } from "../../constance/constance";

class Register extends Component {

  //create state =>>> rcon+enter
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      empNumber: "",
      password: "",
      confirmpassword: "",
    };
  }
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      //this.props.register(this.props.history, this.state);
      this.doRegister();
    }
  };

  clearData() {
    this.setState({
      username: "",
      empNumber: "",
      password: "",
      confirmpassword: "",
      divisionCode: "",
    });
  }

  componentDidMount() { }

  doRegister = async () => {
    if (this.state.password !== this.state.confirmpassword) {
      Swal.fire({
        icon: "warning",
        title: "Password not match",
        text: "Plesase confirm your password",
      });

      return;
    }

    let Register_command = await httpClient.post(server.URL_REGIST, this.state);

    if (Register_command.data.api_result === OK) {
      Swal.fire({
        icon: "success",
        title: "Welcome",
        text: "to the web-site !!!",
        showConfirmButton: false,
        timer: 1000,
      });
      window.location.replace("../login");
    } else {
      console.log(Register_command.data);
      Swal.fire({
        icon: "warning",
        title: "Username is used.",
        text: "Plesase confirm your user condition",
        // footer:
        //   "<a href=/registrule/html-link.htm target=_blank > Why do I have this issue?</a>",
      });
      return;
    }
  };
  render() {
    return (<div className="content-wrapper">
      <div className="register-page" style={{ maxHeight: 700 }}>
        <div className="register-box">
          <div className="register-logo"></div>
          {/* /.register-logo */}
          <div className="card">
            <div className="card-body register-card-body">
              <p className="register-box-msg">New User Registration</p>

              {/* xx */}
              <div className="input-group mb-3">
                <input
                  value={this.state.empNumber}
                  type="text"
                  className="form-control"
                  placeholder="Emp No"
                  autoFocus
                  onChange={(e) => {
                    this.setState({
                      empNumber: e.target.value.toUpperCase(),
                      username: e.target.value.toUpperCase(),
                    });
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-id-card" />
                  </div>
                </div>
              </div>
              {/* xx */}
              <div className="input-group mb-3">
                <input
                  value={this.state.password}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              {/* xx */}
              <div className="input-group mb-3">
                <input
                  value={this.state.confirmpassword}
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    this.setState({ confirmpassword: e.target.value });
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-unlock" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  {/* <li className="nav-item d-none d-sm-inline-block"> */}

                  {/* <div className="row">
                    <a href="/term/html-link.htm" target="_blank">
                      Terms And Conditions
                    </a>
                  </div> */}
                  <div className="row">
                    <a href="/login">I have an account.</a>
                  </div>
                  {/* </li> */}
                </div>
                {/* /.col */}

                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={(e) => {
                      e.preventDefault();
                      this.doRegister();
                      //this.props.register(this.props.history, this.state);
                    }}
                  >
                    Sign Up
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger btn-block"
                    onClick={(e) => {
                      e.preventDefault();
                      this.clearData();
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* check state ว่ามาถูกต้องมั้ย */}
              {/* <div>
                <p>username: {register.state.username}</p>
                <p>emp: {this.state.empNumber}</p>
                <p>password: {this.state.password}</p>
                <p>confirmpassword: {this.state.confirmpassword}</p>
                <p>divisionCode: {this.state.divisionCode}</p>
                <p>email: {this.state.email}</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

}

export default Register;
