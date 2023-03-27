import React, { Component } from "react";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/constance"
import moment from "moment";
import Swal from "sweetalert2";
import ReactApexChart from "react-apexcharts";

import { BrowserRouter as Router, Link } from "react-router-dom";

class PR_AN extends Component {
  constructor(props) {
    super(props);
    this.state = {

      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),

      selected_process: "AN",
      list_machine: [],
      selected_mc: [],
      selected_mc_object: [],

      options: {},
      series: [],
      all_series: [],
      all_options: {},
      monthly_output_series: [],
      monthly_output_options: {},
      CT_F_series: [],
      CT_F_options: {},
      CT_R_series: [],
      CT_R_options: {},
      UTL_F_series: [],
      UTL_F_options: {},
      UTL_R_series: [],
      UTL_R_options: {},
    }
  }

  getdate = async () => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    await this.setState({
      date_start: moment(firstDay).format("YYYY-MM-DD"),
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),
    });
    // console.log(this.state.date_start);
    // console.log(this.state.date_end);
  }

  componentDidMount = async () => {
    await this.getdate();

    let mc_list_data = await httpClient.post(server.AN_MC_LIST);
    await this.setState({
      list_machine: mc_list_data.data.result,
    });
    //console.log(mc_list_data.data.result);
  }

  renderTableRow = () => {
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
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
                  // console.log(this.state.selected_mc);
                  // console.log(this.state.selected_mc_object);
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

  click_submit = async () => {
    try {
      await this.data_by_total();
      await this.data_by_mc();
      await this.month_data_output();
      await this.getDaily_Data_utl_CT();

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ไม่พบข้อมูล',
      })
    }

  }

  data_by_total = async () => {
    let day_ttl = await httpClient.post(server.DAILY_TOTAL_AN, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      process: this.state.selected_process,
      selected_mc: this.state.selected_mc,
    });
    //console.log(day_ttl.data);
    var label_ttl = [];
    var ttl_data = [];
    var ttl_target = [];

    for (let index = 0; index < day_ttl.data.result.length; index++) {
      label_ttl.push(day_ttl.data.result[index].mfg_date);
      ttl_data.push(day_ttl.data.result[index].Qty_output);
      ttl_target.push(day_ttl.data.result[index].target);
    }
    await this.setState({
      all_series: [
        {
          name: "TOTAL OUTPUT",
          type: "column",
          data: ttl_data,
        },

        {
          name: "TARGET",
          type: "line",
          data: ttl_target,
        },
      ],
      all_options: {
        title: {
          text: "AUTO NOISE TOTAL OUTPUT",
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: [0, 2, 2, 2],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
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
            stops: [100, 100, 100, 100],
          },
        },
        labels: label_ttl,
        markers: {
          size: 0,
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
            text: "QTY(pcs)",
            style: {
              fontSize: '20px',
            }
          },
          // min: 0,
          // max: 50000,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " pcs";
              }
              return y;
            },
          },
        },
      },
    });

  }
  data_by_mc = async () => {
    let mc_ttl = await httpClient.post(server.DAILY_OUT_MC_AN, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      process: this.state.selected_process,
      selected_mc: this.state.selected_mc,
    });
    //console.log(mc_ttl.data);
    if ((mc_ttl.data.result.length == 0) && (mc_ttl.data.api_result === 'ok')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select machine',
        //footer: '<a href="">Why do I have this issue?</a>'
      })
    }
    var label_by_mc = mc_ttl.data.my_list;
    var data_by_mc = [];
    var target_by_mc = [];

    for (let i = 0; i < mc_ttl.data.result.length; i++) {
      //--
      var my_array = []
      for (let index = 0; index < mc_ttl.data.result[i].date_data.split(",").length; index++) {

        if (mc_ttl.data.result[i].date_data.split(",")[index] == '') {
          // console.log('-');
          my_array.push(null)
        } else {
          // console.log(mc_ttl.data.result[i].date_data.split(",")[index]);
          my_array.push(mc_ttl.data.result[i].date_data.split(",")[index])
        }
      }
      console.log(my_array);
      //-
      data_by_mc.push({
        name: mc_ttl.data.result[i].mc_name,
        type: "column",
        data: my_array,
      });
    }

    //console.log(mc_ttl.data.result[0].date_data.split(",").length);
    //console.log(mc_ttl.data.result[0].target);
    for (let j = 0; j < mc_ttl.data.result[0].date_data.split(",").length; j++) {
      target_by_mc.push(mc_ttl.data.result[0].target);
    }
    // {
    //
    // }

    data_by_mc.push({
      name: `TARGET`,
      type: "line",
      data: target_by_mc,
    });

    // console.log(target_by_mc);
    console.log(data_by_mc);
    await this.setState({
      series: data_by_mc,
      options: {
        title: {
          text: 'AUTO NOISE OUTPUT BY MACHINE',
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        stroke: {
          // width: [0, 2, 5,0, 2, 5],
          curve: "smooth",
        },

        // theme: {
        //   mode: 'light',
        //   palette: 'palette5',
        //   monochrome: {
        //     enabled: false,
        //     color: '#255aee',
        //     shadeTo: 'light',
        //     shadeIntensity: 0.65
        //   },
        // },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            dataLabels: {
              position: 'center',
              orientation: 'vertical',
            },
          },
        },
        dataLabels: {
          enabled: true,
          // position: 'center',
          offsetX: 0,
          offsetY: 0
        },
        legend: {
          position: 'bottom',

        },

        fill: {
          // opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "horizontal",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: label_by_mc,
        markers: {
          size: 2,
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
            text: "QTY(pcs)",
            style: {
              fontSize: '20px',
            }
          },
          // min: 0,
          // max: 50000,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                // return y.toFixed(0) + " pcs";
              }
              return y;
            },
          },
        },
      },
    });
  };

  month_data_output = async () => {
    let day_ttl = await httpClient.post(server.MONTHLY_total_outputAN, {

      selected_mc: this.state.selected_mc,
    });
    // console.log(day_ttl.data);
    var label_ttl = [];
    var ttl_data = [];
    // var ttl_target = [];

    for (let index = 0; index < day_ttl.data.result.length; index++) {
      label_ttl.push(day_ttl.data.result[index].month);
      ttl_data.push(day_ttl.data.result[index].qty);
      // ttl_target.push(day_ttl.data.result[index].target);
    }
    await this.setState({
      monthly_output_series: [
        {
          name: "total output",
          // type: "column",
          data: ttl_data,
        },

      ],
      monthly_output_options: {
        title: {
          text: "AUTO NOISE MONTHLY OUTPUT",
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: false,
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
          type: "text",
          categories: label_ttl,
        },
        yaxis: {
          title: {
            text: "Qty(pcs)",
            style: {
              fontSize: '20px',
            }
          },
          // tickAmount: 20,
          // min: 0,
          // max: 100
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
    });
  };

  getDaily_Data_utl_CT = async () => {
    let day_ct_R = await httpClient.post(server.daily_CT_Rear_AN, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      selected_mc: this.state.selected_mc,
    });
    let day_ct_F = await httpClient.post(server.daily_CT_Front_AN, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      selected_mc: this.state.selected_mc,
    });
    // console.log(day_ct_R.data);
    // console.log(day_ct_F.data);
    var label_ct_R = [];
    var ct_data_R = [];
    var ct_target_R = [];
    var label_ct_F = [];
    var ct_data_F = [];
    var ct_target_F = [];

    for (let x = 0; x < day_ct_R.data.result.length; x++) {
      label_ct_R.push(day_ct_R.data.result[x].registered_at);
      ct_data_R.push(day_ct_R.data.result[x].ct);
      ct_target_R.push(day_ct_R.data.result[x].target);
    }
    for (let y = 0; y < day_ct_F.data.result.length; y++) {
      label_ct_F.push(day_ct_F.data.result[y].registered_at);
      ct_data_F.push(day_ct_F.data.result[y].ct);
      ct_target_F.push(day_ct_F.data.result[y].target);
    }
    await this.setState({
      CT_F_series: [
        {
          name: "CT",
          type: "column",
          data: ct_data_F,
        },

        {
          name: "TARGET",
          type: "line",
          data: ct_target_F,
        },
      ],
      CT_F_options: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "CYCLE TIME (FRONT)",
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth",
        },

        plotOptions: {
          bar: {
            columnWidth: "50%",
            dataLabels: {
              position: 'center',
              orientation: 'vertical',
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
        labels: label_ct_F,
        markers: {
          size: 3,
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "DATE",
            style: {
              fontSize: '20px',
            }
          },
        },
        yaxis: {
          title: {
            text: "sec",
            style: {
              fontSize: '20px',
            }
          },
          min: 0,
          // max: 50000,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                // return y.toFixed(0) + " pcs";
              }
              return y;
            },
          },
        },
      },
    });
    await this.setState({
      CT_R_series: [
        {
          name: "CT",
          type: "column",
          data: ct_data_R,
        },

        {
          name: "TARGET",
          type: "line",
          data: ct_target_R,
        },
      ],
      CT_R_options: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "CYCLE TIME (REAR) ",
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth",
        },

        plotOptions: {
          bar: {
            columnWidth: "50%",
            dataLabels: {
              position: 'center',
              orientation: 'vertical',
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
        labels: label_ct_R,
        markers: {
          size: 3,
        },
        xaxis: {
          type: "text",
          title: {
            text: "DATE",
            style: {
              fontSize: '20px',
            }
          },
        },
        yaxis: {
          title: {
            text: "sec",
            style: {
              fontSize: '20px',
            }
          },
          min: 0,
          // max: 50000,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                // return y.toFixed(0) + " pcs";
              }
              return y;
            },
          },
        },
      },
    });

    let day_UTL_R = await httpClient.post(server.daily_UTL_Rear_AN, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      selected_mc: this.state.selected_mc,
    });
    let day_UTL_F = await httpClient.post(server.daily_UTL_Front_AN, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      selected_mc: this.state.selected_mc,
    });
      console.log(day_UTL_R.data);
    console.log(day_UTL_F.data);
    var label_utl_R = [];
    var utl_data_R = [];
    var label_utl_F = [];
    var utl_data_F = [];
    for (let i = 0; i < day_UTL_R.data.result.length; i++) {
      label_utl_R.push(day_UTL_R.data.result[i].registered_at);
      utl_data_R.push(day_UTL_R.data.result[i].utl);
    }
    for (let a = 0; a < day_UTL_F.data.result.length; a++) {
      label_utl_F.push(day_UTL_F.data.result[a].registered_at);
      utl_data_F.push(day_UTL_F.data.result[a].utl);
    }
    await this.setState({
      UTL_F_series:[
        {
          name: "UTL",
          type: "column",
          data: utl_data_F,
        },
      ],
      UTL_F_options: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "UTL (FRONT)",
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth",
        },

        plotOptions: {
          bar: {
            columnWidth: "50%",
            dataLabels: {
              position: 'center',
              orientation: 'vertical',
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
        labels: label_utl_F,
        markers: {
          size: 3,
        },
        xaxis: {
          type: "text",
          title: {
            text: "DATE",
            style: {
              fontSize: '20px',
            }
          },
        },
        yaxis: {
          title: {
            text: "%",
            style: {
              fontSize: '20px',
            }
          },
          min: 0,
          max: 100,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + "%";
              }
              return y;
            },
          },
        },
      },
    });
    await this.setState({
      UTL_R_series:[
        {
          name: "UTL",
          type: "column",
          data: utl_data_R,
        },
      ],
      UTL_R_options:{
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "UTL (REAR)",
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth",
        },

        plotOptions: {
          bar: {
            columnWidth: "50%",
            dataLabels: {
              position: 'center',
              orientation: 'vertical',
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
        labels: label_utl_R,
        markers: {
          size: 3,
        },
        xaxis: {
          type: "text",
          title: {
            text: "DATE",
            style: {
              fontSize: '20px',
            }
          },
        },
        yaxis: {
          title: {
            text: "%",
            style: {
              fontSize: '20px',
            }
          },
          min: 0,
          max: 100,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + "%";
              }
              return y;
            },
          },
        },
      },
    });

  }

  render() {
    return (<div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <h2 className="text-center" style={{ fontWeight: 'bold' }} >AUTO NOISE PRODUCTION RESULT </h2>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-success color-palette-box">
                <div className="card-header">
                  <h2 className="card-title">
                    <i className="fas fa-chart-bar" />
                    <b> DAILY RESULT </b>
                  </h2>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">  </div>
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
                    </div>
                  </div>

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
                        <div className="card-body table-responsive p-0" style={{ height: 'auto', textAlign: 'center' }}>
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
                                      for (let index = 0; index < this.state.list_machine.length; index++) {
                                        this.state.selected_mc.push(this.state.list_machine[index].mc_name);
                                        this.state.selected_mc_object.push({ mc_name: this.state.list_machine[index].mc_name });
                                      }
                                      this.setState({ selected_mc_object: this.state.selected_mc_object });
                                      // console.log(this.state.selected_mc);
                                      // console.log(this.state.selected_mc_object);
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

                  <div className="col-md-1"></div>
                  <div className="col-md-2">
                    <br /> <br />
                    <button type="submit" class="btn btn-block btn-success"
                      onClick={(e) => {
                        e.preventDefault();
                        this.click_submit();
                      }}><i className="fas fa-search" /> &nbsp; SEARCH</button>

                    <button
                      type="submit"
                      class="btn btn-block btn-secondary"
                      style={{ textAlign: "center" }}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.reload(false);
                      }}
                    > <i className="fas fa-undo" /> &nbsp;
                      RESET
                    </button>

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
                  <div className="col-md-12">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={550} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* output  */}
          <div className="row">
            <div className="col-md-12"></div>
            <div className="card card-warning" style={{ width: "99%" }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <ReactApexChart options={this.state.all_options} series={this.state.all_series} type="line" height={550} />
                  </div>
                  <div className="col-md-6">
                    <ReactApexChart options={this.state.monthly_output_options} series={this.state.monthly_output_series} type="bar" height={550} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* CT_R and CT_F */}
          <div className="row">
            <div className="col-md-12"></div>
            <div className="card card-warning" style={{ width: "99%" }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <ReactApexChart options={this.state.CT_F_options} series={this.state.CT_F_series} type="line" height={550} />
                  </div>
                  <div className="col-md-6">
                    <ReactApexChart options={this.state.CT_R_options} series={this.state.CT_R_series} type="bar" height={550} />
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
                    <ReactApexChart options={this.state.UTL_F_options} series={this.state.UTL_F_series} type="line" height={550} />
                  </div>
                  <div className="col-md-6">
                    <ReactApexChart options={this.state.UTL_R_options} series={this.state.UTL_R_series} type="bar" height={550} />
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

export default PR_AN;
