export default {
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
    START_MONITOR: 'api/manage/monitor/start',
    STOP_MONITOR: 'api/manage/monitor/stop',
    DELETE_MONITOR_CONFIG_BY_ID: 'api/manage/delete_monitor_by_id/<monitor_id>',
    UPDATE_MONITOR: 'api/manage/update_monitor/<monitor_id>',
  }
}
