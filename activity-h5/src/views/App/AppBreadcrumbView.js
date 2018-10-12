import React from 'react';
import {withRouter} from "react-router-dom";
import {Button} from 'antd';
import { routerInfo } from '../../enum/menuList';

class AppBreadcrumbView extends React.Component {

    getPageName = (routes) =>{
        let pageName = '';
        for(let item of routerInfo) {
            let path = item.path;
            if(routes.indexOf(path) >= 0) {
                pageName = item.name;
                break;
            }
        }
        return pageName;
    };

    render() {
        var routes = this.props.location.pathname || {};
        var routeInfo = this.getPageName(routes);

        return (
            <div className="ant-breadcrumb">
                <div className="item">
                    {routeInfo}
                </div>
                <div className="floatRight">
                </div>
            </div>
        );
    }

}

export default withRouter(AppBreadcrumbView);
