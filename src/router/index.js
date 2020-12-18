import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomePage from "@/components/home-page/HomePage";
import Trace from "@/components/trace/Trace";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/trace',
      name: 'Trace',
      component: Trace
    }
  ]
})
