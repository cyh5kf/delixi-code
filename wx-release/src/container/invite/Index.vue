<template>
    <div style="background: #ffedc1;padding-bottom: 1.8rem">
        <img class="in_banner" src="https://images.51rz.com/images/app/new_yqhy/index-banner.png" />
        <section v-show="uid" class="wrap" style="margin-top:0.3rem;">
            <div class="box">
                <div class="connectBg"></div>
                <p class="notice">
                    <img src="https://images.51rz.com/images/app/new_yqhy/icon-notice.png" alt="">
                    <ul class="news">
                        <li v-for="(item, index) in newRedpacketList" :key="index">
                            <span v-text="item.hidePhone"></span> 获得<span v-text="item.amount"></span><span v-if="item.type === 1">元现金</span><span v-else>元红包</span>
                        </li>
                    </ul>
                </p>
                <p class="money-text money-mt">待发放现金(元）</p>
                <p class="money-ze" @click="goList(1)">
                    <i v-text="obj.inExamineSum">0</i>
                    <img src="https://images.51rz.com/images/app/new_yqhy/yyGo.png" />
                </p>
                <p class="money-text1 money-line">次日9点打款至账户余额</p>
                <ul class="money-list">
                    <li @click="goList(0)">
                        <p>邀请好友(人)</p>
                        <em v-text="obj.inviteCount">0</em>
                    </li>
                    <li @click="goList(1)">
                        <p>累计现金(元)</p>
                        <em v-text="obj.rewardSum">0</em>
                    </li>
                    <li @click="goList(1)">
                        <p>累计红包(元)</p>
                        <em v-text="obj.redPacketSum">0</em>
                    </li>
                </ul>
            </div>
        </section>

        <section class="wrap">
            <div class="box" style="padding-top: 0.6rem;">
                <div class="title">邀友投资即送</div>
                <p class="box-text" style="padding: 0 .28rem;">好友注册起30天内投资满足如下条件，邀请人可获得相应的红包以及现金，奖励可叠加领取。</p>
                <span class="pic1"><img src="https://images.51rz.com/images/app/new_yqhy/index-pic1.png" style="width:6.08rem" /></span>
            </div>
        </section>

        <section class="wrap">
            <div class="box" style="padding: .5rem .3rem .3rem">
                <div class="title">最高0.2%返佣</div>
                <p class="box-text">好友自注册起30天内投资满足以下条件，则邀请人最高可享受好友每笔投资金额的0.2%佣金，上不封顶！</p>
                <div class="tab-wrap">
                    <table cellspacing="0" cellpadding="0" border="0">
                        <thead>
                            <tr>
                               <th>好友投资期限</th>
                                <th>邀请人可享佣金</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>30天≤投资期限＜90天</td>
                                <td>每笔投资金额 <span class="key">*0.1%</span></td>
                            </tr>
                            <tr>
                                <td>90天≤投资期限</td>
                                <td>每笔投资金额 <span class="key">*0.2%</span></td>
                            </tr>
                        </tbody>

                    </table>
                    <a class="Href" style="margin-left:0;" @click="changeDialog(true)">案例说明 ></a>
                </div>
            </div>
        </section>

        <section class="wrap" v-show="showRank">
            <div class="box" style="padding: .5rem .3rem .3rem">
                <div class="title">人脉榜</div>
                <p class="box-text">活动期间对合伙人新增的已投资好友人数进行排名（活动期间好友需累计投资任意标≥5000元），对最终上榜者奖励对应的奖品。</p>
                <div class="rank-wrap">
                    <div class="rank-header">
                        <span class="column1">排名</span>
                        <span class="column2">合伙人</span>
                        <span class="column3">新增已投资<br/>好友人数</span>
                        <span class="column4">奖品</span>
                    </div>
                    <ul class="rank-body">
                        <li>
                            <span class="column1" v-if="myRank !== null">
                                <img :src="imgUrl(myRank)" alt="" v-if="myRank < 3">
                                <span v-text="myRank + 1" v-else></span>
                            </span>
                            <span class="column1" v-else>-</span>
                            <span class="column2">我</span>
                            <span class="column3 orange" v-text="myInviteRanking.count"></span>
                            <span class="column4" v-text="prizeList[myRank]" v-if="myRank !== null"></span>
                            <span class="column4" v-else>暂无奖品</span>
                        </li>
                        <li v-for="(item, index) in formatterRank" :key="index" v-if="formatterRank">
                            <span class="column1">
                                <img :src="imgUrl(index)" alt="" v-if="index < 3">
                                <span v-text="index+1" v-else></span>
                            </span>
                            <span class="column2" v-text="item.inviteHidePhone? item.inviteHidePhone: '-'"></span>
                            <span class="column3 orange" v-text="item.count? item.count: '-'"></span>
                            <span class="column4" v-text="prizeList[index]"></span>
                        </li>
                    </ul>
                    <p class="tag">注：排行榜每15分钟刷新</p>
                    <a class="Href" @click="changeDialog2(true)">规则说明 ></a>
                    <a class="Href" @click="changeDialog3(true)">6月人脉榜 ></a>
                </div>
            </div>
        </section>

        <section class="wrap">
            <div class="box" style="padding: .46rem .3rem .3rem">
                <div class="title">好友专享福利</div>
                <div class="hyzx">
                    <img src="https://images.51rz.com/images/app/new_yqhy/benefits.png" />
                    <p class="welfare-text">￥1716注册红包+2张加息券+<span>10元现金</span></p>
                    <p class="remarks">（10元现金需自注册起30天内累计投资任意标≥5000元）</p>
                </div>
            </div>
        </section>

        <section class="wrap activity-des" style="padding: 0 .3rem;margin-top: 0.9rem;">
            <p class="title">活动说明</p>
            <div class="eleven-text">
                <p>1、100元红包的使用条件为投资30天及以上标满5000元可用；</p>
                <p>2、若好友投资满足活动要求，现金奖励将于次日发放至您的账户余额；</p>
                <p>3、4月4日（含）后邀请的好友，邀请人享受当前版本邀友福利；</p>
                <p>4、4月4日前邀请的好友，邀请人享受之前版本邀友福利，即好友注册起7天内投资满足条件，邀请人可获得相应的红包、现金，以及自好友注册起180天内所有投资对应的佣金；</p>
                <p>5、债转标不参与活动，另若发现邀请人恶意刷奖，一经查实将取消奖励资格；</p>
                <p>6、如有疑问请致电客服：400-655-8858。(咨询时间：9:00-21:00)。</p>
                <p>* 本活动最终解释权在法律范围内归人众金服所有</p>
            </div>
        </section>
        <div class="fixed_href" v-show="dialog">
            <div class="hrefOpen">
                <img class="hrefClose" @click="changeDialog(false)"
                     src="https://images.51rz.com/images/app/new_yqhy/elevenClose.png" />
                <h3>规则说明</h3>
                <p>若好友投资90天标10万元，则邀请人可以获得200元（100000元*0.2%）佣金奖励</p>
            </div>
        </div>
        <div class="fixed_href" v-show="dialog2">
            <div class="hrefOpen" style="top: 20%;">
                <img class="hrefClose" @click="changeDialog2(false)"
                     src="https://images.51rz.com/images/app/new_yqhy/elevenClose.png" />
                <h3>规则说明</h3>
                <p>人脉榜时间：7月1日-7月31日；</p>
                <p>1、新增已投资好友人数定义：好友需在活动时间内注册且累计投资任意标≥5000元；</p>
                <p>2、前三名奖励均设有最低人数要求，分别为10、8、5人，合伙人若没有达到最低人数要求，则只能获得下一档满足条件的奖励；</p>
                <p>3、当新增好友人数出现相同时，以合伙人最后一个好友满足投资条件的时间先后排名，排行榜信息每15分钟刷新一次；</p>
                <p>4、实物奖励将在活动结束后14个工作日内发放，若活动结束3个工作日内客服联系不上获奖用户，则视为用户自动放弃。</p>
            </div>
        </div>
        <div class="fixed_href" v-show="dialog3">
            <div class="hrefOpen" style="top:20%">
                <img class="hrefClose" @click="changeDialog3(false)"
                     src="https://images.51rz.com/images/app/new_yqhy/elevenClose.png" />
                <h3>6月人脉榜</h3>
                <div class="six-wrap">
                    <div class="open-title">
                        <span class="tit1">排名</span>
                        <span class="tit2">合伙人</span>
                        <span class="tit3">新增已投资<br/>好友人数</span>
                        <span class="tit4">奖品</span>
                    </div>
                    <ul class="open-list scrollbar">
                        <li v-for="(item,index) in myLastMonRanking" :key="index">
                            <span class="tit1" v-text="index+1">1</span>
                            <span class="tit2" v-text="item.inviteHidePhone? item.inviteHidePhone: '-'">188****4571</span>
                            <span class="tit5" v-text="item.count? item.count: '-'">16</span>
                            <span class="tit4" v-text="prizeList[index]">iPhone 8P 128G</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <section class="footer" @click="share">
            <a class="invite_btn">邀请好友</a>
        </section>
    </div>
</template>
<script>
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'Index',
        data() {
            return {
                token: 0,
                uid: 0,
                dialog: false,
                dialog2: false,
                dialog3: false,
                obj: {
                    redPacketSum: '',   //累计红包
                    inExamineSum: '',   //待发放现金
                    rewardSum: '',      //累计现金
                    isVip: false,       //是否是高级合伙人
                    inviteCount: '',    //邀请人数
                },
                showRank: true, // 人脉榜显示隐藏
                rankList: [],  // 人脉榜数据
                myInviteRanking: {}, // 我的邀友信息
                newRedpacketList: [], // 邀友页面获取红包滚动条
                prizeList: ['iPhone 8P 64G', '科沃斯扫地机器人', '800元加油卡', '500元京东卡', '九阳空气炸锅', 'LUCKYSAC懒人沙发', '飞利浦电动牙刷', '蕉下折叠太阳伞', 'LOVO家纺凉席', '南极人空调被'],
                myLastMonRanking:[], //历史邀请人数
            }
        },
        methods: {
            getUrlParam(name) {
                const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg)  //匹配目标参数
                if (r!=null) return unescape(r[2]); return null //返回参数值
            },
            changeDialog(show) {
                this.dialog = show
            },
            changeDialog2(show) {
                this.dialog2 = show
            },
            changeDialog3(show) {
                this.dialog3 = show;
                this.getLastData()
            },
            async getInitData() {
                this.token = this.getUrlParam('token') || this.info.token
                this.uid = this.getUrlParam('uid')
                if(this.uid) {
                    const obj = await API.get(API.inviteIndex,{token:this.token});
                    const newRedpacket = await API.get(API.newRedpacket);
                    this.obj = obj;
                    this.newRedpacketList = newRedpacket;
                    if(newRedpacket) {
                        this.newScrolling();
                    }
                }
            },
            // 获取人脉榜数据
            async getRankData() {
                if(this.showRank) {
                    this.token = this.getUrlParam('token') || this.info.token
                    this.uid = this.getUrlParam('uid')
                    let res = await API.get(API.inviteRanking);
                    res = res === true? '[]': res;
                    const myInviteRanking = await API.get(API.myInviteRanking,{token:this.token});
                    this.rankList = JSON.parse(res).concat([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
                    this.myInviteRanking = myInviteRanking;
                }
            },
            //获取历史人脉榜数据
            async getLastData() {
                    this.token = this.getUrlParam('token') || this.info.token
                    this.uid = this.getUrlParam('uid')
                    let res = await API.get(API.myLastMonRanking,{token:this.token});
                    res = res === true? '[]': res;
                    this.myLastMonRanking = JSON.parse(res);
                    
                    //const myLastMonRanking = await API.get(API.myLastMonRanking,{token:this.token});
                    //this.rankList = JSON.parse(res).concat([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
                    //this.myLastMonRanking = myLastMonRanking;
            },
            // 消息列表滚动
            newScrolling() {
                let num = this.newRedpacketList.length;
                const newsDom = document.querySelector(".news");
                let marginTop = 0;
                const interval = setInterval(() => {
                    if(num > 1) {
                        marginTop = marginTop - 0.34;
                        num--;
                        newsDom.style.marginTop = marginTop + 'rem';
                    } else {
                        clearInterval(interval);
                    }
                }, 2000)
            },
            share() {
                if(this.uid) {
                    window.location.href = `/invite/code?uid=${this.uid}&token=${this.token}`
                }else {
                    window.location.href = '/login'
                }
            },
            goList(flag) {
                window.location.href = `/invite/record/${flag}?token=${this.token}`
            },
            count(val) {
                if(val) {
                    return `${val}人`;
                } else {
                    return '暂无好友投资';
                }
            },
            imgUrl(index) {
                return `https://images.51rz.com/images/app/new_yqhy/rank${index+1}.png`;
            }
            
        },
        async created() {
            //防止链接没带uid
            // const href = window.location.href
            // if(href.indexOf('uid') === -1) {
            //     window.location.replace(`${href}?uid=${this.info.uid}`)
            // }

            const time = await API.get(API.nowDate);
            const timeStr= "2018/07/31 23:59:59";
            const nowTime = new Date(Date.parse(timeStr)).getTime();
            if(time > nowTime) {
                this.showRank = false; // 隐藏人脉榜
            }
        },
        mounted() {
            this.getInitData();
            this.getRankData();
            //this.getLastData();
        },
        activated() {
            this.getInitData()
        },
        computed: {
            ...mapGetters([
                'info'
            ]),
            // 我的排名信息
            myRank() {
                const myInviteRanking = this.myInviteRanking;
                let myRank = null;
                const inviteUser = myInviteRanking.inviteUser;
                const rankList = this.rankList;
                if(inviteUser && rankList.length !==0) {
                    for(let i=0; i<rankList.length;i++) {
                        if(rankList[i].inviteUser === inviteUser) {
                            myRank = i;
                            break;
                        }
                    }
                }
                return myRank;
            },
            // 格式化人脉榜，判断前三名是否满足条件
            formatterRank() {
                let rankList = this.rankList;
                let newRankList = [rankList[0], rankList[1], rankList[2]];
                if(rankList.length !== 0) {
                    if(newRankList[0].count){
                        if(newRankList[0].count<10){
                            newRankList.unshift({});
                        }
                    }
                    if(newRankList[1].count){
                        if(newRankList[1].count<8){
                            newRankList.splice(1,0,{})
                        }
                    }
                    if(newRankList[2].count){
                        if(newRankList[2].count<5){
                            newRankList.splice(2,0,{})
                        }
                    }
                    rankList = newRankList.concat(rankList.slice(3,10));
                    rankList = rankList.slice(0,10);
                }
                return rankList;
            }
        },
    }
</script>
<style lang="scss" scoped>
    .in_banner{width:100%;}

    .wrap{width:100%;padding:0 0.4rem 0 0.3rem;margin-top:.83rem;}
    .box{width:100%;border-radius:0.1rem;background:#fff;box-shadow:5px 5px 0 #f1d497;padding-top:1.08rem;position:relative;}
    .box h3{position:absolute;left:50%;margin-left:-1.82rem;top:-0.5rem;height:1.02rem;}
    .box h3 img{width:3.74rem;height:1.02rem;}
    .box .notice {height: .34rem; font-size: .24rem;color: #999;position: absolute;left: .78rem;top: .2rem;overflow: hidden;}
    .box .notice li {height: .34rem;}
    .box .notice img {width: .28rem;height: .28rem;margin-right: .1rem;}
    .box .notice .news {transition: margin-top .5s;margin-left: 0.5rem;}
    .box .pic1{width:100%;padding:0.42rem 0.78rem 0.3rem 0.78rem;text-align:center;display:inline-block;}
    .box .box-text {width:100%;text-align:left;display:inline-block;color:#999;}
    .box .title {position:absolute;left:50%;margin-left:-1.41rem;top:-0.3rem;width: 2.82rem;height: 0.62rem;line-height: 0.62rem;text-align: center;background: url(https://images.51rz.com/images/app/new_yqhy/icon-title.png) no-repeat;background-size: cover;font-size: 0.24rem;
        color: #fff;padding-left: .22rem;}

    .footer{width:7.5rem;text-align:center;height:1rem;position:fixed;bottom:0;z-index:10;background:#ff9906;}
    .invite_btn {text-decoration:none;display:inline-block;width:100%;height:1rem;line-height:1rem;color:#fff;font-size:0.36rem;}


    .connectBg{width:6.42rem;position:absolute;height:1.6rem;background:url(https://images.51rz.com/images/app/new_yqhy/calendar.png) no-repeat;background-size:contain;top:-0.6rem;left: .2rem;z-index:100;}
    .partner{width:2.14rem;height:0.85rem;background:#ffdf73;border-radius:0 0 0.1rem 0.1rem;box-shadow:0 0.1rem 0 #f1af01;color:#580809;font-size:0.24rem;line-height:0.85rem;font-weight:500;display:inline-block;margin-left:1rem;}
    .partner i{width: 0.42rem;height: 0.47rem; margin: 0 0.05rem 0 0.2rem;float: left;}
    .partner i img{width:0.42rem;height:0.47rem;display:inline-block;}

    .invite-text{width:100%;text-indent:-0.4rem;padding-left:0.4rem;font-size:0.24rem;line-height:0.45rem;color:#222;}
    .invite-btn{width:0.55rem;height:1.7rem;background:#e79130;border-radius:0.1rem 0 0 0.1rem;z-index:20;position:fixed;right:0;top:5rem;color:#fff;padding: 0.15rem 0.17rem;line-height: 0.35rem;}

    .tab-wrap{width:100%;padding-top: .2rem;text-align:center;}
    .tab-wrap table{width:100%;}
    .tab-wrap table thead tr{
        background:#7ba5ff; /* 一些不支持背景渐变的浏览器 */
        background: linear-gradient(to right, #789bff, #82b7ff);
    }
    .tab-wrap table th{height:0.6rem;text-align:center;font-size:0.24rem;color:#fff;font-weight:500;}
    .tab-wrap table th:nth-child(1){width:50%;}
    .tab-wrap table th:nth-child(2){width:50%;}
    .tab-wrap table td{border-bottom:1px solid #ddd;border-right:1px solid #ddd;padding:0.1rem 0;text-align:center;font-size:0.24rem;color:#555;font-size: .24rem;}
    .tab-wrap table td:first-child{border-left:1px solid #ddd;}
    .tab-wrap table .key {color: #ff7007;}
    .tab-wrap h4{width:100%;text-align:left;font-size:0.24rem;color:#999;font-weight:500;padding-top:0.3rem;}
    .Href{display: block;margin:0.3rem 0 0 0.8rem;width:1.8rem;height:0.48rem;text-align:center;line-height:0.48rem;color:#4b92ec;border:1px solid #4b92ec;border-radius:1rem;display: inline-block;}

    .rank-wrap {width:100%;padding-top: .2rem;color: #555;font-size: .22rem;}
    .rank-wrap .rank-header {width: 100%;height: .94rem;display: flex;align-items: center;background-color: #f6f6f6;}
    .rank-wrap .rank-header span, .rank-wrap .rank-body span {display: block;text-align: center;}
    .rank-wrap .column1 {width: 12.6%;}
    .rank-wrap .column2 {width: 27%;}
    .rank-wrap .column3 {width: 26.6%;}
    .rank-wrap .column4 {width: 34.2%;}
    .rank-wrap .rank-body li {width: 100%;height: .92rem;display: flex;align-items: center;}
    .rank-wrap .rank-body .orange {color: #ff7007;}
    .rank-wrap .rank-body li img {width: .4rem;height: .5rem;}
    .rank-wrap .tag {color: #999;font-size: .24rem;}

    .hyzx{width:100%;text-align:center;}
    .hyzx img{width:100%;display:inline-block;font-size:0;}
    .hyzx .welfare-text{width:100%;text-align:center;margin-top: .3rem;color:#222;font-size: .28rem;}
    .hyzx .welfare-text span {color: #ff7007;}
    .hyzx .remarks{font-size:0.18rem;color: #999;}

    .activity-des .title {color: #ff9e12;font-size: .28rem;}
    .eleven-text{width:100%;padding-top:0.25rem;}
    .eleven-text p{width:100%;text-indent:-0.4rem;padding-left:0.4rem;font-size:0.24rem;line-height:0.4rem;color:#555;}

    .fixed_href{width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,0.6);z-index:20;}
    .hrefOpen{width:6.5rem;padding:0.2rem;border-radius:0.1rem;border:2px solid #93bbe0;position:absolute;background:#fff;left:6%;top:33%;}
    .hrefClose{width:1rem;height:1rem;position:absolute;right: -0.5rem;top: -0.5rem;}
    .hrefOpen h3{width:100%;text-align:center;font-size:0.3rem;padding-top:0.1rem;}
    .hrefOpen p{padding-top:0.2rem;width:100%;font-size:0.24rem;line-height:0.4rem;color:#555;text-indent: 2em;}
    .hrefOpen p span{color:#ef5933;}

    .money-text{width:100%;font-size:0.24rem;color:#222;text-align:center;}
    .money-text1{width:100%;font-size:0.24rem;color:#999;text-align:center;}
    .money-ze{
        width:100%;text-align:center;font-size:0.6rem;color:#ff7007;
        strong{
            font-weight:500;
        }
    }
    .money-ze img{width:0.13rem;height:0.22rem;display:inline-block;}
    .money-line{border-bottom:1px dashed #dfdfdf;width: 90%;margin: 0 auto;padding-bottom:0.2rem;}

    .money-list{width:100%;padding:0.2rem 0;display:inline-block;}
    .money-list li{float:left;width:33%;border-right:1px solid #dfdfdf;text-align:center;font-size:0.24rem;}
    .money-list li p{width:100%;color:#222;}
    .money-list li em{font-style:normal;font-size:0.3rem;color:#ff7007;padding-top:0.2rem;}
    .money-list li:last-child{border-right:none;}

    .six-wrap{
        width:100%;
        text-align:center;
        display:inline-block;
        padding-top:0.15rem;
    }
    .open-title{
        width: 100%;
    background: #799fff;
    height: .7rem;
    color: #fff;
    font-size: .24rem;
    border-radius: 0.1rem 0.1rem 0 0;
    }
    .tit1{
        float:left;
        width:10%;
        line-height:0.7rem;
    }
    .tit2{
        float:left;
        width:25%;
        line-height:0.7rem;
    }
    .tit3{
        float:left;
        width:25%;
    }
    .tit4{
        float:left;
        width:40%;
        line-height:0.7rem;
    }
    .tit5{
        float:left;
        width:20%;
        line-height:0.7rem;
        color:#ff7510;
    }
    .open-list{
        width:100%;
        display:inline-block;
        height:3.2rem;
        overflow: auto;
    }
    .open-list li{
        width:100%;
        height:0.5rem;
        line-height:0.5rem;
        font-size:0.2rem;
        color:#6a6a6a;
    }
    ::-webkit-scrollbar 
    { 
        width: 5px; 
        height: 5px; 
        background-color: #f5f5f5; 
    } 
    ::-webkit-scrollbar-track 
    { 
        -webkit-box-shadow: inset 0 0 6px rgba(121,159,255,.3); 
        border-radius: 10px; 
        background-color: #f5f5f5; 
    } 
    ::-webkit-scrollbar-thumb 
    { 
        border-radius: 10px; 
        -webkit-box-shadow: inset 0 0 6px rgba(121,159,255,.3); 
        background-color: #555; 
    }
</style>