import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  NavLink,
} from "react-router-dom";

import Header from "./components/header/header";
import Sidemenu from "./components/sidemenu/sidemenu";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Edit_User from "./components/Edit_User/Edit_User";
import List_User from "./components/List_User/List_User";
import Quality_report from "./components/Quality_Report/Quality_Report";
import Machine_utilization from "./components/machine_utilization/machine_utilization";
import Dash_MBR from "./components/Dash_MBR/Dash_MBR";
import Dash_Turning from "./components/Dash_Turning/Dash_Turning";
import Dash_Grinding from "./components/Dash_Grinding/Dash_Grinding"; //IRH
import Dash_ORH from "./components/ORH/Dash_ORH/Dash_ORH"; //ORH
import Dash_IRB from "./components/IRB/Dash_IRB/Dash_IRB"; //IRB
import Dash_AN from "./components/Auto_noise/Dash_AN/Dash_AN"; //Auto noise dash 
import Dash_AL from "./components/Auto_lineup/Dash_AL/Dash_AL"; 
import Dash_AVS from "./components/AVS/Dash_AVS/Dash_AVS"; 
import Dash_ARP from "./components/Dash_ARP/Dash_ARP"; 
import MBR_result from "./components/PR_MBR/PR_MBR";
import Turning_result from "./components/PR_Turning/PR_Turning";
import IRH_result from "./components/PR_Grinding/PR_Grinding"; // PR Grinding
import ORH_result from "./components/ORH/PR_ORH/PR_ORH"; //ORH
import IRB_result from "./components/IRB/PR_IRB/PR_IRB"; //IRB
import ARP_result from "./components/PR_ARP/PR_ARP"; // PR ARP
import ARP_yield from "./components/yield_ARP/yield_ARP"; // yield ARP
import AVS_result from "./components/PR_AVS/PR_AVS"; // PR AVS
import AVS_yield from "./components/yield_AVS/yield_AVS"; //  AVS
import AN_result from "./components/Auto_noise/PR_AN/PR_AN"; // PR AN
import AN_yield from "./components/Auto_noise/yield_AN/yield_AN"; //yield AN

import AL_result from "./components/Auto_lineup/PR_AL/PR_AL"; // PR AL
import Chart from "./components/MMS/chart_test/chart_test";
import TIMELINE_AL from "./components/MMS/MMS_AL/MMS_AL";
import TIMELINE_TB from "./components/MMS/MMS_TB/MMS_TB";
import Alarm_topic from "./components/MMS/alarm_topic/alarm_topic";



import cycle_time from "./components/ct/ct";
import Footer from "./components/footer/footer";
import { key } from "./constance/constance"; 

import Swal from "sweetalert2";
import * as moment from "moment";


const IsLogin = () => {
  //return true if === YES
  return localStorage.getItem(key.LOGIN_PASSED) === 'YES';
};

// const isLoginTimeOut = (value, unit) => {
//   const loginTime = moment(localStorage.getItem(key.TIME_LOGIN)).add(value, unit).toDate();
//   // alert("loginTime = " + loginTime);
//   // alert("loginTimomentme = " + moment());
//   if (loginTime < moment()) {
//     localStorage.removeItem(key.LOGIN_PASSED);
//     localStorage.removeItem(key.USER_NAME);
//     localStorage.removeItem(key.USER_LV);
//     localStorage.removeItem(key.USER_EMP);
//     localStorage.removeItem(key.TIME_LOGIN);
//     // alert('App say : '+localStorage.getItem(key.LOGIN_PASSED))

//     Swal.fire({
//       icon: "info",
//       title: "Login timeout",
//       text: "Please re login again...",
//       showCancelButton: false,
//     }).then(async () => {
//       window.location.replace("../login");
//     });
//     return true;
//   } else {
//     return false;
//   }
// };

const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      IsLogin() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default class App extends Component {
  redirectToLogin = () => {
    //ถ้า return error ให้ไปที่ login
    return <Redirect to="/login" />;
  };


  render() {
    return (
      <Router>
        <div>
          {/* <Header /> */}
          {IsLogin() && <Header />}
          {IsLogin() && <Sidemenu />}
   
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/edituser" component={Edit_User} />
            <Route path="/listuser" component={List_User} />
            <Route path="/Alarm_topic" component={Alarm_topic} />
            <Route path="/home" component={Home} />
            <Route path="/test" component={Chart} />
            <Route path="/Quality_result" component={Quality_report} />
            <Route path="/Machine_utilization" component={Machine_utilization} />

            <Route path="/Dash_MBR" component={Dash_MBR} />
            <Route path="/Dash_Turning" component={Dash_Turning} />
            <Route path="/Dash_Grinding" component={Dash_Grinding} />
            <Route path="/Dash_ORH" component={Dash_ORH} />
            <Route path="/Dash_IRB" component={Dash_IRB} />
            <Route path="/Dash_AN" component={Dash_AN} />
            <Route path="/Dash_AL" component={Dash_AL} />
            <Route path="/Dash_AVS" component={Dash_AVS} />
            <Route path="/Dash_ARP" component={Dash_ARP} />

            <Route path="/MBR_result" component={MBR_result} />
            <Route path="/Turning_result" component={Turning_result} />
            <Route path="/IRH_result" component={IRH_result} />
            <Route path="/ORH_result" component={ORH_result} />
            <Route path="/IRB_result" component={IRB_result} />
            <Route path="/ARP_result" component={ARP_result} />
            <Route path="/ARP_yield" component={ARP_yield} />
            <Route path="/AVS_result" component={AVS_result} />
            <Route path="/AVS_yield" component={AVS_yield} />
            <Route path="/AN_result" component={AN_result} />
            <Route path="/AN_yield" component={AN_yield} />
            <Route path="/AL_result" component={AL_result} />
            <Route path="/cycle_time" component={cycle_time} />
            {/* เอาไว้เทสกราฟ */}
            {/* <Route path="/test" component={Chart} /> */} 
            
            {/* time line MMS chart  */}
            <Route path="/timeline_AL" component={TIMELINE_AL} />
            <Route path="/timeline_TB" component={TIMELINE_TB} />

            {/* <Route component={NotFoundPage} /> */}
            <Route exact={true} path="/" component={this.redirectToLogin} />
            <Route exact={true} path="*" component={this.redirectToLogin} />
 
          </Switch>
          {/* <Footer /> */}
          {IsLogin() && <Footer />}
        </div>
      </Router>
    );
  }
}
