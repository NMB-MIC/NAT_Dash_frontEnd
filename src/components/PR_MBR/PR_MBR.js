import React, { Component } from "react";
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constance/constance"
import moment from "moment";
import Swal from "sweetalert2";

import ReactApexChart from "react-apexcharts";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";



class PR_MBR extends Component {
  constructor(props) {
    super(props);
    this.state = {

      process: [],
      selected_process: "MBR",
      list_machine: [],
      list_machine_ARP: [],
      list_machine_MBR: [],
      selected_mc_object: [],
      selected_mc: [],

      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),

      series: [],
      options: {},

      all_series: [],
      all_options: {},

      log_series: [],
      log_options: {},
      ball_use_series: [],
      ball_use_options: {},
      monthly_ball_use_series: [],
      monthly_ball_use_options: {},
      monthly_output_series: [],
      monthly_output_options: {},
      monthly_log_series: [],
      monthly_log_options: {},



    }
  };

  componentDidMount = async () => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    await this.setState({
      date_start: moment(firstDay).format("YYYY-MM-DD"),
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),
    });

    // let mc_list_data = await httpClient.post(server.LIST_MC);
    let mc_list_data_MBR = await httpClient.post(server.list_machine_MBR);
    await this.setState({
      // list_machine: mc_list_data.data.result,
      list_machine_MBR: mc_list_data_MBR.data.result,
      // selected_process: "MBR",
    });
    // console.log(list_name.data.result );
  }


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

  click_update = async () => {
    try {
      if (this.state.selected_mc === [0]) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'ใส่ข้อมูลให้ครบถ้วน',
          //footer: '<a href="">Why do I have this issue?</a>'
        })

      } else {
        await this.data_by_mc();
        await this.data_by_total();
        // await this.data_log();
        await this.data_ball();
        await this.month_data_ball();
        // await this.month_data_log();
        await this.month_data_output();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ไม่พบข้อมูล',
       
      })
    }
    // this.data_by_mc();
    // this.data_by_total();
  };
  data_by_mc = async () => {
    let mc_ttl = await httpClient.post(server.DAILY_OUT, {
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
        text: 'ไม่พบข้อมูล',
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
        chart: {
          // height: 350,
          type: "line",
          stacked: false,
        },
        stroke: {
          width: 3,
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
            text: "DATE",
            style: {
              fontSize: '10px',
            }
          },
        },
        yaxis: {
          title: {
            text: "QTY(pcs)",
            style: {
              fontSize: '10px',
            }
          },
          min: 0,
          max: 50000,
        },
        title: {
          text: 'MBR OUTPUT BY MACHINE',
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
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
  data_by_total = async () => {
    let day_ttl = await httpClient.post(server.DAILY_TOTAL, {
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
        chart: {
          // height: 350,
          type: "line",
          stacked: false,
        },
        stroke: {
          width: 3,
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
            stops: [0, 100, 100, 100],
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
              fontSize: '10px',
            }
          },
        },
        yaxis: {
          title: {
            text: "QTY(pcs)",
            style: {
              fontSize: '10px',
            }
          },
          min: 0,
          max: 100000
        },
        title: {
          text: 'MBR TOTAL OUTPUT',
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
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

  data_log = async () => {
    var lable_date = [];
    var data_START = [];
    var data_STOP = [];
    var data_WPART = [];
    var data_ALARM = [];
    let log_1 = await httpClient.post(server.DAILY_LOG, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      selected_mc: this.state.selected_mc,
    });

    for (let index = 0; index < log_1.data.result.length; index++) {
      lable_date.push(log_1.data.result[index].mfg_date);
      data_START.push(log_1.data.result[index].START);
      data_STOP.push(log_1.data.result[index].STOP);
      data_WPART.push(log_1.data.result[index].WPART);
      data_ALARM.push(log_1.data.result[index].ALARM);
    }
    this.setState({
      log_series: [
        {
          name: "Run",
          data: data_START,
        },
        {
          name: "Stop",
          data: data_STOP,
        },
        {
          name: "Wait Part",
          data: data_WPART,
        },
        {
          name: "Alarm",
          data: data_ALARM,
        },
      ],
      log_options: {
        colors: ["#00E396", "#FF4560", "#1f6dff", "#ebd700"],
        chart: {
          type: "bar",
          height: 350,

          stacked: true,
          // toolbar: {
          //   show: true,
          // },
          // zoom: {
          //   enabled: true,
          // },
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
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        title: {
          text: "DAILY MACHINE STATUS",
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        labels: lable_date,
        yaxis: {
          max: 24,
          title: {
            text: "HOUR",
            style: {
              fontSize: '20px',
            }
          },
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
        legend: {
          position: "bottom",
          offsetY: 0,
        },
        fill: {
          opacity: 1,
        },
      },
    })
  }

  data_ball = async () => {
    let ball_stack = await httpClient.post(server.DAILY_BALL_date, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      selected_mc: this.state.selected_mc,
    });

    var label_stack = [];
    var data_c1 = [];
    var data_c2 = [];
    var data_c3 = [];
    var data_c4 = [];
    var data_c5 = [];
    for (let k = 0; k < ball_stack.data.result.length; k++) {
      label_stack.push(ball_stack.data.result[k].mfg_date);
      data_c1.push(ball_stack.data.result[k].C5);
      data_c2.push(ball_stack.data.result[k].C4);
      data_c3.push(ball_stack.data.result[k].C3);
      data_c4.push(ball_stack.data.result[k].C2);
      data_c5.push(ball_stack.data.result[k].C1);
    }
    this.setState({
      ball_use_options: {
        title: {
          text: 'MBR DAILY BALL USED',
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        chart: {
          stackType: '100%',
          type: "bar",
          // height: 350,
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
          type: "text",
          categories: label_stack,
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
          tickAmount: 20,
          // min: 0,
          // max: 100
        },
        legend: {
          position: "bottom",
          offsetY: 0,
        },
        fill: {
          opacity: 1,
        },

        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(1) + "%";
          },
        },
      },
      ball_use_series: [
        {
          name: "C1 (+ 5.0)",
          data: data_c5,
        },
        {
          name: "C2 (+ 2.5)",
          data: data_c4,
        },
        {
          name: "C3 (±  0.0)",
          data: data_c3,
        },
        {
          name: "C4 (- 2.5)",
          data: data_c2,
        },
        {
          name: "C5 (- 5.0)",
          data: data_c1,
        },
      ],
    });
  };

  month_data_ball = async () => {
    let ball_stack = await httpClient.post(server.MONTHLY_BALL, { selected_mc: this.state.selected_mc });

    console.log(ball_stack.data);

    var label_stack = [];
    var data_c1 = [];
    var data_c2 = [];
    var data_c3 = [];
    var data_c4 = [];
    var data_c5 = [];
    for (let k = 0; k < ball_stack.data.result.length; k++) {
      label_stack.push(ball_stack.data.result[k].month);
      data_c1.push(ball_stack.data.result[k].C5);
      data_c2.push(ball_stack.data.result[k].C4);
      data_c3.push(ball_stack.data.result[k].C3);
      data_c4.push(ball_stack.data.result[k].C2);
      data_c5.push(ball_stack.data.result[k].C1);
    }
    this.setState({
      monthly_ball_use_options: {
        title: {
          text: "MBR MONTH BALL USED",
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        chart: {
          stackType: '100%',
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
          type: "text",
          categories: label_stack,
          title: {
            text: "MONTH",
            style: {
              fontSize: '20px',
            }
          }

        },
        yaxis: {
          title: {
            text: "%",
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
          offsetY: 5,
        },
        fill: {
          opacity: 1,
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(1) + "%";
          },
        },
      },
      monthly_ball_use_series: [
        {
          name: "C1 (+ 5.0)",
          data: data_c5,
        },
        {
          name: "C2 (+ 2.5)",
          data: data_c4,
        },
        {
          name: "C3 (±  0.0)",
          data: data_c3,
        },
        {
          name: "C4 (- 2.5)",
          data: data_c2,
        },
        {
          name: "C5 (- 5.0)",
          data: data_c1,
        },
      ],
    });
  };

  month_data_log = async () => {
    var lable_date = [];
    var data_START = [];
    var data_STOP = [];
    var data_WPART = [];
    var data_ALARM = [];
    let log_1 = await httpClient.post(server.MONTHLY_mc_log, {
      selected_mc: this.state.selected_mc,
    });
    // console.log(log_1.data.result);
    for (let index = 0; index < log_1.data.result.length; index++) {
      lable_date.push(log_1.data.result[index].month);
      data_START.push(log_1.data.result[index].START);
      data_STOP.push(log_1.data.result[index].STOP);
      data_WPART.push(log_1.data.result[index].WPART);
      data_ALARM.push(log_1.data.result[index].ALARM);
    }
    console.log(lable_date);
    this.setState({
      monthly_log_series: [
        {
          name: "Run",
          data: data_START,
        },
        {
          name: "Stop",
          data: data_STOP,
        },
        {
          name: "Wait Part",
          data: data_WPART,
        },
        {
          name: "Alarm",
          data: data_ALARM,
        },
      ],
      monthly_log_options: {
        colors: ["#00E396", "#FF4560", "#1f6dff", "#ebd700"],
        chart: {
          type: "bar",
          height: 350,

          stacked: true,
          // toolbar: {
          //   show: true,
          // },
          // zoom: {
          //   enabled: true,
          // },
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
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        title: {
          text: "MONTHLY MACHINE STATUS",
          align: 'center',
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        labels: lable_date,
        yaxis: {
          // max: 24,
          title: {
            text: "HOUR",
            style: {
              fontSize: '10px',
            }
          },
        },
        xaxis: {
          title: {
            text: "DATE",
            style: {
              fontSize: '10px',
            }
          },
        },
        legend: {
          position: "bottom",
          offsetY: 0,
        },
        fill: {
          opacity: 1,
        },
      },
    });
  };

  month_data_output = async () => {
    let day_ttl = await httpClient.post(server.MONTHLY_total_output, {

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
          text: "MBR MONTHLY OUTPUT",
          align: 'center',
          style: {
            fontSize: '30px',
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
              fontSize: '10px',
            }
          },
          type: "text",
          categories: label_ttl,
        },
        yaxis: {
          title: {
            text: "Qty(pcs)",
            style: {
              fontSize: '10px',
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

  render() {
    return (
      <div className="content-wrapper">

        <section className="content-header">
          <div className="container-fluid">
            <h2 className="text-center" style={{ fontWeight: 'bold' }} > MBR PRODUCTION RESULT</h2>
          </div>
        </section>
        <ScrollToTop smooth top="20" color="#464EAF"/>
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
                        <div style={{ borderStyle: "groove", borderRadius: 5 }}> &nbsp;{this.renderTable_machine_MBR()}</div>
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


                    <div className="col-md-1"></div>
                    <div className="col-md-2">
                    <br/>
                    <br/> <br/>
                      <button type="submit" class="btn btn-block btn-success"
                        onClick={(e) => {
                          e.preventDefault();
                          this.click_update();
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
                      <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={700} />
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
                      <ReactApexChart options={this.state.all_options} series={this.state.all_series} type="line" height={700} />
                    </div>
                    <div className="col-md-6">
                      <div id="chart"><ReactApexChart options={this.state.monthly_output_options} series={this.state.monthly_output_series} type="bar" height={700} /></div>
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
                      <div id="chart"><ReactApexChart options={this.state.ball_use_options} series={this.state.ball_use_series} type="bar" height={500} /></div>
                    </div>
                    <div className="col-md-6">
                      <div id="chart"><ReactApexChart options={this.state.monthly_ball_use_options} series={this.state.monthly_ball_use_series} type="bar" height={500} /></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-md-12"></div>
              <div className="card card-warning" style={{ width: "99%" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <ReactApexChart options={this.state.log_options} series={this.state.log_series} type="bar" height={700} />
                    </div>
                    <div className="col-md-6">
                      <div id="chart"><ReactApexChart options={this.state.monthly_log_options} series={this.state.monthly_log_series} type="bar" height={700} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

          </div>


        </section >

      </div >
    );
  }
}

export default PR_MBR;
