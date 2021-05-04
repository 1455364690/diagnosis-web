<template>
  <div style="width: 100%;">
    <el-row :gutter="10" v-loading="loading" style="padding-top: 15px;">
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-row class="tip" style="height: 100px;padding-top: 30px">
            <el-col :span="3" style="font-size: 15px;padding-top: 10px">选择诊断时间范围：</el-col>
            <el-col :span="10">
              <el-date-picker
                v-model="selectTime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="起始时间"
                end-placeholder="终止时间"
                align="right">
              </el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-button v-if="!selectTime" disabled type="primary" @click="startDiagnose" plain>开始诊断</el-button>
              <el-button v-if="selectTime" type="primary" @click="startDiagnose" plain>开始诊断</el-button>
            </el-col>
          </el-row>
          <div class="panel panel-default">
            <div class="panel-heading" style="background: rgba(153, 153, 153, 0.8)" >用户访问序列诊断结果</div>
            <div class="panel-body">
              <el-row>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="20">
                  <el-row>
                    <el-table
                      v-if="diagnoseResultList!=null && diagnoseResultList.length !==0"
                      :show-header="false"
                      ref="multipleTable"
                      :data="diagnoseResultList"
                      tooltip-effect="dark"
                      style="width: 100%">
                      <el-table-column
                        type="expand"
                        width="55" style="height: 30px;padding-top: 0;">
                        <template slot-scope="props">
                          <el-row :gutter="10" style="height: 30px">
                            <el-col :span="1">&nbsp;</el-col>
                            <el-col :span="4">源系统用户Id：</el-col>
                            <el-col :span="3">
                              {{ props.row.user_id }}
                            </el-col>
                          </el-row>
                          <el-row :gutter="10" style="height: 30px">
                            <el-col :span="1">&nbsp;</el-col>
                            <el-col :span="4">源系统sessionId：</el-col>
                            <el-col :span="10">
                              {{ props.row.session_id }}
                            </el-col>
                          </el-row>
                          <el-row>

                            <el-col :span="19">
                              <el-row>
                                <el-timeline>
                                  <el-timeline-item
                                    :color="timeLineColorMap[activity.level]"
                                    v-for="(activity, index) in props.row.sequence"
                                    :key="index"
                                    hide-timestamp="true">
                                    {{activity.api}}
                                  </el-timeline-item>
                                </el-timeline>
                              </el-row>
                            </el-col>
                          </el-row>

                        </template>
                      </el-table-column>
                      <el-table-column style="height: 60px">
                        <template slot-scope="props">
                          <el-row :gutter="10" style="margin-bottom: 5px">
                            <el-col :span="24" v-if="props.row.error_number < 0.5" style="color: #409EFF">
                              源系统用户id[{{ props.row.user_id }}] - 源系统sessionId[{{ props.row.session_id }}]
                            </el-col>
                            <el-col :span="24" v-if="props.row.error_number > 0.5 && props.row.error_number < 0.8" style="color: #e6a23c">
                              源系统用户id[{{ props.row.user_id }}] - 源系统sessionId[{{ props.row.session_id }}]
                            </el-col>
                            <el-col :span="24" v-if="props.row.error_number >= 0.8" style="color: #F56C6C">
                              源系统用户id[{{ props.row.user_id }}] - 源系统sessionId[{{ props.row.session_id }}]
                            </el-col>
                          </el-row>
                        </template>

                      </el-table-column>
                    </el-table>
                  </el-row>
                  <el-row v-if="diagnoseResultList == null || diagnoseResultList.length !== 0">
                    <el-pagination
                      background
                      :page-size="currentPageSize"
                      :current-page.sync="currentPageNum"
                      @current-change="currentPageChange"
                      layout="prev, pager, next"
                      :total="methodInfoTotalNum">
                    </el-pagination>
                  </el-row>
                </el-col>
                <el-col :span="2"></el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Http from '@/js/http.js'
import Apis from '@/js/api.js'

