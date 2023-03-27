import React, { Component } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constance/constance"
import ReactApexChart from "react-apexcharts";

class Ct extends Component {


  constructor(props) {
    super(props);
    this.state = {
      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),
      selected_process: "",
      selected_shift: "M",
      selected_machine: "",

      list_machine: [],
      selected_mc: [],

      display_table: "flex",
      display_edit: "none",
      ct_series: [],
      ct_option: {},
      list_machine_MBR: [],
    }
  }

  componentDidMount = async () => {
    let mc_list_data = await httpClient.post(server.LIST_MC);
    let mc_list_data_MBR = await httpClient.post(server.list_machine_MBR);
    await this.setState({
      list_machine: mc_list_data.data.result,
      selected_process: "MBR",
      list_machine_MBR: mc_list_data_MBR.data.result,

      //date_start: moment("2022-09-13").add(-0, "days").format("YYYY-MM-DD"),
      //date_end: moment("2022-09-14").add(-0, "days").format("YYYY-MM-DD"),
    });

  }
 
  renderTableRow_MBR = () => {
    try {
      // const { result, isFetching } = this.props.listuserReducer;
      if (this.state.list_machine_MBR !== null) {
        const myResult = this.state.list_machine_MBR;
        // const result = this.state.list_machine_MBR;
        return myResult.map((item) => <option>{item.mc_name}</option>);
      }
    } catch (error) { }
  };

  renderTable_machine_MBR = () => {
    try {
      // const { result, isFetching } = this.props.listuserReducer;
      if (this.state.list_machine_MBR !== null) {
        const myResult = this.state.list_machine_MBR;
        return myResult.map((item) => (
          <tr>
            <td>
              <input
                // disabled={true}
                type="checkbox" style={{ width: '20px', height: '20px' }}
                // checked
                onChange={async (e) => {
                  if (e.target.checked == true) {
                    if (this.state.selected_mc.length == 10) {
                      Swal.fire({
                        icon: "error",
                        title: "Limit Machine = 10",
                        // text: "Network Disconnected",
                      });
                      e.target.checked = false;
                      return;
                    } else {
                      await this.state.selected_mc.push(item.mc_name);
                    }
                  } else {
                    var people = this.state.selected_mc;
                    var toRemove = item.mc_name;
                    var index = people.indexOf(toRemove);
                    if (index > -1) {
                      people.splice(index, 1);
                    }
                  }
                  console.log(this.state.selected_mc);
                }}
              />
            </td>
            <td>{item.mc_name}</td>
          </tr>
        ));
      }
    } catch (error) { }
  };

  ct_by_machine = async () => {
    let ct_by_machine = await httpClient.post(server.CT_URL, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      process: this.state.selected_process,
      selected_shift: this.state.selected_shift,
      selected_mc: this.state.selected_mc,
    })
    //console.log(ct_by_machine.data);
    await this.setState({
      ct : ct_by_machine.data.result
    })
    var label = [];
    var ct_data = [];
    var mc_data = [];
    for (let i = 0; i < ct_by_machine.data.result.length; i++) {

      label.push(ct_by_machine.data.result[i].mfg_date);
      ct_data.push(ct_by_machine.data.result[i].ct);
      mc_data.push(ct_by_machine.data.result[i].mc_name);
    }
//console.log(label);
    // กราฟ 
    this.setState({
      ct_series: [
        {
          name: "cycle time (sec)",
          type: "column",
          data: ct_data,
        },
        // {
        //   name: "Target",
        //   type: "line",
        //   data: target_yield,
        // },
      ],
      ct_option: {
        chart: {
          height: 500,
          type: "bar",
          stacked: false,
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "70%",
          },
        },

        fill: {
          // opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: label,
        markers: {
          size: 2,
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "Date",
            style: {
              fontSize: '20px',
            }
          },
        },
        yaxis: {
          title: {
            text: "ct",
            style: {
              fontSize: '20px',
            }
          },
          min: 0,
          max: 5
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(2) + " sec ";
              }
              return y;
            },
          },
        },
      },
    })
  }

  renderCT_Data() {
    if (this.state.ct != null) {
      return this.state.ct.map((item) =>
        <tr>
          <td>{item.mfg_date}</td>
          <td>{item.mc_name}</td>
          <td>{item.ct}</td>
        </tr>
      )

    }
  }
  render() {
    return (
      <div className="content-wrapper">

        <section className="content-header">
          <div className="container-fluid">
            <h2 className="text-center" style={{ fontWeight: 'bold' }} > </h2>
          </div>
        </section>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-danger" style={{ display: this.state.display_table }}>
                  <div className="card-header">
                    <h2 className="card-title">
                      <i class="fa fa-clock"></i> <b>Cycle-Time</b>
                    </h2>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-1">  </div>
                        <div className="col-md-3" >
                          <div className="card-body">
                            <div class="form-group" >
                              <div>
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
                        </div>

                        <div className="col-md-3" >
                          <div className="card-body">
                            <div class="form-group" >
                              <div>
                                <label> END DATE  </label>
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

                        <div className="col-md-3" >
                          <div className="card-body">
                            <div className="form-group">
                              <label> PROCESS </label>
                              <select className="custom-select rounded-2" id="exampleSelectRounded0"
                                onChange={(e) => {
                                  this.setState({ selected_process: e.target.value })
                                }} value={this.state.selected_process}
                              >
                                <option>MBR</option>
                                {/* <option>ARP</option> */}

                              </select>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                  <div className="row" >
                    <div className="col-md-3">  </div>
                    <div className="col-md-4" >
                      <div className="card-body">
                        <div className="form-group" >

                          <div style={{ width: "80%" }}>
                            <div className="card" >
                              <div
                                className="card-body table-responsive p-0"
                                style={{ height: 400 }}
                              >
                                <table className="table table-head-fixed text-nowrap "  >
                                  <thead >
                                    <tr>
                                      <th style={{ backgroundColor: 'DodgerBlue' }}></th>
                                      <th style={{ backgroundColor: 'DodgerBlue' }} >MACHINE</th>
                                    </tr>
                                  </thead>
                                  <tbody>{this.renderTable_machine_MBR()}</tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                        </div>


                      </div>
                    </div>

                    <div className="col-md-2">
                      <button type="submit" class="btn btn-block btn-success"
                        onClick={async(e) => {
                          await e.preventDefault();
                          await  this.ct_by_machine();

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

                        }}
                      > <i className="fas fa-undo" /> &nbsp;
                        CLEAR
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="row" style={{ width: "100%" }}>
              <div style={{ width: "5%" }}></div>
              <div className="card card" style={{ width: "100%", display: this.state.display_edit }}>
                <div className="card-body">
                  {/* <h3 className="text" style={{ textAlign: '30px' }}>TOTAL YIELD</h3> */}
                  <div className="row">
                    <div style={{ width: "2%" }}></div>
                    <div style={{ width: "60%" }}>
                      <ReactApexChart options={this.state.ct_option} series={this.state.ct_series} type="line" height={500} />
                    </div>

                    <div className="card-body" style={{ textAlign: "center" }}>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Mfg Date</th>
                            <th> Machine </th>
                            <th> Cycle Time</th>
                          
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderCT_Data()}

                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    );
  }
}

export default Ct;
