import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import MagicGrid from 'vue-magic-grid'
import VueGlide from 'vue-glide-js'
import VideoPlayer from 'vue-video-player'
import Lightbox from 'vue-easy-lightbox'

Vue.use(Lightbox)
Vue.use(VideoPlayer)
Vue.use(VueGlide)
Vue.use(MagicGrid)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios;
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {

    const role = sessionStorage.getItem('userName');
    const authority = sessionStorage.getItem("authority")
    console.log('authority:' + authority)
    // if (!role && to.path !== '/') {
    //     next('/');
    // } else

    // if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0"){
    //     xxxxxxx
    // }else{
    //     this.props.history.push(window.AppConf.routeRootPath)
    // }

    if (to.path == '/project_form') {
        // 如果是老师权限则可进入
        if(authority == 2){
            to.meta.permission = true
            next()
        }else{
            next('/')
        }
        // authority === 1 ? next() : next('/403');
    } else if ((to.path =='/projectReview' || to.path == '/admin' || to.path == '/teacherEdit' || to.path == '/teacherAdminShow')){
        if(authority == 1){
            to.meta.permission = true
            next()
        }else {
            next('/')
        }
    } else {

        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
