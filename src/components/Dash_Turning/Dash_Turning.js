import React, { useState, Component } from "react";
import { key, server } from "../../constance/constance";
import { httpClient } from "../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";

class Data_tn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date_end: moment().add(-0, "days").format("YYYY-MM-DD"),
      selected_process: "",
      list_machine: [],
      selected_machine: "",
      text_ct: "",
      text_output: "",
      selected_shift: "All",
      output_series: [],
      output_options: {},
      accumulate_series: [],
      accumulate_options: {},
      point: "",
      output_series_CT: [],
      output_options_CT: {},
      output_series_utl : [],
      output_options_utl: {},

      series1: [],
      options1: {},

    };
  }
  componentDidMount = async () => {
    await this.setState({
      date_start: moment().add(-0, "days").format("YYYY-MM-DD"),
    })
    let mc_list_data = await httpClient.post(server.TUN_MC_LIST);
    await this.setState({
      list_machine: mc_list_data.data.result,
      selected_machine: mc_list_data.data.result[0].mc_name,
    });

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
      if (this.state.list_machine !== null) {
        const myResult = this.state.list_machine;
        return myResult.map((item) => <option>{item.mc_name}</option>);
      }
    } catch (error) { }
  };

  click_update = async () => {
    // console.log('up');
    await this.setState({
      text_ct: "",
      text_output: "",
    });
    // this.show_chart_timeline();
    this.cycle_time();
    // this.show_total();
    this.show_chart_output();
    this.getCT_byHour();
    // this.show_chart_defect();

    setTimeout(
      function () {
        //Start the timer
        this.click_update()
      }.bind(this),
      600000
    );

  };
  show_chart_output = async () => {
    // output chart
    let output_data = await httpClient.post(server.TUN_OUTPUT, {
      date: this.state.date_start,
      machine: this.state.selected_machine,
    });
    console.log(output_data.data.result);
    var label_output = [];
    var data_output_target = [];
    var data_output_actual = [];
    var data_output_accum_target = [];
    var data_output_accum_actual = [];

    for (let i = 0; i < output_data.data.result.length; i++) {
      label_output.push(output_data.data.result[i].hour);
      data_output_actual.push(output_data.data.result[i].output_hour);
      data_output_target.push(output_data.data.result[i].target_hour);
      data_output_accum_target.push(output_data.data.result[i].target_accum);
      data_output_accum_actual.push(output_data.data.result[i].output_accum);
    }

    console.log(label_output);
    console.log(data_output_actual);
    console.log(data_output_accum_actual[12]);
    // var data_output_accum_actual_12 = data_output_accum_actual[12]
    await this.setState({
      // point : output_data.data.result[12].output_accum,
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
          // height: 350,
          type: "line",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: 3,
          curve: 'smooth',
        },
        markers: {
          size: 4,
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
        title: {
          text: "OUTPUT BY HOUR",
          align: 'center',
          style: {
            fontSize: '25px',
            fontWeight: 'bold',
          }
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
            text: "OUTPUT per Hr (pcs)",
            style: {
              fontSize: '15px',
            }
          },
          min: 0,
          max: 4000,
          labels: {
            show: true,
          },
        },
        // annotations: {
        //   points: [
        //     {
        //       y: 2000,
        //       label: {
        //         borderColor: '#FF4560',
        //         text: '2000'
        //       }
        //     },

        //   ]
        // }

      },

      accumulate_series: [
        {
          name: "OUTPUT/ Hr",
          type: "column",
          data: data_output_actual,
        },
        {
          name: "ACCUM ACTUAL",
          type: "line",
          data: data_output_accum_actual,
        },
        {
          name: "ACCUM TARGET",
          type: "line",
          data: data_output_accum_target,
        },

      ],
      accumulate_options: {
        chart: {
          //height: 350,
          type: "line",
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          width: [1, 3, 3],
          curve: 'smooth',
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
              position: 'center',
              orientation: 'vertical',
            }
          },
        },
        // annotations: {
        //   points: [
        //     {
        //       x: label_output[12],
        //       y : data_output_accum_actual_12,
        //       // y: {
        //       //   data: data_output_accum_actual_12, 
        //       // },
        //       label: {
        //         borderColor: '#FF4560',
        //         //text: output_accum
        //       }
        //     },
        //   ]
        // },

        markers: {
          size: 4,
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
            max: 50000,
            tickAmount: 20,
            
        axisTicks: {
          show: true,
          borderType: 'dotted',
          color: '#78909C',
          width: 5,
          offsetX: 0,
          offsetY: 0
      },
          },
          {
            seriesName: "ACCUM ACTUAL",
            opposite: true,
            min: 0,
            max: 50000,
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
  };
  cycle_time = async () => {
    let mc_ttl = await httpClient.post(server.TUN_CT, {
      date: this.state.date_start,
      machine: this.state.selected_machine,
      shift: this.state.selected_shift,
    });
    try {
      console.log("ct", mc_ttl.data.result[0]);
      await this.setState({
        text_ct: mc_ttl.data.result[0].ct,
        text_output: mc_ttl.data.result[0].accum_output,
      });
    } catch (error) { }
  };

  getCT_byHour = async () => {
    let CT = await httpClient.post(server.TUN_ct_byHour, {
      date: this.state.date_start,
      machine: this.state.selected_machine,
    });
    let UTL = await httpClient.post(server.TUN_UTL, {
      date: this.state.date_start,
      machine: this.state.selected_machine,
    })
    console.log(CT.data.result);
    var label_CT = [];
    var data_CT_target = [];
    var data_CT_actual = [];

    var label_utl = [];
    var data_utl_actual = [];
    for (let i = 0; i < CT.data.result.length; i++) {
      label_CT.push(CT.data.result[i].hour);
      data_CT_target.push(CT.data.result[i].target);
      data_CT_actual.push(CT.data.result[i].ct);
    }
    // console.log(data_CT_actual);
    for (let j = 0; j < UTL.data.result.length; j++) {
      label_utl.push(UTL.data.result[j].hour);
      data_utl_actual.push(UTL.data.result[j].utl);
    }
console.log(UTL.data.result);
    await this.setState({
      // point : output_data.data.result[12].output_accum,
      output_series_CT: [
        {
          name: "ACTUAL",
          type: "column",
          data: data_CT_actual,
        },
        {
          name: "TARGET",
          type: "line",
          data: data_CT_target,
        },
      ],
      output_options_CT: {
        chart: {
          // height: 350,
          type: "line",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: 3,
          curve: 'smooth',
        },
        markers: {
          size: 4,
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
        title: {
          text: "CYCLE TIME BY HOUR",
          align: 'center',
          style: {
            fontSize: '25px',
            fontWeight: 'bold',
          }
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
        labels: label_CT,
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
            text: "Cycle Time",
            style: {
              fontSize: '15px',
            }
          },
          min: 0,
          max: 2.0,
          labels: {
            show: true,
          },
        },
        // annotations: {
        //   points: [
        //     {
        //       y: 2000,
        //       label: {
        //         borderColor: '#FF4560',
        //         text: '2000'
        //       }
        //     },

        //   ]
        // }

      },

      output_series_utl : [
        {
          name: "ACTUAL",
          type: "column",
          data: data_utl_actual,
        },
        // {
        //   name: "TARGET",
        //   type: "line",
        //   data: data_CT_target,
        // },
      ],
      output_options_utl: {
        chart: {
          // height: 350,
          type: "line",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: 3,
          curve: 'smooth',
        },
        markers: {
          size: 4,
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
        title: {
          text: "Machine Utilization",
          align: 'center',
          style: {
            fontSize: '25px',
            fontWeight: 'bold',
          }
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
            text: "%",
            style: {
              fontSize: '15px',
            }
          },
          min: 0,
          max: 100,
          labels: {
            show: true,
          },
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
        // annotations: {
        //   points: [
        //     {
        //       y: 2000,
        //       label: {
        //         borderColor: '#FF4560',
        //         text: '2000'
        //       }
        //     },

        //   ]
        // }

      },
    });
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <h2 className="text-center" style={{ fontWeight: 'bold' }} > TURNING DASHBOARD </h2>
          </div>
        </section>

        <div className="row">
          <div className="card card-warning col-md-12" >
            {/* <div className="card-header">
                <div className="row">Filter</div>
              </div> */}
            <div className="card-body">
              <div className="col-md-12">
              <div className="row" >
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
                  <input style={{ fontWeight: "bold", fontSize: 20, textAlign: 'center' }} value="TURNING" type="text" className="form-control" />
                </div>
                <div className="col-md-2">
                  <h5>
                    <i class="fa fa-memory">&nbsp;</i>MACHINE
                  </h5>
                  <select
                    value={this.state.selected_machine}
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ selected_machine: e.target.value });
                    }}
                  >
                    <option>---</option>
                    {this.renderTableRow()}
                  </select>
                </div>
                <div className="col-md-2">
                  <h5>
                    <i class="fa fa-clock"></i>&nbsp;CYCLE TIME
                  </h5>
                  <input style={{ fontWeight: "bold", fontSize: 25, textAlign: 'center' }} value={this.state.text_ct} type="text" className="form-control" />
                </div>
                {/* <div style={{ width: "2%" }}></div>
                <div style={{ width: "10%" }}>
                  <h5>
                    <i class="fa fa-chart-pie"></i>&nbsp;Yield
                  </h5>
                  <input style={{ fontWeight: "bold", fontSize: 20 }} value={this.state.text_yield} type="text" className="form-control" />
                </div> */}

                <div className="col-md-2">
                  <h5>
                    <i class="fa fa-chart-line"></i>&nbsp;OUTPUT
                  </h5>
                  <input style={{ fontWeight: "bold", fontSize: 25, textAlign: 'center' }} value={this.state.text_output} type="text" className="form-control" />
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
                  <ReactApexChart options={this.state.output_options_CT} series={this.state.output_series_CT} type="line" height={550} />
                </div>
                <div className="col-md-6">
                  <ReactApexChart options={this.state.output_options_utl} series={this.state.output_series_utl} type="line" height={550} />
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }

}

export default Data_tn;
