/* 生成接口，并将接口挂载到vue的原型上
 * @Author: nowThen
 * @Date: 2019-08-14 16:41:37
 */

import Vue from 'vue';
import store from '../stores/index'
// import axios from "axios"; // 引入qs模块，用来序列化post类型的数据

let baseUrl = store.state.baseUrl;
export function get(url, params = {}) {
    let paramsStr = "";
    for (let key in params) {
        paramsStr = paramsStr + '&' + key + '=' + params[key]
    }
    console.log('参数', paramsStr)
    return new Promise((resolve, reject) => {
        fetch(baseUrl + url + '.do' + '?v=' + Date.parse(new Date()) + paramsStr, {
            // credentials: "same-origin", // 同源才发送cookie
            credentials: 'include', // 直接发送cookie
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                // 'Content-Type': 'application/json;charset=UTF-8',
            },
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if (data.status == '101') {
                // window.location.href = `${baseUrl}/qc/wxAuth/outh1.do?pinCode=pinCode`;
            }
            resolve(data)
        }).catch(err => {
            console.log("请求失败", err)
            reject(err)
        })
    });
}

export function post(url, params = {}) {
    // params.openId = localStorage.openId;
    console.log(url, "参数:", params)

    return new Promise((resolve, reject) => {
        fetch(baseUrl + url + '.do' + '?v=' + Date.parse(new Date()), {
            // credentials: "same-origin", // 同源才发送cookie
            credentials: 'include', // 直接发送cookie
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(params), // must match 'Content-Type' header
            headers: {
                // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
                // 'Content-Type': ' application/x-www-form-urlencoded; charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        }).then((response) => {
            // alert(`${baseUrl}${url}`)
            let result = response.json();
            result.then(res => {
                if (res.status == '101') {
                    // window.location.href = `${baseUrl}/qc/wxAuth/outh1.do?pinCode=pinCode`;
                }
                resolve(res);

            })
        }).catch(err => {
            console.log("请求失败".err)
            reject(err)
        })
    });
}
// 将services挂载到vue的原型上
// 业务中引用的方法：this.$services.接口名（小驼峰）
// Object.defineProperty(Vue.prototype, '$get',get);
// Object.defineProperty(Vue.prototype, '$post',post);
Vue.prototype.$get = get
Vue.prototype.$post = post