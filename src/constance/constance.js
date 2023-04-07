export const apiUrl = "http://localhost:4001/NAT_Dashboard/"; // <<<<< same back end  >>>>>>
//export const apiUrl = "http://192.168.1.2:4001/NAT_Dashboard/"; // <<<<< same back end  >>>>>> Nat Dx project
//export const apiUrl = "http://192.168.1.51:2020/NAT_Dashboard/"; // <<<<< same back end  >>>>>> 

export const key = {
  LOGIN_PASSED: "LOGIN_PASSED",
  USER_NAME: "USER_NAME",
  USER_EMP: "USER_EMP",
  TIME_LOGIN: "TIME_LOGIN",
  EDITTED_USER: "USER_EMP",
  USER_LV: "USER_LV",
  TOPIC_ITEM: "TOPIC_ITEM",

};

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";


export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const server = {
  URL_REGIST: `user/regist`,
  LOGIN_URL: `user/login`,
  LOGIN_EMP: `user/elogin`,
  URL_PASSWORD: `user/password`,
  URL_USER: `user/all`,
  URL_EDITUSER: `user/level`,
  URL_DELETEUSER: `user/delete`,
  USER_QUERY: `user/level_query`,

  process_URL: `Summary/process`,
  MC_URL: `Summary/machine`,
  Daily_byMC: `Summary/daily_result`,

  //Dashboard
  QTY_OUTPUT: `query/output_sum`,
  LIST_MC: `query/list_machine`,
  list_machine_ARP: `query/list_machine_ARP`, // MC ARP
  list_machine_MBR: `query/list_machine_MBR`, //MC MBR

  DEFECT_PIE: `query/defect_pie`,
  DEFECT_STACK: `query/defect_stack`,
  MC_TIMELINE: `query/machine_timeline`,
  MC_TOTAL: `query/total_output`,
  MC_CT: `query/find_ct`,
  wasteTime_MBR: `query/machine_wasteTime`,

  //dash turning 
  TUN_MC_LIST: `tun/list_machine`,
  TUN_OUTPUT: `tun/output_sum`,
  TUN_CT: `tun/find_ct`,
  TUN_ct_byHour: `tun/ct_byHour`,
  TUN_UTL: `tun/UTL`,

  //dash grinding IRH
  GD_MC_LIST: `gd/list_machine`,
  GD_OUTPUT: `gd/output_sum`,
  GD_CT: `gd/find_ct`,
  GD_ct_byHour: `gd/ct_byHour`,
  GD_UTL: `gd/UTL`,

  // MBR process 
  DAILY_OUT: 'Summary/daily_out_machine',
  DAILY_TOTAL: 'Summary/daily_total',
  TTL_yield: 'Summary/TTL_yield',
  TTL_Yield_data: 'Summary/TTL_Yield_data',
  NG_ratio: 'Summary/NG_ratio',
  CT_URL: 'Summary/ct',
  DAILY_LOG: 'Summary/mc_log',
  DAILY_BALL_date: 'Summary/ball_use_date',
  MONTHLY_BALL: 'Summary/ball_use_month',
  MONTHLY_DEFECT: 'Summary/defect',
  MONTHLY_mc_log: 'Summary/mc_log_month',
  MONTHLY_total_output: 'Summary/total_output_month',

  //  turning 
  list_machine_TUN: 'Turning_result/list_TN_machine',
  DAILY_TOTAL_TUN: 'Turning_result/daily_total',
  DAILY_OUT_MC: 'Turning_result/daily_out_machine',
  MONTHLY_total_outputTN: 'Turning_result/TN_total_output_month',
  daily_CT_TUN: 'Turning_result/daily_CT',
  daily_UTL_TUN: 'Turning_result/daily_UTL',
  CT_month: 'Turning_result/CT_month',
  UTL_month: 'Turning_result/UTL_month',


  //grinding = IRH
  list_machine_GD: 'IRH_result/list_GD_machine',
  DAILY_TOTAL_GD: 'IRH_result/daily_total',
  IRH_DAILY_OUT_MC: 'IRH_result/daily_out_machine',
  MONTHLY_total_output_IRH: 'IRH_result/total_output_month',
  daily_CT_IRH: 'IRH_result/daily_CT',
  daily_UTL_IRH: 'IRH_result/daily_UTL',
  CT_month_IRH: 'IRH_result/CT_month',
  UTL_month_IRH: 'IRH_result/UTL_month',

  // ORH grinding 
  list_machine_ORH: 'ORH_result/list_ORH_machine',
  DAILY_TOTAL_ORH: 'ORH_result/daily_total',
  ORH_DAILY_OUT_MC: 'ORH_result/daily_out_machine',
  MONTHLY_total_output_ORH: 'ORH_result/total_output_month',
  daily_CT_ORH: 'ORH_result/daily_CT',
  CT_month_ORH: 'ORH_result/CT_month',

  //IRB dash
  list_machine_IRB: 'IRB_dash/list_machine',
  IRB_OUTPUT: `IRB_dash/output_sum`,
  IRB_CT: `IRB_dash/find_ct`,
  IRB_UTL: `IRB_dash/UTL`,
  IRB_ct_byHour: `IRB_dash/ct_byHour`,
  //IRB
  list_machine_IRB1: 'IRB_result/list_IRB_machine',
  DAILY_TOTAL_IRB: 'IRB_result/daily_total',
  IRB_DAILY_OUT_MC: 'IRB_result/daily_out_machine',
  MONTHLY_total_output_IRB: 'IRB_result/total_output_month',
  daily_CT_IRB: 'IRB_result/daily_CT',
  daily_UTL_IRB: 'IRB_result/daily_UTL',
  CT_month_IRB: 'IRB_result/CT_month',
  UTL_month_IRB: 'IRB_result/UTL_month',

  // ORH Dash
  ORH_OUTPUT: `ORH_dash/output_sum`,
  ORH_CT: `ORH_dash/find_ct`,
  ORH_ct_byHour: `ORH_dash/ct_byHour`,
  ORH_UTL: `ORH_dash/UTL`,
  // ARP  
  list_mc_ARP: 'ARP_result/list_machine_ARP',
  DAILY_TOTAL_ARP: 'ARP_result/daily_total',
  DAILY_OUT_MC_ARP: 'ARP_result/daily_out_By_machine',
  MONTHLY_total_outputARP: 'ARP_result/ARP_total_output_month',
  TTL_yield_ARP: 'ARP_result/TTL_yield',
  TTL_Yield_data_ARP: 'ARP_result/TTL_Yield_data',
  NG_ratio_ARP: 'ARP_result/NG_ratio',
  daily_CT_ARP: 'ARP_result/daily_CT',
  month_CT_ARP: 'ARP_result/CT_month',
  // AVS dash 
  AVS_OUTPUT: `AVS_dash/output_sum`,
  AVS_CT: `AVS_dash/find_ct`,
  AVS_ct_byHour: `AVS_dash/ct_byHour`,
  //AVS
  list_mc_AVS: 'AVS_result/list_machine_AVS',  //mc list 
  DAILY_TOTAL_AVS: 'AVS_result/daily_total',
  DAILY_OUT_MC_AVS: 'AVS_result/daily_out_By_machine',
  TTL_yield_AVS: 'AVS_result/TTL_yield',
  TTL_Yield_data_AVS: 'AVS_result/TTL_Yield_data',
  NG_ratio_AVS: 'AVS_result/NG_ratio',

  MONTHLY_total_outputAVS: 'AVS_result/AVS_total_output_month',
  daily_CT_AVS: 'AVS_result/daily_CT',
  month_CT_AVS: 'AVS_result/CT_month',
  //AN dash
  AN_MC_LIST: `AN_dash/list_machine`,
  AN_OUTPUT: `AN_dash/output_sum`,
  AN_CT: `AN_dash/find_ct`,
  AN_ct_byHour: `AN_dash/ct_byHour`,
  AN_UTL: `AN_dash/UTL`,
  //AN result 
  DAILY_TOTAL_AN: 'AN_result/daily_total',
  DAILY_OUT_MC_AN: 'AN_result/daily_out_machine',
  MONTHLY_total_outputAN: 'AN_result/AN_total_output_month',
  daily_CT_Rear_AN: 'AN_result/daily_CT_Rear',
  daily_CT_Front_AN: 'AN_result/daily_CT_Front',
  daily_UTL_Front_AN: 'AN_result/daily_UTL_Front',
  daily_UTL_Rear_AN: 'AN_result/daily_UTL_Rear',
  yield_AN_R: 'AN_result/yield_Rear',
  yield_AN_F: 'AN_result/yield_Front',
  //AL dash 
  AL_MC_LIST: `AL_dash/list_machine`,
  AL_OUTPUT: `AL_dash/output_sum`,
  AL_CT: `AL_dash/find_ct`,
  AL_ct_byHour: `AL_dash/ct_byHour`,
  AL_UTL: `AL_dash/UTL`,
  //AL result 
  DAILY_TOTAL_AL: 'AL_result/daily_total',
  DAILY_OUT_MC_AL: 'AL_result/daily_out_machine',
  MONTHLY_total_outputAL: 'AL_result/AL_total_output_month',
  daily_CT_AL: 'AL_result/daily_CT',
  month_CT_AL: 'AL_result/CT_month',
  //ARP dash
  ARP_OUTPUT: `ARP_dash/output_sum`,
  ARP_CT: `ARP_dash/find_ct`,
  ARP_ct_byHour: `ARP_dash/ct_byHour`,
  // Auto line up
  AL_mc: `Timeline_AL/mc_list`,
  TIMELINE_AL: `Timeline_AL/test1`,
  mc_status_log: `Timeline_AL/mc_status_log`,
  AlarmTopic_time: `Timeline_AL/AlarmTopic_time`,
  stop_time: `Timeline_AL/Stop_time`,
  // TB 
  TB_mc: `Timeline_TB/mc_list`,
  TIMELINE_TB: `Timeline_TB/Timeline_TB`,
  mc_status_log_TB: `Timeline_TB/mc_status_log`,
  AlarmTopic_time_TB: `Timeline_TB/AlarmTopic_time`,
  stop_time_TB: `Timeline_TB/Stop_time`,
  TIMELINE_TB_test: `Timeline_TB/Timeline_TB_test`,
  //ARP 
  ARP_mc: `Timeline_ARP/mc_list`,
  mc_status_log_ARP: `Timeline_ARP/mc_status_log`,
  TIMELINE_ARP: `Timeline_ARP/Timeline_ARP`,
  AlarmTopic_time_ARP: `Timeline_ARP/AlarmTopic_time`,
  stop_time_ARP: `Timeline_ARP/Stop_time`,
  // AVS
  AVS_mc: `Timeline_AVS/mc_list`,
  mc_status_log_AVS: `Timeline_AVS/mc_status_log`,
  TIMELINE_AVS: `Timeline_AVS/Timeline_AVS`,
  AlarmTopic_time_AVS: `Timeline_AVS/AlarmTopic_time`,
  stop_time_AVS: `Timeline_AVS/Stop_time`,

  GSSM_mc: `Timeline_GSSM/mc_list`,
  mc_status_log_GSSM: `Timeline_GSSM/mc_status_log`,
  TIMELINE_GSSM: `Timeline_GSSM/Timeline_GSSM`,
  AlarmTopic_time_GSSM: `Timeline_GSSM/AlarmTopic_time`,
  stop_time_GSSM: `Timeline_GSSM/Stop_time`,
  AOD_mc: `Timeline_AOD/mc_list`,
  mc_status_log_AOD: `Timeline_AOD/mc_status_log`,
  TIMELINE_AOD: `Timeline_AOD/Timeline_AOD`,
  AlarmTopic_time_AOD: `Timeline_AOD/AlarmTopic_time`,
  stop_time_AOD: `Timeline_AOD/Stop_time`,
  //GN process 
  IRB_mc: `Timeline_GN/mc_list_IRB`,
  mc_status_log_IRB: `Timeline_GN/mc_status_log_IRB`,
  TIMELINE_IRB: `Timeline_GN/Timeline_IRB`,
  AlarmTopic_time_IRB: `Timeline_GN/AlarmTopic_time_IRB`,
  stop_time_IRB: `Timeline_GN/Stop_time_IRB`,

  IRR_mc: `Timeline_GN/mc_list_IRR`,
  mc_status_log_IRR: `Timeline_GN/mc_status_log_IRR`,
  TIMELINE_IRR: `Timeline_GN/Timeline_IRR`,
  AlarmTopic_time_IRR: `Timeline_GN/AlarmTopic_time_IRR`,
  stop_time_IRR: `Timeline_GN/Stop_time_IRR`,



  
  // master topic
  master_list_mc: `master_topic/list_mc`,
  master_Topic_item: `master_topic/Add_item`,
  master_get_topic: `master_topic/get_topic_list`,
  master_edit_respon: `master_topic/edit_respon`,
  master_update_respon: `master_topic/update_respon`,
  master_upload: `master_topic/upload`,

}