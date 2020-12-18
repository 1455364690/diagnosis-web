<template>
  <div class="body-content">
    <header-container/>
    <div class="container-wrapper">
      <slot>
        <div class="main-container">
          <router-view/>
        </div>
      </slot>
    </div>
    <foot-container/>
  </div>
</template>

<script>
import HeaderContainer from '@/components/commons/Header'
import FootContainer from "./components/commons/Foot";
export default {
  name: 'App',
  components: {FootContainer, HeaderContainer},
}
</script>

<style lang="less">
html{
  font: 12px Microsoft YaHei,Georgia,Verdana,Arial,Sans-serif;
  -webkit-font-smoothing: antialiased;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 62.5%;
}
body{
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 24px;
  color: #212529;
  text-align: left;
  background-color: #fafafa;
  font-family: "Helvetica Neue";;
}

html,body{
  height:100%;
  margin:0;
  padding:0;
}
.body-content{
  width:100%;
  min-width: 1300px;
  height: 100%;
}
.container-wrapper {
  min-height:  calc(~"100% - 100px");
}
.main-container {
  width: 100%;
  min-height:  calc(~"100% - 100px");
  margin: 0 auto;
  padding-bottom: 30px;
}
</style>
