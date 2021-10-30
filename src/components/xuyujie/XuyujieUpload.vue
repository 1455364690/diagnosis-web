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
          <el-row>
            <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :http-request="getFile"
              :auto-upload="true">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传txt文件</div>
            </el-upload>
          </el-row>

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
  name: "XuyujieUpload",
  data() {
    return {
      fileList: [],
      file: {},
      upload_url: Apis.XUYUJIE.UPLOAD_TXT_FILE,
      analysedData: []
    }
  },
  methods: {
    getFile(item) {
      console.log(item.file)
      this.file = item.file
    },
    submitUpload() {
      const fd = new FormData()
      fd.append('filename', this.file)
      let config = {
        //添加请求头
        headers: {'Content-Type': 'multipart/form-data'},
      }
      console.log(this.file)
      Http.upload(Apis.XUYUJIE.UPLOAD_TXT_FILE, fd, config).then(res => {
        console.log(res)
        this.getAnalyseResult(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getAnalyseResult(fileName) {
      Http.get(Apis.XUYUJIE.GET_ANALYSE_TABLE_FORM_TXT_FILE.replace("{fileName}", fileName)).then(res => {
        console.log(res)
        this.analysedData = res.data
        this.ensureSaveFile()
      }).catch(error => {
        console.log(error)
      })
    },
    ensureSaveFile() {
      Http.post(Apis.XUYUJIE.SAVE_ANALYSE_TABLE_FORM_TXT_FILE, this.analysedData).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    handleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    handlePreview(file) {
      this.file = file;
    }
  }
}
</script>

<style scoped>

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>
