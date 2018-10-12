<template>
    <div class="wrap">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div v-for="(item,index) in banner"
                     :key="index"
                     class="swiper-slide">
                    <a :href="`${item.linkurl}?token=${info.token}&type=${type}&uid=${info.uid}`">
                        <img :src="item.imgUrl" :alt="item.title"/>
                    </a>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
        <div class="remind_wrap">
            <div class="remind"
                 v-for="(item,index) in remind"
                 :key="index"
                 v-if="index == remind_index">
                <div :class="item.img"></div>
                <p v-html="item.msg"></p>
                <router-link v-text="item.btn" :to="item.href"></router-link>
            </div>
        </div>
        <ul class="nav">
            <li v-for="(item,index) in guide"
                :key="index">
                <a :href="`${item.linkurl}?uid=${info.uid}`">
                    <img :src="item.imgUrl" />
                    <p v-text="item.name"></p>
                </a>
            </li>
        </ul>
        <div class="tipHg" v-if="borrow.ishow" v-text="borrow.ishow"></div>
        <div class="project" :class="borrow.status === 10||borrow.status === 1 ?'canBuy':'unBuy'" v-if="borrow.id">
            <p>
                <span v-text="borrow.name"></span>
                <span :class="borrow.status == 10 ? 'icon' : 'icon_gray'"
                      v-text="borrow.productId === 5 ? '新手' : '推荐'"></span>
            </p>
            <p :style="borrow.status==1&&'color:rgba(246,76,62,0.50)'">
                <span v-text="borrow.baseApr"></span>
                <span v-if="borrow.exApr" v-text="`+${borrow.exApr}`"></span>%
            </p>
            <p>
                <span v-text="`期限${borrow.timeLimit}${borrow.borrowTimeType=='0'?'月':'天'}`"></span>
                <span v-text="`${borrow.lowestAccount}元起投`"></span>
            </p>
            <Btn v-if="borrow.status === 10"
                 type="red"
                 label="立即投资"
                 :href="`/tender/detail/${borrow.id}/${borrow.productType}/${borrow.category}`"></Btn>
            <Btn v-if="borrow.status === 1"
                 type="wait"
                 label="即将发售"
                 :href="`/tender/detail/${borrow.id}/${borrow.productType}/${borrow.category}`"></Btn>
            <Btn v-if="borrow.status !== 10&&borrow.status !== 1" type="gray" label="已售罄"></Btn>
            <span class="warning" v-if="warnTip">温馨提示：市场有风险，投资需谨慎</span>
        </div>
        <router-link tag="div" to="/know" class="know">
            <div class="index_know"></div>
            <p>了解人众金服</p>
            <p>一家正规的网络借贷信息中介平台</p>
        </router-link>
        <div class="data">
            <div class="index_data">
                <div>
                    <p v-text="totalTender"></p>
                    <p>累计交易总额</p>
                </div>
                <div>
                    <p v-text="totalUser"></p>
                    <p>累计用户数</p>
                </div>
                <p>创造持久价值 众享财富自由</p>
            </div>
        </div>
        <Menu_nav></Menu_nav>
        <!--<a href="https://pc.51rz.com/index.html">cookie测试</a>-->
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import Menu_nav from '@/component/Menu'
    import Swiper from 'swiper'
    import Btn from '@/component/Btn'
    import API from '@/api'
    //    document.cookie='userInfo='+JSON.stringify({abc:121212})+';domain=51rz.com;path=/'
    export default {
        name: 'index',
        data() {
            return {
                remind: [
                    {
                        msg: `您有<span class="red">1716元</span>红包待领`,
                        btn: '立即领取',
                        img: 'index_remind3',
                        href: '/login'
                    },
                    {
                        msg: '开通银行<span class="red">资金存管</span>账户',
                        btn: '立即开通',
                        img: 'index_remind1',
                        href: '/my/bankOpen'
                    },
                    {
                        msg: '邀请好友得<span class="red">现金</span>奖励',
                        btn: '立即邀请',
                        img: 'index_remind4',
                        href: '/invite/index'
                    }
                ],
                banner: [],
                guide: [],
                borrow: {
                    id: '',
                    name: '',
                    status: '',
                    productId: '',
                    baseApr: '',
                    exApr: '',
                    timeLimit: '',
                    borrowTimeType: '',
                    lowestAccount: '',
                    ishow:'',
                },
                totalTender: 0,
                totalUser: 0,
                stopService: false,
                beforeStopService: false,
                returnMsg: '',
                type: '', // 环境类型参数
            }
        },
        methods: {
            ...mapActions([
                'showMsg',
                'setStopService',
            ]),
            setSlide(){
                const swiper = new Swiper('.swiper-container',{
                    autoplayDisableOnInteraction: false,
                    autoplay: 3000,
                    loop: true,
                    pagination: '.swiper-pagination',
                    paginationClickable :true,
                })
            },
            async getData() {
                const {
                    indexBanner={},
                    indexGuide=[],
                    indexBorrow={},
                    inviteAward=0,
                    totalTender=0,
                    totalUser=0,
                } = await API.post(API.getIndex,{type:1})
                this.banner = indexBanner.bannerList
                this.guide = indexGuide
                this.borrow = indexBorrow
                this.totalTender = totalTender
                this.totalUser = totalUser
                this.remind[0].msg = `您有<span class="red">1716元</span>红包待领`
                this.$nextTick(() => {
                    this.setSlide()
                })
            },
            isStopMaintain() {
                this.jsonp('https://backup.51rz.com/versionConfig/inMaintain.html',(obj) => {
                    const {
                        type,
                        returnMsg,
                    } = obj
                    const param = {
                        returnMsg
                    }
                    if(type === 1 && !localStorage.getItem('beforeStop')) {
                        param.before = true
                        localStorage.setItem('beforeStop','1')
                    }else if(type === 2){
                        param.current = true
                        localStorage.removeItem('beforeStop')
                    }else if(type === 0) {
                        localStorage.removeItem('beforeStop')
                    }
                    this.setStopService(param)
                })
            },
            jsonp(url,callback) {
                let xhr = new XMLHttpRequest()
                xhr.open("post", url, true)
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        const responseText = JSON.parse(xhr.responseText)
                        callback(responseText.obj)
                    }
                }
                xhr.send()
            }
        },
        computed: {
            remind_index() {
                //未登录领红包  已登录：先开通存管 再邀请好友
                if(!this.info.uid){
                    return 0
                }else if(this.info.realNameStatus != 1){
                    return 1
                }else{
                    return 2
                }
            },
            // 判断温馨提示是否显示
            warnTip() {
                const ishow = this.borrow.ishow || '';
                if(ishow) {
                    if(ishow.indexOf('市场有风险，投资需谨慎') === -1) { // 判断有值且不相等显示文本
                        return true;
                    } else { // 写死的文字与字段传入的文字相等则不显示写死的文本
                        return false;
                    }
                } else { // 字段内容为空或null则显示文本内容
                    return true;
                }
            },
            ...mapGetters([
                'info'
            ])
        },
        components: {
            Menu_nav,
            Btn,
        },
        mounted() {
            this.getData()
            this.isStopMaintain()
            this.type = document.domain.split('.')[0];
        }
    }
