import React, { Component,useState,useEffect }from "react";
import {OK, server, APP_TITLE, key, YES } from "../../constance/constance";
import * as moment from "moment";
import Swal from "sweetalert2";
import { httpClient } from "../../utils/HttpClient";



class List_User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      levelUser: "",
      user_data: null
    }
  };
  async componentDidMount() {
    if (localStorage.getItem(key.USER_LV) === "Admin") {
      // this.props.Get_List_User();
      this.Get_List_User();
    } else {
      this.props.history.push("/home");
    }
  }

  Get_List_User = async () => {
    let User_All = await httpClient.get(server.URL_USER);
   // console.log(User_All.data.result);
    this.setState({ user_data: User_All.data.result });
  };

  renderTableRow = () => {
    try {
     // const { result, isFetching } = this.props.listuserReducer;
      if (this.state.user_data !== null) {
        const myResult = this.state.user_data;
        return myResult.map((item) => (
          <tr key={item.id} role="row" className="odd">
       
            <td>{item.empNumber}</td>
            <td>{item.levelUser}</td>
        
            <td>
              <a  
                class="btn btn-block btn-warning"
                onClick={async (e) => {
                  // e.preventDefault();
                 await localStorage.setItem("user_edit", item.empNumber);
                  this.props.history.push("/edituser");
                  window.location.reload(false);
                }}             
              >
                Edit
              </a>
            </td>
          </tr>
        ));
      }
    } catch (error) {}
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="card">
          <div className="card" style={{ margin: 10 }}>
            <div
              className="card-body table-responsive p-0"
              style={{ maxHeight: 550}}
            >
              <table
                id="DivTable"
                className="table table-head-fixed table-hover text-nowrap"
                role="grid"
                aria-describedby="example2_info"
              >
                <thead>
                  <tr role="row">
                 
                    <th
           
                    >
                      Emp No
                    </th>
                    <th
              
                    >
                      Level
                    </th>
                 
                    <th
                     
                    >
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>{this.renderTableRow()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default List_User;