export default {
  name: "UserDiagnosis",
  data() {
    return {
      activeNames: ['1'],
      pickerOptions: {
        shortcuts: [{
          text: '最近1小时',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近2小时',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 2);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近3小时',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 3);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      selectTime: '',
      currentPageSize: 10,
      currentPageNum: 1,
      loading:false,
      methodInfoTotalNum: 10,
      timeLineColorMap: {
        0: '#409EFF',
        1: '#E6A23C',
        2: '#F56C6C'
      },
      diagnoseResultList: [
        // {
        //   userId: 'qwe',
        //   sessionId: '123345',
        //   sequence: ['123123', '123123123', '123123123', '123123123123'],
        //   errorNumber: 0.6
        // },
        // {
        //   userId: 'qwe',
        //   sessionId: '123345',
        //   sequence: ['123123', '123123123', '123123123', '123123123123'],
        //   errorNumber: 0.3
        // },
        // {
        //   userId: 'qwe',
        //   sessionId: '123345',
        //   sequence: ['123123', '123123123', '123123123', '123123123123'],
        //   errorNumber: 0.4
        // },
        // {
        //   userId: 'qwe',
        //   sessionId: '123345',
        //   sequence: ['123123', '123123123', '123123123', '123123123123'],
        //   errorNumber: 0.77
        // }
      ],

    }
  },
  methods: {
    checkTime(startTime, endTime) {
      if (startTime!=null && endTime !=null)
        return true
      else {
        this.showErrorMessage("请先选择时间段")
        return false
      }
    },
    showLoading(){
      this.loading = true
    },
    hideLoading(){
      this.loading = false
    },
    startDiagnose() {
      const startTime = this.dateFormat(this.selectTime[0])
      const endTime = this.dateFormat(this.selectTime[1])
      if (!this.checkTime(this.selectTime[0], this.selectTime[1])) {
        return
      }
      const data = {
        startTime: startTime,
        endTime: endTime
      }
      this.showLoading()
      Http.post(Apis.ACCESS_SEQUENCE.START_DIAGNOSE, data).then(res => {
        this.hideLoading()
        if (res.success === true) {
          //this.queryDiagnoseResult()
          console.log(res.data)
          this.diagnoseResultList = res.data
          this.methodInfoTotalNum = res.total
          this.showSuccessMessage('诊断成功')
        } else {
          console.log(res.message)
          this.showErrorMessage(res.message)
        }
      }).catch(error => {
        this.hideLoading()
        this.showErrorMessage('诊断失败，请重新尝试')
      })
    },
    currentPageChange(event) {
      console.log(this.currentPageNum)
    },
    queryDiagnoseResult() {
      const startTime = this.dateFormat(this.selectTime[0])
      const endTime = this.dateFormat(this.selectTime[1])
      if (!this.checkTime(this.selectTime[0], this.selectTime[1])) {
        return
      }
      const data = {
        startTime: startTime,
        endTime: endTime,
        pageNum: 1,
        pageSize: 1,
        total: 1
      }
      Http.post(Apis.ACCESS_SEQUENCE.QUERY_DIAGNOSE_RESULT_BY_CONDITION,data).then(res=>{

      }).catch(error=>{
        this.showErrorMessage('获取诊断结果失败，请重新尝试')
      })
    },
    numberFormat(s) {
      return s < 10 ? '0' + s : s
    },
    dateFormat(date) {
      if (date === undefined || date == null) {
        return null
      }
      date = new Date(date)
      var resDate = date.getFullYear() + '-' + this.numberFormat(date.getMonth() + 1) + '-' + this.numberFormat(date.getDate()) + 'T' + this.numberFormat(date.getHours()) + ':' + this.numberFormat(date.getMinutes()) + ':' + this.numberFormat(date.getSeconds()) + '.000Z';
      return resDate
    },
    showSuccessMessage(message) {
      this.$message({
        message: message,
        type: 'success'
      });
    },
    showInfoMessage(message) {
      this.$message(message);
    },
    showErrorMessage(message) {
      this.$message.error(message);
    },
    showWarningMessage(message) {
      this.$message({
        message: message,
        type: 'warning'
      });
    },
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;

&
:last-child {
  margin-bottom: 0;
}

}

.bg-purple-dark {
  background: #99a9bf;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.tip {
  padding: 8px 16px;
  background-color: rgb(233, 233, 235);
  border-radius: 4px;
  border-left: 5px solid #909399;
  margin: 20px 0;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
