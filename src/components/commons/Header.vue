<template>
  <nav class="header-nav">
    <div style="width: 100%;">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#252a2f"
        text-color="#fff"
        active-text-color="#409EFF">
        <el-menu-item index="0" disabled>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-menu-item>
        <el-menu-item index="1">
          <router-link :to="{ name: 'Manager'}">
            <el-link :underline="false">系统管理</el-link>
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link :to="{ name: 'Trace'}">
            <el-link :underline="false">用户行为追踪</el-link>
          </router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link :to="{ name: 'UserDiagnosis'}">
            <el-link :underline="false">用户访问序列异常诊断</el-link>
          </router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link :to="{ name: 'MethodDiagnosis'}">
            <el-link :underline="false">系统方法异常诊断</el-link>
          </router-link>

        </el-menu-item>
      </el-menu>
    </div>
  </nav>
</template>

<script>
export default {
  name: "header-container",
  data() {
    return {
      activeIndex: ''
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.header-nav {
  width: 100%;
  padding: 0;
  text-align: center;
  /*display: flex;*/
  font-size: 16px;
  color: rgba(153, 153, 153, 1);
  /*height:58px;*/
  background: rgba(243, 244, 247, 1);
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
