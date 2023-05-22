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

  click_update = async () => {
    await this.timeline_status_log();
    await this.show_chart_timeline();
    await this.alarm_time();
    await this.stop_time();

  };

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
  show_chart_timeline = async () => {
    // console.log(this.state.timeline_series);
    try {
      let mc_data = await httpClient.post(server.TIMELINE_IRB, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        responsible: this.state.responsible,
      });
      console.log(mc_data.data.result);
      var X00 = [], X02 = [], X04 = [], X06 = [], X07 = [], X10 = [], X11 = [], X12 = [], X13 = []
      var X14 = [], X15 = [], X19 = [], X1A = [], X1B = [], X01 = [], X03 = [], X05 = [], LOADING_ERROR = []
      var GRINDER_CYCLE_TIME_OVER = [], D_A = [], FM = [], FS = [], SMC = []
      var FM = [], FS = [], SMC = [], SS = [], FMW = [], SMWE = [], AD = [], DE = [], SSRO = [], LSA = [], CPU_E = [], FSA = [], SSA = [], TMC = [], TS = [], TSAE = [], TSAA = [], IGFWD = [], X09 = [], AZE = [], ID = [], SCO = [], PGCO = [], X16 = [], X17 = [], X18 = [], X1D = [], X1F = [], X08 = [], X1E = [], AJC = [], AJS = [], AJE = [], XDC = [], XDD = [], XDE = [], XDF = [], CH1 = [], CH2 = [], X2D = [], CMC = [], CS = [], CME = [], AJ_NG = [], STE = [], X2B = [], GOT_E = [], XD9 = [], XDA = [], X20 = [], X21 = [], X21DD = [], WW = [], SAA = [], GGE = [], LE = [], DO = [], ID_s = [], ID_l = [], GFW = [], GCE = [], C_NG = [], AF = [], SFWC = [], SNW = [], REPEAT_C = []
      var PGF = [], PGNW = [], PG_NG = [], WSE = [], WUM = [], GA = [], S_NG = [], RM = [], FOR = [], SOR = [], DPM_E = [], GE = [], GE_C = [], GE_on = [], GE_nON = [], OK2 = [], TOR = [], OK2_CE = [], NG_W = [], SFW = [], TT_LIMIT_ERR = [], ID_sGE = [], GE_NO_SIGNAL = [], GE_CHECK_MODE = [], GCF = [], RL_FWD_ERR = [], RL_REV_ERR = [], TL_FWD_ERR = [], TL_REV_ERR = [], RUFW = [], RNWE = [], Door_ST = [], CARRIER_set_R = [], TTL_ADJ = [], MC_CERR = [], zero_FAULT = [], P_NG_C = [], OK1_T_ERR = [], OK2_T_ERR = [], NG_TS_ERRor = [], NG_TS_ERR = [], SNWS = [], MODE_AZ = [], MODE_NG = [], WS_ERR = [], LOADER_WERR = [], Work_ST = [], GCTO = [], RESET_L = []

      for (let index = 0; index < mc_data.data.result.length; index++) {
        switch (mc_data.data.result[index].topic) {
          case "FIRE EXTINGUISHER (X00)":
            X00.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "MAIN AIR PRESSURE (X02)":
            X02.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LUBRICATION AIR PRESSURE (X04)":
            X04.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "HYDRAULIC PRESSURE (X06)":
            X06.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "MAIN COOLANT FLOW (X07)":
            X07.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "OL-1 OFF HYDRAULIC MOTOR (X10)FMAIN AIR PRESSURE (X02)":
            X10.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "OL-2 OFF CLAMP MOTOR (X11)":
            X11.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-1 or CP-12 OFF POWER SUPPLY (PWS-1 or PWS-2) (X12)":
            X12.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-2 OFF WORK MOTOR (INV-1) (X13)":
            X13.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-3 OFF ROTARY DRESS DRIVER (X14)":
            X14.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-4 OFF PARTS FEEDER (X15)":
            X15.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "WORK MOTOR INVERTER (INV-1) (X19)":
            X19.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "G.WHEEL SPINDLE INVERTER (HF-INV) (X1A)":
            X1A.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "ROTARY DRESS DRIVER (INV-2) (X1B)":
            X1B.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FILTER (PRESSURE) (X01)":
            X01.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LUBRICATION OIL LEVEL (X03)":
            X03.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CHYDRAULIC OIL LEVEL (X05)":
            X05.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LOADING ERROR":
            LOADING_ERROR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GRINDER CYCLE TIME OVER":
            GRINDER_CYCLE_TIME_OVER.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "D/A UNIT ERROR":
            D_A.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FEED MOTION CONTROLLER ":
            FM.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FEED SERVO":
            FS.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SPINDLE MOTION CONTROLLER ":
            SMC.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SPINDLE SERVO":
            SS.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FEED MOTION WRITE ERROR":
            FMW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SPINDLE MOTION WRITE ERROR":
            SMWE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "A/D UNIT ERROR":
            AD.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DRESSER ERROR":
            DE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SPINDLE SERVO RESISTOR OVER HEAT ":
            SSRO.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LUB SUPPRY ALARM":
            LSA.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CPU ERROR":
            CPU_E.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FEED SERVO AMP BATTERY ALARM":
            FSA.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SPINDLE SERVO AMP BATTERY ALARM":
            SSA.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "TAPER MOTION CONTROLLER":
            TMC.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "TAPER SERVO":
            TS.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "TAPER MOTION WRITE ERROR":
            TSAE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "TAPER SERVO AMP BATTERY ALARM":
            TSAA.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "INPROCESS GAUGE FWD ERROR":
            IGFWD.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GREASE PUMP LEVEL ALARM (X09)":
            X09.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AUTO ZERO ERROR":
            AZE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SORTING GAUGE HEAD ERROR (I.D)":
            ID.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SORTING CYCLE OVER":
            SCO.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PLUG GAUGE CYCLE OVER":
            PGCO.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-5 or MMS-1 OFF HYDRAULIC PUMP MOTOR (X16)":
            X16.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-6 OFF FEED TABLE (SA-1) (X17)":
            X17.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-7 OFF SPINDLE TABLE (SA-2) (X18)":
            X18.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-8 OFF TRANSFORMER 200V (T-1) (X1D)":
            X1D.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-10 OFF TAPER TABLE (SA-3) (X1F)":
            X1F.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GREASE PUMP PRESSURE ALARM (X08)":
            X08.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-11 OFF AIR JET SLIDE (SA-4) (X1E)":
            X1E.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AIR JET SLIDE MOTION CONTROLLER":
            AJC.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AIR JET SLIDE SERVO":
            AJS.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AIR JET SLIDE MOTION WRITE ERROR":
            AJE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-13 OFF COOLING FAN (XDC)":
            XDC.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-14 OFF DEMAGNETIZER (XDD)":
            XDD.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "ELB-2 OFF TRANSFORMER 100V (T-1) (XDE)":
            XDE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "ELB-3 OFF G.WHEEL SPINDLE INVERTER (INV-1) (XDF)":
            XDF.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AUTO ZERO ERROR CH1":
            CH1.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AUTO ZERO ERROR CH2":
            CH2.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CP-15 OFF CARRIER SERVO (SA-5) (X2D)":
            X2D.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CARRIER MOTION CONTROLLER":
            CMC.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CARRIER SERVO":
            CS.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CARRIER MOTION WRITE ERROR":
            CMC.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "AIR JET NG CARRIER SERVO OFF":
            AJ_NG.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SORTING TRAP ERROR":
            STE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "ROTARY DRESSER AIR PARGE ALARM (X2B)":
            X2B.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GOT ERROR DETECT":
            GOT_E.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LUBRICATION AIR PRESSURE (MPS) (XD9)":
            XD9.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LUBRICATION OIL FEED ERROR (XDA)":
            XDA.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DRESSER UP END SENSOR ERROR (X20)":
            X20.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DRESSER DOWN END SENSOR ERROR (X21)":
            X21.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DRESSING DOWN SENSOR ERROR (X21)":
            X21DD.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "WORN WHEEL":
            WW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SERVO AMP BATTERY ALARM":
            SAA.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GRINDER GAUGE ERROR":
            GGE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "LOADING ERROR":
            LE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DOOR OPEN":
            DO.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "I.D SMALL":
            ID_s.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "I.D LARGE":
            ID_l.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GRINDER FULL WORK":
            GFW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GRINDER CHUTE EMPTY":
            GCE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "CONTINUE NG":
            C_NG.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "A/F ADJ. YIELD STOP":
            AF.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SORTING FULL WORK COUNT":
            SFWC.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SORTING NO WORK":
            SNW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "REPEAT COUNTER":
            REPEAT_C.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PLUG GAUGE FULL WORK":
            PGF.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PLUG GAUGE NO WORK":
            PGNW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "PLUG GAUGE NG COUNT STOP":
            PG_NG.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "WORK STOPPER ERROR":
            WSE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "WARMING UP MODE":
            WUM.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GAUGE AMP NOT AUTO MODE":
            GA.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SORTING NG WORK CHECK ERROR":
            S_NG.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "REGRINDING MODE":
            RM.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "FEED ORIGIN REQUEST":
            FOR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SPINDLE ORIGIN REQUEST":
            SOR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "DPM.ERRORT":
            DPM_E.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GE NOT READY":
            GE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GE CRUSH":
            GE_C.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GE-ON":
            GE_on.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GE NOT ON":
            GE_nON.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "OK2 FULL WORK":
            OK2.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "TAPER ORIGIN REQUEST":
            TOR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "OK2 WORK CHECK ERROR":
            OK2_CE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "NG WORK FULL WORK":
            NG_W.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "SORTING FULL WORK":
            SFW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "TOTAL TAPER ADJ.LIMIT ERR":
            TT_LIMIT_ERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "I.D SMALL (GE)":
            ID_sGE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GAUGE ERROR (NO SIGNAL)":
            GE_NO_SIGNAL.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "GE CHECK MODE":
            GE_CHECK_MODE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "GAUGE ERROR (NO SIGNAL)":
            GE_NO_SIGNAL.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "GRINDING COOLANT FLOW":
            GCF.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "RECEIVER LOADER FWD ERR":
            RL_FWD_ERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "RECEIVER LOADER REV ERR":
            RL_REV_ERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "TRANSFER LOADER FWD ERR":
            TL_FWD_ERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "TRANSFER LOADER REV ERR":
            TL_REV_ERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "RECEIVER UNIT FULL WORK":
            RUFW.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "RECEIVER NO WORK ERROR":
            RNWE.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "DOOR OPEN STOP":
            Door_ST.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "CARRIER POSI.0 SET REQUEST":
            CARRIER_set_R.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "TOTAL ADJ. LIMIT OVER":
            TTL_ADJ.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "NEXT M/C CHUTE ERROR":
            MC_CERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "G.ZERO FAULT":
            zero_FAULT.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "PLUG NG REPEAT COUNTER":
            P_NG_C.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "OK1 TRAP SHUTTER ERROR":
            OK1_T_ERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "OK2 TRAP SHUTTER ERROR":
            OK2_T_ERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "OK2 TRAP SHUTTER ERROR":
            P_NG_C.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "(-)NG TRAP SHUTTER ERROR":
            NG_TS_ERRor.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "(+)NG TRAP SHUTTER ERROR":
            NG_TS_ERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "SORTING NO WORK STOP":
            SNWS.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "MODE AUTO ZERO OFF":
            MODE_AZ.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "MODE NG WORK CHECK OFF":
            MODE_NG.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "WORK SEPARATE ERROR":
            WS_ERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "LOADER WORK CHECK ERROR":
            LOADER_WERR.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "LOADER_WERR":
            Work_ST.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "GRINDER CYCLE TIME OVER":
            GCTO.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          case "RESET BY LOADING":
            RESET_L.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break
          default:
          // code block
        }
      }
      await this.setState({
        timeline_series: [
          { name: "FIRE EXTINGUISHER (X00)", data: X00, }, { name: "MAIN AIR PRESSURE (X02)", data: X02, },
          { name: "LUBRICATION AIR PRESSURE (X04)", data: X04, }, { name: "HYDRAULIC PRESSURE (X06)", data: X06, },
          { name: "MAIN COOLANT FLOW (X07)", data: X07 }, { name: "OL-1 OFF HYDRAULIC MOTOR (X10)", data: X10, },
          { name: "OL-2 OFF CLAMP MOTOR (X11)", data: X11, }, { name: "CP-1 or CP-12 OFF POWER SUPPLY (PWS-1 or PWS-2) (X12)", data: X12, },
          { name: "CP-2 OFF WORK MOTOR (INV-1) (X13)", data: X13, }, { name: "CP-3 OFF ROTARY DRESS DRIVER (X14)", data: X14, },
          { name: "CP-4 OFF PARTS FEEDER (X15)", data: X15, }, { name: "WORK MOTOR INVERTER (INV-1) (X19)", data: X19, },
          { name: "G.WHEEL SPINDLE INVERTER (HF-INV) (X1A)", data: X1A, }, { name: "ROTARY DRESS DRIVER (INV-2) (X1B)", data: X1B, },
          { name: "FILTER (PRESSURE) (X01)", data: X01, }, { name: "FILTER (PRESSURE) (X01)", data: X03, },
          { name: "HYDRAULIC OIL LEVEL (X05)", data: X05, }, { name: "LOADING ERROR", data: LOADING_ERROR, },
          { name: "GRINDER CYCLE TIME OVER", data: GRINDER_CYCLE_TIME_OVER, }, { name: "D/A UNIT ERROR", data: D_A, },
          { name: "FEED MOTION CONTROLLER ", data: FM, }, { name: "FEED SERVO", data: FS, }, { name: "SPINDLE MOTION CONTROLLER ", data: SMC, },
          { name: "SPINDLE SERVO", data: SS, }, { name: "FEED MOTION WRITE ERROR", data: FMW, }, { name: "SPINDLE MOTION WRITE ERROR", data: SMWE, },
          { name: "A/D UNIT ERROR", data: AD, }, { name: "DRESSER ERROR", data: DE, }, { name: "SPINDLE SERVO RESISTOR OVER HEAT ", data: SSRO, },
          { name: "LUB SUPPRY ALARM", data: LSA, }, { name: "CPU ERROR", data: CPU_E, }, { name: "FEED SERVO AMP BATTERY ALARM", data: FSA, },
          { name: "SPINDLE SERVO AMP BATTERY ALARM", data: SSA, }, { name: "TAPER MOTION CONTROLLER", data: TMC, }, { name: "TAPER SERVO", data: TS, },
          { name: "TAPER MOTION WRITE ERROR", data: TSAE }, { name: "TAPER SERVO AMP BATTERY ALARM", data: TSAA, }, { name: "INPROCESS GAUGE FWD ERROR", data: IGFWD, },
          { name: "GREASE PUMP LEVEL ALARM (X09)", data: X09, }, { name: "AUTO ZERO ERROR", data: AZE, }, { name: "SORTING GAUGE HEAD ERROR (I.D)", data: ID, },
          { name: "SORTING CYCLE OVER", data: SCO, }, { name: "PLUG GAUGE CYCLE OVER", data: PGCO, }, { name: "CP-5 or MMS-1 OFF HYDRAULIC PUMP MOTOR (X16)", data: X16, },
          { name: "CP-6 OFF FEED TABLE (SA-1) (X17)", data: X17, }, { name: "CP-7 OFF SPINDLE TABLE (SA-2) (X18)", data: X18, }, { name: "CP-8 OFF TRANSFORMER 200V (T-1) (X1D)", data: X1D, },
          { name: "CP-10 OFF TAPER TABLE (SA-3) (X1F)", data: X1F, }, { name: "GREASE PUMP PRESSURE ALARM (X08)", data: X08, }, { name: "CP-11 OFF AIR JET SLIDE (SA-4) (X1E)", data: X1E, },
          { name: "AIR JET SLIDE MOTION CONTROLLER", data: AJC, }, { name: "AIR JET SLIDE SERVO", data: AJS, }, { name: "AIR JET SLIDE MOTION WRITE ERROR", data: AJE, },
          { name: "CP-13 OFF COOLING FAN (XDC)", data: XDC, }, { name: "CP-14 OFF DEMAGNETIZER (XDD)", data: XDD, }, { name: "ELB-2 OFF TRANSFORMER 100V (T-1) (XDE)", data: XDE, },
          { name: "ELB-3 OFF G.WHEEL SPINDLE INVERTER (INV-1) (XDF)", data: XDF }, { name: "AUTO ZERO ERROR CH1", data: CH1 }, { name: "AUTO ZERO ERROR CH2", data: CH2 },
          { name: "CP-15 OFF CARRIER SERVO (SA-5) (X2D)", data: X2D }, { name: "CARRIER MOTION CONTROLLER", data: CMC }, { name: "CARRIER SERVO", data: CS },
          { name: "CARRIER MOTION WRITE ERROR", data: CME }, { name: "AIR JET NG CARRIER SERVO OFF", data: AJ_NG }, { name: "SORTING TRAP ERROR", data: STE },
          { name: "ROTARY DRESSER AIR PARGE ALARM (X2B)", data: X2B }, { name: "GOT ERROR DETECT", data: GOT_E }, { name: "LUBRICATION AIR PRESSURE (MPS) (XD9)", data: XD9 },
          { name: "LUBRICATION OIL FEED ERROR (XDA)", data: XDA }, { name: "DRESSER UP END SENSOR ERROR (X20)", data: X20 }, { name: "DRESSER DOWN END SENSOR ERROR (X21)", data: X21 },
          { name: "DRESSING DOWN SENSOR ERROR (X21)", data: X21DD }, { name: "WORN WHEEL", data: WW }, { name: "SERVO AMP BATTERY ALARM", data: SAA },
          { name: "GRINDER GAUGE ERROR", data: GGE }, { name: "LOADING ERROR", data: LE }, { name: "DOOR OPEN", data: DO },
          { name: "I.D SMALL", data: ID_s }, { name: "I.D LARGE", data: ID_l }, { name: "GRINDER FULL WORK", data: GFW },
          { name: "GRINDER CHUTE EMPTY", data: GCE }, { name: "CONTINUE NG", data: C_NG }, { name: "A/F ADJ. YIELD STOP", data: AF },
          { name: "SORTING FULL WORK COUNT", data: SFWC }, { name: "SORTING NO WORK", data: SNW }, { name: "REPEAT COUNTER", data: REPEAT_C },
          { name: "PLUG GAUGE FULL WORK", data: PGF }, { name: "PLUG GAUGE NO WORK", data: PGNW }, { name: "DOOR OPEN", data: DO },
          { name: "PLUG GAUGE NG COUNT STOP", data: PG_NG }, { name: "LOADING ERROR", data: LE }, { name: "DOOR OPEN", data: DO },
          { name: "GRINDER GAUGE ERROR", data: GGE }, { name: "WORK STOPPER ERROR", data: WSE }, { name: "WARMING UP MODE", data: WUM },
          { name: "GAUGE AMP NOT AUTO MODE", data: GA }, { name: "SORTING NG WORK CHECK ERROR", data: S_NG }, { name: "REGRINDING MODE", data: RM },
          { name: "FEED ORIGIN REQUEST", data: FOR }, { name: "SPINDLE ORIGIN REQUEST", data: SOR }, { name: "DPM.ERROR", data: DPM_E },
          { name: "GE NOT READY", data: GE }, { name: "GE CRUSH", data: GE_C }, { name: "GE-ON", data: GE_on },
          { name: "GE NOT ON", data: GE_nON }, { name: "OK2 FULL WORK", data: OK2 }, { name: "TAPER ORIGIN REQUEST", data: TOR },
          { name: "OK2 WORK CHECK ERROR", data: OK2_CE }, { name: "NG WORK FULL WORK", data: NG_W }, { name: "SORTING FULL WORK", data: SFW },
          { name: "TOTAL TAPER ADJ.LIMIT ERR", data: TT_LIMIT_ERR }, { name: "I.D SMALL (GE)", data: ID_sGE }, { name: "GAUGE ERROR (NO SIGNAL)", data: GE_NO_SIGNAL },
          { name: "GE CHECK MODE", data: GE_CHECK_MODE }, { name: "GRINDING COOLANT FLOW", data: GCF }, { name: "RECEIVER LOADER FWD ERR", data: RL_FWD_ERR },
          { name: "RECEIVER LOADER REV ERR", data: RL_REV_ERR }, { name: "TRANSFER LOADER FWD ERR", data: TL_FWD_ERR }, { name: "TL_FWD_ERR", data: TL_REV_ERR },
          { name: "RECEIVER UNIT FULL WORK", data: RUFW }, { name: "RECEIVER NO WORK ERROR", data: RNWE }, { name: "DOOR OPEN STOP", data: Door_ST },

          { name: "CARRIER POSI.0 SET REQUEST", data: CARRIER_set_R }, { name: "TOTAL ADJ. LIMIT OVER", data: TTL_ADJ }, { name: "NEXT M/C CHUTE ERROR", data: MC_CERR },
          { name: "G.ZERO FAULT", data: zero_FAULT }, { name: "PLUG NG REPEAT COUNTER", data: P_NG_C }, { name: "OK1 TRAP SHUTTER ERROR", data: OK1_T_ERR },
          { name: "OK2 TRAP SHUTTER ERROR", data: OK2_T_ERR }, { name: "(-)NG TRAP SHUTTER ERROR", data: NG_TS_ERRor }, { name: "(+)NG TRAP SHUTTER ERROR", data: NG_TS_ERR },
          { name: "SORTING NO WORK STOP", data: SNWS }, { name: "MODE AUTO ZERO OFF", data: MODE_AZ }, { name: "MODE NG WORK CHECK OFF", data: MODE_NG },
          { name: "WORK SEPARATE ERROR", data: WS_ERR }, { name: "LOADER WORK CHECK ERROR", data: LOADER_WERR }, { name: "WORK STOPPER ERROR", data: Work_ST },
          { name: "GRINDER CYCLE TIME OVER", data: GCTO }, { name: "RESET BY LOADING", data: RESET_L }
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

export default MMS_IRB;
