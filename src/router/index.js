import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home";
import Bar from '@/components/Bar'
import wenshuList from "@/components/wenshuList";
import Search from "@/components/Search";
import Control from "@/components/Control";
import SpideInfo from "@/components/SpideInfo";
import Login from "../components/Login";


Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
};
export default new Router({
    routes:[
        {
            // 重定向
            path: '/',
            redirect: '/Login'
        },
        {
           path:'/Login',
            name:'Login',
            component:Login

        },{
            path: '/Home',
            name: 'Home',
            component:Home
        },
        {
            path: '/Bar',
            name: 'Bar',
            component:Bar
        },
        {
            path: '/List',
            name: 'List',
            component:wenshuList
        },
        {
            path: '/Search',
            name:'/Search',
            component:Search
        },
        {
            path:'/Control',
            name:'/Control',
            component:Control
        },
        {
            path:'/SpideInfo',
            name:'/SpideInfo',
            component:SpideInfo
        },

    ]
})
