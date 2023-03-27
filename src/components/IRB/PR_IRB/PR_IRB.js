import React, { Component } from "react";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/constance"
import moment from "moment";
import Swal from "sweetalert2";
import { BrowserRouter as Router, Link } from "react-router-dom";

import ReactApexChart from "react-apexcharts";

class PR_IRB extends Component {


  constructor(props) {
    super(props);
    this.state = {

      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),

      selected_process: "IRB",
      list_machine: [],
      selected_mc: [],
      selected_mc_object: [],
      options: {},
      series: [],

      all_series: [],
      all_options: {},
      monthly_output_options: {},
      monthly_output_series: [],
      all_series_ct: [],
      all_options_ct: {},
      all_series_utl: [],
      all_options_utl: {},
      monthly_ct_series: [],
      monthly_ct_options: {},
      monthly_utl_series: [],
      monthly_utl_options: {},

    }
  }

  getDate = async () => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    await this.setState({
      date_start: moment(firstDay).format("YYYY-MM-DD"),
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),
    });
  }
  componentDidMount = async () => {
    this.getDate();
    let mc_list_data = await httpClient.post(server.list_machine_IRB1);
    await this.setState({
      list_machine: mc_list_data.data.result,
      // date_start: moment("2022-10-29").add(-0, "days").format("YYYY-MM-DD"),
    });
  }

  renderTable_machine = () => {
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

  renderTable_selected_machine = () => {
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
      await this.daily_CTandUTL();
      await this.month_CTandUTL();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ไม่พบข้อมูล',
      })
    }
  }

  data_by_total = async () => {
    let day_ttl = await httpClient.post(server.DAILY_TOTAL_IRB, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      process: this.state.selected_process,
      selected_mc: this.state.selected_mc,
    });
    console.log(day_ttl.data);
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
        chart: {
          // height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "IRB TOTAL OUTPUT",
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        stroke: {
          // width: [0, 2, 5],
          width: 3,
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
          // dataLabels: {
          //   position: 'center',
          // },
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
          size: 4,
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
    let mc_ttl = await httpClient.post(server.IRB_DAILY_OUT_MC, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      process: this.state.selected_process,
      selected_mc: this.state.selected_mc,
    });
    console.log(mc_ttl.data);
    // if ((mc_ttl.data.result.length == 0) && (mc_ttl.data.api_result === 'ok')) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Please select machine',
    //   })
    // }
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
    // console.log(this.state.selected_mc);
    // console.log(mc_ttl.data.result[0].split(",").length);
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
          text: 'IRB OUTPUT BY MACHINE',
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
              position: 'top',
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
          min: 0,
          max: 50000,
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
    let day_ttl = await httpClient.post(server.MONTHLY_total_output_IRB, {

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
          text: "IRB MONTHLY OUTPUT",
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

  daily_CTandUTL = async () => {
    let day_ct = await httpClient.post(server.daily_CT_IRB, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      selected_mc: this.state.selected_mc,
    });
    console.log(day_ct.data);
    var label_ct = [];
    var ct_data = [];
    var ct_target = [];
    for (let x = 0; x < day_ct.data.result.length; x++) {
      label_ct.push(day_ct.data.result[x].registered_at);
      ct_data.push(day_ct.data.result[x].ct);
      ct_target.push(day_ct.data.result[x].target);
    }
    let day_UTL = await httpClient.post(server.daily_UTL_IRB, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      selected_mc: this.state.selected_mc,
    })
    var label_utl = [];
    var utl_data = [];
    for (let y = 0; y < day_UTL.data.result.length; y++) {
      label_utl.push(day_UTL.data.result[y].registered_at);
      utl_data.push(day_UTL.data.result[y].utl);
    }
    console.log(day_UTL.data);
    await this.setState({
      all_series_ct: [
        {
          name: "CT",
          type: "column",
          data: ct_data,
        },

        {
          name: "TARGET",
          type: "line",
          data: ct_target,
        },
      ],
      all_options_ct: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "CYCLE TIME ",
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
        labels: label_ct,
        markers: {
          size: 3,
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
                return y.toFixed(0) + " pcs";
              }
              return y;
            },
          },
        },
      },
    });

    await this.setState({
      all_series_utl: [
        {
          name: "UTL",
          type: "column",
          data: utl_data,
        },
      ],
      all_options_utl: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "UTL ",
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
        labels: label_utl,
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
  month_CTandUTL = async () => {
    let day_ct = await httpClient.post(server.CT_month_IRB, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      selected_mc: this.state.selected_mc,
    })
    console.log(day_ct.data);
    var label_ct = [];
    var ct_data = [];
    var ct_target = [];
    for (let x = 0; x < day_ct.data.result.length; x++) {
      label_ct.push(day_ct.data.result[x].month);
      ct_data.push(day_ct.data.result[x].ct);

    }
    let day_UTL = await httpClient.post(server.UTL_month_IRB, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      selected_mc: this.state.selected_mc,
    })
    var label_utl = [];
    var utl_data = [];
    for (let y = 0; y < day_UTL.data.result.length; y++) {
      label_utl.push(day_UTL.data.result[y].month);
      utl_data.push(day_UTL.data.result[y].utl);
    }
    console.log(day_UTL.data);
    await this.setState({
      monthly_ct_series: [
        {
          name: "CT",
          type: "column",
          data: ct_data,
        },

      ],
      monthly_ct_options: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "AVERAGE CYCLE TIME (Month)",
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
        labels: label_ct,
        markers: {
          size: 3,
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
                return y.toFixed(0) + " pcs";
              }
              return y;
            },
          },
        },
      },
    });
    await this.setState({
      monthly_utl_series: [
        {
          name: "UTL",
          type: "column",
          data: utl_data,
        },
      ],
      monthly_utl_options: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "AVERAGE UTL (Month) ",
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
        labels: label_utl,
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
          <h2 className="text-center" style={{ fontWeight: 'bold' }} >IRB GRINDING RESULT </h2>
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
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-3">  </div>
                        <div className="col-md-3" >
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

                        <div className="col-md-3" >
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

                        {/* <div className="col-md-3" >
                          <div className="card-body">
                            <div className="form-group">
                              <label> PROCESS </label>
                              <select className="custom-select rounded-2" disabled id="exampleSelectRounded0"
                                onChange={(e) => {
                                  this.setState({ selected_process: e.target.value })
                                }} value={this.state.selected_process}
                              >
                                <option>GD</option> 
                              </select>
                            </div>
                          </div>
                        </div> */}

                      </div>
                    </div>

                  </div>
                  <div className="row" >
                    <div className="col-md-3">  </div>
                    <div className="col-md-3">
                      <div>
                        <h5 style={{ textAlign: 'center' }} >
                          <i class="fa fa-memory">&nbsp;</i> Machine
                        </h5>
                        <div style={{ borderStyle: "groove", borderRadius: 5 }}> &nbsp;{this.renderTable_selected_machine()}</div>
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
                                        for (let index = 0; index < this.state.list_machine.length; index++) {
                                          this.state.selected_mc.push(this.state.list_machine[index].mc_name);
                                          this.state.selected_mc_object.push({ mc_name: this.state.list_machine[index].mc_name });
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
                                {this.renderTable_machine()}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-1"></div>
                    <div className="col-md-2">
                      <br /><br /> <br />
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
          <div className="row">
            <div className="col-md-12"></div>
            <div className="card card-warning" style={{ width: "99%" }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <ReactApexChart options={this.state.all_options_ct} series={this.state.all_series_ct} type="line" height={550} />
                  </div>
                  <div className="col-md-6">
                    <ReactApexChart options={this.state.monthly_ct_options} series={this.state.monthly_ct_series} type="line" height={550} />
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
                    <ReactApexChart options={this.state.all_options_utl} series={this.state.all_series_utl} type="bar" height={550} />
                  </div>
                  <div className="col-md-6">
                    <ReactApexChart options={this.state.monthly_utl_options} series={this.state.monthly_utl_series} type="bar" height={550} />
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

export default PR_IRB;
