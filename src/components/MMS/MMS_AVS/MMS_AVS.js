import React, { Component } from "react";
import { key, server } from "../../../constance/constance";
import { httpClient } from "../../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";


class MMS_AVS extends Component {

  constructor(props) {
    super(props)

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

      responsible: "All",
    }
  };
  componentDidMount = async () => {
    try {
      let mc_list_data = await httpClient.post(server.AVS_mc)
      await this.setState({
        list_machine: mc_list_data.data.result,
        selected_machine: mc_list_data.data.result[0].mc_no,
        //date_start: moment().add(-0, "days").format("2023-01-13"),
      })
      console.log(mc_list_data.data.result);
    } catch (error) { }


    setTimeout(
      function () {
        //Start the timer
        this.click_update()
      }.bind(this),
      200
    );
  }

  click_update = async () => {
    await this.timeline_status_log();
    await this.show_chart_timeline();
    await this.alarm_time();
    await this.stop_time();

  };

  renderTableRow = () => {
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option>{item.mc_no}</option>);
      }
    } catch (error) {
      console.log("------error------");
    }
  };

  timeline_status_log = async () => {
    // console.log(this.state.timeline_series);
    try {
      let data_status_log = await httpClient.post(server.mc_status_log_AVS, {
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
      };
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
            // background: '#EBEDEF',
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
          yaxis: {
            show: true,
          },
          tooltip: {
            x: {
              format: "HH:mm:ss",
            },
          },
        },
      });
      // await console.log(this.state.timeline_series);
    } catch (error) { }
  };

  show_chart_timeline = async () => {
    // console.log(this.state.timeline_series);
    try {
      let mc_data = await httpClient.post(server.TIMELINE_AVS, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        responsible: this.state.responsible,
      });
      console.log(mc_data.data.result);
      var M610 = [], M623 = [], M600 = [], M601 = [], M602 = [], M603 = [], M605 = [], M606 = [], M607 = []
      var M611 = [], M615 = [], M620 = [], M621 = [], M622 = [], M625 = [], M626 = [], M630 = [], M640 = []
      var M641 = [], M642=[],M643 = [], M650 = [], M651 = [], M652 = [], M653 = [], M654 = [], M655 = [], M657 = []

      for (let index = 0; index < mc_data.data.result.length; index++) {
        switch (mc_data.data.result[index].topic) {
          case "M610 AIR PRESSURE ":
            M610.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M623 CAMERA ERROR":
            M623.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M600 NO-WORK ":
            M600.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M601 FULL PARTS COUNTER":
            M601.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M602 NG1 TRAY FULL":
            M602.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M603 NG2 TRAY FULL":
            M603.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M605 TRAY DOOR OPEN":
            M605.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M606 TRAY CHANGER FULL WORK STOP":
            M606.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M607 FULL LOT":
            M607.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M611 EMERGENCY STOP":
            M611.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M615 FULL TRAY COUNTER":
            M615.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M620 ENTRANCE CYCLE OVER":
            M620.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M621 TR FWD/BWD CYCLE OVER":
            M621.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M622 TR FEED/HOME CYCLE OVER":
            M622.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M625 NG CONTINUE CAMERA 1":
            M625.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M626 NG CONTINUE CAMERA 2":
            M626.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M630 T/O CYCLE OVER":
            M630.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M640 NG EJECT CYCLE OVER":
            M640.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M641 NG EJECT PASS MISS":
            M641.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M642 OK PUSHER ALARM":
            M642.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M643 NG ROBO ALARM":
            M643.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M650 TRAY LIFTER MOTOR ALARM":
            M650.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M651 TRAY AREA SENSOR ALARM":
            M651.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M652 TRAY CV PUSHER ALARM":
            M652.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M653 TRAY CV SHUTTER ALARM":
            M653.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M653 TRAY CV SHUTTER ALARM":
            M654.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M653 TRAY CV SHUTTER ALARM":
            M655.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "M657 TRAY LOCK CYL LS ALARM":
            M657.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;

          default:
          // code block
        }
      }
      await this.setState({
        timeline_series: [
          {name: "M610 AIR PRESSURE ",data: M610,}, 
          {name: "M623 CAMERA ERROR",data: M623,},
          {name: "M600 NO-WORK ", data: M600,},
          {name: "M601 FULL PARTS COUNTER",data: M601,},
          {name: "M602 NG1 TRAY FULL",data: M602,},
          {name: "M603 NG2 TRAY FULL",data: M603,},
          {name: "M605 TRAY DOOR OPEN",data: M605,},
          {name: "M606 TRAY CHANGER FULL WORK STOP",data: M606,},
          {name: "M607 FULL LOT",data: M607,},
          {name: "M611 EMERGENCY STOP",data: M611,},
          {name: "M615 FULL TRAY COUNTER",data: M615,},
          {name: "M620 ENTRANCE CYCLE OVER",data: M620,},
          {name: "M621 TR FWD/BWD CYCLE OVER",data: M621,},
          {name: "M622 TR FEED/HOME CYCLE OVER",data: M622,},
          {name: "M625 NG CONTINUE CAMERA 1",data: M625,},
          {name: "M626 NG CONTINUE CAMERA 2",data: M626,},
          {name: "M640 NG EJECT CYCLE OVER",data: M640,},
          {name: "M630 T/O CYCLE OVER",data: M630,},
          {name: "M641 NG EJECT PASS MISS",data: M641,},
          {name: "M642 OK PUSHER ALARM",data: M642,},
          {name: "M643 NG ROBO ALARM",data: M643,},
          {name: "M650 TRAY LIFTER MOTOR ALARM",data: M650,},
          {name: "M651 TRAY AREA SENSOR ALARM",data: M651,},
          {name: "M652 TRAY CV PUSHER ALARM",data: M652,},
          {name: "M653 TRAY CV SHUTTER ALARM",data: M653,},
          {name: "M654 TRAY CHANGER CYCLE OVER",data: M654,},
          {name: "M655 NO TRAY ALARM",data: M655,},
          {name: "M657 TRAY LOCK CYL LS ALARM",data: M657,},
        ],
        timeline_options: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
          chart: {
            // background: '#EBEDEF',
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
          colors: ["#D7263D", "#008b02", "#57aeff", "#F46036", "#E2C044",
            "#ff08e2", "#0d1dfc", "#94bafb", "#195529", "#c37e41", "#a7037e",
            "#CCFF00", "#FFFF66", "#FFCC66", "#CC9999", "#CC6666",
            "#FF6666", "#9900FF", "#66CC00", "#66CCCC", "#000033",
            "#FF0066", "#C70039", "#FFC13D", "#45B39D", "#2962FF",
            "#18FFFF", "#7CB342", "#EEFF41", "#FF5722", "#E91E63",
            "#AB47BC", "#FF96C5", "#74737A", "#00C3AF", "#6C88C4",
            "#FFA23A", "#FDBB9F", "#FF1744"
          ],
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
          legend: {
            show: true,
            showForNullSeries: false,
          },
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

    } catch (error) { }
  };
  alarm_time = async () => {
    let alarm = await httpClient.post(server.AlarmTopic_time_AVS, {
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
    let stop_time = await httpClient.post(server.stop_time_AVS, {
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
    return (<div className="content-wrapper">
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
                <div className="col-md-1"> </div>
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
                <div className="col-md-3">
                  <h5><i class="fa fa-user">&nbsp;</i> RESPONSIBLE </h5>
                  <div className="input-group">
                    <select
                      value={this.state.responsible}
                      className="form-control"
                      onChange={(e) => {
                        this.setState({ responsible: e.target.value });
                      }}
                    >

                      <option>All</option>
                      <option>MAINTENANCE TURNING</option>
                      <option>LINE TURNING</option>

                    </select>

                  </div>
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
              {/* 
                <div className="row" >
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <ReactApexChart options={this.state.timeline_options} series={this.state.timeline_series} type="rangeBar" height={230} />
                    </div>
                  </div>
                </div> */}
              <div className="row" >
                <div className="col-md-12">
                  <div className="col-md-12">
                    <ReactApexChart options={this.state.timeline_options} series={this.state.timeline_series} type="rangeBar" height={300} />
                  </div>
                </div>
              </div>
              <div className="row" >
                <div className="col-md-12">

                  <div className="col-md-12">
                    <ReactApexChart options={this.state.timeline_options1} series={this.state.timeline_series1} type="rangeBar" height={300} />
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
                      }}><i class="fas fa-exclamation-triangle"></i> 3 WORST STOP-ALARM</h3>
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

export default MMS_AVS;