</script>
<style lang="scss" scoped>
    @import "./../css/swiper.min.css";
    .wrap{
        padding-bottom: 1.3rem;
        img{
            width: 100%;
        }
    }
    .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
        bottom: 0.9rem;
    }
    .swiper-container{height: 5rem;}
    .remind_wrap{
        max-width: 750px;
        @include position((p:absolute,t:4.2rem,l:0,r:0,z:10));
        @include box((w:100%,h:1.6rem,p:0 0.2rem,m:auto));
        background: -webkit-gradient(linear, 0 0, 0 50%, from(rgba(255,255,255,0)), to(rgba(255,255,255,1)));
    }
    .remind{
        @include box((w:100%,h:100%,bg:$white,bdr:4px,p:0.25rem 0.4rem,bs:0 0.13rem 0.3rem 0 rgba(0,0,0,0.04)));
        p{
            @include box((fs:0.28rem));margin-bottom: 0.2rem;
            span{
                @include box((c:$red));
            }
        }
        a{
            @include box((d:block,w:1.6rem,h:0.44rem,lh:0.4rem,bdr:0.22rem,c:$red,ta:center));
            @include thin(all,$red);
        }
        div{
            @include box((w:1.2rem,h:1.2rem,fl:right));
        }
    }
    .nav{
        margin-top: 0.8rem;
        @include box((d:flex,bg:$white,ta:center));
        li{
            @include box((fx:1,h:1.8rem,fs:0.22rem,c:$black5));
            img{
                @include box((w:0.64rem,h:0.64rem,m:0.3rem auto 0.2rem));
            }
        }
    }
    .tipHg{
        width: 100%;
        margin-top: 0.2rem;
        padding: 0 0.4rem 0 0.8rem;
        height: 0.6rem;
        color: #f64c3e;
        font-size: 0.28rem;
        line-height: 0.6rem;
        background: #fff url(https://images.51rz.com/images/rebuild/pc/img/apphg.png) no-repeat 0.4rem 0.12rem;
        background-size: 0.32rem 0.32rem;
    }
    .tipHg small{
        font-size:0.28rem;
    }
    .tipHg span img{
        width:0.32rem;
        height:0.32rem;
        margin-right:10px;
        margin-top: 0.14rem;
        float:left;
    }
    .project{
        @include box((bg:$white,ta:center,p:0.4rem 1.4rem,m:0.2rem 0));
        p:nth-child(1){
            position: relative;
            @include box((fs:0.32rem));
        }
        p:nth-child(2){
            @include box((m:0.3rem 0,fs:0.36rem));
            span:nth-child(1){
                @include box((m:0.3rem 0,fs:0.6rem));
            }
        }
        p:nth-child(3){
            margin-bottom: 0.4rem;
            span:nth-child(1){
                margin-right: 0.5rem;
            }
        }
        .warning{
            width:100%;
            text-align:center;
            font-size:0.22rem;
            padding-top:0.1rem;
            display:inline-block;
        }
        .icon{
            @include bg_img('index_icon.png');
            @include box((d:inline-block,w:0.6rem,h:0.28rem,fs:0.18rem,c:$white));
            @include position((p:absolute,b:0.2rem));
            margin-left: 0.1rem;
        }
        .icon_gray{
            @include bg_img('index_icon_gray.png');
            @include box((d:inline-block,w:0.6rem,h:0.28rem,fs:0.18rem,c:$white));
            @include position((p:absolute,b:0.2rem));
            margin-left: 0.1rem;
        }
    }
    .canBuy{
        p:nth-child(1){
            @include box((c:$black2));
        }
        p:nth-child(2){
            @include box((c:$red));
        }
        p:nth-child(3){
            @include box((c:$black5));
        }
    }
    .unBuy{
        p:nth-child(1){
            @include box((c:$black9));
        }
        p:nth-child(2){
            @include box((c:$black9));
        }
        p:nth-child(3){
            @include box((c:#ccc));
        }
    }

    @each $img in remind1,remind2,remind3,remind4,data,know {
        .index_#{$img}{
            @include bg_img('index_#{$img}.png');
        }
    }

    .know{
        @include box((h:1.2rem,bg:$white,m:0.2rem 0,p:0.1rem 0.6rem));
        p:nth-child(2){
            @include box((fs:0.32rem,c:$black5));padding-top: 0.1rem;
        }
        p:nth-child(3){
            @include box((fs:0.2rem,c:$black9));
        }
        .index_know{
            @include box((d:block,w:1.1rem,h:1.1rem));float: right;
        }
    }
    .data{
        //padding-top: 0.6rem;
        padding-top:0.68rem;
        @include box((bg:$white));
        .index_data{
            /*height:2.35rem;*/
            @include box((h:2.8rem,ta:center,d:flex,p:0 1.2rem));flex-wrap: wrap;
            @include bg_img('index_data_xc.png');
            background-position: center bottom;
            span{
                margin:0 0.5rem;
            }
            div{
                @include box((w:50%));
                p:nth-child(1){
                    @include box((c:$black5,fs:0.36rem));
                }
                p:nth-child(2){
                    @include box((c:$black9,fs:0.2rem));
                }
            }
            p:nth-child(3){
                //margin-top: 0.5rem;
                margin-top: -0.75rem;
                @include box((w:100%,c:$black9,fs:0.24rem));
            }
        }
    }
</style>