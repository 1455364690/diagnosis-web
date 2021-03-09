<template>
  <div style="width: 100%;">
    <el-row>
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>

      <el-col :span="20">
        <div class="grid-content" style="margin-top: 20px">
          <el-row class="tip" style="height: 100px;padding-top: 30px">
            <el-col :span="2">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      当前监控状态：
                      <el-tag type="success" v-if="systemRunningStatus==1">运行中</el-tag>
                      <el-tag type="danger" v-if="systemRunningStatus==0">停止</el-tag>
                    </div>
                  </el-col>
                  <el-col :span="10">
                    <div class="grid-content bg-purple">
                      <el-button type="primary" @click="startMonitor" v-if="systemRunningStatus==0" plain>启动监控
                      </el-button>
                      <el-button type="warning" @click="endMonitor" v-if="systemRunningStatus==1" plain>停止监控</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
<!--          <div class="panel panel-default" >-->
<!--            <div class="panel-heading" style="background: rgba(153, 153, 153, 0.8); ">监控开关管理</div>-->
<!--            <div class="panel-body">-->
<!--              <el-row>-->
<!--                <div style="height: 100%;width: 100%" class="grid-content">-->
<!--                  <el-row>-->
<!--                    <el-col :span="6">-->
<!--                      <div class="grid-content bg-purple"></div>-->
<!--                    </el-col>-->
<!--                    <el-col :span="12">-->
<!--                      <div class="tip">-->
<!--                        <el-row>-->
<!--                          <el-col :span="14">-->
<!--                            <div class="grid-content bg-purple">-->
<!--                              当前监控状态：-->
<!--                              <el-tag type="success">运行中</el-tag>-->
<!--                              <el-tag type="danger">停止</el-tag>-->
<!--                            </div>-->
<!--                          </el-col>-->
<!--                          <el-col :span="10">-->
<!--                            <div class="grid-content bg-purple">-->
<!--                              <el-button type="success">启动监控</el-button>-->
<!--                              <el-button type="danger">停止监控</el-button>-->
<!--                            </div>-->
<!--                          </el-col>-->
<!--                        </el-row>-->
<!--                      </div>-->
<!--                    </el-col>-->
<!--                    <el-col :span="6">-->
<!--                      <div class="grid-content bg-purple"></div>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                </div>-->
<!--              </el-row>-->

<!--            </div>-->
<!--          </div>-->
          <div class="panel panel-default">
            <div class="panel-heading" style="background: rgba(153, 153, 153, 0.8)">监控配置管理</div>
            <div class="panel-body">
              <el-row>
                <el-col :span="2">
                  <div class="grid-content"></div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <!--                    <el-button type="primary" @click="showDialog()">修改配置项</el-button>-->
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content"></div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  <div class="grid-content"></div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content">
                    <el-table
                      :data="monitorConfigList"
                      stripe
                      style="width: 100%">
                      <el-table-column
                        prop="beatName"
                        label="监控名称">
                      </el-table-column>
                      <el-table-column
                        prop="beatIndex"
                        label="监控标识">
                      </el-table-column>
                      <el-table-column
                        prop="url"
                        label="监控地址"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="fromTime"
                        label="起始时间">
                      </el-table-column>
                      <el-table-column
                        prop="toTime"
                        label="终止时间">
                      </el-table-column>
                      <el-table-column
                        prop="lastTimeSuccess"
                        label="状态">
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        width="300">
                        <template slot-scope="scope">
                          <el-button size="mini" type="primary"
                                     @click="showUpdateMonitorConfigVisibleDialog(scope.row)">修改配置项
                          </el-button>
