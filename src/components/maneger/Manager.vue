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
                          <el-button size="mini" type="danger" @click="deleteMonitorConfig(scope.row)">删除</el-button>
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
                        <el-collapse v-model="activeNames"
                                     v-for="(item,index) in userAccessSequenceList" :key="index">
                          <el-collapse-item :name="index">
                            <template slot="title">
                              <el-button size="mini" type="danger" plain>删除</el-button>&nbsp;&nbsp;
                              {{ item.sessionId }}
                            </template>
                            <div v-for="(seq,seqIndex) in item.sequence" :key="seqIndex">
                              <div>{{ seq }}</div>
                            </div>

                          </el-collapse-item>
                        </el-collapse>
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
        <el-row></el-row>
      <el-button @click="updateMonitorConfig" size="medium" type="primary" style="margin-left: 300px;margin-top: 20px">提&nbsp;&nbsp;交</el-button>
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
      selectTime:'',
      updateMonitorConfigVisible: false,
      addNormalAccessSequenceVisible: false,
      systemRunningStatus: 1,//2:未知,1:运行中,0:停止
      activeNames: ['1'],
      queryAccessSequenceFilter: {
        startTime: '',
        entTime: '',
        userId: '',
        sessionId: ''
      },
      userAccessSequenceList: [{
        sessionId: '1233333',
        sequence: ['123', '123123', '123123', '123123']
      }, {sessionId: '1233333', sequence: ['123', '123123', '123123', '123123']}],
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
    };
  },
  methods: {
    showUpdateMonitorConfigVisibleDialog(row) {
      this.updateMonitorConfigVisible = true
      this.monitorConfigItem = row
      console.log(scope)
    },
    showAddNormalAccessSequenceDialog() {
      this.addNormalAccessSequenceVisible = true
    },
    queryAccessSequence(){
      console.log(this.queryAccessSequenceFilter)
      console.log(this.selectTime)
    },
    startMonitor() {
      if (this.systemRunningStatus == 1) {
        this.$message.error('启动监控失败，当前监控已启动，无法重复启动！');
        return
      }
      Http.get(Apis.MANAGE.START_MONITOR).then(res => {
        this.systemRunningStatus = 1
      }).catch(error => {

      })
    },
    endMonitor() {
      if (this.systemRunningStatus == 0) {
        this.$message.error('停止监控失败，当前监控已停止，无法重复停止！');
        return
      }
      Http.get(Apis.MANAGE.STOP_MONITOR).then(res => {
        this.systemRunningStatus = 0
      }).catch(error => {

      })
    },
    updateMonitorConfig() {
      console.log(this.monitorConfigItem)
    },
    deleteMonitorConfig(config) {
      console.log(this.monitorConfigItem)
    },
    queryUserAccessByTimeRange(startTime, endTime) {
      return []
    }
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
