import React, { Component } from "react";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/constance"
import moment from "moment";
import Swal from "sweetalert2";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

class Topic_count extends Component {

  constructor(props) {
    super(props)

    this.state = {
      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),
      list_machine: [],
      selected_process: "TB01",
      responsible : "All",
      topic: [],
      my_col: [],
      data_set: [],
      all_series: [], 
      all_option: {},

      series: [],
      options: {},


    }
  }

  componentDidMount = async () => {
    let mc_list_data = await httpClient.post(server.MC_MMS);
    await this.setState({
      list_machine: mc_list_data.data.result,

    });
    // console.log(mc_list_data);
    this.getDate();
  }
  getDate = async () => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    await this.setState({
      date_start: moment("2023-03-01").format("YYYY-MM-DD"),
      date_end: moment("2023-03-03").add(-0, "days").format("YYYY-MM-DD"),
    });

  }
  renderTableRow = () => {
    try {
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option>{item.mc_name}</option>);
      }
    } catch (error) { }
  };
  clickEnter = async () => {
    // await this.query1()
    await this.query2()
  }
  // query1 = async () => {
  //   let data = await httpClient.post(server.topic_count_test, {
  //     date_start: this.state.date_start,
  //     date_end: this.state.date_end,
  //     machine: this.state.selected_machine,
  //   })
  //   console.log(data.data);
  //   console.log(data.data.result[0].my_col);
  //   var my_col = [];
  //   for (let index = 0; index < data.data.result.length; index++) {
  //     my_col.push(data.data.result[index].my_col)
  //   }
  //   await this.setState({ my_col: data.data.result[0].my_col })
  //   // console.log(my_col);
  // }
  query2 = async () => {
    let result = await httpClient.post(server.getResult, {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      machine: this.state.selected_machine,
      responsible : this.state.responsible,
      my_col: this.state.my_col,

    })
    try {
      await this.setState({ data_set: result.data.result })


      if (this.state.data_set[0] == undefined) {
        this.query2()
      }
      console.log(result.data.result);
      var my_serie = []
      for (let i = 0; i < result.data.result.length; i++) {
        my_serie.push({ name: result.data.result[i].topic, data: result.data.result[i].count.split(",") })

      }
console.log(my_serie);

      this.setState({
        series: my_serie,

        options: {
          chart: {
            type: 'bar',
            height:500,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 5,
              dataLabels: {
                total: {
                  enabled: true,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              }
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
          xaxis: {
            type: 'text',
            categories: result.data.list_date
          },
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
        },
      })
    } catch (error) {

    }
  }
  render() {
    return (<div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <h2 className="text-center" style={{ fontWeight: 'bold' }} > MMS Topic </h2>
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
                        <div className="col-md-1">  </div>
                        <div className="col-md-2" >
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
                        <div className="col-md-2" >
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
                        <div className="col-md-2" >
                          <div className="form-group">
                            <label> MACHINE </label>
                            <select className="custom-select rounded-2" id="exampleSelectRounded0"
                              onChange={(e) => {
                                this.setState({ selected_machine: e.target.value })
                              }} value={this.state.selected_machine}
                            >
                              <option> select machine </option>
                              {this.renderTableRow()}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3" >
                          <div className="form-group">
                            <label> Responsible </label>
                            <select className="custom-select rounded-2" id="exampleSelectRounded0"
                              onChange={(e) => {
                                this.setState({ responsible: e.target.value })
                              }} value={this.state.responsible}
                            >
                              <option> All </option>
                              <option> LINE TURNING </option>
                              <option> MAINTENANCE TURNING </option>
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
                              this.clickEnter();
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
            </div>

          </div>
          <div className="row">
            <div className="col-md-12"></div>
            <div className="card card-warning" style={{ width: "99%" }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div id="chart">
                      <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={500} />
                    </div> </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>)
  }
}

export default Topic_count;
