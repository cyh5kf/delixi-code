import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppHeaderView from './AppHeaderView';
import AppSidebarView from './AppSidebarView';
import AppBreadcrumbView from './AppBreadcrumbView';
import './AppView.less';

import activityListComposer from '../ActivityManager/ActivityListComposer';
import redListComposer from '../RegularPool/RedList/RedListComposer';
import teskListComposer from '../RegularPool/TeskList/TeskListComposer';
import upRateListComposer from '../RegularPool/UpRateList/UpRateListComposer';
import ModuleConfigComposer from '../ActivityManager/ActivityModuleConfig/ModuleConfigComposer';
import PackRulesComposer from '../ActivityManager/PackRules/PackRulesComposer';
import RankRulesComposer from '../ActivityManager/RankRules/RankRulesComposer';

export default class AppView extends React.Component {

    render() {
        var actions = this.props.actions;
        var store = this.props.store;
        return (
            <div className="AppView">
                <AppSidebarView actions={actions} store={store} />
                <div className="ant-layout-body">
                    <AppHeaderView actions={actions} store={store}/>
                    <div className="ant-layout-main">
                        <AppBreadcrumbView actions={actions} store={store} />
                        <div className="ant-layout-content">
                            <Switch>
                                <Route path="/home/activityList" component={activityListComposer} />
                                <Route path="/home/redList" component={redListComposer} />
                                <Route path="/home/upRateList" component={teskListComposer} />
                                <Route path="/home/teskList" component={upRateListComposer} />
                                <Route path="/home/moduleConfig/:id" component={ModuleConfigComposer} />
                                <Route path="/home/packRules/:id" component={PackRulesComposer} />
                                <Route path="/home/rankRules/:id" component={RankRulesComposer} />
                            </Switch>
                            <div className="clear20"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
