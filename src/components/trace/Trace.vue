<template>
  <div style="width: 100%;">
    <el-row :gutter="10" style="padding-top: 15px;background: #333840">
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content">
          <el-row :gutter="10">
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-dropdown @command="selectNode">
                <span class="el-dropdown-link">
                  {{ nodeName }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in nodeList" :command="item" :key="index">{{
                        item
                      }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-dropdown @command="selectUser">
                <span class="el-dropdown-link">
                  {{ userIdName }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in userIdList" :command="item" :key="index">{{
                        item
                      }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content bg-purple">
                <el-dropdown @command="selectSession">
                <span class="el-dropdown-link">
                  {{ sessionIdName }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in sessionIdList" :command="item" :key="index">{{
                        item
                      }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>

        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex" class="row-bg" justify="space-between">
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content ">
          <el-row>
            <div class="panel panel-default">
              <div class="panel-heading" style="background: rgba(153, 153, 153, 0.8)">用户访问序列</div>
              <div class="panel-body">
                <el-table
                  v-if="methodInfoList!=null && methodInfoList.length !==0"
                  ref="multipleTable"
                  :data="methodInfoList"
                  tooltip-effect="dark"
                  show-header="false"
                  style="width: 100%">
                  <el-table-column
                    type="expand"
                    width="55" style="height: 80px;padding-top: 0;">
                    <template slot-scope="props">
                      <el-row :gutter="10" style="height: 50px">
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="2">用户Id：</el-col>
                        <el-col :span="3">
                          <span>{{props.row.userId}}</span>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10" style="height: 50px">
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="2">sessionId：</el-col>
                        <el-col :span="3">
                          <span>{{props.row.sessionId}}</span>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10" style="height: 50px">
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="2">执行耗时：</el-col>
                        <el-col :span="3">
                          <el-tag v-if="props.row.consumeTime != null" effect="dark" type="info" >
                            {{ props.row.consumeTime }}&nbsp;ms
                          </el-tag>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10" style="height: 50px">
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="2">执行时间：</el-col>
                        <el-col :span="10" style="color: #909399;font-size: 15px;">
                          {{ props.row.logTime }}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10" style="height: 50px">
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="2">接口名称：</el-col>
                        <el-col :span="10" style="color: #909399;font-size: 15px;">
                          {{ props.row.interfaceName }}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10" style="height: 50px">
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="2">http方法：</el-col>
                        <el-col :span="10" style="color: #909399;font-size: 15px;">
                          {{ props.row.httpMethod }}
                        </el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column label="用户访问序列" style="height: 60px">
                    <template slot-scope="props">
                      <el-row :gutter="10" style="margin-bottom: 5px">
                        <el-col :span="24" style="color: #409EFF">{{
                            props.row.interfaceName
                          }}
                        </el-col>
                      </el-row>
                    </template>

                  </el-table-column>
                </el-table>
                <el-row v-if="methodInfoList.length!=0" type="flex" class="row-bg" justify="space-between">
                  <el-pagination
                    background
                    :page-size="currentPageSize"
                    :current-page.sync="currentPageNum"
                    @current-change="currentPageChange"
                    layout="prev, pager, next"
                    :total="methodInfoTotalNum">
                  </el-pagination>
                </el-row>

              </div>
            </div>
          </el-row>

        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Http from '@/js/http.js'
import Apis from '@/js/api.js'

export default {
  name: "Trace",
  data() {
    return {
      vals: {value: 'nothing'},
      nodeList: ['mooctest'],
      nodeName: '节点名称',
      userIdName: '用户',
      sessionIdName: 'session',
      userIdList: [],
      currentUserId: 0,
      sessionIdList: [],
      currentSessionId: '',
      methodInfoList: [],
      currentPageNum: 1,
      currentPageSize: 15,
      methodInfoTotalNum: 0
    }
  },
  methods: {
    selectNode(item) {
      console.log(item)
      this.nodeName = item
      this.getAllUserIdList()
    },
    selectUser(item) {
      console.log(item)
      this.userIdName = item
      this.currentUserId = item
      this.getAllSessionIdListByUserId(item)
    },
    selectSession(item) {
      this.sessionIdName = item
      this.currentSessionId = item
      this.currentPageNum = 1
      this.getMethodInfoList()
    },
    getAllUserIdList() {
      Http.get(Apis.USER.GET_ALL_USER_ID).then(res => {
        console.log(res)
        this.userIdList = res
      })
    },
    getAllSessionIdListByUserId(userId) {
      Http.get(Apis.USER.GET_SESSION_LIST_ID_BY_USER_ID.replace('{user_id}', userId)).then(res => {
        console.log(res)
        this.sessionIdList = res
      })
    },
    currentPageChange(val){
      this.currentPageNum = val
      this.getMethodInfoList()
    },
    getMethodInfoList() {
      Http.get(Apis.METHOD.GET_FILEBEAT_LIST_BY_SESSION_ID_IN_PAGE
        .replace('{session_id}', this.currentSessionId)
        .replace('{page_size}', this.currentPageSize)
        .replace('{page_num}', this.currentPageNum)).then(res => {
          var data = [
            {interfaceName:'123123123123','consumeTime':'123123',userId:'123123123',httpMethod:'GET',sessionId:'123123123123',traceId:'123123123123',logTime:'123123'},
            {interfaceName:'123123123123','consumeTime':'123123',userId:'123123123',httpMethod:'GET',sessionId:'123123123123',traceId:'123123123123',logTime:'123123'},
            {interfaceName:'123123123123','consumeTime':'123123',userId:'123123123',httpMethod:'GET',sessionId:'123123123123',traceId:'123123123123',logTime:'123123'},
            {interfaceName:'123123123123','consumeTime':'123123',userId:'123123123',httpMethod:'GET',sessionId:'123123123123',traceId:'123123123123',logTime:'123123'},
            {interfaceName:'123123123123','consumeTime':'123123',userId:'123123123',httpMethod:'GET',sessionId:'123123123123',traceId:'123123123123',logTime:'123123'},

          ]
          //this.methodInfoList = res.list
          this.methodInfoList = data
          this.methodInfoTotalNum = res.total
          console.log(this.methodInfoList)
      })
    },
    test() {
      Http.get(Apis.USER.GET_ALL_USER_ID).then(res => {
        this.vals = res
      })
    }
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: white;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-row {
  /*margin-bottom: 20px;*/
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  /*background: #99a9bf;*/
}

.bg-purple {
  /*background: #99a9bf;*/
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
