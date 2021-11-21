import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomePage from "@/components/home-page/HomePage";
import Trace from "@/components/trace/Trace";
import Manager from "@/components/maneger/Manager";
import UserDiagnosis from "@/components/user-diagnosis/UserDiagnosis";
import MethodDiagnosis from "@/components/method-diagnosis/MethodDiagnosis";
import XuyujieIndex from "@/components/xuyujie/XuyujieIndex";
import XuyujieUpload from "@/components/xuyujie/XuyujieUpload";
import XuyujieAvg from "@/components/xuyujie/XuyujieAvg";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/xuyujie_upload',
      name: 'XuyujieUpload',
      component: XuyujieUpload
    },
    {
      path: '/xuyujie',
      name: 'XuyujieIndex',
      component: XuyujieIndex
    },
    {
      path: '/xuyujie_avg',
      name: 'XuyujieAvg',
      component: XuyujieAvg
    },
    {
      path: '/',
      name: 'Manager',
      component: Manager
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
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager
    }
  ]
})
