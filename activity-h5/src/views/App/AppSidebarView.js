import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'underscore';
const SubMenu = Menu.SubMenu;
import { menuList } from '../../enum/menuList';
import { getCurrentOpenKeys } from '../../utils/utils'
import './AppSidebarView.less';


export default class AppSidebarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
            openKeys: []
          }
    }

    componentWillMount() {
        const { menuCurrent } = this.props.store;
        let currentOpenKeys = getCurrentOpenKeys(menuCurrent, menuList);
        console.log(`currentOpenKeys: ${currentOpenKeys}`);

        this.setState({
            current: menuCurrent,
            openKeys: currentOpenKeys
        });
    }
    
    handleClick = (e) => {
        console.log('Clicked: ', e);
        this.setState({ current: e.key });
    }

    onOpenChange = (openKeys) => {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    }
    
    getAncestorKeys = (key) => {
        const map = {
            
        };
        return map[key] || [];
    }

    creatMenuList = (menuList) => {
        let menuListDom = _.map(menuList, function(sub){
            return (
                <SubMenu key={sub.subKey} title={<span><Icon type={sub.subIcon} /><span>{sub.subName}</span></span>}>
                    {_.map(sub.menuItem, function(menu){
                        return (
                            <Menu.Item key={menu.path}>
                                <Link to={menu.path}>
                                    <Icon type={menu.icon}/>
                                    {menu.name}
                                </Link>
                            </Menu.Item>
                        );
                    })}
                </SubMenu>
            );
        })
        return menuListDom;
    }

    render() {

        var { isSideBarFold } = this.props.store;

        return (
            <div className={`ant-layout-siderbar  sidebar-fold-${isSideBarFold}`}>

                <div className="header">
                    <div className="header-logo">人众金服活动引擎系统</div>
                </div>

                <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                selectedKeys={[this.state.current]}
                style={{ width: 240 }}
                onOpenChange={this.onOpenChange}
                onClick={this.handleClick}
                >
                    {this.creatMenuList(menuList)}
                </Menu>
            </div>
        );
    }

}
