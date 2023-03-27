import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Sidemenu extends Component {

  render() {

    return (<aside className="main-sidebar sidebar-dark-primary elevation-4 sidebar-focused" >

      <a href="/home" className="brand-link">
        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
        <span className="brand-text font-weight-light" style={{ textAlign: 'center' }}> NAT Division </span>

      </a>
      <div className="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-transition os-host-scrollbar-horizontal-hidden">
        <div className="os-resize-observer-host observed"><div className="os-resize-observer" style={{ left: 0, right: 'auto' }} /></div>
        <div className="os-size-auto-observer observed" style={{ height: 'calc(100% + 1px)', float: 'left' }}><div className="os-resize-observer" /></div>
        <div className="os-content-glue" style={{ margin: '0px -8px', width: 500, height: 750 }} />
        <div className="os-padding"><div className="os-viewport os-viewport-native-scrollbars-invisible" style={{ overflowY: 'scroll' }}>
          <div className="os-content" style={{ padding: '0px 0px', height: '100%', width: '100%' }}>
            <div className="form-inline">

            </div>
            <div className="sidebar">
              <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                  <li className="nav-item menu-open">
                    <li className="nav-header"> </li>
                    <a href="" className="nav-link active">
                      <i className="nav-icon fas fa-tachometer-alt" />
                      <p>
                        MMS
                        <i className="fas fa-angle-left right" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview auto">

                    <li className="nav-item">
                        <a href="/timeline_TB" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p> TURINING </p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/timeline_AL" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p> AUTO LINE UP</p>
                        </a>
                      </li>



                    </ul>
                  </li>

                  <li className="nav-item menu-open">
                    <li className="nav-header">DASHBOARD</li>
                    <a href="" className="nav-link active">
                      <i className="nav-icon fas fa-tachometer-alt" />
                      <p>
                        Dashboard
                        <i className="fas fa-angle-left right" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview auto">
                      <li className="nav-item">
                        <a href="/Dash_Turning" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>TURNING</p>
                        </a>
                      </li>
                      <li className="nav-item menu-open">
                        <a href="" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>
                            GRINDING
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                        <ul className="nav nav-treeview">
                          <li className="nav-item">
                            <a href="/Dash_Grinding" className="nav-link">
                              <i className="far fa-dot-circle nav-icon" style={{ marginLeft: 20 }} />
                              <p>IRH</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="/Dash_ORH" className="nav-link" >
                              <i className="far fa-dot-circle nav-icon" style={{ marginLeft: 20 }} />
                              <p>ORH</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="/Dash_IRB" className="nav-link">
                              <i className="far fa-dot-circle nav-icon" style={{ marginLeft: 20 }} />
                              <p>IRB</p>
                            </a>
                          </li>

                        </ul>
                      </li>

                      <li className="nav-item menu-open">
                        <a href="" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>
                            ASSEMBLY LINE
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                        <ul className="nav nav-treeview">
                          <li className="nav-item">
                            <a href="/Dash_MBR" className="nav-link">
                              <i className="far fa-dot-circle nav-icon" style={{ marginLeft: 20 }} />
                              <p> MBR</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="/Dash_ARP" className="nav-link">
                              <i className="far fa-dot-circle nav-icon" style={{ marginLeft: 20 }} />
                              <p> ARP </p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="Dash_AN" className="nav-link">
                              <i className="far fa-dot-circle nav-icon" style={{ marginLeft: 20 }} />
                              <p> AUTO NOISE</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="/Dash_AL" className="nav-link">
                              <i className="far fa-dot-circle nav-icon" style={{ marginLeft: 20 }} />
                              <p>AUTO LINE UP</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="/Dash_AVS" className="nav-link">
                              <i className="far fa-dot-circle nav-icon" style={{ marginLeft: 20 }} />
                              <p>AVS </p>
                            </a>
                          </li>
                        </ul>
                      </li>

                    </ul>
                  </li>

                  <li className="nav-item menu-open">
                    <li className="nav-header">REPORT</li>
                    <a href="" className="nav-link active">
                      <i className="nav-icon fas fa-chart-pie" />
                      <p>
                        REPORT
                        <i className="fas fa-angle-left right" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>
                            TURINING
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                        <ul className="nav nav-treeview">
                          <li className="nav-item">
                            <a href="/Turning_result" className="nav-link">
                              <i className="far fa-dot-circle nav-icon" />
                              <p>PRODUCTION RESULT</p>
                            </a>
                          </li>

                        </ul>
                      </li>
                      <li className="nav-item menu-open" >
                        <a href="" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>
                            GRINDING
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                        <ul className="nav nav-treeview" >
                          <li className="nav-item">
                            <a href="" className="nav-link">
                              <i className="nav-icon fas fa-circle" style={{ marginLeft: 20 }} />
                              <p>
                                IRH
                                <i className="right fas fa-angle-left" />
                              </p>
                            </a>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <a href="/IRH_result" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>PRODUCTION RESULT</p>
                                </a>
                              </li>

                            </ul>
                          </li>
                        </ul>

                        <ul className="nav nav-treeview" >
                          <li className="nav-item">
                            <a href="" className="nav-link">
                              <i className="nav-icon fas fa-circle" style={{ marginLeft: 20 }} />
                              <p>
                                ORH
                                <i className="right fas fa-angle-left" />
                              </p>
                            </a>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <a href="/ORH_result" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>PRODUCTION RESULT</p>
                                </a>
                              </li>

                            </ul>
                          </li>
                        </ul>


                        <ul className="nav nav-treeview" >
                          <li className="nav-item">
                            <a href="" className="nav-link">
                              <i className="nav-icon fas fa-circle" style={{ marginLeft: 20 }} />
                              <p>
                                IRB
                                <i className="right fas fa-angle-left" />
                              </p>
                            </a>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <a href="/IRB_result" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>PRODUCTION RESULT</p>
                                </a>
                              </li>

                            </ul>
                          </li>
                        </ul>

                      </li>
                      <li className="nav-item menu-open">
                        <a href="" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>
                            ASSEMBLY LINE
                            <i className="fas fa-angle-left right" />
                          </p>
                        </a>
                        <ul className="nav nav-treeview">
                          <li className="nav-item">
                            <a href="" className="nav-link">
                              <i className="nav-icon fas fa-circle" style={{ marginLeft: 20 }} />
                              <p>
                                MBR
                                <i className="right fas fa-angle-left" />
                              </p>
                            </a>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <a href="/MBR_result" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>PRODUCTION RESULT</p>
                                </a>
                              </li>

                              <li className="nav-item">
                                <a href="/Quality_result" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>QUALITY RESULT</p>
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="nav-item">
                            <a href="" className="nav-link">
                              <i className="nav-icon fas fa-circle" style={{ marginLeft: 20 }} />
                              <p>
                                ARP
                                <i className="right fas fa-angle-left" />
                              </p>
                            </a>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <a href="/ARP_result" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>PRODUCTION RESULT</p>
                                </a>
                              </li>

                              <li className="nav-item">
                                <a href="/ARP_yield" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>QUALITY RESULT</p>
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="nav-item">
                            <a href="" className="nav-link">
                              <i className="nav-icon fas fa-circle" style={{ marginLeft: 20 }} />
                              <p>
                                AUTO NOISE
                                <i className="right fas fa-angle-left" />
                              </p>
                            </a>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <a href="/AN_result" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>PRODUCTION RESULT</p>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a href="/AN_yield" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>QUALITY RESULT</p>
                                </a>
                              </li>

                            </ul>
                          </li>

                          <li className="nav-item">
                            <a href="" className="nav-link">
                              <i className="nav-icon fas fa-circle" style={{ marginLeft: 20 }} />
                              <p>
                                AUTO LINE UP
                                <i className="right fas fa-angle-left" />
                              </p>
                            </a>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <a href="/AL_result" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>PRODUCTION RESULT</p>
                                </a>
                              </li>

                            </ul>
                          </li>
                          <li className="nav-item">
                            <a href="" className="nav-link">
                              <i className="nav-icon fas fa-circle" style={{ marginLeft: 20 }} />
                              <p>
                                AVS
                                <i className="right fas fa-angle-left" />
                              </p>
                            </a>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <a href="/AVS_result" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>PRODUCTION RESULT</p>
                                </a>
                              </li>

                            </ul>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <a href="/AVS_yield" className="nav-link">
                                  <i className="far fa-dot-circle nav-icon" />
                                  <p>QUALITY RESULT</p>
                                </a>
                              </li>

                            </ul>
                          </li>


                        </ul>
                      </li>



                    </ul>
                  </li>


                </ul>
              </nav>
            </div>
          </div></div></div>
        <div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
          <div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{ width: '100%', transform: 'translate(0px, 0px)' }} /></div></div>
        <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{ height: '70%', transform: 'translate(0px, 0px)' }} /></div></div><div className="os-scrollbar-corner" /></div>
    </aside>


    );
  }
}

export default Sidemenu;
