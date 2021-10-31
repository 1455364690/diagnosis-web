<template>

  <div v-loading="loading" element-loading-text="文件解析中..."
       element-loading-spinner="el-icon-loading">
    <el-row>
      <el-col :span="18">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content" style="margin-top: 20px">
          <router-link
            :to="{ name: 'XuyujieIndex'}">
            <el-button class="btn-home-apply" type="primary">去查看数据</el-button>
          </router-link>
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
              <input id="f_upload" type="file" class="file" />
              <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                name="file"
                :on-preview="handlePreview"
                :on-remove="handleRemove"

                :file-list="fileList"
                :multiple="true"
                :http-request="getFile"
                :auto-upload="true">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传txt文件</div>
              </el-upload>
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
  name: "XuyujieUpload",
  data() {
    return {
      loading:false,
      fileList: [],
      uploadFileList:[],
      file: {},
      upload_url: Apis.XUYUJIE.UPLOAD_TXT_FILE,
      analysedData: []
    }
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
    showLoading(){
      this.loading = true;
    },
    hideLoading(){
      this.loading = false;
    },
    getFile(item) {
      this.uploadFileList.push(item.file)
      console.log(item.file)
      this.file = item.file
    },
    submitUpload() {
      var that = this

      this.uploadFileList.forEach(function (item,index,arr){
        that.showLoading()
        const fd = new FormData()
        fd.append('filename', item)
        let config = {
          //添加请求头
          headers: {'Content-Type': 'multipart/form-data'},
        }
        Http.upload(Apis.XUYUJIE.UPLOAD_TXT_FILE, fd, config).then(res => {
          console.log(res)
          that.getAnalyseResult(res.data)
        }).catch(error => {
          that.hideLoading()
          console.log(error)
        })
      });

    },
    getAnalyseResult(fileName) {
      Http.get(Apis.XUYUJIE.GET_ANALYSE_TABLE_FORM_TXT_FILE.replace("{fileName}", fileName)).then(res => {
        console.log(res)
        this.analysedData = res.data
        this.ensureSaveFile()
      }).catch(error => {
        console.log(error)
        this.hideLoading()
      })
    },
    ensureSaveFile() {
      Http.post(Apis.XUYUJIE.SAVE_ANALYSE_TABLE_FORM_TXT_FILE, this.analysedData).then(res => {
        console.log(res)
        this.success("文件上传成功")
        this.hideLoading()
      }).catch(error => {
        console.log(error)
        this.hideLoading()
      })
    },
    handleRemove(file, fileList) {
      console.log(file)
        this.uploadFileList.forEach(function (item,index,arr){
          if (item.uid == file.uid) {
            arr.splice(index,1);
          }
        });
      //console.log(file, fileList);
    },
    handlePreview(file) {
      this.uploadFileList.append(file)
      this.file = file;
    }
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css");
.upload-demo {
  width: 360px;
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
