<template>
  <div class="container">
    <el-row :gutter="10" style="padding-top: 15px;background: #333840">
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content">
          <el-row :gutter="10">
            <el-col :span="3">
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
            <el-col :span="3">
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
            <el-col :span="8">
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
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <el-row :gutter="10" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 4px" v-for="(item,index) in methodInfoList" :command="item" :key="index"  type="flex" class="row-bg" justify="space-between">
            <el-col :span="24">
              <el-row :gutter="10" style="margin-bottom: 5px">
                <el-col :span="24" style="color: #409EFF">{{item.class_method}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="3"><el-tag effect="dark" type="info" style="margin-top: 7px">{{item.consume_time}}&nbsp;ms</el-tag></el-col>
                <el-col :span="21" style="color: #909399;font-size: 15px;padding-top: 10px">{{item.log_time}}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple-light">
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
      methodInfoList: []
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
      this.getMethodInfoList(item)
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
    getMethodInfoList(sessionId) {
      Http.get(Apis.METHOD.GET_FILEBEAT_LIST_BY_SESSION_ID.replace('{session_id}', sessionId)).then(res => {
        this.methodInfoList = res
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
