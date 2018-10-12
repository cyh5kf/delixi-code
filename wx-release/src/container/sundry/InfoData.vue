<template>
    <div class="wrap">
        <div class="wrap_data"><strong id="dateTime" v-text="'数据更新至'+(dataObj.nowDate||'')"></strong></div>
        <p class="label_title">基本数据</p>
        <div class="data_area">
            <ul>
                <li class="row">
                    <span><i></i>累计交易总额</span>
                    <p id="numLeiji" v-text="(dataObj.totalTender/100000000).toFixed(2)+'亿'"></p>
                </li>
                <li class="row">
                    <span><i></i>累计交易笔数</span>
                    <p id="total_invest_num" v-text="(dataObj.countTender/10000).toFixed(2)+'万'"></p>
                </li>
            </ul>
            <ul>
                <li class="row">
                    <span><i></i>累计收益金额</span>
                    <p id="numShouyi" v-text="(dataObj.totalIncome/100000000).toFixed(2)+'亿'"></p>
                </li>
                <li class="row">
                    <span><i></i>人均累计借款金额</span>
                    <p id="borrow_amount_per" v-text="(dataObj.averageBorrow/10000).toFixed(2)+'万'"></p>
                </li>
            </ul>
            <ul>
                <li class="row" style="padding-top:0.3rem">
                    <span><i></i>人均累计出借金额</span>
                    <p id="invest_amount_per" v-text="(dataObj.averageTender/10000).toFixed(2)+'万'"></p>
                </li>
                <li class="row" style="padding-top:0.3rem">
                    <span><i></i>利息余额</span>
                    <p id="income_balance" v-text="(dataObj.interest/10000).toFixed(2)+'万'">0</p>
                </li>
            </ul>
        </div>
        <p class="label_title">借款数据</p>
        <div class="borrowing_box">
            <h3><i></i>借款人、出借人</h3>
            <div class="borrowing_box1" style="position:relative;">
                <div class="jkrnum">
                    <div class="linebg1">
                        <span id="numDangqianjk" v-text="this.circle1[1].num"></span>
                        <small>当前借款人数量</small>
                    </div>
                    <p>
                        <span>累计借款人数量</span>
                        <small id="numJiekuanren" v-text="this.circle1[0].num"></small>
                    </p>
                    <canvas id="circles1" ref="circle1"></canvas>
                </div>
                <div class="jcrnum">
                    <div class="linebg2">
                        <span id="numDangqiancj" v-text="this.circle2[1].num"></span>
                        <small>当前出借人数量</small>
                    </div>
                    <p>
                        <span>累计出借人数量</span>
                        <small id="chuJieren" v-text="this.circle2[0].num"></small>
                    </p>
                    <canvas id="circles2" ref="circle2"></canvas>
                </div>
            </div>
            <h3><i></i>借款人待还金额占比</h3>
            <div class="borrowing_box2" style="position:relative;">
                <em class="textOne">前十大借款人<br/>待还金额占比</em>
                <em class="textTwo">最大单一借款人<br/>待还金额占比</em>
                <ul class="linebox">
                    <li>
                        <span class="vertical-line" :style="{'width':dataObj.topTenBorrowerScale+'%'}"></span>
                        <small id="numQianshi" v-text="dataObj.topTenBorrowerScale+'%'"></small>
                    </li>
                    <li>
                        <span class="vertical-line" :style="{'width':dataObj.mostBorrowerScale+'%'}"></span>
                        <small id="numZhuida" v-text="dataObj.mostBorrowerScale+'%'"></small>
                    </li>
                </ul>
                <h3 style="font-weight: 500;color: #fff;text-align: left;padding-left: 0.3rem;">占比</h3>
                <div>
                    <span>30%</span>
                    <span></span>
                </div>
                <div>
                    <span>20%</span>
                    <span></span>
                </div>
                <div>
                    <span>10%</span>
                    <span></span>
                </div>
                <div>
                    <span>0%</span>
                    <span></span>
                </div>
            </div>
            <h3 style="margin-top:1rem;"><i></i>借款余额</h3>
            <div class="borrowing_box3">
                <p>
                    <span>借贷余额</span>
                    <small id="numJiedai" v-text="((dataObj.loanBalance/ 100000000).toFixed(2)) + '亿'"></small>
                </p>
                <p>
                    <span>关联关系借款余额</span>
                    <small>0</small>
                </p>
                <p style="marginTop:0.5rem">
                    <span>借款余额笔数</span>
                    <small v-text="borrowCount?borrowCount:0"></small>
                </p>
                <p style="marginTop:0.5rem">
                    <span>关联关系借款余额笔数</span>
                    <small>0</small>
                </p>
            </div>
        </div>
        <p class="label_title">其它数据</p>
        <div class="other_data">
            <p>
                <span>0元</span>
                <small>逾期金额</small>
            </p>
            <p>
                <span>0笔</span>
                <small>逾期笔数</small>
            </p>
            <p>
                <span>0元</span>
                <small>代偿金额</small>
            </p>
            <p>
                <span>0笔</span>
                <small>代偿笔数</small>
            </p>
            <p>
                <span>0元</span>
                <small>逾期90天以上金额</small>
            </p>
            <p>
                <span>0笔</span>
                <small>逾期90天以上笔数</small>
            </p>
            <p>
                <span>0%</span>
                <small>项目逾期率</small>
            </p>
            <p>
                <span>0%</span>
                <small>金额逾期率</small>
            </p>
        </div>
        <div class="xmyq">
            <h3><i></i>项目分级逾期率</h3>
            <p>
                <span>0%</span>
                <strong>90天</strong>
            </p>
            <p>
                <span>0%</span>
                <strong>91天~180天</strong>
            </p>
            <p>
                <span>0%</span>
                <strong>大于180天</strong>
            </p>
        </div>
        <div class="xmyq" style="padding-bottom: 0.8rem;">
            <h3><i></i>金额分级逾期率</h3>
            <p>
                <span>0%</span>
                <strong>90天</strong>
            </p>
            <p>
                <span>0%</span>
                <strong>91天~180天</strong>
            </p>
            <p>
                <span>0%</span>
                <strong>大于180天</strong>
            </p>
        </div>
        <p class="label_title">收费标准</p>
        <div class="Tab">
            <p>每个用户每月可享受3次免费提现机会，超出部分的提现统一按单笔将收取2~5元不等的提现服务费。</p>
            <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                <tr>
                    <th>业务类型</th>
                    <th>收费标准</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>用户注册</td>
                    <td>免费</td>
                </tr>
                <tr>
                    <td>开通存管账户</td>
                    <td>免费</td>
                </tr>
                <tr>
                    <td>充值</td>
                    <td>免费</td>
                </tr>
                <tr>
                    <td>提现</td>
                    <td style="padding:20px 0">
                        &nbsp;&nbsp;&nbsp;&nbsp;0~5万元（含）  2元/笔<br/>
                        &nbsp;&nbsp;5~10万元（含）  3元/笔<br/>
                        10~50万元（含）  4元/笔<br/>
                        50~100万元（含）  5元/笔<br/><br/>
                        <span>注：每个用户每月可享受3次免费提现机会</span>
                    </td>
                </tr>
                <tr>
                    <td>借款</td>
                    <td>月综合费率低至1%</td>
                </tr>
                <tr>
                    <td>债权转让</td>
                    <td>免费</td>
                </tr>
                </tbody>
            </table>
        </div>
        <p class="label_title">运营报告</p>
        <p class="navs" style="margin:0.25rem 0 0.48rem">
            <span :class="currentYear==0?'active':''" @click="setCurrent(0)">2018</span>
            <span :class="currentYear==1?'active':''" @click="setCurrent(1)">2017</span>
            <span :class="currentYear==2?'active':''" @click="setCurrent(2)">2016</span>
        </p>
        <div class="yun_ying_report">
            <div :class="`niandu_wraper ${currentYear==0?'':'hide'}`">
                <div class="yybg_container swiper-container yybg_2018"
                     style="overflow: hidden;background:rgba(255,255,255,0)">
                    <!--2018-->
                    <ul class="yybg_wraper swiper-wrapper" style="width:1000%">

                        <li v-for="(v, index) in slider18" class="effect-1 swiper-slide" :key="index">
                            <a :href="v.linkUrl"><img :src="v.imgUrl"/></a>
                        </li>
                    </ul>
                    <div class="swiper-pagination18"></div>
                </div>
            </div>
            <div :class="`niandu_wraper ${currentYear==1?'':'hide'}`">
                <div class="yybg_container swiper-container yybg_2017"
                     style="overflow: hidden;background:rgba(255,255,255,0)">
                    <!--2017-->
                    <ul class="yybg_wraper swiper-wrapper" style="width:1000%">

                        <li v-for="(v, index) in slider17" class="effect-1 swiper-slide" :key="index">
                            <a :href="v.linkUrl"><img :src="v.imgUrl"/></a>
                        </li>
                    </ul>
                    <div class="swiper-pagination17"></div>
                </div>
            </div>
            <div :class="`yybg_container swiper-container yybg_2016 niandu_wraper ${currentYear==2?'':'hide'}`">
                <!--2016-->
                <ul class="yybg_wraper swiper-wrapper">
                    <li class="effect-1 swiper-slide" style="margin:0 auto;float:none;">
                        <a href="http://c.eqxiu.com/s/uFL7XLtF?eqrcode=1"><img
                                src="https://images.51rz.com/images/pc/platform/yybg05.png"/></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import Swiper from 'swiper';
    import API from '@/api';
    export default {
        name: 'platformData',
        data(){
            return {
                circle1: [
                    {num: 1000, color: '#4893f0'},//累计借款人数量
                    {num: 500, color: '#53e09c'},//当前借款人数量
                ],
                circle2: [
                    {num: 1000, color: '#8469f9'},
                    {num: 500, color: '#00b3e7'}
                ],
                slider18: [
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/report/yy_2018_7.png',
                        linkUrl: 'https://x.eqxiu.com/s/R94bYySz'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/report/yy_2018_6.png',
                        linkUrl: 'https://d.eqxiu.com/s/3DjxRYsI'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/report/yy_2018_5.png',
                        linkUrl: 'https://b.eqxiu.com/s/bt9dLWp1'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/report/yy_2018_4.png',
                        linkUrl: 'https://a.eqxiu.com/s/JfcepZAE'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/report/yy_2018_3.png',
                        linkUrl: 'https://b.eqxiu.com/s/3b9UcI1E'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/report/yy_2018_2.png',
                        linkUrl: 'https://x.eqxiu.com/s/9x0j09PL?eqrcode=1'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/wx/img/yy_2018_1.png',
                        linkUrl: 'https://a.eqxiu.com/s/0142Rx54'
                    },
                ],
                slider17: [
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/report/report1713.png',
                        linkUrl: 'https://u.eqxiu.com/s/Fkl2YUKH'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/report/report1712.png',
                        linkUrl: 'https://c.eqxiu.com/s/hin4jjIr'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/rebuild/report/report1711.png',
                        linkUrl: 'https://q.eqxiu.com/s/JZrI2qN3'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/shiyue/data-pic10.png',
                        linkUrl: 'http://d.eqxiu.com/s/J2V3pM5n'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/operational-report/september-bg.png',
                        linkUrl: 'http://h.eqxiu.com/s/N5RwlJ0z'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/platform/eight-data-pic.png',
                        linkUrl: 'http://u.eqxiu.com/s/10NH25QZ'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/platform/sevenBg.jpg',
                        linkUrl: 'http://d.eqxiu.com/s/7kNysyol'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/platform/six_yybg.jpg',
                        linkUrl: 'http://d.eqxiu.com/s/NHMtouT6?eqrcode=1'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/platform/five_yybg.jpg',
                        linkUrl: 'http://c.eqxiu.com/s/AKWRpySJ?eqrcode=1'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/platform/yybg07.png',
                        linkUrl: 'http://d.eqxiu.com/s/8FQ9fvGJ?eqrcode=1'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/platform/yybg06.png',
                        linkUrl: 'http://d.eqxiu.com/s/ADLo4w5b?eqrcode=1'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/platform/yybg04.png',
                        linkUrl: 'http://e.eqxiu.com/s/G44K2BDJ?eqrcode=1'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/platform/yybg03.png',
                        linkUrl: 'http://h.eqxiu.com/s/pwKD0Rjz?eqrcode=1'
                    }
                ],
                currentYear: 0,
                dataObj: {},
                borrowCount: 6
            }
        },
        methods: {
            atr(deg) {
                return Math.PI * deg / 180;
            },
            draw(obj, circle) {
                var width = document.body.clientWidth;
                var canvas = this.$refs[obj];
                var cobj = canvas.getContext("2d");
                canvas.width = width * 2 / 6;
                canvas.height = width * 2 / 6;
                cobj.clearRect(0, 0, 200, 200);
                cobj.beginPath();
                cobj.lineWidth = 12;
                cobj.strokeStyle = circle[0].color;
                cobj.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2 - 6, -Math.PI / 2, 2 * Math.PI);
                cobj.stroke();
                cobj.strokeStyle = circle[1].color;
                cobj.beginPath();

                var angle = 0;
                const total = circle[0].num;
                var maxangle = (circle[1].num) * (360 / total);
                var f;
                var self = this;
                progress();
                function progress() {
                    angle += 3;
                    cobj.beginPath();
                    if (circle == self.circle1) {
                        cobj.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2 - 6, Math.PI, Math.PI - self.atr(angle), true);
                    } else {
                        cobj.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2 - 6, self.atr(0), -self.atr(angle), true);
                    }
                    cobj.stroke();
                    if (angle > maxangle) {
                        cancelAnimationFrame(f);
                    } else {
                        f = requestAnimationFrame(progress);
                    }
                }
            },
            setSlide(){
                const slider2 = new Swiper('.yybg_2018', {
//                    autoplay: 3000,
                    loop: false,
                    initialSlide: 0,
                    pagination: '.swiper-pagination18',
                    slidesPerView: 2,
                    slidesPerGroup: 2
                });
            },
            setCurrent(index){
                this.currentYear = index;
                if (index == 1) {
                    function setSilder() {
                        const slider1 = new Swiper('.yybg_2017', {
//                    autoplay: 3000,
                            loop: false,
                            initialSlide: 0,
                            pagination: '.swiper-pagination17',
                            slidesPerView: 2,
                            slidesPerGroup: 2
                        });
                    }

                    setTimeout(function () {
                        setSilder();
                    }, 0)

                }

            },
            async getBorrowCount(){
                const obj = await API.get(API.borrowCount, {});
                this.borrowCount = obj.data
            }
        },
        async mounted(){
            this.getBorrowCount();
            this.dataObj = await API.post(API.platformData, {});
            this.circle1 = [
                {num: this.dataObj.totalBorrower, color: '#4893f0'},//累计借款人数量
                {num: this.dataObj.nowBorrower, color: '#53e09c'},//当前借款人数量
            ],
                this.circle2 = [
                    {num: this.dataObj.totalLender, color: '#8469f9'},
                    {num: this.dataObj.nowLender, color: '#00b3e7'}
                ]
            this.setSlide();
            this.draw('circle1', this.circle1)
            this.draw('circle2', this.circle2)
        }
    }
