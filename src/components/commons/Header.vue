<template>
  <nav class="header-nav">
    <div class="container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#252a2f"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="0" disabled>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-menu-item>
        <el-menu-item index="1">
          <router-link :to="{ name: 'Trace'}">
            <el-link :underline="false">用户行为追踪</el-link>
          </router-link>
        </el-menu-item>
        <el-menu-item index="2" disabled>用户异常行为诊断</el-menu-item>
        <el-menu-item index="3" disabled>方法异常诊断</el-menu-item>
      </el-menu>
    </div>
  </nav>
</template>

<script>
export default {
  name: "header-container",
  data() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
