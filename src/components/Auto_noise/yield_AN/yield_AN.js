import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { server } from "../../../constance/constance"
import { httpClient } from "../../../utils/HttpClient";

class Yield_AN extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),
      selected_machine: "",
      selected_process: "AN",
      list_machine_AN: [],
      selected_mc_object: [],
      selected_mc: [],

      display_table: "flex",
      display_edit: "none",
    }
  }

  


  componentDidMount = async () => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    await this.setState({
      date_start: moment(firstDay).format("YYYY-MM-DD"),
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),
    });
    this.get_ANmc();

  };
  get_ANmc = async () => {
    let mc_list_mc = await httpClient.post(server.AN_MC_LIST);
    await this.setState({
      list_machine_AN: mc_list_mc.data.result,
    });
    console.log(mc_list_mc.data.result);
  }

  renderTableRow = () => {
    try {
      if (this.state.list_machine_AN !== null) {
        const myResult = this.state.list_machine_AN;
        return myResult.map((item) => (
          <tr>
            <td>
              <Link
                onClick={async (e) => {
                  if (this.state.selected_mc.length == 10) {
                    Swal.fire({
                      icon: "error",
                      title: "Limit Machine = 10",
                    });
                    e.target.checked = false;
                    return;
                  } else {
                    if (!this.state.selected_mc.includes(item.mc_name)) {
                      this.state.selected_mc.push(item.mc_name);
                    }
                  }
                  await this.setState({ selected_mc_object: [] });
                  for (let index = 0; index < this.state.selected_mc.length; index++) {
                    this.state.selected_mc_object.push({ mc_name: this.state.selected_mc[index] });
                  }
                  this.setState({ selected_mc_object: this.state.selected_mc_object });
                  console.log(this.state.selected_mc);
                  console.log(this.state.selected_mc_object);
                }}
              >
                {item.mc_name}
              </Link>
            </td>
          </tr>
        ));
      }
    } catch (error) { }
  }

  renderTable_machine = () => {
    if (this.state.selected_mc_object !== null) {
      const myResult = this.state.selected_mc_object;
      return myResult.map((item) => (
        <button
          style={{ marginRight: 3 }}
          type="button"
          class="btn btn-outline-secondary btn-sm"
          onClick={async (e) => {
            var people = this.state.selected_mc;
            var toRemove = item.mc_name;
            var index = people.indexOf(toRemove);
            if (index > -1) {
              people.splice(index, 1);
            }
            await this.setState({ selected_mc_object: [] });
            for (let index = 0; index < this.state.selected_mc.length; index++) {
              this.state.selected_mc_object.push({ mc_name: this.state.selected_mc[index] });
            }
            this.setState({ selected_mc_object: this.state.selected_mc_object });
            console.log(this.state.selected_mc);
            console.log(this.state.selected_mc_object);
          }}
        >
          <div className="row" style={{ paddingLeft: 5, paddingRight: 5 }}>
            <div> {item.mc_name}</div>
            <div style={{ fontWeight: "bold" }}>&nbsp;X</div>
          </div>
        </button>
      ));
    }
  };
  

  render() {
    return (<div className="content-wrapper">

      <section className="content-header">
        <div className="container-fluid">
          <h2 className="text-center" style={{ fontWeight: 'bold' }} >IRB GRINDING YIELD </h2>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-warning color-palette-box">
                <div className="card-header">
                  <h2 className="card-title">
                    <i className="fas fa-chart-pie" />
                    <b> YIELD RESULT </b>
                  </h2>
                </div>
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-3">
                    <div className="card-body">
                      <div className="form-group">
                        <label> START DATE </label>
                        <input
                          class="form-control"
                          type="date"
                          id="id_daydate"
                          name="name_daydate"
                          value={this.state.date_start}
                          onChange={async (e) => {
                            await this.setState({
                              date_start: moment(e.target.value).format("YYYY-MM-DD"),
                              //Enddate: moment(e.target.value).format("YYYY/MM/DD"),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3" >
                    <div className="card-body">
                      <div class="form-group" >
                        <div>
                          <label> END DATE </label>
                          <input
                            class="form-control"
                            type="date"
                            id="id_daydate"
                            name="name_daydate"
                            value={this.state.date_end}
                            onChange={async (e) => {
                              await this.setState({
                                date_end: moment(e.target.value).format("YYYY-MM-DD"),
                                //Enddate: moment(e.target.value).format("YYYY/MM/DD"),
                              });
                            }}
                          />
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* <div className="col-md-3" >
                      <div className="card-body">
                        <div className="form-group">
                          <label> PROCESS </label>
                          <select className="custom-select rounded-2" disabled id="exampleSelectRounded0"
                            onChange={(e) => {
                              this.setState({ selected_process: e.target.value })
                            }} value={this.state.selected_process}
                          >
                            <option>ARP</option>
                          </select>
                        </div>
                      </div>
                    </div> */}
                  {/* <div className="col-md-3" >
                        <div className="card-body">
                          <div className="form-group">
                            <label> SHIFT </label>
                            <select className="custom-select rounded-2" id="exampleSelectRounded0"
                              onChange={(e) => {
                                this.setState({ selected_shift: e.target.value });
                              }} value={this.state.selected_shift}
                            >
                              <option value="M">Day (M)</option>
                              <option value="N">Night (N)</option>
                            </select>
                          </div>
                        </div>
                      </div> */}

                </div>

                <div className="row" >
                  <div className="col-md-3">  </div>
                  <div className="col-md-3">
                    <div>
                      <h5 style={{ textAlign: 'center' }} >
                        <i class="fa fa-memory">&nbsp;</i>Machine
                      </h5>
                      <div style={{ borderStyle: "groove", borderRadius: 5 }}> &nbsp;{this.renderTable_machine()}</div>
                      <div className="card">
                        <div className="card-body table-responsive p-0" style={{ height: 200, textAlign: 'center' }}>
                          <table className="table table-head-fixed text-nowrap">
                            <tbody>
                              <tr>
                                <td>
                                  <Link
                                    style={{ fontWeight: "bold" }}
                                    onClick={async (e) => {
                                      if (this.state.selected_mc.length == 10) {
                                        Swal.fire({
                                          icon: "error",
                                          title: "Limit Machine = 10",
                                          // text: "Network Disconnected",
                                        });
                                        e.target.checked = false;
                                        return;
                                      } else {
                                        // this.state.selected_mc.push(item.mc_name);
                                        // this.state.selected_mc_object.push({ mc: item.mc_name });
                                      }
                                      await this.setState({ selected_mc_object: [] });
                                      for (let index = 0; index < this.state.list_machine_ARP.length; index++) {
                                        this.state.selected_mc.push(this.state.list_machine_ARP[index].mc_name);
                                        this.state.selected_mc_object.push({ mc_name: this.state.list_machine_ARP[index].mc_name });
                                      }
                                      this.setState({ selected_mc_object: this.state.selected_mc_object });
                                      console.log(this.state.selected_mc);
                                      console.log(this.state.selected_mc_object);
                                    }}
                                  >
                                    All
                                  </Link>
                                </td>
                              </tr>
                              {this.renderTableRow()}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* end */}
                  <div className="col-md-1"></div>
                  <div className="col-md-2">
                    <br /><br /><br />
                    <button type="submit" class="btn btn-block btn-success"

                      onClick={async (e) => {
                        e.preventDefault();


                        await this.setState({
                          display_table: "flex",
                          display_edit: "flex",
                        })

                      }}

                    > <i className="fas fa-search" /> &nbsp; SEARCH </button>

                    <button
                      type="submit"
                      class="btn btn-block btn-secondary"
                      style={{ textAlign: "center" }}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.reload(false);

                        this.setState({
                          display_table: "flex",
                          display_edit: "none",
                        })
                      }}
                    > <i className="fas fa-undo" /> &nbsp;
                      CLEAR
                    </button>

                  </div>

                </div>


              </div>
            </div>

          </div>
        </div>
      </section>

    </div>);
  }
}

export default Yield_AN;
