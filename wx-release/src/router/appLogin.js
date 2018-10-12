const APPLoginIndex = resolve => require(['@/container/appLogin/Index.vue'], resolve)

//成长红包
const UpRedPacket = resolve => require(['@/container/sundry/UpRedPacket.vue'], resolve)

export default {
    path: '/appLogin',
    component: APPLoginIndex,
    children: [
        {
            path: 'upRedPacket',
            component: UpRedPacket,
            meta: {
                title: '成长红包'
            }
        }
    ]
}