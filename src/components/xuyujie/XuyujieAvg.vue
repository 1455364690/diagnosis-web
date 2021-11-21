<template>

  <div v-loading="loading" :element-loading-text="this.loadingText"
       element-loading-spinner="el-icon-loading">
    <el-row>
      <el-col :span="18">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content" style="margin-top: 20px">
            <el-button v-if="avgDataList && avgDataList !== 0" class="btn-home-apply" type="primary" @click="outputAvgData">导出数据</el-button>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="3">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">上传文件</h3>
            </div>
            <div class="panel-body">
              <input id="f_upload" type="file" class="file"/>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="sss"
                name="file"
                :on-preview="handlePreview"
                :on-remove="handleRemove"

                :file-list="fileList"
                :multiple="true"
                :http-request="getFile"
                :auto-upload="true">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
                </el-button>
                <div slot="tip" class="el-upload__tip">只能上传txt文件</div>
              </el-upload>
            </div>
          </div>

        </div>
        <div class="grid-content">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">平均值计算</h3>
            </div>
            <div class="panel-body">
              <el-table
                v-if="avgDataList && avgDataList.length !==0"
                ref="multipleTable"
                :data="avgDataList"
                tooltip-effect="dark"
                :stripe="true"
                style="width: 100%">
                <el-table-column
                  label="type"
                  width="100">
                  <template slot-scope="scope">{{ scope.row.type }}</template>
                </el-table-column>
                <el-table-column v-for="(item) in labelList" :command="item" :key="item"
                                 :label="string(item)"
                                 width="80">
                  <template slot-scope="scope">{{ scope.row.dataList[item] }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>

        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Apis from '@/js/api.js'
import Http from '@/js/http.js'

export default {
  name: "XuyujieAvg",
  data() {
    return {
      loading: false,
      loadingText: "",
      loadingAnalysing: "正在解析文件中...",
      loadingInserting: "正在保存数据中...",
      fileList: [],
      avgDataList: [],
      avgDataListStep2: [],
      uploadFileList: [],
      file: {},
      upload_url: Apis.UPLOAD_TXT_FILE_AVG,
      analysedData: [],
      uploadUserName: "test",
      labelList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
    }
  },
  mounted() {
    this.getAvg()
  },
  methods: {
    fail(message) {
      this.$message.error(message);
    },
    success(message) {
      this.$message({
        message: message,
        type: 'success'
      });
    },
    showLoading(text) {
      this.loadingText = text
      this.loading = true;
    },
    hideLoading() {
      this.loading = false;
    },
    getFile(item) {
      this.uploadFileList.push(item.file)
      console.log(item.file)
      this.file = item.file
    },
    submitUpload() {
      console.log(this.uploadFileList)
      var that = this

      this.uploadFileList.forEach(function (item, index, arr) {
        that.showLoading(that.loadingAnalysing)
        const fd = new FormData()
        fd.append('filename', item)
        let config = {
          //添加请求头
          headers: {'Content-Type': 'multipart/form-data'},
        }
        Http.upload(Apis.XUYUJIE.UPLOAD_TXT_FILE_AVG, fd, config).then(res => {
          console.log(res)
          that.hideLoading()
          that.getAvg()
        }).catch(error => {
          that.hideLoading()
          console.log(error)
        })
      });

    },
    getAvg() {
      this.showLoading("正在获取数据");
      Http.get(Apis.XUYUJIE.CAL_AVG).then(res => {
        console.log(res)
        this.hideLoading()
        this.avgDataList = res.data
      }).catch(error => {
        this.hideLoading()
      })
    },
    getAvgStep2() {
      Http.get(Apis.XUYUJIE.CAL_AVG_STEP2).then(res => {
        console.log(res)
        this.avgDataListStep2 = res.data
      }).catch(error => {

      })
    },
    handleRemove(file, fileList) {
      console.log(file)
      this.uploadFileList.forEach(function (item, index, arr) {
        if (item.uid == file.uid) {
          arr.splice(index, 1);
        }
      });
      //console.log(file, fileList);
    },
    handlePreview(file) {
      this.uploadFileList.append(file)
      this.file = file;
    },
    string(item){
      return "data_"+item
    },
    outputAvgData(){
      this.hideLoading("正在导出数据")
      var that = this
      Http.post(Apis.XUYUJIE.DOWNLOAD_CAL_AVG,this.avgDataList).then(res=>{
        console.log(res)
        that.hideLoading()
        window.open(res.data, '_blank')
      }).catch(error=>{
        that.hideLoading()
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css");

.upload-demo /deep/ input {
  display: none;
}

.upload-demo {
}

.upload-demo input {
  display: none !important;
}

.el-upload__input input {
  display: none !important;
}

input[type=file] {
  display: none;
}

button, input, select, textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

element.style {
  display: none;
}

</style>
