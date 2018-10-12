import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter as Router, hashHistory, Route, Switch, Redirect } from 'react-router-dom';
import { message } from 'antd';
// import createHistory from 'history/createBrowserHistory';
import enUS from 'antd/lib/locale-provider/en_US';
import AjaxUtils from 'utils/AjaxUtils';
import AuthorizedRoute from './AuthorizedRoute';

// Layouts
import LoginComposer from './views/Login/LoginComposer';
import AppComposer from './views/App/AppComposer';
import './views/index.less';

// const history = createHistory();

AjaxUtils.init(function(){
    message.error("登录信息已过期，请重新登录");
    hashHistory.push('/login');
});

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/login" component={LoginComposer}/>
            <AuthorizedRoute path="/home" component={AppComposer} />
            <Redirect to="/login" />
        </Switch>
    </Router>,
    document.getElementById('root')
);
