import {isUrl} from '../utils/utils';
import { getMenu,gettoken } from '../utils/authority.js';

function setmenu() {
    var menu = JSON.parse(getMenu())
    var menuData = [];
    if (menu) {
        menuData = menu.map((item)=>{
            return {
                name:item.text,
                path:item.mark,
                icon:'folder',
                children:item.children&&item.children.map((it)=>{
                    return {
                        name:it.text,
                        path:it.mark.match(/(\w+)$/)[1]
                    }
                })
            }
        })
    }
    return menuData
}



const menuData = [
    {
        name: '会员',
        path: 'vip',
        icon: 'team',
        children:[
            {
                name:'会员成长值查询',
                path:'growthSearch',
            },
            // {
            //     name:'成长值记录',
            //     path:'growthRecord',
            // },
            {
                name:'会员成长值规则列表',
                path:'growthRuleLists',
            },
            // {
            //     name:'添加/编辑成长值规则',
            //     path:'editGrowthRule',
            // },
            {
                name:'会员等级列表',
                path:'levelLists',
            },
            // {
            //     name:'添加/编辑会员等级',
            //     path:'editLevel',
            // },
            {
                name:'会员特权列表',
                path:'privilegeLists',
            },
            // {
            //     name:'添加会员特权',
            //     path:'addPrivilege',
            // },
            {
                name:'福利礼包列表',
                path:'welfarePacketLists',
            },
        ]
    },
    {
        name: '积分',
        path: 'integral',
        icon: 'gift',
        children:[
            {
                name:'积分规则列表',
                path:'integralRulesLists'
            },
            {
                name: '用户积分查询',
                path: 'userIntegralQuery',
            },
            // {
            //     name: '积分记录查询',
            //     path: 'integralRecord',
            // },
            {
                name: '积分商品类别',
                path: 'commodityCategory',
            },
            {
                name: '商品管理',
                path: 'commodityManagement',
            },
            {
                name: '商品兑换记录',
                path: 'recordExchange',
            },
        ]
    }
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
    const menuData = setmenu()    
    return formatter(menuData)
}