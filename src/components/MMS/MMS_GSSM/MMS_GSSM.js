import React, { Component } from "react";
import { key, server } from "../../../constance/constance";
import { httpClient } from "../../../utils/HttpClient";
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";


class MMS_GSSM extends Component {
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
      let mc_list_data = await httpClient.post(server.GSSM_mc)
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
      let data_status_log = await httpClient.post(server.mc_status_log_GSSM, {
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
      let mc_data = await httpClient.post(server.TIMELINE_GSSM, {
        date: this.state.date_start,
        machine: this.state.selected_machine,
        responsible: this.state.responsible,
      });
      console.log(mc_data.data.result);
      var A920 = [], A922 = [], A957 = [], A958 = [], A959 = [], A965 = [], A969 = [], A999 = [], A900 = []
      var A901 = [], A902 = [], A903 = [], A904 = [], A905 = [], A906 = [], A907 = [], A908 = [], A910 = [], A911 = [], A912 = []
      var A913 = [], A914 = [], A916 = [], A917 = [], A918 = [], A919 = [], A921 = [], A923 = [], A924 = [], A925 = [], A926 = []
      var A927 = [], A928 = [], A929 = [], A930 = [], A931 = [], A932 = [], A933 = [], A934 = [], A938 = [], A939 = [], A940 = [], A941 = [], A942 = [], A943 = [], A944 = []
      var A945 = [], A946 = [], A947 = [], A948 = [], A949 = [], A950 = []
      var A951 = [], A952 = [], A953 = [], A954 = [], A955 = [], A956 = [], A960 = [], A961 = [], A962 = [], A963 = [], A964 = [], A966 = []
      var A967 = [], A968 = [], A970 = [], A971 = [], A972 = [], A973 = [], A974 = [], A975 = [], A976 = [], A977 = [], A978 = []
      var A979 = [], A981 = [], A983 = [], A984 = [], A985 = [], A986 = [], A987 = [], A988 = [], A989 = [], A990 = [], A991 = [], A992 = [], A993 = [], A994 = [], A995 = [], A996 = [], A997 = [], A998 = []

      for (let index = 0; index < mc_data.data.result.length; index++) {
        switch (mc_data.data.result[index].topic) {
          case "920 AIR LOW PRESSURE":
            A920.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "922 MAIN INDEX ALAM":
            A922.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "957 RAM PUMP AIR PRESSURE LOW":
            A957.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "958  SNAP INDEX1  ALM ":
            A958.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "959  SNAP INDEX2 ALM":
            A959.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "965 SHILD PP A ALM":
            A965.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "969 SHILD PP B ALM":
            A969.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "999 CC-Link SETTIG ERROR":
            A999.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "900 BRG NO WORK":
            A900.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "901 SHIELD WAIT":
            A901.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "902 SHIELD LIFTER NO WORK":
            A902.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "903 SNAP 1 NO WORK":
            A903.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "904 St2 NG(GREASE) EJECT WORK FULL":
            A904.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "905 St11 NG EJECT WORK FULL":
            A905.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "906 SNAP 2 NO WORK":
            A906.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "907 PLEASE ALL CHUCK OPEN":
            A907.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "908 GREASE EMP":
            A908.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "910 FIM FULL WORK (FIN P/F CHECK)":
            A910.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "911 TURN OVER WORK EJECT ":
            A911.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "912 INDEX SUPPLY WORK EJECT ":
            A912.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "913 SNAP1 SUP.MISS":
            A913.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "914 SNAP2 SUP.MISS":
            A914.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "916 SNAP1 P-P F/B ERR":
            A916.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "917 SNAP1 P-P U/D ERR":
            A917.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "918 SNAP1 PUSH U/D ERR ":
            A918.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "919 SNAP1 CHUCK O/C ERR":
            A919.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "921 MAIN INDEX CYCLE OVER":
            A921.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "923 EMG.STOP":
            A923.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "924 PRESS SEARVO A ERROR":
            A924.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "925 PRESS SEARVO B ERROR":
            A925.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "926 SHELD CHECK SERVO A ERROR":
            A926.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "927 SHELD CHECK SERVO B ERROR":
            A927.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "928 SHIELD INDEX ERROR":
            A928.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "929 GREASE MOTOR2 ERROR":
            A929.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "930 S-SUPP.LIFTER A ERROR":
            A930.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "931 S-SUPP.LIFTER B ERROR":
            A931.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "932 SHIELD PRESS A COVER ALM":
            A932.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "933 SHIELD PRESS B COVER ALM":
            A933.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "934 SHIELDCHK UNDER A ERR":
            A934.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "938 SNAP2 PUSH U/D ERR ":
            A938.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "939 SNAP2 CHUCK O/C ERR":
            A939.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "940 BRG SUP CYC OVER":
            A940.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "941 NG EJCT CYC OVER":
            A941.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "942 S-SUP A CYC OVER":
            A942.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "943 S-SUP B CYC OVER":
            A943.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "944 S-SUP A UNDR CYCOVER":
            A944.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "945 S-SUP B UNDR CYCOVER":
            A945.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "946 S-SUP A HAMM CYCOVER":
            A946.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "947 S-SUP B HAMM CYCOVER":
            A947.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "948 S-ROT   CHK1CYC OVER":
            A948.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "949 S-ROT   CHK2CYC OVER":
            A949.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "950 NG EJCT CYC OVER":
            A950.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "951 OK EJCT CYC OVER":
            A951.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "952 TRUN CYCOVER":
            A952.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "953 G-VALV2 CYC OVER":
            A953.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "954 G-SUPP2 CYC OVER":
            A954.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "955  SNAP LIFTER1 ALM":
            A955.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "956  SANP LIFTER2 ALM":
            A956.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "960 SNAP A VACUUM ERR":
            A960.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "961 SNAP B VACUUM ERR":
            A961.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "962 GREASE NG EJECT WORK DROP MISS":
            A962.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "963 NGEJECT-A DROP MISS":
            A963.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "964 NGEJECT-B DROP MISS":
            A964.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "966 BRG SUP REMAIN PARTS":
            A966.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "967 TRUNOVER REMAIN PARTS":
            A967.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "968 TURNOVER CHUCK MISS":
            A968.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "970 A1-VAC CONT NG":
            A970.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "971 A2-VAC CONT NG":
            A971.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "972 A-SHIELD  CHECK  COUNTNG":
            A972.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "973 A-SHIELD MID COUNT NG":
            A973.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "974 B1-VAC CONT NG":
            A974.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "975 B2-VAC CONT NG":
            A975.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "976 B-SHIELD  CHECK  COUNTNG":
            A976.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "977 B-SHIELD MID COUNT NG":
            A977.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "978 St5 SHIELD  CHK1CONTNG":
            A978.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "979 St5 SHIELD  CHK2CONTNG":
            A979.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "981 St7 SNAP CHK1 CONT NG":
            A981.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "983 St9 SNAP CHK2 CONT NG":
            A983.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "984 St13 GREASE POSI. SEN. NO-SENSING CONT.NG":
            A984.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "985 St14 GREASE  CHK2CAMERA CONTNG":
            A985.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "986 St16 4P CHK2 CAMERA CONT NG":
            A986.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "987 C5 LAMP NG":
            A987.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "988 C5 EDGE FACE NG":
            A988.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "989 C5 GREASE NG":
            A989.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "990 C5 TAKE OUT NG PARTS":
            A990.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "991 C5 NO BRG":
            A991.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "992 C6 LAMP NG":
            A992.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "993 C6 GREASE NG":
            A993.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "994 C6 TAKE OUT NG PARTS":
            A994.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "995 C6 NO BRG":
            A995.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "996 CAMERA5 NO-RESPONS":
            A996.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "997 CAMERA6 NO-RESPONS":
            A997.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;
          case "998 GREASE CAN EMPTY":
            A998.push({ x: "ALARM", y: [new Date(mc_data.data.result[index].occurred).getTime(), new Date(mc_data.data.result[index].restored).getTime()] });
            break;








          default:
          // code block
        }
      }
      await this.setState({
        timeline_series: [
          { name: "920 AIR LOW PRESSURE", data: A920 }, { name: "922 MAIN INDEX ALAM", data: A922 }, { name: "957 RAM PUMP AIR PRESSURE LOW", data: A957 },
          { name: "958  SNAP INDEX1  ALM ", data: A958 }, { name: "922 MAIN INDEX ALAM", data: A922 }, { name: "965 SHILD PP A ALM", data: A965 },
          { name: "969 SHILD PP B ALM", data: A969 }, { name: "999 CC-Link SETTIG ERROR", data: A999 }, { name: "900 BRG NO WORK", data: A900 },

          { name: "901 SHIELD WAIT", data: A901 }, { name: "922 MAIN INDEX ALAM", data: A922 }, { name: "957 RAM PUMP AIR PRESSURE LOW", data: A957 },
          { name: "920 AIR LOW PRESSURE", data: A920 }, { name: "922 MAIN INDEX ALAM", data: A922 }, { name: "957 RAM PUMP AIR PRESSURE LOW", data: A957 },
          { name: "920 AIR LOW PRESSURE", data: A920 }, { name: "922 MAIN INDEX ALAM", data: A922 }, { name: "957 RAM PUMP AIR PRESSURE LOW", data: A957 },
          { name: "920 AIR LOW PRESSURE", data: A920 }, { name: "922 MAIN INDEX ALAM", data: A922 }, { name: "957 RAM PUMP AIR PRESSURE LOW", data: A957 },
          { name: "920 AIR LOW PRESSURE", data: A920 }, { name: "922 MAIN INDEX ALAM", data: A922 }, { name: "957 RAM PUMP AIR PRESSURE LOW", data: A957 },



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
    let alarm = await httpClient.post(server.AlarmTopic_time_GSSM, {
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
    let stop_time = await httpClient.post(server.stop_time_GSSM, {
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

export default MMS_GSSM;
