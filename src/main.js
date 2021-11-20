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
axios.defaults.baseURL = 'http://10.10.22.60/api';

// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
