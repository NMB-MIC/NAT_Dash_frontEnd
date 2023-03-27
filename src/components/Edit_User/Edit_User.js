import React, { Component } from "react";
import { httpClient } from "../../utils/HttpClient";
import { key, server } from "../../constance/constance";

class Edit_User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empNumber: localStorage.getItem("user_edit"),
      levelUser: "Guest",
    };
  }

  ChangeLevel = async () => {
    let level_put = await httpClient.put(server.URL_EDITUSER, this.state);
    this.props.history.push("/listuser");
    window.location.reload(false);
  }
 

  DeleteUser = async () => {
    let delete_user = await httpClient.patch(server.URL_DELETEUSER, this.state);
    this.props.history.push("/listuser");
    window.location.reload(false);
  }


  async componentDidMount() {
    if (localStorage.getItem(key.USER_LV) === "Admin") {
      
    }else{
      this.props.history.push("/home");
    }
  }


  render() {
  
      return (
        <div className="content-wrapper">
          {/* ////////////////////////////// */}
          
          <div className="login-page" style={{ maxHeight: 608 }}>
            <div className="login-box">
              <div className="login-logo"></div>
              <div className="card">
                <div className="card-body login-card-body">
                  <p className="login-box-msg">Edit or Delete User</p>
  
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={this.state.empNumber}
                      readOnly="true"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-danger btn-block"
                        onClick={(e) => {
                          e.preventDefault();
                          this.DeleteUser();                 
                        }}
                      >
                        Delete
                      </button>
                      
              
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <select
                      className="form-control select2 select2-hidden-accessible"
                      data-select2-id={1}
                      tabIndex={-1}
                      aria-hidden="true"
                      onChange={(e) => {
                        this.setState({ levelUser: e.target.value });
                      }}
                    >
                      <option selected="selected" data-select2-id={3}>
                        Guest
                      </option>
  
                      <option data-select2-id={41}>User</option>
                      <option data-select2-id={42}>Admin</option>
                    </select>
                    {/* </div> */}
  
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-info btn-block"
                        onClick={(e) => {
                          e.preventDefault();
                          this.ChangeLevel();
                        }}
                      >
                        Change
                      </button>
                    </div>
                  </div>
  
                  <div className="input-group mb-3" style={{ marginTop: 20 }}>
                    <button
                      type="submit"
                      className="btn btn-block btn-secondary btn-xs"
                      onClick={(e) => {
                        e.preventDefault();
  
                        this.props.history.push("/listuser");
                        window.location.reload(false);
                      }}
                    >
                      Return&nbsp;&nbsp;
                      <span className="fas fa-redo-alt" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
   
    

  }
}

export default Edit_User;
