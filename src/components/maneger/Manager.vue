<template>
  <div style="width: 100%;">
    <el-row>
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>

      <el-col :span="20">
        <div class="grid-content" style="margin-top: 20px">
          <div class="panel panel-info">
            <div class="panel-heading">监控开关管理</div>
            <div class="panel-body">
              <el-row>
                <div style="height: 100%;width: 100%" class="grid-content">
                  <el-row>
                    <el-col :span="7">
                      <div class="grid-content bg-purple"></div>
                    </el-col>
                    <el-col :span="10">
                      <div class="tip">
                        <el-row>
                          <el-col :span="14">
                            <div class="grid-content bg-purple">
                              当前监控状态：
                              <el-tag type="success">运行中</el-tag>
                              <el-tag type="danger">停止</el-tag>
                            </div>
                          </el-col>
                          <el-col :span="10">
                            <div class="grid-content bg-purple">
                              <button type="button" class="btn btn-success">启动监控</button>
                              <button type="button" class="btn btn-warning">停止监控</button>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="7">
                      <div class="grid-content bg-purple"></div>
                    </el-col>
                  </el-row>
                </div>
              </el-row>

            </div>
          </div>
          <div class="panel panel-info">
            <div class="panel-heading">监控配置管理</div>
            <div class="panel-body">
              <el-row>
                <el-col :span="2">
                  <div class="grid-content"></div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <button type="button" @click="showDialog()" class="btn btn-primary">修改配置项</button>
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
                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>配置项名称</th>
                        <th>配置项属性</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div class="grid-content"></div>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="panel panel-info">
            <div class="panel-heading">正常用户访问序列设置</div>
            <div class="panel-body">
              <el-row>
                <el-col :span="2">
                  <div class="grid-content bg-purple">
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content bg-purple">
                    <el-row>
                      <button type="button" class="btn btn-primary">添加用户访问序列</button>
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
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <el-button size="mini" type="danger" plain>删除</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Manager",
  data() {
    return {
      dialogTableVisible: false,
      activeNames: ['1'],
      userAccessSequenceList: [{
        sessionId: '1233333',
        sequence: ['123', '123123', '123123', '123123']
      }, {sessionId: '1233333', sequence: ['123', '123123', '123123', '123123']}],
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    };
  },
  methods:{
    showDialog(){
      this.dialogTableVisible = true
      console.log("ads")
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

/*.tip {*/
/*  padding: 8px 16px;*/
/*  background-color: #ecf8ff;*/
/*  border-radius: 4px;*/
/*  border-left: 5px solid #50bfff;*/
/*  margin: 20px 0;*/
/*}*/
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
