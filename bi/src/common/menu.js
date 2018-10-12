import {isUrl} from '../utils/utils';
import { getMenu, gettoken } from '../utils/authority.js'

function setmenu() {
    var menu = JSON.parse(getMenu())
    var menuData = [];
    if (menu) {
        menuData = menu.list.map((item)=>{
            return {
                name:item.name,
                path:item.url.match(/\#\/(\w+)/)[1],
                icon:'folder',
                children:item.list.map((it)=>{
                    return {
                        name:it.name,
                        path:it.url.match(/(\w+)$/)[1]
                    }
                })
            }
        })
    }
    return menuData
}



const menuData = [
    {
        name: '数据概览',
        path: 'overViewData',
        icon: 'line-chart',
        children:[
            {
                name:'综合看板',
                path:'dashboard',
            },
            {
                name:'基础指标',
                path:'basicIndex',
            },{
                name:'实时监测',
                path:'realTimeWatcher',
            }
            
        ]
    },
    {
        name: '用户行为分析',
        path: 'userBehavior',
        icon: 'user',
        children:[
            {
                name:'漏斗分析',
                path:'funnelAnalysis',
            }
            
        ]
    },
];

function formatter(data, parentPath = '', parentAuthority) {
    return data.map((item) => {
        let {path} = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => {
    // const menuData = setmenu()
    return formatter(menuData)
};
