/**
 * @description: 项目入口文件
 * @author: nowThen
 */

import Vue from 'vue';
import App from './App.vue';
import router from './routers/';
import './http/index.js';
import store from './stores';
import './routers/intercept';


import 'lib-flexible';

import './styles/main.less';
import VueTouch from 'vue-touch'

import FastClick from 'fastclick';

import moment from 'moment';
FastClick.attach(document.body);


Vue.prototype.$moment = moment;
import Toast from '@/component_basics/Toast/index.js'
Vue.use(Toast)
Vue.use(VueTouch, {
    name: 'v-touch'
})


Vue.config.errorHandler = (err, vm, info) => {
    console.error(err);
};
Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.config.productionTip = process.env.NODE_ENV === 'production';


Vue.config.ignoredElements = ['wx-open-launch-weapp']; //注册跳转微信小程序组件


window.myVue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')






//解决input在vue移动端项目在IOS上点击输入框失效， 需要点击多次
FastClick.prototype.focus = function(targetElement) {
    let length;
    if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
        length = targetElement.value.length;
        targetElement.focus();
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
};

Vue.prototype.preventDefault = function(event) {
    event.preventDefault();
}

function preventDefault(e) {
    e.preventDefault()
}
//弹出框禁止滑动
// Vue.prototype.$noScroll = function() {
//     document.body.style.overflow = 'hidden'
//     document.addEventListener('touchmove', preventDefault, false) // 禁止页面滑动
// }

//弹出框可以滑动
// Vue.prototype.$canScroll = function() {
//     document.body.style.overflow = '' // 出现滚动条
//     document.removeEventListener('touchmove', preventDefault, false)
// }


// import VConsole from 'vconsole'
// const vConsole = new VConsole();