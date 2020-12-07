<template>
  <div class="create-container">
    home
    <el-button type="primary" @click="test()">主要按钮</el-button>
    <!--    <div class="container">homepages</div>-->
    {{ vals }}
  </div>
</template>

<script>
import Http from '@/js/http.js'
import Apis from '@/js/api.js'

export default {
  name: "HomePage",
  data() {
    return {
      vals: {value: 'nothing'}
    }
  },
  methods: {
    test() {
      Http.get(Apis.USER.GET_ALL_USER_ID).then(res => {
        this.vals = res
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  margin: 0 30px 0 0;
}
</style>