</script>
<style lang="scss" scoped>
    @import "./../../css/swiper.min.css";

    .swiper-container {
        height: 5rem;
        background: #FBE9C3;
    }

    .swiper-pagination-bullets {
        width: 100%;
    }

    .swiper-pagination-bullets, .swiper-pagination-bullet {
        margin: 0 5px;
    }

    .dis-block {
        display: block
    }

    .boxsizing {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .dis-inline-block {
        display: inline-block
    }

    .pos-rel {
        position: relative
    }

    .pos-abs {
        position: absolute;
    }

    .pos-fix {
        position: fixed
    }

    .hide {
        display: none;
    }

    .clearfix {
        content: " ";
        display: table;
        clear: both;
        *zoom: 1;
        *display: block;
    }

    .text-left {
        text-align: left;
    }

    .text-center {
        text-align: center;
    }

    .text-right {
        text-align: right;
    }

    .fn-fl {
        float: left
    }

    .fn-fr {
        float: right
    }

    .bg-f {
        background-color: #fff;
    }

    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #713802;
        line-height: 0.8rem;
        font-family: "Helvetica Neue", Helvetica, Hiragino Sans GB, "Microsoft Yahei", STHeiTi, Arial, sans-serif
    }

    input:-webkit-autofill {
        color: #713802;
        background-color: #b2c1d1;
    }

    html, body {
        background: #fff;
        width: 100%;
    }

    body {
        max-width: 7.5rem;
    }

    .wrap {
        background-image: url("https://images.51rz.com/images/rebuild/wx/img/infoPublicBg.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        padding: 1.2rem 0 0.96rem;
        position: relative;
    }

    .wrap_data {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.24rem;
        color: #fff;
        text-align: right;
        position: absolute;
        left: 0;
        top: 0.1rem;
        padding-right: 0.2rem;
    }

    .wrap_data strong {
        font-weight: 500;
    }

    .label_title {
        line-height: 0.42rem;
        height: 0.42rem;
        font-size: 0.3rem;
        text-align: center;
        color: #fff;
        padding-left: 0.3rem;
        position: relative;
        background: url('https://images.51rz.com/images/rebuild/wx/img/titlebg.png') center center no-repeat;
        background-size: 5.34rem 0.08rem;
    }

    .navs {
        text-align: center;
    }

    .navs span {
        line-height: 0.42rem;
        position: relative;
        display: inline-block;
        margin-left: 0.54rem;
        color: #999;
        font-size: 0.3rem;
    }

    .navs span.active {
        color: #fff;
    }

    .navs span.active:after {
        content: '';
        display: block;
        width: 0.8rem;
        height: 0.02rem;
        background-color: #fff;
        position: absolute;
        left: 50%;
        margin-left: -0.4rem;
        bottom: -0.2rem;
    }

    /*平台数据*/
    .data_area {
        margin: 0.4rem 0.3rem 0.6rem;
    }

    .data_area ul {
        display: flex;
        display: -webkit-flex;
    }

    .data_area ul li {
        -webkit-flex: 1;
        flex: 1;
        height: 1.1rem;
        border-right: 0.012rem solid #e5e5e5;
    }

    .data_area ul:first-child {
        border-bottom: 0.012rem solid #e5e5e5;
    }

    .data_area ul:last-child {
        border-top: 0.012rem solid #e5e5e5;
    }

    .data_area ul li:last-child {
        border-right: 0;
        padding-left: 0.3rem;
    }

    .data_area ul li span {
        color: #fff;
        font-size: 0.24rem;
        line-height: 0.33rem;
    }

    .data_area ul li span i {
        width: 0.15rem;
        height: 0.15rem;
        display: inline-block;
        margin-right: 0.1rem;
        border: 0.03rem solid #4993f0;
        border-radius: 1rem;
    }

    .data_area ul li p {
        color: #00DEFF;
        font-size: 0.3rem;
        line-height: 0.42rem;
        margin-top: 0.05rem;
    }

    /*运营报告*/
    .swiper-container {
        margin: 0 0.3rem;
        height: 5rem !important;
        background: rgba(255, 255, 255, 0) !important;
    }

    .swiper-wrapper {
        height: 4.2rem !important;
    }

    .swiper-slide {
        width: 3rem;
        height: 4.2rem;
        float: left;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
    }

    .swiper-slide:last-child {
        margin-right: 0;
    }

    .swiper-slide a {
        display: block;
        width: 3rem;
        height: 100%;
        margin: 0 auto;
    }

    .swiper-slide a img {
        width: 3rem;
    }

    .swiper-pagination-bullets {
        margin: 0 auto;
        text-align: center;
        height: 0.65rem;
    }

    /*公益披露*/
    .gong_yi_area {
        margin: 0.4rem 0.3rem 0;
    }

    .gong_yi_area li {
        display: -webkit-flex;
        display: flex;
    }

    .gong_yi_area li .left {
        width: 1.2rem;
        height: 1.2rem;
        border: 0.012rem solid #e5e5e5;
        position: relative;
    }

    .gong_yi_area li .left img {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
    }

    .gong_yi_area li .right {
        padding-left: 0.2rem;
    }

    .gong_yi_area li .right .title {
        font-size: 0.28rem;
        line-height: 0.34rem;
        color: #555;
        margin-bottom: 0.15rem;
    }

    .gong_yi_area li .right .desc {
        line-height: 0.33rem;
        font-size: 0.24rem;
        color: #999;
        width: 100%;
    }

    .gong_yi_area li .right .time {
        display: block;
        float: right;
        font-size: 0.2rem;
        color: #999;
        line-height: 0.33rem;
        height: 0.33rem;
        text-align: center;
        border-radius: 0.14rem;
        -webkit-border-radius: 0.14rem;
        background-color: #e5e5e5;
        padding: 0 0.1rem;
        margin-right: 0.2rem;
    }

    .total_box {
        width: 100%;
        text-align: center;
        padding-top: 0.3rem;
    }

    .total_box_bg {
        display: inline-block;
        width: 6.9rem;
        height: 2.2rem;
        background: url(https://images.51rz.com/images/pc/message/app/xp_pic1.png);
        background-size: 100% 100%;
    }

    .total_box_bg h3 {
        text-align: center;
        font-size: 0.36rem;
        color: #fff;
        padding-top: 0.5rem;
        font-weight: 500;
    }

    .total_box_bg p {
        font-size: 0.48rem;
        color: #fff;
        text-align: center;
    }

    .borrowing_box {
        width: 100%;
        padding: 0 0.3rem;
    }

    .borrowing_box h3 {
        width: 100%;
        text-align: center;
        font-size: 0.28rem;
        color: #fff;
        padding: 0.3rem 0;
    }

    .borrowing_box h3 i {
        width: 0.2rem;
        height: 0.2rem;
        border: 0.05rem solid #4992ec;
        border-radius: 1rem;
        margin-right: 0.1rem;
        display: inline-block;
    }

    .borrowing_box1, .borrowing_box2 {
        width: 100%;
    }

    .borrowing_box1 {
        height: 4.2rem;
    }

    .borrowing_box3 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.3rem;
        flex-wrap: wrap;
    }

    .borrowing_box3 p {
        width: 2.75rem;
        background: #4878f0;
        height: 1.25rem;
        border-radius: 0.1rem;
    }

    .borrowing_box3 p span {
        width: 100%;
        background: #5d8bfd;
        border-radius: 0.1rem 0.1rem 0 0;
        height: 0.47rem;
        color: #fff;
        text-align: center;
        display: inline-block;
        line-height: 0.45rem;
        font-size: 0.24rem;
    }

    .borrowing_box3 p small {
        width: 100%;
        display: inline-block;
        text-align: center;
        padding-top: 0.1rem;
        color: #fff;
        font-size: 0.32rem;
    }

    .other_data {
        width: 100%;
        padding: 0 1.4rem 0.3rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .other_data p {
        width: 1.82rem;
        height: 1.5rem;
        margin-top: 0.3rem;
        background: url(https://images.51rz.com/images/rebuild/wx/img/xp_pic.png);
        background-size: 100% 100%;
    }

    .other_data p span {
        width: 100%;
        text-align: center;
        display: inline-block;
        color: #fff;
        padding-top: 0.3rem;
        font-size: 0.28rem;
    }

    .other_data p small {
        width: 100%;
        text-align: center;
        display: inline-block;
        color: #fff;
        font-size: 0.2rem;
    }

    .jkrnum, .jcrnum {
        display: inline-block;
        padding: 0.1rem 0;
        position: absolute;
    }

    .jkrnum {
        left: 0;
        top: 0;
    }

    .jcrnum {
        right: 0;
        top: 1.5rem;
    }

    .jkrnum p, .jcrnum p {
        position: absolute;
        top: 1rem;
        width: 100%;
        text-align: center;
    }

    .jkrnum p span, .jcrnum p span {
        color: #fff;
        font-size: 0.24rem;
        width: 100%;
        display: inline-block;
    }

    .jkrnum p small, .jcrnum p small {
        color: #4993f0;
        font-size: 0.28rem;
    }

    .linebg1 {
        background: url(http://images.51rz.com/images/pc/message/app/line01.png) no-repeat;
        left: 2.5rem;
        top: 1.16rem;
    }

    .linebg2 {
        background: url(http://images.51rz.com/images/pc/message/app/line02.png) no-repeat;
        left: -2.5rem;
        top: 1.32rem;
    }

    .linebg1, .linebg2 {
        width: 2.5rem;
        height: 0.22rem;
        position: absolute;
        background-size: 100% 100%;
    }

    .linebg1 span, .linebg2 span {
        width: 100%;
        text-align: center;
        font-size: 0.3rem;
        display: inline-block;
        position: absolute;
    }

    .linebg1 span {
        color: #53e09c;
        left: 0.1rem;
        top: -0.5rem;
    }

    .linebg2 span {
        color: #01b2e7;
        right: 0.1rem;
        top: -0.3rem;
    }

    .linebg1 small, .linebg2 small {
        width: 100%;
        text-align: center;
        font-size: 0.24rem;
        display: inline-block;
        position: absolute;
    }

    .linebg1 small {
        color: #fff;
        left: 0.1rem;
        top: 0.05rem;
    }

    .linebg2 small {
        color: #fff;
        right: 0.1rem;
        top: 0.25rem;
    }

    .borrowing_box2 div:last-child {
        height: 0.6rem;
        border-bottom: 2px solid #e6e6e6;
    }

    .borrowing_box2 div {
        height: 0.6rem;
        padding: 0 0.3rem;
    }

    .borrowing_box2 div span:first-child, .borrowing_box2 div span:last-child {
        font-size: 0.24rem;
        height: 0.6rem;
        line-height: 0.6rem;
        float: left;
    }

    .borrowing_box2 div span:first-child {
        width: 12%;
        color: #fff;
    }

    .borrowing_box2 div span:last-child {
        width: 88%;
        border-bottom: 1px solid #e6e6e6;
    }

    .linebox {
        -ms-transform: rotate(-90deg); /* IE 9 */
        -moz-transform: rotate(-90deg); /* Firefox */
        -webkit-transform: rotate(-90deg); /* Safari 和 Chrome */
        -o-transform: rotate(-90deg);
        transform: rotate(-90deg);
        width: 4.01rem;
        display: inline-block;
        position: absolute;
        left: 23%;
        bottom: -0.5rem;
    }

    .linebox li {
        margin-top: 0.5rem;
        width: 100%;
        height: 2rem;
    }

    .linebox li span {
        width: 0;
        background: #ffc001;
        height: 2rem;
        float: left;
    }

    .linebox li small {
        display: inline-block;
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
        font-size: 0.24rem;
        color: #fff;
        height: 2rem;
        line-height: 1.8rem;
        position: absolute;
    }

    .textOne, .textTwo {
        text-align: center;
        position: absolute;
        top: 3.5rem;
        width: 2rem;
        font-size: 0.2rem;
        color: #fff;
    }

    .textOne {
        left: 23%;
    }

    .textTwo {
        left: 59%;
    }

    .xmyq {
        width: 100%;
        font-size: 0;
        padding-bottom: 0.2rem;
        display: inline-block;
    }

    .xmyq p {
        width: 33%;
        float: left;
        border-right: 1px dotted #E5E5E5;
        text-align: center;
        font-size: 0.24rem;
    }

    .xmyq p span {
        width: 100%;
        display: block;
        color: #4992EC;
    }

    .xmyq p strong {
        font-weight: 500;
        width: 100%;
        display: block;
        color: #fff;
    }

    .xmyq h3 {
        width: 100%;
        text-align: center;
        font-size: 0.28rem;
        color: #fff;
        padding-bottom: 0.3rem;
        font-weight: 500;
    }

    .xmyq h3 i {
        width: 0.2rem;
        height: 0.2rem;
        border: 0.05rem solid #4992ec;
        border-radius: 1rem;
        margin-right: 0.1rem;
        display: inline-block;
    }

    .Tab {
        width: 100%;
        padding: 0 0.3rem;
        margin: 0.5rem 0 0.9rem
    }

    .Tab p {
        color: #fff;
    }

    .Tab table {
        color: #fff;
        width: 100%;
        border-top: 1px solid #fff;
        border-right: 1px solid #fff;
    }

    .Tab table td {
        width: 50%;
        text-align: center;
        height: 0.35rem;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        border: 1px solid #fff;
        span {
            font-size: 0.26rem;
            color: #fff;
        }
    }

</style>