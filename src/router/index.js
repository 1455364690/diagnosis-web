import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomePage from "@/components/home-page/HomePage";
import Trace from "@/components/trace/Trace";
import UserDiagnosis from "@/components/user-diagnosis/UserDiagnosis";
import MethodDiagnosis from "@/components/method-diagnosis/MethodDiagnosis";
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
    },
    {
      path: '/user_diagnosis',
      name: 'UserDiagnosis',
      component: UserDiagnosis
    },
    {
      path: '/method_diagnosis',
      name: 'MethodDiagnosis',
      component: MethodDiagnosis
    }
  ]
})
