<template>
    <div class="record">
        <div class="box">
            <div class="box-list">
                <div>
                    <div v-text="now[0]"></div>
                    <p v-text="head[0]">0</p>
                </div>
                <div>
                    <div v-text="now[1]"></div>
                    <p v-text="head[1]">0</p>
                </div>
            </div>
            <div class="list" v-show="list.length">
                <div class="title">
                    <p v-text="now[2]"></p>
                    <p v-text="now[3]"></p>
                </div>
                <div style="height: 7rem" v-if="type === '0'">
                    <Scroll :getInitData="inviteList" :loadOver="loadOver" v-show="list.length">
                        <ul class="content">
                            <li v-for="(item,index) in list" :key="index">
                                <div>
                                    <p v-text="item.mobile"></p>
                                    <span>注册时间：
                                    <span v-text="covertTime(item.userRegistTime)"></span>
                                </span>
                                </div>
                                <div v-text="item.tender?'已投资':'未投资'"></div>
                            </li>
                        </ul>
                    </Scroll>
                </div>
                <div style="height: 7rem" v-if="type === '1'">
                    <Scroll :getInitData="rewardList" :loadOver="loadOver" v-show="list.length">
                        <ul class="content">
                            <li v-for="(item,index) in list" :key="index">
                                <div>
                                    <p v-text="nameDesc(item.type)"></p>
                                    <span>注册时间：
                                    <span v-text="covertTime(item.createTime)"></span>
                                </span>
                                </div>
                                <div v-text="`${item.paymentsType==2?'-':''}${item.money}元${moneyDesc(item.type)}`"></div>
                            </li>
                        </ul>
                    </Scroll>
                </div>
            </div>
            <!--暂无邀请记录-->
            <section class="unInvite" v-show="!list.length">
                <img src="https://images.51rz.com/images/app/new_yqhy/invite-gn04.png" />
                <p>呼朋唤友拿奖励，赶快行动吧！</p>
            </section>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    import Scroll from '@/component/Scroll'
    export default {
        name: 'record',
        data() {
            return {
                type: this.$route.params.type,  //0.邀请记录 1.奖励记录
                desc: [
                    ['累计邀请好友(人）','已投资好友(人）','好友','是否投资'],
                    ['累计现金奖励(元)','累计红包奖励(元)','明细','金额']
                ],
                numPerPage: 5,
                pageNum: 1,
                loadOver: false,
                list: [],
                head: [],
                token: this.getUrlParam('token'),
            }
        },
        methods: {
            async rewardList(flag) {
                if (flag) {
                    this.pageNum = 1
                } else {
                    this.pageNum++
                }
                const {
                    rewardSum,
                    redPacketSum,
                    page,
                } = await API.get(API.inviteRewardList,{numPerPage:10,pageNum: this.pageNum,token:this.token})
                this.head = [rewardSum,redPacketSum]
                const { recordList } = page
                if (recordList && recordList.length > 0) {
                    if (flag) {
                        this.list = recordList
                    } else {
                        this.list = this.list.concat(recordList)
                    }
                } else {
                    this.loadOver = true
                }
            },
            async inviteList(flag) {
                if (flag) {
                    this.pageNum = 1
                } else {
                    this.pageNum++
                }
                const {
                    inviteCount,
                    firstUserCount,
                    list,
                } = await API.get(API.inviteList,{token:this.token})
                this.head = [inviteCount,firstUserCount]
                const newList = list.slice((this.pageNum-1)*10,this.pageNum*10 - 1)
                if (newList && newList.length > 0) {
                    if (flag) {
                        this.list = newList
                    } else {
                        this.list = this.list.concat(newList)
                    }
                } else {
                    this.loadOver = true
                }
            },
            moneyDesc(type) {
                let desc = '现金'
                if(type === '3') desc = '红包'
                return desc
            },
            nameDesc(type) {
                const text = ['','返佣奖励','投资奖励现金','投资奖励红包','发放现金至余额']
                return text[type]
            },
            covertTime(time) {
                const date = new Date(time)
                return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`
            },
            getUrlParam(name) {
                const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg)  //匹配目标参数
                if (r!=null) return unescape(r[2]); return null //返回参数值
            }
        },
        mounted() {
            const {setTitle} = this.$route.meta
            const title = ['邀请记录','奖励记录']
            setTitle(title[this.type])
        },
        computed: {
            now() {
                return this.desc[this.type]
            }
        },
        components: {
            Scroll
        }
    }
</script>
<style lang="scss" scoped>
    .mui-content{  background-color: #fffbed;  }
    .record{width:100%;padding:0.3rem 0.4rem 0.4rem 0.3rem;height:100%;position: absolute;background:#fff3d2;}
    .box{border-radius:0.1rem;background:#fff;box-shadow:5px 5px 0 #fce8bc;height:100%;}

    .box-list{
        height:1.4rem;padding:0.65rem 0.3rem 0 0.5rem;height: 2.1rem;
        div{
            @include box((w:2.6rem, d:inline-block, h:1rem));
            &:last-child{border-left:1px solid #e5e5e5;padding-left:0.6rem;}
            div{
                @include box((h:0.32rem,d:inline-block,fs:0.24rem,c:#999,fw:500));
            }
            p{
                @include box((fs:0.42rem,c:#ff7007));
            }
        }
    }

    .list{padding:0.3rem;border-top: 0.4rem solid #f1f2fd;}
    .title{
        @include box((w:100%, d:inline-block, c:#666,fs:0.24rem,fw:500));
        p{
            &:first-child{padding-left: 0.5rem;float:left;font-size:0.32rem;}
            &:last-child{text-align:right;float:right;font-size:0.32rem;}
        }
    }

    .content{
        li{
            @include box((h:1.2rem,p:0.25rem 0));
            @include thin(bottom,#ddd);
            div{
                
                &:first-child{
                    @include box((ta:left, fl:left));
                    p{
                        @include box((c:#222,fs:0.26rem));
                    }
                    span{
                        @include box((c:#999,fs:0.2rem));
                    }
                }
                &:last-child{
                    @include box((lh:0.7rem,ta:right,fl:right,c:#555,fs:0.24rem));
                }
            }
        }
    }

    .unInvite{
        @include box((p:1.43rem));
        img{
            @include box((d:block,w:1.58rem,h:1.85rem,m:auto));
        }
        p{
            @include box((fs:0.24rem,ta:center,c:#999));
        }
    }
</style>