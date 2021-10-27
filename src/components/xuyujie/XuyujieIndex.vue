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
                :data="tableData"
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
                :total="this.durationPageTotal">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="meanf0">
              <span slot="label"><i class="el-icon-date"></i> meanf0</span>
              meanf0
            </el-tab-pane>
            <el-tab-pane label="f0acceleration">
              <span slot="label"><i class="el-icon-date"></i> f0acceleration</span>
              f0acceleration
            </el-tab-pane>
            <el-tab-pane label="excursionsize">
              <span slot="label"><i class="el-icon-date"></i> excursionsize</span>
              excursionsize
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
export default {
  name: "XuyujieIndex",
  data() {
    return {
      durationPageTotal: 1,
      durationPageCurrNum: 1,
      meanF0PageTotal: 1,
      meanF0PageCurrNum: 1,
      f0AccelerationPageTotal: 1,
      f0AccelerationPageCurrNum: 1,
      excursionSizePageTotal: 1,
      excursionSizePageCurrNum: 1,
      tableData: [{
        userName: '2016-05-03',
        type: '2016-05-03',
        dataOne: '2016-05-03',
        dataTwo: '王小虎',
        dataThree: '上海市普陀区金沙江路 1518 弄',
        dataFour: '上海市普陀区金沙江路 1518 弄',
        dataFive: '上海市普陀区金沙江路 1518 弄',
        dataSix: '上海市普陀区金沙江路 1518 弄',
      }, {
        userName: '2016-05-03',
        type: '2016-05-03',
        dataOne: '2016-05-03',
        dataTwo: '王小虎',
        dataThree: '上海市普陀区金沙江路 1518 弄',
        dataFour: '上海市普陀区金沙江路 1518 弄',
        dataFive: '上海市普陀区金沙江路 1518 弄',
        dataSix: '上海市普陀区金沙江路 1518 弄',
      }],
      multipleSelection: []
    }
  }
  ,

  methods: {
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
