import React, { Component } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constance/constance"

import ReactApexChart from "react-apexcharts";
import { BrowserRouter as Router, Link } from "react-router-dom";

// MBR 
class Quality_Report extends Component {

  constructor(props) {
    super(props);
    this.state = {

      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),

      // selected_shift: "M",
      selected_process: "",
      selected_machine: "",
      // list_machine: [],
      // list_machine_ARP: [],
      list_machine_MBR: [],
      selected_mc: [],
      selected_mc_object: [],
      data_table: [],

      stack_defect_series: [],
      stack_defect_options: {},

      all_series: [],
      all_options: {},
      monthly_defect_series: [],
      monthly_defect_options: {},

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

    let mc_list_data_MBR = await httpClient.post(server.list_machine_MBR);
    console.log(mc_list_data_MBR.data.result);
    await this.setState({
      list_machine_MBR: mc_list_data_MBR.data.result,
      selected_process: "MBR",
    });

  };


  renderTableRow_MBR = () => {
    try {
      if (this.state.list_machine_MBR !== null) {
        const myResult = this.state.list_machine_MBR;
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
  };

  renderTable_machine_MBR = () => {
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


  total_yield = async () => {
    let get_data = await httpClient.post(server.TTL_yield, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      process: this.state.selected_process,
      selected_mc: this.state.selected_mc,
    })
    var label_ttl = [];
    var ttl_data = [];
    var target_yield = [];
    // var ttl_target = [];

    for (let index = 0; index < get_data.data.result.length; index++) {
      label_ttl.push(get_data.data.result[index].mfg_date);
      ttl_data.push(get_data.data.result[index].yield);
      target_yield.push(get_data.data.result[index].yield_target);
      // ttl_target.push(get_data.data.result[index].target);
    }

    await this.setState({
      all_series: [
        {
          name: "YIELD",
          type: "column",
          data: ttl_data,
        },

        {
          name: "TARGET",
          type: "line",
          data: target_yield,
        },
      ],
      all_options: {
        chart: {
          type: "line",
          stacked: false,
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "70%",
            dataLabels: {
              position: 'center',
            },
          },
        },
        dataLabels: {
          enabled: true,
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
        labels: label_ttl,
        markers: {
          size: 2,
        },
        title: {
          text: 'MBR YIELD',
          align: 'center',
          style: {
            fontSize: '45px',
            fontWeight: 'bold',
          }
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "DATE ",
            style: {
              fontSize: '20px',
            }
          },
        },
        yaxis: {
          title: {
            text: "YIELD (%)",
            style: {
              fontSize: '20px',
            }
          },
          tickAmount: 20,
          min: 0,
          max: 100
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(2) + " % ";
              }
              return y;
            },
          },
        },
      },
    });
  }

  //get detail yield data  ตาราง 
  total_yield_data = async () => {
    let total_yield_data = await httpClient.post(server.TTL_Yield_data, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      process: this.state.selected_process,
      // selected_shift: this.state.selected_shift,
      selected_mc: this.state.selected_mc,
    });
    //await console.log(total_yield_data.data);
    await this.setState({
      data_table: total_yield_data.data.result
    })
    //console.log(total_yield_data.data.result);
    if (this.state.selected_mc.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'เลือกข้อมูลไม่ครบ',
      })
    } if ((total_yield_data.data.result.length == 0) && total_yield_data.data.api_result === "ok") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ไม่พบข้อมูล',
      })
    }
  }
  renderTable() {
    if (this.state.data_table != null) {
      return this.state.data_table.map((item) =>
        <tr>
          <td>{item.mfg_date}</td>
          <td>{item.process}</td>
          <td>{item.input}</td>
          <td>{item.ok}</td>
          <td>{item.ng}</td>
          <td>{item.yield}</td>
        </tr>
      )

    }
    console.log(this.state.data_table);
  }

  NG_ratio = async () => {
    let ng_ratio_result = await httpClient.post(server.NG_ratio, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      process: this.state.selected_process,
      // selected_shift: this.state.selected_shift,
      selected_mc: this.state.selected_mc,
    })
    console.log(ng_ratio_result.data);
    await this.setState({
      yield_data: ng_ratio_result.data.result
    })

    var label_stack = [];
    var data_stack_ng_C1 = [];
    var data_stack_ng_C2 = [];
    var data_stack_ng_C3 = [];
    var data_stack_ng_C4 = [];
    var data_stack_ng_C5 = [];
    var data_stack_ng_RTNR = [];
    var data_stack_TURN_NG = [];
    var data_stack_CAMERA_NG = [];
    for (let k = 0; k < ng_ratio_result.data.result.length; k++) {
      label_stack.push(ng_ratio_result.data.result[k].mfg_date);
      data_stack_ng_C1.push(ng_ratio_result.data.result[k].C1_NG);
      data_stack_ng_C2.push(ng_ratio_result.data.result[k].C2_NG);
      data_stack_ng_C3.push(ng_ratio_result.data.result[k].C3_NG);
      data_stack_ng_C4.push(ng_ratio_result.data.result[k].C4_NG);
      data_stack_ng_C5.push(ng_ratio_result.data.result[k].C5_NG);
      data_stack_TURN_NG.push(ng_ratio_result.data.result[k].TURN_NG);
      data_stack_ng_RTNR.push(ng_ratio_result.data.result[k].RTNR_NG);
      data_stack_CAMERA_NG.push(ng_ratio_result.data.result[k].CAMERA_NG);
    }

    await this.setState({
      stack_defect_options: {
        // title: {
        //   text: "Defect",
        // },
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            dataLabels: {
              position: 'center',
            },
          },
        },
        title: {
          text: 'MBR NG RATIO',
          align: 'center',
          style: {
            fontSize: '45px',
            fontWeight: 'bold',
          }

        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          type: "text",
          categories: label_stack,
          title: {
            text: "DATE ",
            style: {
              fontSize: '20px',
            }
          },
        },
        yaxis: {
          title: {
            text: " % NG",
            style: {
              fontSize: '20px',
            }
          },
          min: 0,
          max: 5,
          tickAmount: 25,
        },
        legend: {
          position: "bottom",
          offsetY: 10,
        },
        fill: {
          opacity: 1,
        },

      },
      stack_defect_series: [

        {
          name: "C1 NG",
          data: data_stack_ng_C1,
        },
        {
          name: "C2 NG",
          data: data_stack_ng_C2,
        },
        {
          name: "C3 NG",
          data: data_stack_ng_C3,
        },
        {
          name: "C4 NG",
          data: data_stack_ng_C4,
        },
        {
          name: "C5 NG",
          data: data_stack_ng_C5,
        },
        {
          name: "Ball check camera qty(TURN NG)",
          data: data_stack_TURN_NG,
        },
        {
          name: "Press check NG (RTNR NG)",
          data: data_stack_ng_RTNR,
        },
        {
          name: "RTNR camera NG (CAMERA NG)",
          data: data_stack_CAMERA_NG,
        },
      ],

    })
  };
  renderNG_Data() {
    if (this.state.yield_data != null) {
      return this.state.yield_data.map((item) =>
        <tr>
          <td>{item.mfg_date}</td>
          <td>{item.C1_NG}</td>
          <td>{item.C2_NG}</td>
          <td>{item.C3_NG}</td>
          <td>{item.C4_NG}</td>
          <td>{item.C5_NG}</td>
          <td>{item.TURN_NG}</td>
          <td>{item.RTNR_NG}</td>
          <td>{item.CAMERA_NG}</td>

        </tr>
      )

    }
  }

  month_data_defect = async () => {
    let defect_stack = await httpClient.post(server.MONTHLY_DEFECT, {
      selected_mc: this.state.selected_mc,
    });

    var label_stack = [];
    var data_stack_ng_C1 = [];
    var data_stack_ng_C2 = [];
    var data_stack_ng_C3 = [];
    var data_stack_ng_C4 = [];
    var data_stack_ng_C5 = [];
    var data_stack_ng_RTNR = [];
    var data_stack_TURN_NG = [];
    var data_stack_CAMERA_NG = [];
    for (let k = 0; k < defect_stack.data.result.length; k++) {
      label_stack.push(defect_stack.data.result[k].month);
      data_stack_ng_C1.push(defect_stack.data.result[k].C1_NG);
      data_stack_ng_C2.push(defect_stack.data.result[k].C2_NG);
      data_stack_ng_C3.push(defect_stack.data.result[k].C3_NG);
      data_stack_ng_C4.push(defect_stack.data.result[k].C4_NG);
      data_stack_ng_C5.push(defect_stack.data.result[k].C5_NG);
      data_stack_TURN_NG.push(defect_stack.data.result[k].TURN_NG);
      data_stack_ng_RTNR.push(defect_stack.data.result[k].RTNR_NG);
      data_stack_CAMERA_NG.push(defect_stack.data.result[k].CAMERA_NG);
    }

    this.setState({
      monthly_defect_options: {
        title: {
          text: "MONTHLY DEFECT",
          align: 'center',
          style: {
            fontSize: '45px',
            fontWeight: 'bold',
          }
        },
        chart: {
          type: "bar",
          // height: 350,

          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          title: {
            text: "MONTH",
            style: {
              fontSize: '20px',
            }
          },
          categories: label_stack,
        },
        yaxis: {
          title: {
            text: "Qty(pcs)",
            style: {
              fontSize: '20px',
            }
          },
          tickAmount: 20,
          // min: 0,
          // max: 100
        },
        legend: {
          position: "bottom",
          offsetY: 10,
        },
        fill: {
          opacity: 1,
        },
      },
      monthly_defect_series: [
        {
          name: "C1 NG",
          data: data_stack_ng_C1,
        },
        {
          name: "C2 NG",
          data: data_stack_ng_C2,
        },
        {
          name: "C3 NG",
          data: data_stack_ng_C3,
        },
        {
          name: "C4 NG",
          data: data_stack_ng_C4,
        },
        {
          name: "C5 NG",
          data: data_stack_ng_C5,
        },
        {
          name: "Ball check camera qty(TURN NG)",
          data: data_stack_TURN_NG,
        },
        {
          name: "Press check NG (RTNR NG)",
          data: data_stack_ng_RTNR,
        },
        {
          name: "RTNR camera NG (CAMERA NG)",
          data: data_stack_CAMERA_NG,
        },
      ],
    });
  };

  render() {
    return (
      <div className="content-wrapper" style={{ minHeight: 1662 }}>
        <section className="content-header">
          <div className="container-fluid">
            <h2 className="text-center" style={{ fontWeight: 'bold' }} > MBR YIELD REPORT </h2>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-warning" style={{ display: this.state.display_table }}>
                  <div className="card-header">
                    <h3 className="card-title"> <i class="fa fa-chart-pie"> </i><b>  YIELD AND NG RATIO </b> </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-3"> </div>
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
                            <select className="custom-select rounded-2" id="exampleSelectRounded0"
                              onChange={(e) => {
                                this.setState({ selected_process: e.target.value })
                              }} value={this.state.selected_process}
                            >
                              <option>MBR</option>
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
                          <div style={{ borderStyle: "groove", borderRadius: 5 }}> &nbsp;{this.renderTable_machine_MBR()}</div>
                          <div className="card">
                            <div className="card-body table-responsive p-0" style={{  height: 200, textAlign: 'center' }}>
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
                                          for (let index = 0; index < this.state.list_machine_MBR.length; index++) {
                                            this.state.selected_mc.push(this.state.list_machine_MBR[index].mc_name);
                                            this.state.selected_mc_object.push({ mc_name: this.state.list_machine_MBR[index].mc_name });
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
                                  {this.renderTableRow_MBR()}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>


                      {/* end */}
                      <div className="col-md-1"></div>
                      <div className="col-md-2">
                        <br/><br/><br/>
                        <button type="submit" class="btn btn-block btn-success"

                          onClick={async (e) => {
                            e.preventDefault();
                            await this.total_yield();
                            await this.total_yield_data();
                            await this.NG_ratio();
                            await this.month_data_defect();

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


            <div className="row">
              <div className="col-md-12"></div>
              <div className="card card" style={{ width: "100%", display: this.state.display_edit }}>
                <div className="card-body">
                  {/* <h3 className="text" style={{ textAlign: '30px' }}>TOTAL YIELD</h3> */}
                  <div className="row">
                    <div className="col-md-12">
                      <ReactApexChart options={this.state.all_options} series={this.state.all_series} type="line" height={700} />
                    </div>
           
                   
                  </div>
                </div>
              </div>

            </div>

            <div className="row">
              <div className="col-md-12"></div>
              <div className="card card-warning" style={{ width: "99%" }}>
                <div className="card-body">
                  <div className="row">
                  <div className="col-md-6"> 
                  <ReactApexChart options={this.state.stack_defect_options} series={this.state.stack_defect_series} type="bar" height={700} />
                  </div>
                    <div className="col-md-6">

                      <div id="chart"><ReactApexChart options={this.state.monthly_defect_options} series={this.state.monthly_defect_series} type="bar" height={700} /></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* end  */}
            {/* ตาราง detail  */}
            <section className="content">
              <div className="container-fluid">
                <div className="row" style={{ width: "100%" }} >
                  {/* <div style={{ width: "0%" }}></div> */}
                  <div className="card" style={{ width: "50%", display: this.state.display_edit }}>
                    <div className="card-header">
                      <h3 className> Data Table</h3>
                    </div>
                    <div className="card-body" style={{ textAlign: "center", fontSize: "14px" }}>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Mfg Date</th>
                            <th>Progress</th>
                            <th>TTL Input </th>
                            <th> OK </th>
                            <th> NG </th>
                            <th> Yield (%) </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderTable()}

                        </tbody>
                      </table>
                    </div>

                  </div>
                  {/* <div style={{ width: "0%" }}></div> */}
                  <div className="card" style={{ width: "50%", display: this.state.display_edit }}>
                    <div className="card-header">
                      <h3 className> NG Ratio</h3>
                    </div>
                    <div className="card-body" style={{ textAlign: "center", fontSize: "14px" }}>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>C1 NG</th>
                            <th>C2 NG</th>
                            <th>C3 NG </th>
                            <th>43 NG </th>
                            <th>C5 NG </th>
                            <th>TURN NG</th>
                            <th>RTNR_NG</th>
                            <th>CAMERA_NG</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderNG_Data()}

                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>
              </div>
            </section>


          </div>
        </section >
      </div >)
  }
}

export default Quality_Report;