<!--                          <el-button size="mini" type="danger" @click="deleteMonitorConfig(scope.row)">删除</el-button>-->
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div class="grid-content"></div>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading" style="background: rgba(153, 153, 153, 0.8)">正常用户访问序列设置</div>
            <div class="panel-body">
              <el-row>
                <el-col :span="2">
                  <div class="grid-content bg-purple">
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content bg-purple">
                    <el-row>
                      <el-button type="primary" @click="showAddNormalAccessSequenceDialog()">添加用户访问序列</el-button>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-table
                          v-if="normalUserAccessSequenceList!=null && normalUserAccessSequenceList.length !==0"
                          ref="multipleTable"
                          :data="normalUserAccessSequenceList"
                          tooltip-effect="dark"
                          style="width: 100%"
                          @selection-change="handleSelectionChange">
                          <el-table-column
                            type="expand"
                            width="55">
                            <template slot-scope="props">
                              <el-form label-position="left" v-for="(item,index) in props.row.sequence" :key="index"
                                       inline class="demo-table-expand">
                                <el-form-item style="height: 10px" label="访问序列：">
                                  <span>{{ item }}</span>
                                </el-form-item>
                              </el-form>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="用户id"
                          >
                            <template slot-scope="scope">{{ scope.row.userId }}</template>
                          </el-table-column>
                          <el-table-column
                            label="sessionId"
                          >
                            <template slot-scope="scope">{{ scope.row.sessionId }}</template>
                          </el-table-column>
                          <el-table-column label="操作">
                            <template slot-scope="props">
                              <el-button size="small" type="danger" @click="deleteNormalAccessSequence(props.row)"
                                         plain>删除
                              </el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-col>
                    </el-row>

                  </div>
                </el-col>
                <el-col :span="2">
                  <div class="grid-content bg-purple">

                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <el-dialog title="监控配置信息" :visible.sync="updateMonitorConfigVisible">
      <el-form label-position="right" label-width="80px" :model="monitorConfigItem">
        <el-form-item label="监控名称">
          <el-input v-model="monitorConfigItem.beatName"></el-input>
        </el-form-item>
        <el-form-item label="监控标识">
          <el-input v-model="monitorConfigItem.beatIndex"></el-input>
        </el-form-item>
        <el-form-item label="监控地址">
          <el-input v-model="monitorConfigItem.url"></el-input>
        </el-form-item>
        <!--        <el-form-item label="起始时间">-->
        <!--          <el-input style="width: 300px" v-model="monitorConfigItem.fromTime"></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="终止时间">-->
        <!--          <el-input style="width: 300px" v-model="monitorConfigItem.toTime"></el-input>-->
        <!--        </el-form-item>-->
      </el-form>
      <el-button @click="updateMonitorConfig" size="medium" type="primary" style="margin-left: 300px;margin-top: 20px">提&nbsp;&nbsp;交</el-button>
    </el-dialog>
    <el-dialog title="添加正常用户访问序列" :visible.sync="addNormalAccessSequenceVisible">
        <el-row>
          <el-col style="padding-top: 5px" :span="2">
            用户id：
          </el-col>
          <el-col :span="8">
            <el-input style="width: 200px" v-model="queryAccessSequenceFilter.userId"></el-input>
          </el-col>
          <el-col style="padding-top: 5px" :span="4">
            用户sessionId：
          </el-col>
          <el-col :span="8">
            <el-input v-model="queryAccessSequenceFilter.sessionId"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" style="padding-top: 5px">时间段：</el-col>
          <el-col :span="16">
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
          <el-col :span="6" style="padding-top: 3px">
            <el-button @click="queryAccessSequence" size="medium" type="primary">搜&nbsp;&nbsp;索</el-button>
          </el-col>
        </el-row>
      <el-row>
        <el-table
          v-if="queryAccessSequenceList!=null && queryAccessSequenceList.length !==0"
          ref="multipleTable"
          :data="queryAccessSequenceList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="expand"
            width="55">
            <template slot-scope="props">
              <el-form label-position="left" v-for="(item,index) in props.row.sequence" :key="index" inline class="demo-table-expand">
                <el-form-item style="height: 10px" label="访问序列：">
                  <span>{{item}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="用户id"
          >
            <template slot-scope="scope">{{ scope.row.userId }}</template>
          </el-table-column>
          <el-table-column
            label="sessionId"
          >
            <template slot-scope="scope">{{ scope.row.sessionId }}</template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="queryAccessSequenceList!=null && queryAccessSequenceList.length!==0">
        <el-col :span="8"></el-col>
        <el-pagination
          background
          :page-size="currentPageSize"
          :current-page.sync="currentPageNum"
          @current-change="currentPageChange"
          layout="prev, pager, next"
          :total="pageTotalNum">
        </el-pagination>
      </el-row>
      <el-button v-if="multipleSelection!=null && multipleSelection.length!==0" @click="addNormalAccessSequence"
                 size="medium" type="primary" style="margin-left: 300px;margin-top: 20px">提&nbsp;&nbsp;交
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import Http from '@/js/http.js'
import Apis from '@/js/api.js'

export default {
  name: "Manager",
  data() {
    return {
      selectTime: '',
      currentPageNum: 1,
      currentPageSize: 15,
      pageTotalNum: 0,
      updateMonitorConfigVisible: false,
      addNormalAccessSequenceVisible: false,
      systemRunningStatus: 1,//2:未知,1:运行中,0:停止
      activeNames: ['1'],
      queryAccessSequenceFilter: {
        startTime: null,
        entTime: null,
        userId: null,
        sessionId: null
      },
      normalUserAccessSequenceList: [{
        userId: '123123',
        sessionId: '1233333',
        sequence: ['123', '123123', '123123', '123123']
      }, {userId: '123123', sessionId: '1233333', sequence: ['123', '123123', '123123', '123123']}],
      monitorConfigList: [{
        id: 1,
        beatName: 'filbeat',
        beatIndex: 'aaa',
        fromTime: 'aaa',
        toTime: 'aaa',
        lastTimeSuccess: 'aaa',
        isStarted: 'aaa',
        url: 'http://123.com',
      }, {
        id: 2,
        beatName: 'skywalking',
        beatIndex: 'aaa',
        fromTime: 'aaa',
        toTime: 'a',
        lastTimeSuccess: 'aa',
        isStarted: 'aa',
        url: 'http://123.com'
      }],
      monitorConfigItem: {},
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
      queryAccessSequenceList: [],
      multipleSelection: []
    };
  },
  mounted() {
    // 获取监控当前状态
    this.queryMonitorCurrentStatus()
    // 获取监控信息
    this.queryMonitorConfigList()
    // 获取用户正常访问序列
    this.queryNormalAccessSequenceList()
  },
  methods: {
    queryMonitorCurrentStatus() {
      Http.get(Apis.MANAGE.GET_MONITOR_CURRENT_STATUS).then(res => {
        this.systemRunningStatus = res.status
      }).catch(error => {
        this.showErrorMessage('获取当前监控状态失败:' + error)
      })
    },
    queryMonitorConfigList() {
      Http.get(Apis.MANAGE.QUERY_MONITOR_CONFIG_LIST).then(res => {
        this.monitorConfigList = res.data
      }).catch(error => {
        this.showErrorMessage('获取监控信息失败:' + error)
      })
    },
    queryNormalAccessSequenceList() {
      Http.get(Apis.MANAGE.GET_NORMAL_ACCESS_SEQUENCE_LIST).then(res => {
        this.normalUserAccessSequenceList = res.data
      }).catch(error => {
        this.showErrorMessage('获取用户正常访问序列失败')
      })
    },
    startMonitor() {
      this.checkMessageBox('确认启动监控？', this.confirmStartMonitor, this.cancel)
    },
    confirmStartMonitor() {
      if (this.systemRunningStatus == 1) {
        this.showErrorMessage('启动监控失败，当前监控已启动，无法重复启动！');
        return
      }
      Http.get(Apis.MANAGE.START_MONITOR).then(res => {
        this.systemRunningStatus = res.status
      }).catch(error => {

      })
    },
    endMonitor() {
      this.checkMessageBox('确认停止监控？', this.confirmEndMonitor, this.cancel)
    },
    confirmEndMonitor() {
      if (this.systemRunningStatus == 0) {
        this.showErrorMessage('停止监控失败，当前监控已停止，无法重复停止！');
        return
      }
      Http.get(Apis.MANAGE.STOP_MONITOR).then(res => {
        this.systemRunningStatus = res.status
      }).catch(error => {

      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    currentPageChange(val) {
      this.currentPageNum = val
      console.log(val)
      this.queryAccessSequence()
    },

    updateMonitorConfig() {
      console.log(this.monitorConfigItem)
      Http.post(Apis.MANAGE.UPDATE_MONITOR, this.monitorConfigItem).then(res => {
        this.showSuccessMessage('修改成功')
        this.queryMonitorConfigList()
      }).catch(error => {
        this.showErrorMessage('修改失败')
      })
    },
    deleteNormalAccessSequence(config) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const accessSequenceConfig = {
          userId: config.userId,
          sessionId: config.sessionId
        };
        Http.post(Apis.post(Apis.MANAGE.DELETE_SINGLE_NORMAL_ACCESS_SEQUENCE, accessSequenceConfig)).then(res => {
          this.showSuccessMessage('删除成功')
          this.queryNormalAccessSequenceList()
        }).catch(error => {
          this.showErrorMessage('正常序列删除失败')
        })
      }).catch(() => {
      });

    },
    addNormalAccessSequence() {
      console.log(this.multipleSelection)
      Http.post(Apis.MANAGE.ADD_NORMAL_ACCESS_SEQUENCE, this.multipleSelection).then(res => {
        this.showSuccessMessage('添加用户访问序列失败')
        this.queryNormalAccessSequenceList()
      }).catch(error => {
        this.showErrorMessage('添加用户访问序列失败')
      })
    },
    queryAccessSequence() {
      const queryCondition = {
        userId: this.queryAccessSequenceFilter.userId === '' ? null : this.queryAccessSequenceFilter.userId,
        sessionId: this.queryAccessSequenceFilter.sessionId === '' ? null : this.queryAccessSequenceFilter.sessionId,
        startTime: this.dateFormat(this.selectTime[0]),
        endTime: this.dateFormat(this.selectTime[1]),
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        total: this.pageTotalNum
      }
      console.log(queryCondition)
      Http.post(Apis.MANAGE.QUERY_ACCESS_SEQUENCE_LIST_BY_CONDITION, queryCondition).then(res => {
        this.queryAccessSequenceList = res.data
        this.pageNum = res.pageNum
        this.pageSize = res.pageSize
        this.pageTotalNum = res.total
      }).catch(error => {
        this.showErrorMessage('获取用户序列失败')
      })


      /*
      this.queryAccessSequenceList = [{
        userId: 1,
        sessionId: '123546',
        sequence: ['123', '123', '123123123']
      }, {userId: 1, sessionId: '123546', sequence: ['123', '123', '123123123']}]

       */
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

    showUpdateMonitorConfigVisibleDialog(row) {
      this.updateMonitorConfigVisible = true
      this.monitorConfigItem = row
    },
    showAddNormalAccessSequenceDialog() {
      this.addNormalAccessSequenceVisible = true
    },
    cancel() {
      console.log('cancel')
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
    checkMessageBox(message, confirm, cancel) {
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        confirm()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        cancel()
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
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
