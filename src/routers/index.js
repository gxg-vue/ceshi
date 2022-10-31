/**
 * @description: 路由
 * @author: nowThen
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [{
        path: '/',
        redirect: '/home'
    },

    {
        path: '/home',
        name: 'home',
        component: () =>
            import ( /* webpackChunkName: "home" */ '@/views/home'),
        meta: {
            title: 'home...',
        }
    },

    

    {
        path: '*',
        redirect: 'error',
    },
];

const router = new Router({
    // mode: 'history',
    mode: 'hash',
    routes
})

//捕捉错误  

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
})

export default router;