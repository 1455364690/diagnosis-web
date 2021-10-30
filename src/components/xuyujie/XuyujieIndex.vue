<template>

  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          <el-tabs type="border-card">
            <el-tab-pane label="duration">
              <span slot="label"><i class="el-icon-date"></i> duration</span>
              <el-table
                ref="multipleTable"
                :data="durationTableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="姓名"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.userName }}</template>
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataOne"
                  label="data1"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataTwo"
                  label="data2"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataThree"
                  label="data3"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataFour"
                  label="data4"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataFive"
                  label="data5"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataSix"
                  label="data6"
                  width="120">
                </el-table-column>
              </el-table>
              <br>
              <el-pagination
                background
                layout="prev, pager, next"
                :current-page="this.durationPageCurrNum"
                @current-change="changeDurationCurrPage"
                :page-size="this.pageSize"
                :total="this.durationPageTotal">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="meanf0">
              <span slot="label"><i class="el-icon-date"></i> meanf0</span>
              <el-table
                ref="multipleTable"
                :data="meanF0TableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="姓名"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.userName }}</template>
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataOne"
                  label="data1"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataTwo"
                  label="data2"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataThree"
                  label="data3"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataFour"
                  label="data4"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataFive"
                  label="data5"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataSix"
                  label="data6"
                  width="120">
                </el-table-column>
              </el-table>
              <br>
              <el-pagination
                background
                layout="prev, pager, next"
                :current-page="this.meanF0PageCurrNum"
                @current-change="changeMeanF0CurrPage"
                :page-size="this.pageSize"
                :total="this.meanF0PageTotal">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="f0acceleration">
              <span slot="label"><i class="el-icon-date"></i> f0acceleration</span>
              <el-table
                ref="multipleTable"
                :data="f0AccelerationTableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="姓名"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.userName }}</template>
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataOne"
                  label="data1"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataTwo"
                  label="data2"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataThree"
                  label="data3"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataFour"
                  label="data4"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataFive"
                  label="data5"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataSix"
                  label="data6"
                  width="120">
                </el-table-column>
              </el-table>
              <br>
              <el-pagination
                background
                layout="prev, pager, next"
                :current-page="this.f0AccelerationPageCurrNum"
                @current-change="changeF0AccelerationCurrPage"
                :page-size="this.pageSize"
                :total="this.f0AccelerationPageTotal">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="excursionsize">
              <span slot="label"><i class="el-icon-date"></i> excursionsize</span>
              <el-table
                ref="multipleTable"
                :data="excursionSizeTableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="姓名"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.userName }}</template>
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataOne"
                  label="data1"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataTwo"
                  label="data2"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataThree"
                  label="data3"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataFour"
                  label="data4"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataFive"
                  label="data5"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dataSix"
                  label="data6"
                  width="120">
                </el-table-column>
              </el-table>
              <br>
              <el-pagination
                background
                layout="prev, pager, next"
                :current-page="this.excursionSizePageCurrNum"
                @current-change="changeExcursionSizeCurrPage"
                :page-size="this.pageSize"
                :total="this.excursionSizePageTotal">
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Apis from '@/js/api.js'
import Http from '@/js/http.js'
export default {
  name: "XuyujieIndex",
  data() {
    return {
      pageSize:20,
      durationPageTotal: 1,
      durationPageCurrNum: 1,
      meanF0PageTotal: 1,
      meanF0PageCurrNum: 1,
      f0AccelerationPageTotal: 1,
      f0AccelerationPageCurrNum: 1,
      excursionSizePageTotal: 1,
      excursionSizePageCurrNum: 1,
      meanF0TableData:[],
      f0AccelerationTableData:[],
      excursionSizeTableData:[],
      durationTableData: [],
      multipleSelection: [],
      userName:"test"
    }
  }
  ,
  mounted() {
    //获取duration数据
    this.queryDurationDataByCondition()
    this.queryMeanF0DataByCondition()
    this.queryExcursionSizeDataByCondition()
    //this.queryF0AccelerationDataByCondition()
  },
  methods: {
    queryDurationDataByCondition(){
      let requestBody={
        pageSize:this.pageSize,
        pageNum:this.durationPageCurrNum - 1,
        dataFileType:"duration",
        userName:this.userName
      }
      Http.post(Apis.XUYUJIE.QUERY_DATA_BY_CONDITION,requestBody).then(res=>{
        console.log(res)
        this.durationTableData = res.data
        this.durationPageTotal = res.total
      }).catch(error=>{
        console.log(error)
      })
    },
    queryMeanF0DataByCondition(){
      let requestBody={
        pageSize:this.pageSize,
        pageNum:this.durationPageCurrNum - 1,
        dataFileType:"meanf0",
        userName:this.userName
      }
      Http.post(Apis.XUYUJIE.QUERY_DATA_BY_CONDITION,requestBody).then(res=>{
        console.log(res)
        this.meanF0TableData = res.data
        this.meanF0PageTotal = res.total
      }).catch(error=>{
        console.log(error)
      })
    },
    queryF0AccelerationDataByCondition(){
      let requestBody={
        pageSize:this.pageSize,
        pageNum:this.durationPageCurrNum - 1,
        dataFileType:"f0acceleration",
        userName:this.userName
      }
      Http.post(Apis.XUYUJIE.QUERY_DATA_BY_CONDITION,requestBody).then(res=>{
        console.log(res)
        this.f0AccelerationTableData = res.data
        this.f0AccelerationPageTotal = res.total
      }).catch(error=>{
        console.log(error)
      })
    },
    queryExcursionSizeDataByCondition(){
      let requestBody={
        pageSize:this.pageSize,
        pageNum:this.durationPageCurrNum - 1,
        dataFileType:"excursionsize",
        userName:this.userName
      }
      Http.post(Apis.XUYUJIE.QUERY_DATA_BY_CONDITION,requestBody).then(res=>{
        console.log(res)
        this.excursionSizeTableData = res.data
        this.excursionSizePageTotal = res.total
      }).catch(error=>{
        console.log(error)
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
    ,
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeDurationCurrPage(item){
      this.durationPageCurrNum = item
      this.queryDurationDataByCondition()
    },
    changeMeanF0CurrPage(item){
      this.meanF0PageCurrNum = item
      this.queryMeanF0DataByCondition()
    },
    changeF0AccelerationCurrPage(item){
      this.f0AccelerationPageCurrNum = item
      this.queryF0AccelerationDataByCondition()
    },
    changeExcursionSizeCurrPage(item){
      this.excursionSizePageCurrNum = item
      this.queryExcursionSizeDataByCondition()
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
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
