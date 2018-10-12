import Vue from 'vue';
import Router from 'vue-router';
import localstorage from '../store/localstorage';
import { Message } from 'iview';

Vue.use(Router);

const Login = resolve => require(['../views/login/login'], resolve);
const App = resolve => require(['../views/App/App'], resolve);
const Part1 = resolve => require(['../views/part1/part1'], resolve);
const Part2 = resolve => require(['../views/part2/part2'], resolve);
const Part3 = resolve => require(['../views/part3/part3'], resolve);



const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: App,
            children: [
                {
                    path: 'part1',
                    component: Part1
                },
                {
                    path: 'part2',
                    component: Part2
                },
                {
                    path: 'part3',
                    component: Part3
                },
                {
                    path: '*',
                    redirect: 'home/part1'
                }
            ],
            beforeEnter: (to, from, next) => {
                const token = localstorage.getToken();
                if(token) {
                    next();
                } else {
                    Message.error("登录信息已失效，请重新登录！");
                    next('/login');
                }
            }
        }
    ]
});

export default router;