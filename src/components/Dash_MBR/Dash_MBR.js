import React, { useState, Component } from "react";
import { key, server } from "../../constance/constance";
import { httpClient } from "../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";
import Swal from "sweetalert2";



class Dash_MBR extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text_yield: "",
      text_yield: "",
      text_ct: "",
      selected_shift: "",
      selected_process: "",
      selected_machine: "",
      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      list_machine: [],
      timeline_series: [],
      timeline_options: {},
      output_series: [],
      output_options: {},
      accumulate_series: [],
      accumulate_options: {},
      pie_defect_series: [],
      pie_defect_options: {},

      stack_defect_series: [],
      stack_defect_options: {},
      selected_time: moment().format("HH:mm:ss"),
      data_waste: [],
    };
  }
  componentDidMount = async () => {
    let mc_list_data = await httpClient.post(server.LIST_MC);
    // console.log(list_name.data.result);
    await this.setState({
      list_machine: mc_list_data.data.result,
      selected_shift: "All",
      selected_process: "MBR",
      selected_machine: mc_list_data.data.result[0].mc_name,
      //date_start: moment("2022-09-13").add(-0, "days").format("YYYY-MM-DD"),
    });
    // console.log(list_name.data.result );
    setTimeout(
      function () {
        //Start the timer
        this.click_update()
      }.bind(this),
      200
    );
  };
  renderTableRow = () => {
    try {
      // const { result, isFetching } = this.props.listuserReducer;
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option>{item.mc_name}</option>);
      }
    } catch (error) { }
  };
  click_update = async () => {
    // this.show_chart_timeline();
    this.show_chart_output();
    this.show_chart_defect();
    this.show_total();
    this.cycle_time();
    // this.show_wasteTime();

  };
  cycle_time = async () => {
    try {
      let mc_ttl = await httpClient.post(server.MC_CT, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        process: this.state.selected_process,
        shift: this.state.selected_shift,
      });
      // console.log(mc_ttl.data.result);
      if (mc_ttl.data.result[0].ct === null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'ไม่มีข้อมูล',
          //footer: '<a href="">Why do I have this issue?</a>'
        })
      }
      await this.setState({
        text_ct: mc_ttl.data.result[0].ct,
      });
    } catch (error) {
    }
  };

  show_total = async () => {
    try {
      let mc_ttl = await httpClient.post(server.MC_TOTAL, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        process: this.state.selected_process,
        shift: this.state.selected_shift,
      });
      await this.setState({
        text_yield: mc_ttl.data.result[0].yield,
        text_output: mc_ttl.data.result[0].ok,
      });
    } catch (error) {

    }

  };
  show_chart_timeline = async () => {
    // console.log(this.state.timeline_series);
    try {
      let mc_data = await httpClient.post(server.MC_TIMELINE, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        process: this.state.selected_process,
        shift: this.state.selected_shift,
      });
      // console.log(mc_data.data.result);
      var data_run = [];
      var data_stop = [];
      var data_wait = [];
      var data_alarm = [];

      for (let index = 0; index < mc_data.data.result.length; index++) {
        switch (mc_data.data.result[index].status) {
          case "START":
            data_run.push({ x: "A", y: [new Date(mc_data.data.result[index].start).getTime(), new Date(mc_data.data.result[index].stop).getTime()] });
            break;
          case "STOP":
            data_stop.push({ x: "A", y: [new Date(mc_data.data.result[index].start).getTime(), new Date(mc_data.data.result[index].stop).getTime()] });
            break;
          case "WPART":
            data_wait.push({ x: "A", y: [new Date(mc_data.data.result[index].start).getTime(), new Date(mc_data.data.result[index].stop).getTime()] });
            break;
          case "ALARM":
            data_alarm.push({ x: "A", y: [new Date(mc_data.data.result[index].start).getTime(), new Date(mc_data.data.result[index].stop).getTime()] });
            break;
          default:
          // code block
        }
      }
      await this.setState({
        timeline_series: [
          {
            name: "Run",
            data: data_run,
          },
          {
            name: "Stop",
            data: data_stop,
          },
          {
            name: "Wait",
            data: data_wait,
          },
          {
            name: "Alarm",
            data: data_alarm,
          },
        ],
        timeline_options: {
          chart: {
            height: 300,
            type: "rangeBar",
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "50%",
              rangeBarGroupRows: true,
            },
          },
          colors: ["#00E396", "#FF4560", "#1f6dff", "#ebd700"],
          fill: {
            type: "solid",
          },

          xaxis: {
            type: "datetime",
            labels: {
              datetimeUTC: false,
            },
          },
          title: {
            text: "Machine Running Status",
            align: 'center',
            style: {
              fontSize: '25px',
              fontWeight: 'bold',
            }
          },
          yaxis: {
            show: false,
          },
          // legend: {
          //   position: "right",
          // },
          tooltip: {
            x: {
              format: "HH:mm:ss",
            },
          },
        },
      });
      // await console.log(this.state.timeline_series);
    } catch (error) {

    }

  };
  show_chart_output = async () => {
    // output chart
    try {
      let output_data = await httpClient.post(server.QTY_OUTPUT, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        process: this.state.selected_process,
        shift: this.state.selected_shift,
      });
      var label_output = [];
      var data_output_target = [];
      var data_output_actual = [];
      var data_output_accum_target = [];
      var data_output_accum_actual = [];
      for (let i = 0; i < output_data.data.result.length; i++) {
        label_output.push(output_data.data.result[i].hour);
        data_output_actual.push(output_data.data.result[i].hour_output);
        data_output_target.push(output_data.data.result[i].hour_target);
        data_output_accum_target.push(output_data.data.result[i].accum_target);
        data_output_accum_actual.push(output_data.data.result[i].accum_output);
      }
      await this.setState({
        output_series: [
          {
            name: "ACTUAL",
            type: "column",
            data: data_output_actual,
          },
          {
            name: "TARGET",
            type: "line",
            data: data_output_target,
          },
        ],
        output_options: {
          chart: {
            //height: 350,
            type: "line",
            toolbar: {
              show: false,
            },
          },
          stroke: {
            width: 3,
            curve: 'smooth',
          },
          title: {
            text: "OUTPUT BY HOUR",
            align: 'center',
            style: {
              fontSize: '25px',
              fontWeight: 'bold',
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "50%",
              dataLabels: {
                position: 'center',
                orientation: 'vertical',
              }
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
          labels: label_output,
          xaxis: {
            type: "datetime",
            title: {
              text: "TIME(hr)",
              style: {
                fontSize: '15px',
              }
            },
          },
          yaxis: {
            title: {
              text: 'Qty(pcs)',
              style: {
                fontSize: '15px',
              }
            },
            //tickAmount: 20,
            min: 0,
            max: 2000,
            labels: {
              show: true,
            },

          },

        },
        accumulate_series: [
          {
            name: "ACCUM ACTUAL",
            type: "line",
            data: data_output_accum_actual,
          },
          {
            name: "TARGET",
            type: "line",
            data: data_output_accum_target,
          },
          {
            name: "Hour Output",
            type: "column",
            data: data_output_actual,
          },
        ],
        accumulate_options: {
          chart: {
            height: 350,
            type: "line",
            toolbar: {
              show: false,
            }
          },
          stroke: {
            width: [2, 2, 2],
            curve: 'straight',
          },
          title: {
            text: "ACCUMULATE OUTPUT",
            align: 'center',
            style: {
              fontSize: '25px',
              fontWeight: 'bold',
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "50%",
              dataLabels: {
                position: 'button',
                orientation: 'vertical',
              }
            },
          },

          dataLabels: {
            enabled: true,
            position: 'center',
            // enabledOnSeries: [0]

          },
          // labels: label_output,
          xaxis: {
            type: "datetime",
            title: {
              text: "TIME(hr)",
              style: {
                fontSize: '15px',
              }
            },
            categories: label_output,
          },
          yaxis: [
            {
              seriesName: "OUTPUT/ Hr",
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: "#008FFB",
              },
              labels: {
                style: {
                  colors: "#008FFB",
                },
              },
              title: {
                text: "OUTPUT per Hr (pcs)",
                style: {
                  color: "#008FFB",
                  fontSize: '15px',

                },
              },
              tooltip: {
                enabled: true,
              },
              min: 0,
              max: 40000,
              tickAmount: 20,
              markers: {
                size: 4,
              },
            },
            {
              seriesName: "ACCUM ACTUAL",
              opposite: true,
              min: 0,
              max: 60000,
              tickAmount: 20,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: "#00E396",
              },
              labels: {

                style: {
                  colors: "#00E396",
                },
              },
              title: {
                text: "Accumulate (pcs)",
                style: {
                  color: "#00E396",
                  fontSize: '15px',

                },
              },
            },
            {
              seriesName: "ACCUM ACTUAL",
              labels: {
                show: false,
                style: {
                  colors: "#FFFFFF",
                },
              },
            },
          ]
        },
      });
    } catch (error) {

    }

  };
  show_chart_defect = async () => {
    // defect pie 
    try {
      let defect_pie = await httpClient.post(server.DEFECT_PIE, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        process: this.state.selected_process,
        shift: this.state.selected_shift,
      });
      var label_pie = [];
      var data_pie = [];
      for (let j = 0; j < defect_pie.data.result.length; j++) {
        label_pie.push(defect_pie.data.result[j].name);
        data_pie.push(defect_pie.data.result[j].qty);
      }

      // defect stack
      let defect_stack = await httpClient.post(server.DEFECT_STACK, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        process: this.state.selected_process,
        shift: this.state.selected_shift,
      });
      var label_stack = [];
      var data_stack_C1_NG = [];
      var data_stack_C2_NG = [];
      var data_stack_C3_NG = [];
      var data_stack_C4_NG = [];
      var data_stack_C5_NG = [];
      var data_stack_ng_turn = [];
      var data_stack_ng_retainer = [];
      var data_stack_ng_camera = [];
      for (let k = 0; k < defect_stack.data.result.length; k++) {
        label_stack.push(defect_stack.data.result[k].hour);
        data_stack_C1_NG.push(defect_stack.data.result[k].C1_NG);
        data_stack_C2_NG.push(defect_stack.data.result[k].C2_NG);
        data_stack_C3_NG.push(defect_stack.data.result[k].C3_NG);
        data_stack_C4_NG.push(defect_stack.data.result[k].C4_NG);
        data_stack_C5_NG.push(defect_stack.data.result[k].C5_NG);
        data_stack_ng_turn.push(defect_stack.data.result[k].TURN_NG);
        data_stack_ng_retainer.push(defect_stack.data.result[k].RTNR_NG);
        data_stack_ng_camera.push(defect_stack.data.result[k].CAMERA_NG);
      }
      await this.setState({
        pie_defect_series: data_pie,
        pie_defect_options: {
          title: {
            text: "TOTAL DEFECT",
            align: 'center',
            style: {
              fontSize: '25px',
              fontWeight: 'bold',
            }
          },
          chart: {
            width: 300,
            type: "pie",
          },
          labels: label_pie,
          legend: {
            position: "bottom",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: "center",
                },
              },
            },
          ],
        },

        stack_defect_options: {
          title: {
            text: "ACCUMULATE DEFECT",
            align: 'center',
            style: {
              fontSize: '25px',
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
                  offsetX: 0,
                  offsetY: 0,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 0,
            },
          },
          xaxis: {
            type: "text",
            categories: label_stack,
            title: {
              text: "TIME(hr)",
              style: {
                fontSize: '15px',
              }
            },

          },

          yaxis: {
            title: {
              text: 'Qty (pcs)',
              style: {
                fontSize: '15px',
              }
            },
            tickAmount: 10,
          },
          legend: {
            position: "right",
            offsetY: 40,
          },
          fill: {
            opacity: 1,
          },
        },
        stack_defect_series: [
          {
            name: "C1 NG",
            data: data_stack_C1_NG,
          },
          {
            name: "C2 NG",
            data: data_stack_C2_NG,
          },
          {
            name: "C3 NG",
            data: data_stack_C3_NG,
          },
          {
            name: "C4 NG",
            data: data_stack_C4_NG,
          },
          {
            name: "C5 NG",
            data: data_stack_C5_NG,
          },
          {
            name: "Retainer NG",
            data: data_stack_ng_retainer,
          },
          {
            name: "Camera NG",
            data: data_stack_ng_camera,
          },
          {
            name: "Turn NG",
            data: data_stack_ng_turn,
          },
        ],
      });
    } catch (error) {

    }

  };


  show_wasteTime = async () => {
    try {
      let data = await httpClient.post(server.wasteTime_MBR, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        process: this.state.selected_process,
        shift: this.state.selected_shift,
      })
      await this.setState({
        data_waste: data.data.result
      })
      console.log(data.data.result);
    } catch (error) {

    }
  }
  renderwaste_time() {
    if (this.state.data_waste != null) {
      return this.state.data_waste.map((item) =>
        <tr>
          <td>{item.status}</td>
          <td>{item.waste_time}</td>

        </tr>
      )

    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <h2 className="text-center" style={{ fontWeight: 'bold' }} > MBR DASHBOARD </h2>
          </div>
        </section>


        <div className="row">
          <div className="card card-warning col-md-12" >
            {/* <div className="card-header">
                <div className="row">Filter</div>
              </div> */}
            <div className="card-body">
              <div className="col-md-12">
                <div className="row">
                  {/* <div className="col-md-1" ></div> */}
                  <div className="col-md-2" >
                    <h5>
                      <i class="fas fa-calendar-day">&nbsp;</i> DATE
                    </h5>
                    <input
                      class="form-control is-valid"
                      type="date"
                      id="id_daydate"
                      name="name_daydate"
                      value={this.state.date_start}
                      onChange={async (e) => {
                        await this.setState({
                          date_start: moment(e.target.value).format("YYYY-MM-DD"),
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-2">
                    <h5>
                      <i class="fa fa-layer-group">&nbsp;</i>PROCESS
                    </h5>
                    <input style={{ fontWeight: "bold", fontSize: 20, textAlign: 'center' }} value="ASSEMBLY" type="text" className="form-control" />
                  </div>

                  <div className="col-md-2">
                    <h5>
                      <i class="fa fa-memory">&nbsp;</i> MACHINE
                    </h5>
                    <select
                      value={this.state.selected_machine}
                      className="form-control"
                      onChange={(e) => {
                        this.setState({ selected_machine: e.target.value });
                      }}
                    >
                      {/* <option>---</option> */}
                      {this.renderTableRow()}
                    </select>
                  </div>

                  {/* <div style={{ width: "10%" }}>
                  <h5>
                    <i class="fa fa-layer-group">&nbsp;</i>PROCESS
                  </h5>
                  <select
                    value={this.state.selected_process}
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ selected_process: e.target.value });
                    }}
                  >
                    <option>---</option>
                    <option>MBR</option>
                  </select>
                </div> */}
                  {/* <div style={{ width: "10%" }}>
                  <h5>
                    <i class="fa fa-globe"></i>&nbsp;SHIFT
                  </h5>
                  <select
                    value={this.state.selected_shift}
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ selected_shift: e.target.value });
                    }}
                  >
                    <option value="All">All</option>
                    <option value="M">Day (M)</option>
                    <option value="N">Night (N)</option>
                  </select>
                </div> */}
                  <div className="col-md-2">
                    <h5>
                      <i class="fa fa-clock"></i>&nbsp; Cycle-Time
                    </h5>
                    <input style={{ fontWeight: "bold", fontSize: 20 }} value={this.state.text_ct} type="text" className="form-control" />
                  </div>
                  <div className="col-md-1">
                    <h5>
                      <i class="fa fa-chart-pie"></i>&nbsp;YIELD
                    </h5>
                    <input style={{ fontWeight: "bold", fontSize: 20 }} value={this.state.text_yield} type="text" className="form-control" />
                  </div>
                  <div className="col-md-2">
                    <h5>
                      <i class="fa fa-chart-line"></i>&nbsp;OUTPUT
                    </h5>
                    <input style={{ fontWeight: "bold", fontSize: 20 }} value={this.state.text_output} type="text" className="form-control" />
                  </div>
                  <div className="col-md-1">
                    <h5>&nbsp;</h5>
                    <button
                      type="button"
                      class="btn btn-block btn-danger"
                      onClick={async (e) => {
                        e.preventDefault();
                        this.click_update();
                      }}
                    >
                      <span className="fas fa-redo-alt" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row" style={{ width: "100%" }}>
          <div style={{ width: "1%" }}></div>
          <div className="card card-warning" style={{ width: "99%" }}>
            <div className="card-body">
              <div className="row">
                <div style={{ width: "20%", textAlign: 'center' }}>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Time </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderwaste_time()}
                    </tbody>
                  </table>

                </div>
                <div style={{ width: "78%" }}>
                  <ReactApexChart options={this.state.timeline_options} series={this.state.timeline_series} type="rangeBar" height={150} />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="card card-warning col-md-12">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <ReactApexChart options={this.state.output_options} series={this.state.output_series} type="line" height={550} />
                </div>

                <div className="col-md-6">
                  <ReactApexChart options={this.state.accumulate_options} series={this.state.accumulate_series} type="line" height={550} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card card-warning col-md-12">
            <div className="card-body">
              <div className="row">
              <div className="col-md-6">
                  <ReactApexChart options={this.state.pie_defect_options} series={this.state.pie_defect_series} type="pie" width={550} />
                </div>
                <div className="col-md-6">
                  <ReactApexChart options={this.state.stack_defect_options} series={this.state.stack_defect_series} type="bar" height={550} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dash_MBR;
