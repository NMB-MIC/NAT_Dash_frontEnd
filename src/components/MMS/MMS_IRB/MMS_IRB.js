import React, { Component } from "react";
import { key, server } from "../../../constance/constance";
import { httpClient } from "../../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";


class MMS_IRB extends Component {
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
  }

  componentDidMount = async () => {
    try {
      let mc_list_data = await httpClient.post(server.IRB_mc)
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
      let data_status_log = await httpClient.post(server.mc_status_log_IRB, {
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


  alarm_time = async () => {
    let alarm = await httpClient.post(server.AlarmTopic_time_IRB, {
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
    let stop_time = await httpClient.post(server.stop_time_IRB, {
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

export default MMS_IRB;
