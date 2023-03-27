import React, { useState, Component } from "react";
import { key, server } from "../../../constance/constance";
import { httpClient } from "../../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";
import Swal from "sweetalert2";



class MMS_AL extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      selected_process: "",
      timeline_series: [],
      timeline_options: {},
      timeline_series1: [],
      timeline_options1: {},
      list_machine: [],
      selected_machine: "",
      data_table: [],

    };
  };

  componentDidMount = async () => {
    let mc_list_data = await httpClient.post(server.test_mc)
    await this.setState({
      list_machine: mc_list_data.data.result,
      selected_machine: mc_list_data.data.result[0].mc_no,
      //date_start: moment().add(-0, "days").format("2023-01-13"),
    })

    setTimeout(
      function () {
        //Start the timer
        this.click_update()
      }.bind(this),
      200
    );

  }
  renderTableRow = () => {
    try {
      // const { result, isFetching } = this.props.listuserReducer;
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option>{item.mc_no}</option>);
      }
    } catch (error) { }
  };

  click_update = async () => {
    await this.show_chart_timeline();
    await this.timeline_status_log();
    await this.alarm_time();
    await this.stop_time();

  };

  show_chart_timeline = async () => {
    // console.log(this.state.timeline_series);
    try {
      let mc_data = await httpClient.post(server.TIMELINE_AL, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
      });
      console.log(mc_data.data.result);

      var data_alarm = [];
      var data_alarm_1 = [];
      var data_alarm_2 = [];
      var data_alarm_LOADER = [];
      var data_alarm_CAMERA = [];
      var data_alarm_EJECT = [];
      var data_alarm_ROBO = [];
      var data_AIR_PRESSURE = [];
      var data_X21_STICK_UP = [];
      var data_X10_SENSOR = [];
      var data_X22_PALLET = [];
      var data_SENSOR_WORK = [];
      var X37 = [];
      var M71 = [];
      var x15 = [], PART_SUPPLY_ABNORMAL = [], WORK_EJECT = [], robo_CYLINDER = [];
      var LOADER = [], LINE_UP = [], CAMERA_f = [], CAMERA_r = [], ROBO_CYLINDER = [], M83 = [];
      for (let index = 0; index < mc_data.data.result.length; index++) {
        switch (mc_data.data.result[index].topic) {
          case " PART FEEDER NO WORK":
            data_alarm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " LINE UP FULL WORK":
            data_alarm_1.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " M72 CHANGE WIPES (time)":
            data_alarm_2.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " LOADER TROUBLE":
            data_alarm_LOADER.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " CAMERA CHECK ALARM":
            data_alarm_CAMERA.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " NG EJECT WORK FULL":
            data_alarm_EJECT.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " ROBO CYLINDER TROUBLE":
            data_alarm_ROBO.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " AIR PRESSURE ALARM":
            data_AIR_PRESSURE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " X21 STICK UP TROUBLE ":
            data_X21_STICK_UP.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " X10 SENSOR WORK CHECK UPPER":
            data_X10_SENSOR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " X22 PALLET WRONG SIDE":
            data_X22_PALLET.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " SENSOR WORK CHECK LOWER ABNORMAL":
            data_SENSOR_WORK.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " X37 VACUUM ALARM":
            X37.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " M71 CHANGE WIPES":
            M71.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " X15 SHUTTER TROUBLE":
            x15.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " PART SUPPLY ABNORMAL":
            PART_SUPPLY_ABNORMAL.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " WORK EJECT ABNORMAL":
            WORK_EJECT.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " ROBO CYLINDER NOT HOME POSITION":
            robo_CYLINDER.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " LOADER WORK FULL":
            LOADER.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " LINE UP RETURN":
            LINE_UP.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " CAMERA (F) CHECK CYCLE OVER":
            CAMERA_f.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " CAMERA (R) CHECK CYCLE OVER":
            CAMERA_r.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " ROBO CYLINDER NOT READY [MENU MODE]":
            ROBO_CYLINDER.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case " M83 SHUTTER CYCLE OVER":
            M83.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          default:
          // code block
        }

      }

      await this.setState({
        timeline_series: [
          {
            name: "PART FEEDER NO WORK",
            data: data_alarm,
          },
          {
            name: "LINE UP FULL WORK",
            data: data_alarm_1,
          },
          {
            name: " M72 CHANGE WIPES (time)",
            data: data_alarm_2,
          },
          {
            name: " LOADER TROUBLE",
            data: data_alarm_LOADER,
          },
          {
            name: " CAMERA CHECK ALARM",
            data: data_alarm_CAMERA,
          },
          {
            name: " NG EJECT WORK FULL",
            data: data_alarm_EJECT,
          },
          {
            name: " ROBO CYLINDER TROUBLE",
            data: data_alarm_ROBO,
          },
          {
            name: " AIR PRESSURE ALARM",
            data: data_AIR_PRESSURE,
          },
          {
            name: " X21 STICK UP TROUBLE",
            data: data_X21_STICK_UP,
          },
          {
            name: " X10 SENSOR WORK CHECK UPPER",
            data: data_X10_SENSOR,
          },
          {
            name: " X22 PALLET WRONG SIDE",
            data: data_X22_PALLET,
          },
          {
            name: " SENSOR WORK CHECK LOWER ABNORMAL",
            data: data_SENSOR_WORK,
          },
          {
            name: " X37 VACUUM ALARM",
            data: X37,
          },
          {
            name: " M71 CHANGE WIPES",
            data: M71,
          },
          {
            name: " X15 SHUTTER TROUBLE",
            data: x15,
          },
          {
            name: " PART SUPPLY ABNORMAL",
            data: PART_SUPPLY_ABNORMAL,
          },
          {
            name: " WORK EJECT ABNORMAL",
            data: WORK_EJECT,
          },
          {
            name: " ROBO CYLINDER NOT HOME POSITION",
            data: robo_CYLINDER,
          },
          {
            name: " LOADER WORK FULL",
            data: LOADER,
          },
          {
            name: " LINE UP RETURN",
            data: LINE_UP,
          },
          {
            name: " CAMERA (F) CHECK CYCLE OVER",
            data: CAMERA_f,
          },
          {
            name: " CAMERA (R) CHECK CYCLE OVER",
            data: CAMERA_r,
          },
          {
            name: " ROBO CYLINDER NOT READY [MENU MODE]",
            data: ROBO_CYLINDER,
          },
          {
            name: " M83 SHUTTER CYCLE OVER",
            data: M83,
          },

        ],
        timeline_options: {
          chart: {
            height: 250,
            type: "rangeBar",
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "100%",
              rangeBarGroupRows: true,
            },
          },
          colors: ["#D7263D", "#008b02", "#57aeff", "#F46036", "#E2C044", "#ff08e2", "#0d1dfc"],
          fill: {
            type: "solid",
          },
          // labels: Data_time,
          xaxis: {
            type: "datetime",
            labels: {
              datetimeUTC: false,
            },
          },
          yaxis: {
            show: true,
            title: {
              style: {
                fontSize: '10px',
              }
            }
          },
          // legend: {
          //   position: "right",
          // },
          tooltip: {
            x: {
              format: "HH:mm:ss",
            },
          },
          // dataLabels: {
          //   enabled: true,
          // }
        },
      });

    } catch (error) {


    }

  };

  timeline_status_log = async () => {
    // console.log(this.state.timeline_series);
    try {
      let data_status_log = await httpClient.post(server.mc_status_log, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
      });
      console.log(data_status_log.data.result);

      var data_STOP = [];
      var data_START = [];
      var data_ALARM = [];
      var data_SETUP = [];
      var data_WAIT_PART = [];
      var data_WAIT_QC = [];

      // topic 
      // for (let x = 0; x < mc_data.data.result.length; x++) {
      //   var my_array = [] 
      //   Data_topic.push(mc_data.data.result[x].topic);
      // }
      // console.log(Data_topic);

      for (let index = 0; index < data_status_log.data.result.length; index++) {
        switch (data_status_log.data.result[index].mc_status) {
          case "0":
            data_STOP.push({ x: "MC Log", y: [new Date(data_status_log.data.result[index].occurred).getTime(), new Date(data_status_log.data.result[index].NextTimeStamp).getTime()] });
            break;
          case "1":
            data_START.push({ x: "MC Log", y: [new Date(data_status_log.data.result[index].occurred).getTime(), new Date(data_status_log.data.result[index].NextTimeStamp).getTime()] });
            break;
          case "2":
            data_ALARM.push({ x: "MC Log", y: [new Date(data_status_log.data.result[index].occurred).getTime(), new Date(data_status_log.data.result[index].NextTimeStamp).getTime()] });
            break;
          case "3":
            data_SETUP.push({ x: "MC Log", y: [new Date(data_status_log.data.result[index].occurred).getTime(), new Date(data_status_log.data.result[index].NextTimeStamp).getTime()] });
            break;
          case "4":
            data_WAIT_PART.push({ x: "MC Log", y: [new Date(data_status_log.data.result[index].occurred).getTime(), new Date(data_status_log.data.result[index].NextTimeStamp).getTime()] });
            break;
          case "5":
            data_WAIT_QC.push({ x: "MC Log", y: [new Date(data_status_log.data.result[index].occurred).getTime(), new Date(data_status_log.data.result[index].NextTimeStamp).getTime()] });
            break;
          default:
          // code block
        }

      }

      await this.setState({
        timeline_series1: [
          {
            name: "STOP (0)",
            data: data_STOP,
          },
          {
            name: "START (1)",
            data: data_START,
          },
          {
            name: "ALARM (2)",
            data: data_ALARM,
          },
          {
            name: "SETUP (3)",
            data: data_SETUP,
          },
          {
            name: "WAIT PART (4)",
            data: data_WAIT_PART,
          },
          {
            name: "WAIT QC (5)",
            data: data_WAIT_QC,
          },


        ],
        timeline_options1: {
          chart: {
            height: 350,
            width: 500,
            type: "rangeBar",
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "80%",
              rangeBarGroupRows: true,
            },
          },
          colors: ["#F4171B", "#2ce340", "#ff6900", "#da39fa", "#399dfa", "#ffe60c"],
          fill: {
            type: "solid",
          },
          // labels: Data_time,
          xaxis: {
            type: "datetime",
            labels: {
              datetimeUTC: false,
            },
          },
          // title: {
          //   text: "Machine Running Status",
          //   align: 'center',
          //   style: {
          //     fontSize: '25px',
          //     fontWeight: 'bold',
          //   }
          // },
          yaxis: {
            show: true,
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

  alarm_time = async () => {
    let alarm = await httpClient.post(server.AlarmTopic_time, {
      date: this.state.date_start,
      machine: this.state.selected_machine,
    })
    console.log(alarm.data.result);
    await this.setState({
      data_table: alarm.data.result
    })
  }
  renderTable() {
    if (this.state.data_table != null) {
      return this.state.data_table.map((item) =>
        <tr>
          <td>{item.topic}</td>
          <td>{item.Alarm}</td>
        </tr>
      )
    }
  }

  stop_time = async () => {
    let stop_time = await httpClient.post(server.stop_time, {
      date: this.state.date_start,
      machine: this.state.selected_machine,
    })  
    console.log(stop_time.data.result);
    await this.setState({
      data_table1: stop_time.data.result
    })
  }
  renderTable_stop() {
    if (this.state.data_table1 != null) {
      return this.state.data_table1.map((item) =>
        <tr>
          <td>{item.topic2}</td>
          <td>{item.Time}</td>
        </tr>
      )
    }
  }
  render() {
    return (
      <div className="content-wrapper">

        <section className="content-header">
          <div className="container-fluid">
            <h2 className="text-center" style={{ fontWeight: 'bold' }} > MACHINE MONITORING STATUS </h2>
          </div>
        </section>
        <div className="row">
          <div className="card card-warning col-md-12" >

            <div className="card-body">
              <div className="col-md-12">
                <div className="row" >
                  <div className="col-md-2"> </div>
                  <div className="col-md-2">
                    <h5>
                      <i class="fas fa-calendar-day">&nbsp;</i>DATE
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
                    <input style={{ fontWeight: "bold", fontSize: 20, textAlign: 'center' }} value="AL" type="text" className="form-control" />
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

                <div className="row" >
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <ReactApexChart options={this.state.timeline_options} series={this.state.timeline_series} type="rangeBar" height={230} />
                    </div>
                  </div>
                </div>
                <div className="row" >
                  <div className="col-md-12">

                    <div className="col-md-12">
                      <ReactApexChart options={this.state.timeline_options1} series={this.state.timeline_series1} type="rangeBar" height={230} />
                    </div>
                  </div>
                </div>

              </div>
              <div className="row">
                <div className="col-1"></div>
                <div className="col-5">
                  <div className="card" style={{ textAlign: "center", fontSize: "16px", }}>
                    <div className="card-header" style={{ backgroundColor: "#fa8804", border: true }} >
                      <h3 className="card-title" style={
                        {
                          textAlign: "center",
                          fontSize: "20px",
                          // color: "#fa8804",
                          fontWeight: "'bold'",
                        }}> <i class="fas fa-exclamation-triangle"></i> 3 WORST ALARM-STOP</h3>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>TOPIC</th>
                            <th>TIME (HH:mm:ss)</th>

                          </tr>
                        </thead>
                        <tbody>
                          {this.renderTable()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <div className="card" style={{ textAlign: "center", fontSize: "16px", }}>
                    <div className="card-header" style={{ backgroundColor: "#FFCCCC", border: true }} >
                      <h3 className="card-title" style={
                        {
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#FF0000",
                          fontWeight: "'bold'",
                        }}> <i class="fas fa-exclamation-triangle"></i> 3 WORST STOP-ALARM </h3>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>TOPIC</th>
                            <th>TIME (HH:mm:ss)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderTable_stop()}
                        </tbody>
                      </table>
                    </div>
                  </div>

              </div>
            
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MMS_AL;
