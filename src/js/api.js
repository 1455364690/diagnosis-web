export default {
  ACCESS_SEQUENCE: {
    QUERY_DIAGNOSE_RESULT_BY_CONDITION: 'api/access_sequence/query_diagnose_result_by_condition',
    START_DIAGNOSE: 'api/access_sequence/start_diagnose'
  },
  SYSTEM_METHOD: {
    QUERY_DIAGNOSE_RESULT_BY_CONDITION: 'api/system_method/query_diagnose_result_by_condition',
    START_DIAGNOSE: 'api/system_method/start_diagnose'
  },

  USER: {
    GET_ALL_USER_ID: '/api/get_all_user_id_list/',
    GET_SESSION_LIST_ID_BY_USER_ID: 'api/get_session_list_id_by_user_id/{user_id}',
    GEt_SESSION_LIST_DIC_BY_USER_ID_LIST: 'api/get_session_list_dic_by_user_id_list',

  },
  METHOD: {
    GET_FILEBEAT_LIST_BY_SESSION_ID: 'api/get_method_list_by_session_id/{session_id}',
    GET_FILEBEAT_LIST_BY_SESSION_ID_IN_PAGE: 'api/get_method_list_by_session_id_in_page/{session_id}/{page_size}/{page_num}',
    GET_PC_INFO_BY_SESSION_ID_AND_METHOD_ID: 'api/get_pc_info_by_session_id_and_method_id/{session_id}/{method_id}'
  },
  MANAGE: {
    GET_MONITOR_CURRENT_STATUS: 'api/manage/monitor/status/get',
    START_MONITOR: 'api/manage/monitor/start',
    STOP_MONITOR: 'api/manage/monitor/stop',

    QUERY_MONITOR_CONFIG_LIST: 'api/manage/get_monitor_config_list',
    DELETE_MONITOR_CONFIG_BY_ID: 'api/manage/delete_monitor_by_id/<monitor_id>',
    UPDATE_MONITOR: 'api/manage/update_monitor',

    QUERY_ACCESS_SEQUENCE_LIST_BY_CONDITION: 'api/manage/query_access_sequence_list_by_condition',
    GET_NORMAL_ACCESS_SEQUENCE_LIST: 'api/manage/get_normal_access_sequence_list',
    DELETE_SINGLE_NORMAL_ACCESS_SEQUENCE: 'api/manage/delete_single_normal_access_sequence',
    ADD_NORMAL_ACCESS_SEQUENCE: 'api/manage/add_normal_access_sequence',
    GET_NORMAL_ACCESS_SEQUENCE_DETAIL_BY_SESSION_ID: 'api/manage/get_normal_access_sequence_detail_by_session_id/{session_id}'
  },
  XUYUJIE:{
    // POST,获取表格数据
    GET_TABLE_DATA_BY_MENU_AND_PAGE: 'api/xuyujie/get_table_data_by_menu_and_page',
    //POST,上传文件
    UPLOAD_TXT_FILE: 'api/xuyujie/upload_txt_file',
    //GET,获取刚解析的文件数据
    GET_ANALYSE_TABLE_FORM_TXT_FILE: 'api/xuyujie/get_analyse_table_from_txt_file/{fileName}',
    //POST,保存刚解析的文件数据
    SAVE_ANALYSE_TABLE_FORM_TXT_FILE: 'api/xuyujie/save_analyse_table_from_txt_file',
    //POST,获取
    QUERY_DATA_BY_CONDITION: 'api/xuyujie/query_data_by_condition',
    //POST,获取下载链接
    DOWNLOAD_ALL_DATA_BY_CONDITION: 'api/xuyuejie/download_all_data_by_condition',
    //POST,获取所有数据下载链接
    DOWNLOAD_ALL_FOUR_DATA_BY_CONDITION: 'api/xuyuejie/download_all_four_data_by_condition',
    //POST,获取部分数据的下载链接
    DOWNLOAD_SELECTED_DATA: 'api/xuyuejie/download_selected_data',
    //POST
    UPLOAD_TXT_FILE_AVG: 'api/xuyujie/upload_txt_file/cal_avg',
    //GET
    CAL_AVG: 'api/xuyujie/cal_avg',
    CAL_AVG_STEP2: 'api/xuyujie/cal_avg_step2',
    //POST
    DOWNLOAD_CAL_AVG:'api/xuyujie/cal_avg/download'
  }
}
