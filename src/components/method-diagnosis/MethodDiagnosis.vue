<template>
  <div style="width: 100%;">
    <el-row :gutter="10" style="padding-top: 15px;">
      <el-col :span="2">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-row class="tip" style="height: 100px;padding-top: 30px">
            <el-col :span="3" style="font-size: 15px;padding-top: 10px">选择诊断时间范围：</el-col>
            <el-col :span="10">
              <el-date-picker
                v-model="value2"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="起始时间"
                end-placeholder="终止时间"
                align="right">
              </el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="startDiagnose" plain>开始诊断</el-button>
            </el-col>
          </el-row>
          <div class="panel panel-default">
            <div class="panel-heading" style="background: rgba(153, 153, 153, 0.8)" >系统方法诊断结果</div>
            <div class="panel-body">
              <el-row style="height: 400px">
                <el-col span="1">&nbsp;</el-col>
                <el-col :span="11" style="height: 100%">
                  <div id="rate" style="width: 100%;height:100%"></div>
                </el-col>
                <el-col :span="1" style="height:100%;width: 1px;border: 1px solid gray"></el-col>
                <el-col :span="11" style="height:100%">
                  <div id="error" style="width: 100%;height:100%"></div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="20">
                  <el-collapse v-model="activeNames"
                               v-for="(item,index) in systemMethodDiagnoseResult" :key="index">
                    <el-collapse-item :name="index">
                      <template slot="title">
                        {{ item.clusterLabel }}
                      </template>
                      <div v-for="(seq,seqIndex) in item.result" :key="seqIndex">
                        <div>{{ seq }}</div>
                      </div>

                    </el-collapse-item>
                  </el-collapse>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
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
export default {
  name: "MethodDiagnosis",
  data() {
    return {
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
      value2: '',
      activeNames: ['1'],
      systemMethodDiagnoseResult: [
        {clusterLabel:'label',result:['123123','1231231','123123123'],attributeDetail:{cpu:0.8,memory:0.4}},
        {clusterLabel:'label',result:['123123','1231231','123123123'],attributeDetail:{cpu:0.8,memory:0.4}},
        {clusterLabel:'label',result:['123123','1231231','123123123'],attributeDetail:{cpu:0.8,memory:0.4}}
      ]
    }
  },
  methods: {
    startDiagnose() {
      console.log(this.value2)
      this.myEcharts()
    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('rate'));
      var myChart2 = this.$echarts.init(document.getElementById('error'));
      // 指定图表的配置项和数据
      var option2 = {
        //color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        aria: {
          // 下面几行可以不写，因为 label.enabled 默认 true
          label: {
            enabled: true
          },
          enabled: true
        },

        toolbox: {
          show: false,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          trigger: 'item'
        },
        series: [
          {
            name: '系统方法',
            type: 'pie',
            radius: [30, 200],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },

            data: [
              {value: 0.5, name: 'login()'},
              {value: 0.6, name: 'query()'},
              {value: 0.7, name: 'in()'},
              {value: 0.8, name: 'get()'},
              {value: 0.9, name: 'set()'},
              {value: 1, name: 'offer()'},
            ],
          }
        ]
      };

      var option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 'bottom',
          left: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 1048, name: '搜索引擎'},
              {value: 735, name: '直接访问'},
              {value: 580, name: '邮件营销'},
              {value: 484, name: '联盟广告'},
              {value: 300, name: '视频广告'}
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChart2.setOption(option2)
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
