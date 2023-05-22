import React, { Component } from "react";
import { key, server } from "../../../constance/constance";
import { httpClient } from "../../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";

class MMS_IRR extends Component {

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

  click_update = async () => {
    await this.timeline_status_log();
    await this.show_chart_timeline();
    await this.alarm_time();
    await this.stop_time();

  };

  componentDidMount = async () => {
    try {
      let mc_list_data = await httpClient.post(server.IRR_mc)
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
      let data_status_log = await httpClient.post(server.mc_status_log_IRR, {
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
      let mc_data = await httpClient.post(server.TIMELINE_IRB, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        responsible: this.state.responsible,
      });
      console.log(mc_data.data.result);
      var X00 = [], X01 = [], X02 = [], X03 = [], X04 = [], X11 = [], X3E = [], X07 = [], X08 = [], X09 = [], X10 = [], X11 = [], X12 = [], X13 = [], X14 = [], X15 = [], X16 = [], X17 = [], X18 = [], X19 = [], X1A = []
      var X1B = [], X1C = [], X1D = [], X39 = [], X0A = [], X0B = [], X0C = [], XCF = []
      var CPU_Err = [], CPU_low_Err = [], Q_CPU_Err = [], Q_CPU_lowErr = [], ct_over = [], Feed_Err = [], SA1 = [], SA2 = [], SA2_SERVO = [], SA3 = [], SA3_SERVO = [], SA4 = [], SA4_SERVO = [], Q64D = [], Q64A = [], X34 = [], X32 = [], Balancer = [], X1E = [], X1F = [], XC4 = [], FEED_servo_Err = [], Dress_servo_Err = [], PICK_UPSERVO_Err = [], ST_servo_Err = [], motion_Err = [], FEED_MOTION_Err = [], DRESS_MOTION_Err = [], PICK_UP_Err = [], ST_MOTION_Err = [], GOT_Err = [], X07 = [], X06 = [], XC5 = [], XC6 = [], XDC = [], XC7 = [], X4E = [], X4F = [], XC8 = [], XC9 = [], XDA = [], X156 = [], SIDE_FWD = [], SIDE_REV = [], WW = [], LOD_Err = [], DO = [], ST_full = [], CE = [], AFT_stop = [], SPINOUT = []
      var GWM_overLoad = [], SPO_mode = [], Rd_FWD_Err = [], Rd_REV_Err = [], Count_FW = [], Dress = [], STP_FWD_Err = [], STP_REV_Err = [], RTR_NRun = [], Oil_RT = [], WH_Err = [], CassFWD_Err = [], CassREV_Err = [], FSV_Alarm = [], DRV_Alarm = [], PSV_Alarm = [], STSV_Alarm = [], GE = [], GE_nReady = [], RW_B = [], GE_C = [], GE_nON = [], ULD_STP_Err = [], N_MC_Err = [], FW = [], SLD_FWD_LP = [], SLD_UP_LP = [], PH_FWD_Err = [], PH_REV_Err = [], LP_Err = [], LTD_ERR = [], STK_FWD_Err = [], STK_REV_Err = [], TRF_FWD_Err = [], TRF_REV_Err = [], TRF_noW_Err = [], GE_check = [], GE_noise = []

      for (let index = 0; index < mc_data.data.result.length; index++) {
        switch (mc_data.data.result[index].topic) {
          case "FIRE EXTINGUISHER (X00)":
            X00.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "MAIN AIR PRESSURE (X01)":
            X01.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "MAIN COOLANT FLOW (X02)":
            X02.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GRIDING COOLANT (X03)":
            X03.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "HY.-STATIC PRESSURE (FRONT) (X04)":
            X04.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "HY.-STATIC PRESSURE (REAR) (X11)":
            X11.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "ROTARY INVERTER ALARM (INV-3) (X3E)":
            X3E.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "G.WHEEL MOTOR OVER HEAT (X07)":
            X07.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "G.WHEEL INVERTER ALARM (INV-1) (X08)":
            X08.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "WORK HEAD INVERTER ALARM (INV-2) (X09)":
            X09.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-2 OFF POWER SUPPLY (PWS-1) (X10)":
            X10.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-3 OFF TRANSFORMER 200V (T-1) (X11)":
            X11.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "ELB-3 OFF TRANSFORMER 100V (T-1) (X12)":
            X12.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-4 OFF G.WHEEL INVERTER (INV-1) (X13)":
            X13.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-5 OFF WORK HEAD INVERTER (INV-2) (X14)":
            X14.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-6 OFF FEED TABLE (SA-1) (X15)":
            X15.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-7 OFF DRESSER TABLE (SA-2) (X16)":
            X16.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-8 OFF PICK UP MOTOR (SA-3) (X17)":
            X17.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-9 OFF STOCKER MOTOR (SA-4) (X18)":
            X18.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-11 OFF TRANSFORMER 200V (T-2) (X19)":
            X19.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-12 OFF MAGNET CHUCK (X1A)":
            X1A.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-13 OFF TRANSFORMER 200V (T-3) (X1B)":
            X1B.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-14 OFF RADIAL DRESSER MOTOR (X1C)":
            X1C.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-15 OFF SIDE DRESSER MOTOR (X1D)":
            X1D.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-18 OFF ROTARY INVERTER (INV-3) (X39)":
            X39.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-15 OFF SIDE DRESSER MOTOR (X1D)":
            X1D.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LUBE PRESSURE ALARM (X0A)":
            X0A.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LUBE OIL LEVEL ALARM (X0B)":
            X0B.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-15 OFF SIDE DRESSER MOTOR (X1D)":
            X1D.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AIR PRESSURE ALARM (OIL AIR) (X0C)":
            X0C.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "G.WHEEL COVER OPEN (XCF)":
            XCF.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CPU ERROR":
            CPU_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CPU BATTERY LOW ERROR":
            CPU_low_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "Q172DS CPU ERROR":
            Q_CPU_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "Q172DS CPU BATTERY LOW ERROR":
            Q_CPU_lowErr.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CYCLE TIME OVER STOP":
            ct_over.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FEED TABLE ERROR (SA-1)":
            Feed_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FEED TABLE SERVO ERROR (SA-1)":
            SA1.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DRESSER TABLE ERROR (SA-2)":
            SA2.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DRESSER TABLE SERVO ERROR (SA-2)":
            SA2_SERVO.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PICK UP ERROR (SA-3)":
            SA3.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PICK UP SERVO ERROR (SA-3)":
            SA3_SERVO.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "STOCKER ERROR (SA-4)":
            SA4.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "STOCKER SERVO ERROR (SA-4)":
            SA4_SERVO.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "Q64DAN ERROR":
            Q64D.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "Q64AD ERROR":
            Q64A.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AUTO GREASE PRESSURE ERROR (X34)":
            X34.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AUTO GREASE PUMP LEVEL ERROR (X32)":
            X32.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "BALANCER ALARM":
            Balancer.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-16 OFF SOCKET OUTLET (X1E)":
            X1E.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-17 OFF P/F PANEL (X1F)":
            X1F.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-19 OFF COOLING FAN (XC4)":
            XC4.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FEED SERVO AMP BATTERY ERROR":
            FEED_servo_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DRESS SERVO AMP BATTERY ERROR":
            Dress_servo_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PICK UP SERVO AMP BATTERY ERROR":
            PICK_UPSERVO_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "STOCKER SERVO AMP BATTERY ERROR":
            ST_servo_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "MOTION DATA WRITE ERROR":
            motion_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FEED MOTION WRITE or START ERROR":
            FEED_MOTION_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DRESS MOTION WRITE or START ERROR":
            DRESS_MOTION_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PICK UP MOTION WRITE or START ERROR":
            PICK_UP_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "STOCKER MOTION WRITE or START ERROR":
            ST_MOTION_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GOT ERROR DETECT":
            GOT_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "G.WHEEL MOTOR O/L (X07)":
            X07.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "TH-1 THERMAL RELAY ERROR (X06)":
            X06.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-20 or MMS-1 OFF HY-STATIC PUMP (XC5)":
            XC5.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-21 or OFF ROTARY INVERTER (INV-4) (XC6)":
            XC6.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "ROTARY INVERTER ALARM (INV-4 or INV-6) (XDC)":
            XDC.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-22 OFF LINE UP MOTOR (XC7)":
            XC7.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LUBRICATION OIL LEVEL ALARM (X4E)":
            X4E.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LUBRICATION AIR ALARM (X4F)":
            X4F.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-23 OFF ROTARY ALARM (XC8)":
            XC8.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-24 OFF LUB. OIL ALARM (XC9)":
            XC9.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-25 OFF DEMAGNETIZER (XDA)":
            XDA.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-30 OFF ROTARY INVERTER (INV-6) (X156)":
            X156.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SIDE DRESS FWD. ERROR":
            SIDE_FWD.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SIDE DRESS REV. ERROR":
            SIDE_REV.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "WORN WHEEL":
            WW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LOADING ERROR":
            LOD_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DOOR OPEN":
            DO.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "STOCKER FULL WORK":
            ST_full.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CHUTE EMPTY":
            CE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AFTER DRESS STOP":
            AFT_stop.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SPINOUT":
            SPINOUT.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "G.WHEEL MOTOR OVER LOAD":
            GWM_overLoad.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SPARKOUT HOLD MODE":
            SPO_mode.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "RADIAL DRESS FWD. ERROR":
            Rd_FWD_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "RADIAL DRESS REV. ERROR":
            Rd_REV_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "COUNT FULL WORK":
            Count_FW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DRESS":
            Dress.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "STOCKER PUSHER FWD. ERROR":
            STP_FWD_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "STOCKER PUSHER REV. ERROR":
            STP_REV_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "ROTARY DRESS NOT RUN":
            RTR_NRun.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "OIL RETURN FULL":
            Oil_RT.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "WORK HOLDER ERROR":
            WH_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CASSETTE FWD. ERROR":
            CassFWD_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CASSETTE REV. ERROR":
            CassREV_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FEED SERVO AMP BATTERY ALARM":
            FSV_Alarm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DRESS SERVO AMP BATTERY ALARM":
            DRV_Alarm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PICK UP SERVO AMP BATTERY ALARM":
            PSV_Alarm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "STOCKER SERVO AMP BATTERY ALARM":
            STSV_Alarm.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GE ON":
            GE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GE NOT READY":
            GE_nReady.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "R/W BIG":
            RW_B.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GE CRUSH":
            GE_C.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GE NOT ON":
            GE_nON.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "UNLOADER STOPPER UP/D ERROR":
            ULD_STP_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "NEXT M/C CHUTE ERROR":
            N_MC_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FULL WORK":
            FW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SLIDER FWD/REV ERROR LINE UP":
            SLD_FWD_LP.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SLIDER UP/DOWN ERROR LINE UP":
            SLD_UP_LP.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PUSHER FWD ERROR LINE UP":
            PH_FWD_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PUSHER REV ERROR LINE UP":
            PH_REV_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LIFTER UP ERROR LINE UP":
            LP_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LIFTER DOWN ERROR LINE UP":
            LTD_ERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "STOCKER FWD ERROR LINE UP":
            STK_FWD_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "STOCKER REV ERROR LINE UP":
            STK_REV_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "TRANSFER LOADER FWD ERR":
            TRF_FWD_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "TRANSFER LOADER REV ERR":
            TRF_REV_Err.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GE CHECK MODE":
            GE_check.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GE NOISE CHECK":
            GE_noise.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;

          default:
          // code block
        }
      }
      await this.setState({
        timeline_series: [
          { name: "FIRE EXTINGUISHER (X00)", data: X00 }, { name: "MAIN AIR PRESSURE (X02)", data: X02 },
          { name: "MAIN AIR PRESSURE (X01)", data: X01 }, { name: "GRIDING COOLANT (X03)", data: X03 },
          { name: "HY.-STATIC PRESSURE (FRONT) (X04)", data: X04 }, { name: "HY.-STATIC PRESSURE (REAR) (X11)", data: X11 },
          { name: "ROTARY INVERTER ALARM (INV-3) (X3E)", data: X3E }, { name: "G.WHEEL MOTOR OVER HEAT (X07)", data: X07 },
          { name: "G.WHEEL INVERTER ALARM (INV-1) (X08)", data: X08 }, { name: "WORK HEAD INVERTER ALARM (INV-2) (X09)", data: X09 },
          { name: "CP-2 OFF POWER SUPPLY (PWS-1) (X10)", data: X10 }, { name: "CP-3 OFF TRANSFORMER 200V (T-1) (X11)", data: X11 },
          { name: "ELB-3 OFF TRANSFORMER 100V (T-1) (X12)", data: X12 }, { name: "CP-4 OFF G.WHEEL INVERTER (INV-1) (X13)", data: X13 },
          { name: "CP-5 OFF WORK HEAD INVERTER (INV-2) (X14)", data: X14 }, { name: "CP-6 OFF FEED TABLE (SA-1) (X15)", data: X15 },
          { name: "CP-7 OFF DRESSER TABLE (SA-2) (X16)", data: X16 }, { name: "CP-8 OFF PICK UP MOTOR (SA-3) (X17)", data: X17 },
          { name: "CP-9 OFF STOCKER MOTOR (SA-4) (X18)", data: X18 }, { name: "CP-11 OFF TRANSFORMER 200V (T-2) (X19))", data: X19 },
          { name: "CP-12 OFF MAGNET CHUCK (X1A)", data: X1A }, { name: "CP-13 OFF TRANSFORMER 200V (T-3) (X1B)", data: X1B },
          { name: "CP-14 OFF RADIAL DRESSER MOTOR (X1C)", data: X1C }, { name: "CP-15 OFF SIDE DRESSER MOTOR (X1D)", data: X1D },
          { name: "CP-18 OFF ROTARY INVERTER (INV-3) (X39)", data: X39 }, { name: "LUBE PRESSURE ALARM (X0A)", data:X0A },
          { name: "LUBE OIL LEVEL ALARM (X0B)", data:X0B}, { name: "AIR PRESSURE ALARM (OIL AIR) (X0C)", data: X0C },
          { name: "G.WHEEL COVER OPEN (XCF)", data: XCF }, { name: "CPU ERROR", data: CPU_Err },
          { name: "CPU BATTERY LOW ERROR", data: CPU_low_Err }, { name: "Q172DS CPU ERROR", data: Q_CPU_Err },
          { name: "Q172DS CPU BATTERY LOW ERROR", data: Q_CPU_lowErr }, { name: "CYCLE TIME OVER STOP", data: ct_over },
          { name: "FEED TABLE ERROR (SA-1)", data: Feed_Err }, { name: "FEED TABLE SERVO ERROR (SA-1)", data: SA1 },
          { name: "DRESSER TABLE ERROR (SA-2)", data: SA2 }, { name: "DRESSER TABLE SERVO ERROR (SA-2)", data: SA2_SERVO },
          { name: "PICK UP ERROR (SA-3)", data: SA3 }, { name: "PICK UP SERVO ERROR (SA-3)", data: SA3_SERVO },
          { name: "STOCKER ERROR (SA-4)", data: SA4 }, { name: "STOCKER SERVO ERROR (SA-4)", data: SA4_SERVO },
          { name: "Q64DAN ERROR", data: Q64D }, { name: "Q64AD ERROR", data: Q64A },
          { name: "AUTO GREASE PRESSURE ERROR (X34)", data: X34 }, { name: "AUTO GREASE PUMP LEVEL ERROR (X32)", data: X32 },
          { name: "BALANCER ALARM", data: Balancer }, { name: "CP-16 OFF SOCKET OUTLET (X1E)", data: X1E },
          { name: "CP-17 OFF P/F PANEL (X1F)", data: X1F }, { name: "CP-19 OFF COOLING FAN (XC4)", data: XC4},
          { name: "FEED SERVO AMP BATTERY ERROR", data: FEED_servo_Err }, { name: "DRESS SERVO AMP BATTERY ERROR", data: Dress_servo_Err },
          { name: "PICK UP SERVO AMP BATTERY ERROR", data: PICK_UPSERVO_Err }, { name: "STOCKER SERVO AMP BATTERY ERROR", data: ST_servo_Err},
          { name: "MOTION DATA WRITE ERROR", data: motion_Err}, { name: "DRESS SERVO AMP BATTERY ERROR", data: Dress_servo_Err },
          { name: "FEED MOTION WRITE or START ERROR", data: FEED_MOTION_Err }, { name: "DRESS MOTION WRITE or START ERROR", data: DRESS_MOTION_Err},
          { name: "PICK UP MOTION WRITE or START ERROR", data: PICK_UP_Err }, { name: "STOCKER MOTION WRITE or START ERROR", data: ST_MOTION_Err },
          { name: "GOT ERROR DETECT", data: GOT_Err }, { name: "G.WHEEL MOTOR O/L (X07)", data: X07 },
          { name: "TH-1 THERMAL RELAY ERROR (X06)", data: X06 }, { name: "CP-20 or MMS-1 OFF HY-STATIC PUMP (XC5)", data: XC5 },
          { name: "CP-21 or OFF ROTARY INVERTER (INV-4) (XC6)", data: XC6 }, { name: "ROTARY INVERTER ALARM (INV-4 or INV-6) (XDC)", data: XDC },
          { name: "CP-22 OFF LINE UP MOTOR (XC7)", data: XC7 }, { name: "LUBRICATION OIL LEVEL ALARM (X4E)", data: X4E },
          { name: "LUBRICATION AIR ALARM (X4F)", data: X4F }, { name: "CP-23 OFF ROTARY ALARM (XC8)", data: XC8 },
          { name: "CP-24 OFF LUB. OIL ALARM (XC9)", data: XC9 }, { name: "CP-25 OFF DEMAGNETIZER (XDA)", data: XDA },
          { name: "CP-30 OFF ROTARY INVERTER (INV-6) (X156)", data: X156 }, { name: "SIDE DRESS FWD. ERROR", data: SIDE_FWD},
          { name: "SIDE DRESS REV. ERROR", data: SIDE_REV}, { name: "WORN WHEEL", data : WW },
          { name: "LOADING ERROR", data: LOD_Err }, { name: "DOOR OPEN", data: DO },
          { name: "STOCKER FULL WORK", data: ST_full }, { name: "CHUTE EMPTY", data: CE },
          { name: "AFTER DRESS STOP", data: AFT_stop }, { name: "SPINOUT", data: SPINOUT },
          { name: "G.WHEEL MOTOR OVER LOAD", data: GWM_overLoad }, { name: "SPARKOUT HOLD MODE", data: SPO_mode},
          { name: "RADIAL DRESS FWD. ERROR", data: Rd_FWD_Err }, { name: "RADIAL DRESS REV. ERROR", data: Rd_REV_Err },
          { name: "COUNT FULL WORK", data: Count_FW }, { name: "DRESS", data: Dress },
          { name: "STOCKER PUSHER FWD. ERROR", data: STP_FWD_Err }, { name: "STOCKER PUSHER REV. ERROR", data: STP_REV_Err },
          { name: "ROTARY DRESS NOT RUN", data: RTR_NRun }, { name: "OIL RETURN FULL", data: Oil_RT },
          { name: "WORK HOLDER ERROR", data: WH_Err }, { name: "CASSETTE FWD. ERROR", data: CassFWD_Err },
          { name: "CASSETTE REV. ERROR", data: CassREV_Err }, { name: "FEED SERVO AMP BATTERY ALARM", data: FSV_Alarm },
          { name: "DRESS SERVO AMP BATTERY ALARM", data: DRV_Alarm }, { name: "PICK UP SERVO AMP BATTERY ALARM", data: PSV_Alarm },
          { name: "STOCKER SERVO AMP BATTERY ALARM", data: STSV_Alarm}, { name: "GE ON", data: GE },
          { name: "GE NOT READY", data: GE_nReady }, { name: "R/W BIG", data: RW_B },
          { name: "GE CRUSH", data: GE_C }, { name: "GE NOT ON", data: GE_nON },
          { name: "UNLOADER STOPPER UP/D ERROR", data: ULD_STP_Err }, { name: "NEXT M/C CHUTE ERROR", data: N_MC_Err },
          { name: "FULL WORK", data: FW }, { name: "SLIDER FWD/REV ERROR LINE UP", data: SLD_FWD_LP },
          { name: "SLIDER UP/DOWN ERROR LINE UP", data: SLD_UP_LP }, { name: "PUSHER FWD ERROR LINE UP", data: PH_FWD_Err },
          { name: "PUSHER REV ERROR LINE UP", data: PH_REV_Err }, { name: "LIFTER UP ERROR LINE UP", data: LP_Err},
          { name: "LIFTER DOWN ERROR LINE UP", data: LTD_ERR}, { name: "STOCKER FWD ERROR LINE UP", data: STK_FWD_Err },
          { name: "STOCKER REV ERROR LINE UP", data: STK_REV_Err }, { name: "TRANSFER LOADER FWD ERR", data: TRF_FWD_Err },
          { name: "TRANSFER LOADER REV ERR", data: TRF_REV_Err }, { name: "TRANSFER NO WORK ERROR", data: TRF_noW_Err },
          { name: "GE CHECK MODE", data: GE_check }, { name: "GE NOISE CHECK", data: GE_noise},
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
    let alarm = await httpClient.post(server.AlarmTopic_time_IRR, {
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
    let stop_time = await httpClient.post(server.stop_time_IRR, {
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
                        <option>MAINTENANCE</option>
                        <option>PRODUCTION LINE</option>

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

export default MMS_IRR;
