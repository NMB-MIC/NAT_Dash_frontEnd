import React, { Component } from "react";
import { key, server } from "../../../constance/constance";
import { httpClient } from "../../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";
import Swal from "sweetalert2";


class MMS_TB extends Component {

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

      responsible: "All",
      timeline_options_test: {},
      timeline_series_test: [],

    };
  };

  componentDidMount = async () => {
    let mc_list_data = await httpClient.post(server.TB_mc)
    await this.setState({
      list_machine: mc_list_data.data.result,
      selected_machine: mc_list_data.data.result[0].mc_no,
      //date_start: moment().add(-0, "days").format("2023-01-13"),
    })
    console.log(mc_list_data.data.result);

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
    } catch (error) { }
  };

  click_update = async () => {
    // await this.show_chart_timeline();
    await this.timeline_status_log();
    await this.show_chart_timeline_test();
    await this.alarm_time();
    await this.stop_time();

  };

  timeline_status_log = async () => {
    // console.log(this.state.timeline_series);
    try {
      let data_status_log = await httpClient.post(server.mc_status_log_TB, {
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
    } catch (error) {}
  };

  // show_chart_timeline = async () => {
  //   // console.log(this.state.timeline_series);
  //   try {
  //     let mc_data = await httpClient.post(server.TIMELINE_TB, {
  //       date: this.state.date_start,
  //       machine: this.state.selected_machine,
  //     });
  //     console.log(mc_data.data.result);

  //     var HANDLE_ENGAGED = [], COOLANT_LOW = [];
  //     var BOBBIN_OF_POSITION = [], ANALOG_UNIT_ALARM = [], OIL_TEMP_HIGH = [], FIRE_EXTINGUISHER = [], BAR_END = [];
  //     var HI_PRESSHER_LOW = [], PART_DROP_P0S = [], DRILL_OUT_ALARM = [], AW = [], HG = [];
  //     var SERVO_alarm = [], CAM_alarm = [], SPINDLE_HIGH = [], DOOR_OPEN = [], over_L_AW = [], over_L_HG = [];
  //     var IVT_main = [], IVT_cvy = [], ovl_MC = [], ovl_MHP = [], data_emer = [], REAR_door = [];
  //     var Hv500 = [], Hv4500 = [], Hv50 = [], cnt8 = [], barcut = [], part_drop = [], rpm = [], air_pd = [], mc_no_work = [], GEAR = [], values_rpm = [], ovl68 = [], pos = [], full_chip = [];
  //     for (let index = 0; index < mc_data.data.result.length; index++) {
  //       switch (mc_data.data.result[index].topic) {
  //         case "HANDLE ENGAGED":
  //           HANDLE_ENGAGED.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "COOLANT LOW":
  //           COOLANT_LOW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "BOBBIN OF POSITION":
  //           BOBBIN_OF_POSITION.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "ANALOG UNIT ALARM":
  //           ANALOG_UNIT_ALARM.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "OIL TEMP. HIGH":
  //           OIL_TEMP_HIGH.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "FIRE EXTINGUISHER":
  //           FIRE_EXTINGUISHER.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "BAR END":
  //           BAR_END.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "HI PRESSHER LOW":
  //           HI_PRESSHER_LOW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "PART DROP P0S 6":
  //           PART_DROP_P0S.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "DRILL OUT ALARM":
  //           DRILL_OUT_ALARM.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "AW 10 LOW LEVEL":
  //           AW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "HG 68 LOW LEVEL":
  //           HG.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "SERVO ALARM":
  //           SERVO_alarm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "CAM POSITION ALARM":
  //           CAM_alarm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "R.P.M SPINDLE HIGH":
  //           SPINDLE_HIGH.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "FRONT DOOR OPEN":
  //           DOOR_OPEN.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "OVER LOAD MOTOR AW 10":
  //           over_L_AW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "OVER LOAD MOTOR HG 68":
  //           over_L_HG.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "INVERTER MAIN MOTOR ALARM":
  //           IVT_main.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "INVERTER CONVEYOR MOTOR ALARM":
  //           IVT_cvy.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "OVER LOAD MOTOR COOLANT":
  //           ovl_MC.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "OVER LOAD MOTOR HI PRESSHER":
  //           ovl_MHP.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "EMERGENCE PUSHTBUTTON SWITCH":
  //           data_emer.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "REAR DOOR OPEN":
  //           REAR_door.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "HIGH VALUE NOT MORE 500":
  //           Hv500.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "HIGH VALUE NOT MORE 4500":
  //           Hv4500.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "HIGH VALUE NOT MORE 50":
  //           Hv50.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "CNT 8 NO SETTING":
  //           cnt8.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "BAR CUT NO SETTING":
  //           barcut.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "PART DROP NO SETTING":
  //           part_drop.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "R.P.M SPINDLE LOW":
  //           rpm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "COMPRESSED AIR PRESSURE DEFICIEN":
  //           air_pd.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "THE MACHINE DOES NOT WORK":
  //           mc_no_work.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "GEAR R.P.M NO SETTING":
  //           GEAR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "INPUT VALUES R.P.M DO NOT MATCH":
  //           values_rpm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "OVER LOAD MOTOR GEAR 68":
  //           ovl68.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "PART DROP P0S 4":
  //           pos.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         case "FULL CHIP CONVEYOR":
  //           full_chip.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
  //           break;
  //         default:
  //         // code block
  //       }

  //     }

  //     await this.setState({
  //       timeline_series: [
  //         {
  //           name: "HANDLE ENGAGED",
  //           data: HANDLE_ENGAGED,
  //         },
  //         {
  //           name: "COOLANT LOW",
  //           data: COOLANT_LOW,
  //         },
  //         {
  //           name: "BOBBIN OF POSITION",
  //           data: BOBBIN_OF_POSITION,
  //         },
  //         {
  //           name: "ANALOG UNIT ALARM",
  //           data: ANALOG_UNIT_ALARM,
  //         },
  //         {
  //           name: "OIL TEMP. HIGH",
  //           data: OIL_TEMP_HIGH,
  //         },
  //         {
  //           name: "FIRE EXTINGUISHER",
  //           data: FIRE_EXTINGUISHER,
  //         },
  //         {
  //           name: "BAR END",
  //           data: BAR_END,
  //         },
  //         {
  //           name: "HI PRESSHER LOW",
  //           data: HI_PRESSHER_LOW,
  //         },
  //         {
  //           name: "PART DROP P0S 6",
  //           data: PART_DROP_P0S,
  //         },
  //         {
  //           name: "DRILL OUT ALARM",
  //           data: DRILL_OUT_ALARM,
  //         },
  //         {
  //           name: "AW 10 LOW LEVEL",
  //           data: AW,
  //         },
  //         {
  //           name: "HG 68 LOW LEVEL",
  //           data: HG,
  //         },
  //         {
  //           name: "SERVO ALARM",
  //           data: SERVO_alarm,
  //         },
  //         {
  //           name: "CAM POSITION ALARM",
  //           data: CAM_alarm,
  //         },
  //         {
  //           name: "R.P.M SPINDLE HIGH",
  //           data: SPINDLE_HIGH,
  //         },
  //         {
  //           name: "FRONT DOOR OPEN",
  //           data: DOOR_OPEN,
  //         },
  //         {
  //           name: "OVER LOAD MOTOR AW 10",
  //           data: over_L_AW,
  //         },
  //         {
  //           name: "OVER LOAD MOTOR HG 68",
  //           data: over_L_HG,
  //         },
  //         {
  //           name: "INVERTER MAIN MOTOR ALARM",
  //           data: IVT_main,
  //         },
  //         {
  //           name: "INVERTER CONVEYOR MOTOR ALARM",
  //           data: IVT_cvy,
  //         },
  //         {
  //           name: "OVER LOAD MOTOR COOLANT",
  //           data: ovl_MC,
  //         },
  //         {
  //           name: "OVER LOAD MOTOR HI PRESSHER",
  //           data: ovl_MHP,
  //         },
  //         {
  //           name: "EMERGENCE PUSHTBUTTON SWITCH",
  //           data: data_emer,
  //         },
  //         {
  //           name: "REAR DOOR OPEN",
  //           data: REAR_door,
  //         },
  //         {
  //           name: "HIGH VALUE NOT MORE 500",
  //           data: Hv500,
  //         },
  //         {
  //           name: "HIGH VALUE NOT MORE 4500",
  //           data: Hv4500,
  //         },
  //         {
  //           name: "HIGH VALUE NOT MORE 50",
  //           data: Hv50,
  //         },
  //         {
  //           name: "CNT 8 NO SETTING",
  //           data: cnt8,
  //         },
  //         {
  //           name: "BAR CUT NO SETTING",
  //           data: barcut,
  //         },
  //         {
  //           name: "PART DROP NO SETTING",
  //           data: part_drop,
  //         },
  //         {
  //           name: "R.P.M SPINDLE LOW",
  //           data: rpm,
  //         },
  //         {
  //           name: "COMPRESSED AIR PRESSURE DEFICIEN",
  //           data: air_pd,
  //         },
  //         {
  //           name: "THE MACHINE DOES NOT WORK",
  //           data: mc_no_work,
  //         },
  //         {
  //           name: "GEAR R.P.M NO SETTING",
  //           data: GEAR,
  //         },
  //         {
  //           name: "INPUT VALUES R.P.M DO NOT MATCH",
  //           data: values_rpm,
  //         },
  //         {
  //           name: "OVER LOAD MOTOR GEAR 68",
  //           data: ovl68,
  //         },
  //         {
  //           name: "PART DROP P0S 4",
  //           data: pos,
  //         },
  //         {
  //           name: "FULL CHIP CONVEYOR",
  //           data: full_chip,
  //         },

  //       ],
  //       timeline_options: {
  //         chart: {
  //           height: 250,
  //           type: "rangeBar",
  //         },
  //         plotOptions: {
  //           bar: {
  //             horizontal: true,
  //             barHeight: "100%",
  //             rangeBarGroupRows: true,
  //           },
  //         },
  //         colors: ["#D7263D", "#008b02", "#57aeff", "#F46036", "#E2C044",
  //          "#ff08e2", "#0d1dfc","#94bafb","#195529","#c37e41","#a7037e",
  //          "#CCFF00","#FFFF66","#FFCC66","#CC9999","#CC6666" ,
  //          "#FF6666","#9900FF","#66CC00","#66CCCC" ,"#000033",
  //          "#FF0066","#C70039","#FFFF00" ,"#45B39D" ,"#2962FF",
  //         "#18FFFF","#7CB342","#EEFF41","#FF5722","#E91E63",
  //         "#AB47BC","#FF96C5","#74737A","#00C3AF","#6C88C4",
  //         "#FFA23A","#FDBB9F","#FF1744"
  //       ],
  //         fill: {
  //           type: "solid",
  //         },
  //         // labels: Data_time,
  //         xaxis: {
  //           type: "datetime",
  //           labels: {
  //             datetimeUTC: false,
  //           },
  //         },
  //         yaxis: {
  //           show: true,
  //           title: {
  //             style: {
  //               fontSize: '10px',
  //             }
  //           }
  //         },
  //         // legend: {
  //         //   position: "right",
  //         // },
  //         tooltip: {
  //           x: {
  //             format: "HH:mm:ss",
  //           },
  //         },
  //         // dataLabels: {
  //         //   enabled: true,
  //         // }
  //       },
  //     });

  //   } catch (error) {


  //   }

  // };

  show_chart_timeline_test = async () => {
    // console.log(this.state.timeline_series);
    try {
      let mc_data = await httpClient.post(server.TIMELINE_TB_test, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        responsible: this.state.responsible,
      });
      console.log(mc_data.data.result);

      var HANDLE_ENGAGED = [], COOLANT_LOW = [];
      var BOBBIN_OF_POSITION = [], ANALOG_UNIT_ALARM = [], OIL_TEMP_HIGH = [], FIRE_EXTINGUISHER = [], BAR_END = [];
      var HI_PRESSHER_LOW = [], PART_DROP_P0S = [], DRILL_OUT_ALARM = [], AW = [], HG = [];
      var SERVO_alarm = [], CAM_alarm = [], SPINDLE_HIGH = [], DOOR_OPEN = [], over_L_AW = [], over_L_HG = [];
      var IVT_main = [], IVT_cvy = [], ovl_MC = [], ovl_MHP = [], data_emer = [], REAR_door = [];
      var Hv500 = [], Hv4500 = [], Hv50 = [], cnt8 = [], barcut = [], part_drop = [], rpm = [], air_pd = [], mc_no_work = [], GEAR = [], values_rpm = [], ovl68 = [], pos = [], full_chip = [];
      for (let index = 0; index < mc_data.data.result.length; index++) {
        switch (mc_data.data.result[index].topic) {
          case "HANDLE ENGAGED":
            HANDLE_ENGAGED.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "COOLANT LOW":
            COOLANT_LOW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "BOBBIN OF POSITION":
            BOBBIN_OF_POSITION.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "ANALOG UNIT ALARM":
            ANALOG_UNIT_ALARM.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "OIL TEMP. HIGH":
            OIL_TEMP_HIGH.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FIRE EXTINGUISHER":
            FIRE_EXTINGUISHER.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "BAR END":
            BAR_END.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "HI PRESSHER LOW":
            HI_PRESSHER_LOW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PART DROP P0S 6":
            PART_DROP_P0S.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DRILL OUT ALARM":
            DRILL_OUT_ALARM.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AW 10 LOW LEVEL":
            AW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "HG 68 LOW LEVEL":
            HG.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SERVO ALARM":
            SERVO_alarm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CAM POSITION ALARM":
            CAM_alarm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "R.P.M SPINDLE HIGH":
            SPINDLE_HIGH.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FRONT DOOR OPEN":
            DOOR_OPEN.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "OVER LOAD MOTOR AW 10":
            over_L_AW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "OVER LOAD MOTOR HG 68":
            over_L_HG.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "INVERTER MAIN MOTOR ALARM":
            IVT_main.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "INVERTER CONVEYOR MOTOR ALARM":
            IVT_cvy.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "OVER LOAD MOTOR COOLANT":
            ovl_MC.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "OVER LOAD MOTOR HI PRESSHER":
            ovl_MHP.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "EMERGENCE PUSHTBUTTON SWITCH":
            data_emer.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "REAR DOOR OPEN":
            REAR_door.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "HIGH VALUE NOT MORE 500":
            Hv500.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "HIGH VALUE NOT MORE 4500":
            Hv4500.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "HIGH VALUE NOT MORE 50":
            Hv50.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CNT 8 NO SETTING":
            cnt8.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "BAR CUT NO SETTING":
            barcut.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PART DROP NO SETTING":
            part_drop.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "R.P.M SPINDLE LOW":
            rpm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "COMPRESSED AIR PRESSURE DEFICIEN":
            air_pd.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "THE MACHINE DOES NOT WORK":
            mc_no_work.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GEAR R.P.M NO SETTING":
            GEAR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "INPUT VALUES R.P.M DO NOT MATCH":
            values_rpm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "OVER LOAD MOTOR GEAR 68":
            ovl68.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PART DROP P0S 4":
            pos.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FULL CHIP CONVEYOR":
            full_chip.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          default:
          // code block
        }

      }

      await this.setState({
        timeline_series_test: [
          {
            name: "HANDLE ENGAGED",
            data: HANDLE_ENGAGED,
          },
          {
            name: "COOLANT LOW",
            data: COOLANT_LOW,
          },
          {
            name: "BOBBIN OF POSITION",
            data: BOBBIN_OF_POSITION,
          },
          {
            name: "ANALOG UNIT ALARM",
            data: ANALOG_UNIT_ALARM,
          },
          {
            name: "OIL TEMP. HIGH",
            data: OIL_TEMP_HIGH,
          },
          {
            name: "FIRE EXTINGUISHER",
            data: FIRE_EXTINGUISHER,
          },
          {
            name: "BAR END",
            data: BAR_END,
          },
          {
            name: "HI PRESSHER LOW",
            data: HI_PRESSHER_LOW,
          },
          {
            name: "PART DROP P0S 6",
            data: PART_DROP_P0S,
          },
          {
            name: "DRILL OUT ALARM",
            data: DRILL_OUT_ALARM,
          },
          {
            name: "AW 10 LOW LEVEL",
            data: AW,
          },
          {
            name: "HG 68 LOW LEVEL",
            data: HG,
          },
          {
            name: "SERVO ALARM",
            data: SERVO_alarm,
          },
          {
            name: "CAM POSITION ALARM",
            data: CAM_alarm,
          },
          {
            name: "R.P.M SPINDLE HIGH",
            data: SPINDLE_HIGH,
          },
          {
            name: "FRONT DOOR OPEN",
            data: DOOR_OPEN,
          },
          {
            name: "OVER LOAD MOTOR AW 10",
            data: over_L_AW,
          },
          {
            name: "OVER LOAD MOTOR HG 68",
            data: over_L_HG,
          },
          {
            name: "INVERTER MAIN MOTOR ALARM",
            data: IVT_main,
          },
          {
            name: "INVERTER CONVEYOR MOTOR ALARM",
            data: IVT_cvy,
          },
          {
            name: "OVER LOAD MOTOR COOLANT",
            data: ovl_MC,
          },
          {
            name: "OVER LOAD MOTOR HI PRESSHER",
            data: ovl_MHP,
          },
          {
            name: "EMERGENCE PUSHTBUTTON SWITCH",
            data: data_emer,
          },
          {
            name: "REAR DOOR OPEN",
            data: REAR_door,
          },
          {
            name: "HIGH VALUE NOT MORE 500",
            data: Hv500,
          },
          {
            name: "HIGH VALUE NOT MORE 4500",
            data: Hv4500,
          },
          {
            name: "HIGH VALUE NOT MORE 50",
            data: Hv50,
          },
          {
            name: "CNT 8 NO SETTING",
            data: cnt8,
          },
          {
            name: "BAR CUT NO SETTING",
            data: barcut,
          },
          {
            name: "PART DROP NO SETTING",
            data: part_drop,
          },
          {
            name: "R.P.M SPINDLE LOW",
            data: rpm,
          },
          {
            name: "COMPRESSED AIR PRESSURE DEFICIEN",
            data: air_pd,
          },
          {
            name: "THE MACHINE DOES NOT WORK",
            data: mc_no_work,
          },
          {
            name: "GEAR R.P.M NO SETTING",
            data: GEAR,
          },
          {
            name: "INPUT VALUES R.P.M DO NOT MATCH",
            data: values_rpm,
          },
          {
            name: "OVER LOAD MOTOR GEAR 68",
            data: ovl68,
          },
          {
            name: "PART DROP P0S 4",
            data: pos,
          },
          {
            name: "FULL CHIP CONVEYOR",
            data: full_chip,
          },

        ],
        timeline_options_test: {
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
            show : true ,
            showForNullSeries:false,
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

    } catch (error) {
    }

  };
  alarm_time = async () => {
    let alarm = await httpClient.post(server.AlarmTopic_time_TB, {
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
    let stop_time = await httpClient.post(server.stop_time_TB, {
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
                    <input style={{ fontWeight: "bold", fontSize: 20, textAlign: 'center' }} value="TURNING" type="text" className="form-control" />
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
                      <ReactApexChart options={this.state.timeline_options_test} series={this.state.timeline_series_test} type="rangeBar" height={300} />
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

export default MMS_TB;
