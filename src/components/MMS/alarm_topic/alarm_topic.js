import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { OK, server, key } from "../../../constance/constance";
import { httpClient } from "../../../utils/HttpClient";
import CSVReader from 'react-csv-reader'

class Alarm_topic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list_machine: [],
      selected_machine: "",
      responsible: "",
      topic: "",
      get_data: [],
      new_respon: [],
      select_respon: "",

      display_table: "flex",
      display_edit: "none",

      csv_data: "",
      uploaded: "",
      progress: 0,
    }
  }

  componentDidMount = async () => {
    if (localStorage.getItem(key.USER_LV) === "Admin") {
      await this.mc_list();
      await this.get_topic();
      await this.get_responsible();
    } else {
      this.props.history.push("/home");
    }
  }


  mc_list = async () => {
    let data_mc = await httpClient.post(server.master_list_mc)
    await this.setState({
      list_machine: data_mc.data.result,
      selected_machine: data_mc.data.result[0].mc_name,
    })
  }
  renderTableRow = () => {
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option>{item.process}</option>);
      }
    } catch (error) { }
  };

  insert_item = async () => {
    let insert_data = await httpClient.post(server.master_Topic_item, {
      machine: this.state.selected_machine,
      Topic: this.state.topic,
      responsible: this.state.responsible
    })
    console.log(insert_data.data.result);
    if (insert_data.data.api_result === OK) {
      Swal.fire({
        icon: "success",
        title: "Welcome",
        text: "Input success",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      console.log(insert_data.data.result);
      console.log(this.state.topic);
      Swal.fire({
        icon: "warning",
        title: "Cannot input data .",
        text: "",
      });
      return;
    }
    window.location.replace("../alarm_topic");
  }
  get_topic = async () => {
    let get_topic = await httpClient.get(server.master_get_topic)
    await this.setState({
      get_data: get_topic.data.result,
      Topic: get_topic.data.result.Topic,
      machine: get_topic.data.result.machine,
      responsible: get_topic.data.result.responsible,

    })
    console.log(get_topic.data.result);
    // console.log(this.state.get_data);
  }
  renderTable() {
    try {
      if (this.state.get_data !== null) {
        const myResult = this.state.get_data;
        return myResult.map((item) =>
          <tr role="row" className="odd">
            <td>{item.machine}</td>
            <td>{item.Topic}</td>
            <td>{item.responsible}</td>
            <td>
              <Link
                class="btn btn-block btn-warning"
                onClick={async (e) => {
                  // e.preventDefault();
                  await this.setState({
                    display_table: "none",
                    display_edit: "flex",
                    machine: item.machine,
                    Topic: item.Topic,
                    responsible: item.responsible,
                  })
                  // this.props.history.push("/Edit_topic");
                  // window.location.reload(false);
                }}
              >
                Edit
              </Link>
            </td>
          </tr>
        )
      }

    } catch (error) {

    }
  };

  get_responsible = async () => {
    let data_r = await httpClient.get(server.master_edit_respon)
    this.setState({
      new_respon: data_r.data.result
    })
  }
  render_respon = () => {
    if (this.state.new_respon !== []) {
      return this.state.new_respon.map((item) =>
        <option key={item.responsible}>{item.responsible}</option>
      )
    };
  };
  update_respon = async () => {
    let update_data = await httpClient.put(server.master_update_respon, {
      Topic: this.state.Topic,
      machine: this.state.machine,
      responsible: this.state.responsible,
    })
    this.setState({ update_data: update_data.data.result })
    if (update_data.data.api_result === 'ok') {
      Swal.fire({
        icon: "success",
        title: "Update success ",
        // text: "to the web-site !!!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    window.location.replace("../alarm_topic");

  }

  inputCSv = async () => {
    for (let index = 1; index <= this.state.csv_data.length - 1; index++) {
      if (this.state.csv_data[index][0] === "") {
        break
      } else {
        let input = await httpClient.post(
          server.master_upload + "/" + this.state.csv_data[index][0] + "/" + this.state.csv_data[index][1] + "/" + this.state.csv_data[index][2]
        );
        await this.setState({ uploaded: this.state.uploaded + 1 });
        await this.setState({
          progress:
            (100 * this.state.uploaded) / (this.state.csv_data.length - 2),
          // Math.round((100 * this.state.uploaded) / (this.state.csv_data.length - 2)),
        });
      }
    }
    if (this.state.progress >= 100) {
      await Swal.fire({
        icon: "success",
        title: "Upload plan Successed",
        // text: { APP_TITLE }.APP_TITLE,
        showConfirmButton: false,
        timer: 1000,
      });
      await window.location.reload(false);
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">

          <h2 className="text-center" style={{ fontWeight: 'bold' }} > ALARM TOPIC MASTER </h2>

        </section>
        <div className="row">
          <div className="card col-md-12" >
            <div className="card-body">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title"> Input Master (CSV File) </h3>
                  </div>
                  <div className="col-md-12">
                    <div className="card-body">
                      {/* input master topic csv  */}
                      <div className="row">
                        <div className="col-md-1">
                          <CSVReader
                            onFileLoaded={(data, fileInfo) =>
                              this.setState({ csv_data: data })
                            }
                          />

                        </div>
                        <div className="col-md-2"></div>
                        <button onClick={async (e) => {
                          await e.preventDefault();
                          this.inputCSv();
                        }}

                          className="btn btn-primary float-right">
                          Upload
                        </button>

                      </div>
                      <br />
                      <div className="row">
                        {/* {this.state.progress} % */}
                        <div className="progress" style={{ width: "100%" }}>
                          <div
                            className="progress-bar bg-primary progress-bar-striped"
                            role="progressbar"
                            style={{
                              width: this.state.progress + "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="col-md-12">
                <div className="card card-primary" style={{ display: this.state.display_table }}>
                  <div className="card-header">
                    <h3 className="card-title"> Edit Master form </h3>
                  </div>
                  <form>
                    <div className="col-md-12">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-1"></div>
                          <div className="col-md-3">

                            <h3> Machine </h3>
                            <div className="input-group">
                              <select
                                value={this.state.selected_machine}
                                className="form-control"
                                onChange={(e) => {
                                  this.setState({ selected_machine: e.target.value });
                                }}
                              >
                                <option> Select machine process ...</option>
                                {this.renderTableRow()}
                              </select>

                            </div>
                          </div>
                          <div className="col-md-3">
                            <h3> Responsible </h3>
                            <div className="input-group">
                              <select
                                value={this.state.responsible}
                                className="form-control"
                                onChange={(e) => {
                                  this.setState({ responsible: e.target.value });
                                }}
                              >
                                <option>Select machine responsible ...</option>
                                {/* <option>MAINTENANCE TURNING</option>
                                <option>LINE TURNING</option> */}
                                {this.render_respon()}
                              </select>

                            </div>
                          </div>
                          <div className="col-md-3">
                            <h3> Topic </h3>
                            <input value={this.state.topic}
                              onChange={(e) => {
                                this.setState({ topic: e.target.value })
                              }}
                              type="text" className="form-control" id="exampleInputPassword1" placeholder=" ใส่ topic item  " />
                          </div>
                          <div className="col-md-2"> <br />

                            <button
                              onClick={async (e) => {
                                e.preventDefault();
                                await this.get_topic();
                                await this.insert_item();

                              }}
                              type="submit" className="btn btn-primary">
                              <i class="fas fa-plus"></i> Add Item</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row">
                    <div className="col-md-3">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              this.insert_item();
                            }}
                            type="submit" className="btn btn-primary">Enter</button>
                        </div>
                        </div> */}
                  </form>
                </div>

              </div>
              <div className="col-md-12" >
                <div className="card" style={{ display: this.state.display_table }}>
                  <div className="card-header">
                    <h3 className="card-title">ALARM LIST ITEM</h3>
                  </div>
                  <div className="card-body" style={{ textAlign: "center", fontSize: "14px" }}>
                    <table className="table table-striped">
                      <thead>
                        <tr role="row">
                          <th><h6>Machine</h6></th>
                          <th><h6>Topic</h6></th>
                          <th><h6>Responsible</h6></th>
                          <th><h6>Edit</h6></th>
                        </tr>
                      </thead>
                      <tbody>{this.renderTable()}</tbody>
                    </table>
                  </div>

                </div>

              </div>

              {/* edit box  */}
              <div className="col-md-12"  >
                <div className="row" >
                  <div className="container-fluid">

                    <div className="card card-info" style={{ display: this.state.display_edit }} >

                      <div className="card-header ">
                        <h3 className="card-title"> <b> Input Action Box  </b></h3>
                      </div>

                      <div className="card-body" >
                        <div className="col-12"  >
                          <div className="row">
                            <div className="col-md-2" >
                              <div className='form-group' >
                                <label > Machine </label>
                                <input value={this.state.machine} type="text" id="inputName" className="form-control" disabled />
                              </div>
                            </div>
                            <div className="col-md-3" >
                              <div className='form-group' >
                                <label > Topic </label>
                                <input value={this.state.Topic} type="text" id="inputName" className="form-control" disabled />
                              </div>
                            </div>
                            <div className="col-md-3" >
                              <div className="form-group">
                                <label htmlFor="inputDescription"> Responsible </label>
                                <select
                                  onChange={(e) => {
                                    this.setState({ responsible: e.target.value })
                                  }} value={this.state.responsible}
                                  className="form-control select2bs4 select2-hidden-accessible"
                                  style={{ width: "100%" }}
                                  data-select2-id={0}
                                  tabIndex={-1}
                                  aria-hidden="true">
                                  <option > เลือก </option>
                                  {this.render_respon()}
                                </select>

                              </div>

                            </div>
                            <div className="col-md-4"> <br />
                              <button
                                onClick={async (e) => {
                                  e.preventDefault();
                                  await this.update_respon();
                                  await this.setState({
                                    display_table: "flex",
                                    display_edit: "none",

                                  })
                                }}
                                type="submit" className="btn btn-success">
                                <i class="fas fa-plus" aria-hidden="true"></i> Update </button> &nbsp;
                            </div>

                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>


      </div >
    );
  }
}

export default Alarm_topic;
