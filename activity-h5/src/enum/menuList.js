export const menuList = [
    {
        subKey: 'sub1',
        subIcon: '',
        subName: '活动管理',
        menuItem: [
            {path: '/home/activityList', name: '活动管理列表', icon: ''},
        ]
    },
    {
        subKey: 'sub2',
        subIcon: '',
        subName: '规则池',
        menuItem: [
            {path: '/home/redList', name: '红包列表', icon: ''},
            {path: '/home/upRateList', name: '加息券列表', icon: ''},
            {path: '/home/teskList', name: '任务列表', icon: ''}
        ]
    }
]

export const routerInfo = [
    {path: '/home/activityList', name: '活动管理列表'},
    {path: '/home/redList', name: '红包列表'},
    {path: '/home/upRateList', name: '加息券列表'},
    {path: '/home/teskList', name: '任务列表'},
    {path: '/home/moduleConfig', name: '配置活动模块'},
    {path: '/home/packRules', name: '拆礼包规则'},
    {path: '/home/rankRules', name: '排行榜规则'}
]

