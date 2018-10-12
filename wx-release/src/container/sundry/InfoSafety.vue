<template>
    <div class="wrap">
        <p class="label_title">资金安全</p>
        <ul class="zijin_anquan_ul">
            <!-- <li>
                <span class="left_icon"><img src="https://images.51rz.com/images/pc/message/app/safe_app_cun_guan.png"></span>
                <div class="right_cont">
                    <h4>银行存管</h4>
                    <p>
                        人众金服携手存管银行，成功上线银行存管系统，银行对用户资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。
                    </p>
                    <a href="/bankCunGuan">了解银行存管》</a>
                </div>
            </li>
            <li>
                <span class="left_icon"><img
                        src="https://images.51rz.com/images/pc/message/app/safe_app_bao_zheng_jin.png"></span>
                <div class="right_cont">
                    <h4>千万保证金</h4>
                    <p>开设上千万元风险保证金账户，根据平台放款额逐步追加风险保证金，保障投资安全。</p>
                </div>
            </li> -->
            <li>
                <span class="left_icon"><img
                        src="https://images.51rz.com/images/pc/message/app/safe_app_gong_an_bu.png"></span>
                <div class="right_cont">
                    <h4>公安部三级安全信息备案</h4>
                    <p>
                        2016年12月，通过国家公安部监制信息安全等级保护三级安全备案，规范自身，为投资者创造安全、健康、规范、便捷的互联网环境。
                    </p>
                </div>
            </li>
            <li>
                <span class="left_icon"><img
                        src="https://images.51rz.com/images/pc/message/app/safe_app_icp.png"></span>
                <div class="right_cont">
                    <h4>ICP许可证获批</h4>
                    <p>
                        正式获批ICP许可证（增值电信业务经营许可证）平台运营资质获得权威认可，实现平台合规稳健经营，顺应监管，合规合法，争做行业标杆性品牌。
                    </p>
                </div>
            </li>
        </ul>

        <p class="label_title" style="margin:0.8rem 0 0.3rem;">风控体系</p>
        <div class="feng_kong_area">
            <p class="navs fengkong_navs">
                <span
                        v-for="(v,i) in ['供应链金融','消费金融']"
                        :class="currentNav==i?'active':''"
                        :text="v"
                        @click="selectNav(i)"
                >{{v}}</span>
            </p>
            <ul class="feng_kong_ul_tab">
                <li :class="currentNav==0?'':'hide'">
                    <p class="sub_title">
                        专注于供应链金融风控，切入供应链交易环节，通过严格的“1+4”银行标准贷前风控，时时监控的贷中、贷后管理及国内首创专属监管仓，结合交易场景+大数据+区块链+金融创新，实现全流程智能动态风控，将风险止于源头。
                    </p>
                    <div class="circle_wrap">
                        <div :class="`items_wraper gong_ying_lian ${'rotate'+currentRotate}`">
                            <label v-for="(v,i) in provideArr"
                                   :class="`item_cirle gong_ying_lian ${v.name} ${currentRotate==i?'active':''} ${'rotate'+currentRotate}`"
                                   @click="changeRotate(i)"
                                   data-rotate="0"
                                   data-label="gong_ying_lian" data-dir="bottom">
                                <img :src="v.imgUrl"/>
                                <p v-for="item in v.content">{{item}}</p>
                            </label>
                        </div>
                    </div>
                    <div v-for="(v,i) in provideArr"
                         :class="`tree gong_ying_lian ${v.name} ${currentRotate!=i?'fadeout':''}`">
                        <img :src="v.detailImg">
                    </div>
                </li>
                <li :class="currentNav==1?'':'hide'">
                    <p class="sub_title">
                        消费金融风控，应用场景+互联网金融大数据智能风控系统，多数据通道互备互补，强大的覆盖能力，满足各类消费金融的征信及风控需求。
                    </p>
                    <div class="circle_wrap">
                        <div :class="`items_wraper xiao_fei ${'rotate'+currentRotate}`">
                            <label v-for="(v,i) in consumeArr"
                                   :class="`item_cirle xiao_fei ${v.name} ${i==currentRotate?'active':''} ${'rotate'+currentRotate}`"
                                   @click="changeRotate(i)"

                            >
                                <img :src="v.imgUrl"/>
                                <p v-for="item in v.content">{{item}}</p>
                            </label>
                        </div>
                    </div>
                    <div v-for="(v,i) in consumeArr"
                         :class="`tree xiao_fei ${v.name} ${currentRotate!=i?'fadeout':''}`">
                        <img :src="v.detailImg">
                    </div>
                </li>
            </ul>
        </div>
        <p class="label_title" style="margin:4.5rem 0 0.6rem">技术保障</p>
        <div>
            <p class="navs jishu_navs">
                <span
                        v-for="(v,i) in ['银行级安全','高负载性能']"
                        :class="currentNav1==i?'active':''"
                        :text="v"
                        @click="selectNav1(i)"
                >{{v}}</span>
            </p>
            <ul class="ji_shu_bao_zhang_ul">
                <li :class="currentNav1==0?'':'hide'">
                    采用与央行同级别加密技术体系，使用阿里云服务器，24小时监控，实时备份，防黑客、抗攻击，防dos模块，确保平台安全稳定； 使用Https技术、128位SSL传输加密技术，不间断的确保交易数据安全。
                </li>
                <li :class="currentNav1==1?'':'hide'">
                    Linux架构+缓存技术+服务器分布式布置，多重权限管理体系，严格保护投资人的信息安全。
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'safety',
        data(){
            return {
                currentNav: 0,
                currentNav1: 0,
                currentRotate: 0,
                provideArr: [
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/message/app/safe_app_bank.png',
                        content: ['“1+4”银行', '级贷前风控'],
                        name: 'bottom',
                        detailImg: 'https://images.51rz.com/images/rebuild/wx/img/gyl_bank.png'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/message/app/safe_app_dun.png',
                        content: ['智能大数据', '全程风控'],
                        name: 'right',
                        detailImg: 'https://images.51rz.com/images/rebuild/wx/img/gyl_zhi_neng_big_data.png'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/message/app/safe_app_dong_tai_feng_xian.png',
                        content: ['风险预警', '贷后风控'],
                        name: 'top',
                        detailImg: 'https://images.51rz.com/images/pc/message/app/gyl_yu_jing_feng_kong1.png'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/message/app/safe_app_si_liu.png',
                        content: ['四流数据', '实时管控'],
                        name: 'left',
                        detailImg: 'https://images.51rz.com/images/rebuild/wx/img/gyl_si_liu.png'
                    },
                ],
                consumeArr: [
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/message/app/safe_app_dun.png',
                        content: ['大数据','综合风控'],
                        name: 'bottom',
                        detailImg: 'https://images.51rz.com/images/pc/message/app/xf_big_data.png'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/message/app/safe_app_dong_tai_feng_xian.png',
                        content: ['动态风险预警', '时时风控'],
                        name: 'right',
                        detailImg: 'https://images.51rz.com/images/rebuild/wx/img/xf_dong_tai_feng_xian.png'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/message/app/safe_app_user.png',
                        content: ['多维用户画像','方式贷前征信'],
                        name: 'top',
                        detailImg: 'https://images.51rz.com/images/rebuild/wx/img/xf_duo_wei_user.png'
                    },
                    {
                        imgUrl: 'https://images.51rz.com/images/pc/message/app/safe_app_jiao_yi.png',
                        content: ['真实交易应用','场景甄别风控'],
                        name: 'left',
                        detailImg: 'https://images.51rz.com/images/rebuild/wx/img/xf_true_jiao_yi.png'
                    },
                ],
            }
        },
        methods: {
            selectNav(index){
                this.currentNav = index
                this.currentRotate=0
            },
            selectNav1(index){
                this.currentNav1 = index
            },
            changeRotate(index){
                this.currentRotate = index
            }
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    img {
        width: 100%;
        display: block;
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
        padding-top: 0.4rem;
        background: url('https://images.51rz.com/images/rebuild/wx/img/infoPublicBg.jpg') center/cover no-repeat;
    }

    .label_title {
        line-height: 0.42rem;
        height: 0.42rem;
        font-size: 0.3rem;
        color: #fff;
        padding-left: 0.3rem;
        position: relative;
        text-align: center;
        background: url('https://images.51rz.com/images/rebuild/wx/img/titlebg.png') center center no-repeat;
        background-size: 5.34rem 0.08rem;

    }

    .navs {
        text-align: center;
    }

    .navs span {
        /*width: 1.5rem;*/
        height: 0.42rem;
        line-height: 0.42rem;
        position: relative;
        display: inline-block;
        margin-left: 0.4rem;
        color: #fff;
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

    .zijin_anquan_ul li {
        display: -webkit-flex;
        display: flex;
        margin-top: 0.6rem;
    }

    .zijin_anquan_ul li .left_icon {
        width: 2.28rem;
    }

    .zijin_anquan_ul li .left_icon img {
        width: 1.2rem;
        margin: 0 auto;
    }

    .zijin_anquan_ul li .right_cont {
        flex: 1;
    }

    .zijin_anquan_ul li .right_cont h4 {
        line-height: 0.4rem;
        font-size: 0.28rem;
        color: #fff;
        font-weight: normal;
        margin: 0 0 0.2rem 0;
    }

    .zijin_anquan_ul li .right_cont p {
        font-size: 0.24rem;
        color: #fff;
        line-height: 0.36rem;
    }

    .zijin_anquan_ul li .right_cont a {
        display: inline-block;
        color: #4992EC;
        font-size: 0.24rem;
        margin-top: 0.18rem;
    }

    /*风控体系*/
    .feng_kong_ul_tab {

    }

    .sub_title {
        margin: 0.6rem 0.8rem 0;
        color: #fff;
        font-size: 0.24rem;
        line-height: 0.33rem;
    }

    .circle_wrap {
        width: 2.9rem;
        height: 2.9rem;
        margin: 1.1rem auto 0;
        position: relative;
        background:url('https://images.51rz.com/images/rebuild/wx/img/safety-border.png') center center no-repeat;
        background-size: 2.42rem 2.42rem;
    }

    .circle_wrap .items_wraper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        -webkit-transition: all ease 600ms;
        -moz-transition: all ease 600ms;
        -ms-transition: all ease 600ms;
        -o-transition: all ease 600ms;
        transition: all ease 600ms;
    }

    .circle_wrap .item_cirle {
        display: block;
        width: 1.53rem;
        height: 1.53rem;
        position: absolute;
        z-index: 1;
        cursor: pointer;
        border: 0.012rem solid #e5e5e5;
        /*background: #fff;*/
        -webkit-border-radius: 50%;
        border-radius: 50%;
        -webkit-transition: all ease 600ms;
        transition: all ease 600ms;
    }

    .circle_wrap .item_cirle img {
        width: 0.48rem;
        margin: 0.1rem auto 0.02rem;
    }

    .circle_wrap .item_cirle p {
        font-size: 0.22rem;
        color: #fff;
        line-height: 0.33rem;
        text-align: center;
    }

    .circle_wrap .item_cirle.active {
        border: 0.012rem solid #4992EC;
    }

    .circle_wrap .item_cirle.active p {
        color: #fff;
    }

    .circle_wrap .items_wraper.rotate0 {

    }

    .circle_wrap .items_wraper.rotate1 {
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .circle_wrap .items_wraper.rotate2 {
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    .circle_wrap .items_wraper.rotate3 {
        -webkit-transform: rotate(270deg);
        -moz-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        -o-transform: rotate(270deg);
        transform: rotate(270deg);
    }

    .circle_wrap .item_cirle.top {
        top: -0.76rem;
        left: 50%;
        margin-left: -0.76rem;
    }

    .circle_wrap .item_cirle.left {
        top: 50%;
        left: -0.76rem;
        margin-top: -0.76rem;
    }

    .circle_wrap .item_cirle.right {
        top: 50%;
        left: 2.14rem;
        margin-top: -0.76rem;
    }

    .circle_wrap .item_cirle.bottom {
        bottom: -0.76rem;
        left: 50%;
        margin-left: -0.76rem;
    }

    .circle_wrap .item_cirle.rotate1 {
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        transform: rotate(-90deg);
    }

    .circle_wrap .item_cirle.rotate2 {
        -webkit-transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
        -ms-transform: rotate(-180deg);
        -o-transform: rotate(-180deg);
        transform: rotate(-180deg);
    }

    .circle_wrap .item_cirle.rotate3 {
        -webkit-transform: rotate(-270deg);
        -moz-transform: rotate(-270deg);
        -ms-transform: rotate(-270deg);
        -o-transform: rotate(-270deg);
        transform: rotate(-270deg);
    }

    .tree {
        width: 6.6rem;
        margin: 0.76rem 0 0 -3.3rem;
        box-shadow: 0 0 0 0.012rem #4992EC inset;
        border-radius: 0.05rem;
        -webkit-border-radius: 0.05rem;
        position: absolute;
        left: 50%;
        overflow: hidden;
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-transition: all ease 600ms;
        transition: all ease 600ms;
        z-index: 0;
    }

    .tree:after {
        content: '';
        display: block;
        width: 1.53rem;
        height: 1.53rem;
        background: #fff;
        border: 0.012rem solid #4992EC;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        position: absolute;
        left: 50%;
        margin-left: -0.765rem;
        top: -1.47rem;
    }

    .tree.fadeout {
        -webkit-transform: translateY(-100%);
        transform: translateY(-100%);
        opacity: 0;
    }

    /*技术保障*/
    .ji_shu_bao_zhang_ul {
        margin: 0.56rem 0.76rem 0;
        padding: 0 0 2rem;
    }

    .ji_shu_bao_zhang_ul li {
        color: #fff;
        font-szie: 0.24rem;
        line-height: 0.36rem;
        min-height: 1.44rem;
    }
</style>