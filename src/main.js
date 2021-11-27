import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false;
//
//引入iView-ui
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView);

// //引入词云
// import  * as echarts from "echarts"
// Vue.prototype.$echarts = echarts;
//引入Element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入词云
import  * as echarts from "echarts"
Vue.prototype.$echarts = echarts;
//
Vue.use(ElementUI);
var axios = require('axios');
axios.defaults.baseURL = 'http://127.0.0.1:8081';

// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import VueResource from 'vue-resource'

/*使用VueResource插件*/
Vue.use(VueResource)


// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
      if (localStorage.getItem("token")) {
          console.log(localStorage.getItem("token"));
          config.headers.Authorization = localStorage.getItem("token");
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);
//
// 添加响应拦截器
axios.interceptors.response.use(
    response => {
      //当返回信息为未登录或者登录失效的时候重定向为登录页面

      if (response.data.status === 401) {
        router.push({
          path: "/",
          query: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
        })
      }
      return response;
    },
    error => {
      router.push({
        path: "/",
        query: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
      })
      return Promise.reject(error)
    }
);


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
