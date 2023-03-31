import React, { Component } from "react";
import { Link } from "react-router-dom";

import { key } from "../../constance/constance";

class Header extends Component {
  render() {
    return (<nav className="main-header navbar navbar-expand navbar-white navbar-light">

      <ul className="navbar-nav">
        <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
          </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/home" className="nav-link"> HOME  </a>
        </li>
        {/* <li className="nav-item d-none d-sm-inline-block">
          <a href="http://192.168.1.2:4001/home" className="nav-link"> REAL TIME </a>
        </li> */}

        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="nav-item d-none d-sm-inline-block"> DASHBOARD </span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-left" >
            <div className="dropdown-divider" />
            <a href="/Dash_MBR" className="dropdown-item">
            
              MBR DASHBOARD
            </a>
            <a href="/Dash_Turning" className="dropdown-item">
             
              TURNING DASHBOARD
            </a>
            <a href="/Dash_Grinding" className="dropdown-item">
           
              GRINDING DASHBOARD
            </a>
          </div>

        </li> */}
        {/* <li className="nav-item dropdown" >
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ textAlign: '60' }}
          >
            DASHBOARD
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="dropdown-submenu dropdown-hover">

              <a href="/Dash_Turning" className="dropdown-item">
                <i className="fas fa-tasks" /> TURNING
              </a>
            </li>

            <li className="dropdown-submenu dropdown-hover">
              <a
                id="dropdownSubMenu2"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="dropdown-item dropdown-toggle"
              >
                <i className="fas fa-tasks" /> GRINDING
              </a>
              <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                <li>

                  <a tabIndex={-1} href="/Dash_Grinding" className="dropdown-item">
                    Raceway Hone (IRH)
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="/Dash_ORH" className="dropdown-item">
                    Raceway Hone (ORH)
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="/Dash_IRB" className="dropdown-item">
                    Bone Grinder (IRB)
                  </a>
                </li>

              </ul>
            </li>

            <li className="dropdown-submenu dropdown-hover">
              <a
                id="dropdownSubMenu2"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="dropdown-item dropdown-toggle"
              >
                <i className="fas fa-tasks" /> ASSEMBLY LINE
              </a>
              <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                <li>
                  <a tabIndex={-1} href="/Dash_MBR" className="dropdown-item">
                    FFL (MBR)
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="/Dash_ARP" className="dropdown-item">
                    FFL (ARP)
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="/Dash_AN" className="dropdown-item">
                    FFL (AUTO NOISE)
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="/Dash_AL" className="dropdown-item">
                    FFL (AUTO LINE UP)
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="/Dash_AVS" className="dropdown-item">
                    FFL (AVS)
                  </a>
                </li>


              </ul>
            </li>

          </div>

        </li> */}

        {/* Report */}

        <li class="nav-item dropdown">
          {/* <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            REPORT
            &nbsp;&nbsp;
          </a> */}
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="dropdown-submenu dropdown-hover">
              <a
                id="dropdownSubMenu2"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="dropdown-item dropdown-toggle"
              >
                TURNING
              </a>

              <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                <li>
                  <a tabIndex={-1} href="/Turning_result" className="dropdown-item">
                  TURNING
                  </a>
                </li>


              </ul>
            </li>

            <li className="dropdown-submenu dropdown-hover">
              <a
                id="dropdownSubMenu2"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="dropdown-item dropdown-toggle"
              >
                GRINDING
              </a>
              <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                <li>

                  <a tabIndex={-1} href="/IRH_result" className="dropdown-item">
                    Raceway Hone (IRH)
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="/ORH_result" className="dropdown-item">
                    Raceway Hone (ORH)
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="/IRB_result" className="dropdown-item">
                    Bone Grinder (IRB)
                  </a>
                </li>

              </ul>
            </li>
            <li className="dropdown-submenu dropdown-hover">
              <a
                id="dropdownSubMenu2"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="dropdown-item dropdown-toggle"
              > ASSEMBLY LINE
              </a>
              <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                <li className="dropdown-submenu dropdown-hover">
                  <a
                    id="dropdownSubMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="dropdown-item dropdown-toggle"
                  >
                    FFL (MBR)
                  </a>

                  <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                    <li>
                      <a tabIndex={-1} href="/MBR_result" className="dropdown-item">
                        PRODUCTION RESULT
                      </a>
                    </li>
                    <li>
                      <a tabIndex={-1} href="/Quality_result" className="dropdown-item">
                        QUALITY RESULT
                      </a>
                    </li>
                    {/* <li>
                      <a tabIndex={-1} href="/cycle_time" className="dropdown-item">
                        CYCLE TIME
                      </a>
                    </li> */}
                  </ul>
                </li>
                <li className="dropdown-submenu dropdown-hover">
                  <a
                    id="dropdownSubMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="dropdown-item dropdown-toggle"
                  >
                    FFL (ARP) </a>
                  <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                    <li>
                      <a tabIndex={-1} href="/ARP_result" className="dropdown-item">
                        PRODUCTION RESULT
                      </a>
                    </li>
                    <li>
                      <a tabIndex={-1} href="/ARP_yield" className="dropdown-item">
                        QUALITY RESULT
                      </a>
                    </li>


                  </ul>
                </li>
                <li>
                  <a tabIndex={-1} href="/AN_result" className="dropdown-item">
                    FFL (AUTO NOISE)
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="/AL_result" className="dropdown-item">
                    FFL (AUTO LINE UP)
                  </a>
                </li>
                <li className="dropdown-submenu dropdown-hover">
                  <a
                    id="dropdownSubMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="dropdown-item dropdown-toggle"
                  >
                    FFL (AVS) </a>
                  <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                    <li>
                      <a tabIndex={-1} href="/AVS_result" className="dropdown-item">
                        PRODUCTION RESULT
                      </a>
                    </li>
                    <li>
                      <a tabIndex={-1} href="/AVS_yield" className="dropdown-item">
                      QUALITY RESULT
                      </a>
                    </li>
                  </ul>
                </li>


              </ul>
            </li>
          </div>
        </li>


        {/* Admin  */}
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Administrator Tools
          </a>

          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="dropdown-submenu dropdown-hover">
              <a
                id="dropdownSubMenu2"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="dropdown-item dropdown-toggle"
              >
                User Management
              </a>
              <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                <li>
                  <a tabIndex={-1} href="/listuser" className="dropdown-item">
                    List User
                  </a>
                </li>
              </ul>
            </li>

            <li className="dropdown-submenu dropdown-hover">
              <a
                id="dropdownSubMenu2"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="dropdown-item dropdown-toggle"
              >
                Master item
              </a>
              <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                <li>
                  <a tabIndex={-1} href="/Alarm_topic" className="dropdown-item">
                    Alarm Topic
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="/csv_test" className="dropdown-item">
                   CSV Topic test
                  </a>
                </li>
              </ul>
            </li>
          </div>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-user" />
          <span className="badge badge-success navbar-badge"> Hello </span>
        </a>
        <ul className="navbar-nav ml-auto " >
          {localStorage.getItem(key.USER_EMP)}
        </ul> &nbsp;&nbsp;
        <div className="float-right d-none d-sm-inline-block">

          <button
            className="btn btn-block btn-danger"
            type="button"
            onClick={(e) => {
              localStorage.removeItem(key.LOGIN_PASSED);
              window.location.replace("../login");
            }}
          >
            Sign out
          </button>
        </div>


      </ul>

    </nav>

    );
  }
}

export default Header;
