import Vue from 'vue';
import iView from 'iview';
import { Message } from 'iview';
import { createHashHistory } from 'history';
import router from './router/index';
import store from './store'
import App from './app.vue';
import AjaxUtils from './common/js/AjaxUtils';
import './common/style/base.less';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

const history = createHashHistory();

AjaxUtils.init(function(){
    Message.error("登录信息已失效，请重新登录！");
    history.push('/login');
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});