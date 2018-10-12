<template>
    <div class="container">
        <div class="content">
            <div class="banner"></div>
            <section class="section1">
                <div class="title"><img src="https://images.51rz.com/images/rebuild/wx/img/welfare-title1.png" alt=""></div>
                <div class="meeting">
                    <img src="https://images.51rz.com/images/rebuild/wx/img/welfare1-1.png" alt="">
                    <img src="https://images.51rz.com/images/rebuild/wx/img/welfare1-2.png" alt="">
                    <img src="https://images.51rz.com/images/rebuild/wx/img/welfare1-3.png" alt="">
                </div>
                <div v-if="info.uid||this.uid" class="btn">已注册</div>
                <div v-else class="btn">
                    <a href="/register">注册即送60元红包</a>
                </div>
            </section>
            <section class="section2">
                <div class="title"><img src="https://images.51rz.com/images/rebuild/wx/img/welfare-title2.png" alt=""></div>
                <ul>
                    <li>新手标</li>
                    <li><p style="color:#fc675e">11<span>% - </span>15<span>%</span><br/><em>历史年化收益率</em></p></li>
                    <li><p>7<span>天 - </span>1<span>个月</span><br/><em>投资期限</em></p></li>
                </ul>
            </section>
            <section class="section3">
                <div class="title"><img src="https://images.51rz.com/images/rebuild/wx/img/welfare-title3.png" alt=""></div>
                <ul>
                    <li v-for="(v,i) in welfareArr" :class="v.status==0||v.status==1?'active':''">
                        <div class="img" :style="'background-image: url(https://images.51rz.com/images/rebuild/wx/img/welfare'+i+'.png)'">
                            <img src="https://images.51rz.com/images/rebuild/wx/img/get_welfare.png" alt="">
                        </div>
                    </li>
                </ul>
                <div class="btn">
                    <a href="/tender/index">去投资享福利</a>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import API from '@/api'
    export default {
        name: 'Welfare',
        data(){
            return {
                welfareArr: [
                    {
                        status: 7
                    },
                    {
                        status: 7
                    },
                    {
                        status: 7
                    },
                    {
                        status: 7
                    }
                ],
                uid: this.getUrlParam('uid') || 0
            }
        },
        methods:{
            getUrlParam(name) {
                const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg)  //匹配目标参数
                if (r != null) return unescape(r[2]);
                return null //返回参数值
            },
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        async mounted(){
            if(!!this.info.uid){
                const welfareObj=await API.get(API.upRedPacket,{sourceType:6});
                const welfareArr=!!welfareObj.recordList||[];
                if(welfareArr.length)this.welfareArr=welfareArr;
            }
        },

    }
</script>
<style lang="scss" scoped>
    .container{
        background: #d93618;
        padding-bottom: 0.7rem;
    }
    /*.content {*/
        /**/
    /*}*/

    .banner {
        @include box((w:100%, h:5.06rem));
        margin-bottom: 0.7rem;
        //background: url('https://images.51rz.com/images/rebuild/wx/img/welfare-banner.png') center/cover no-repeat;
        background: url('https://images.51rz.com/images/rebuild/wx/img/welfare_banner_01.png') center/cover no-repeat;

    }

    section {
        @include box((w:6.9rem, m:0 auto 1.1rem, bg:#fff));
        .title {
            margin-bottom: 0.2rem;
            img {
                @include box((h:0.5rem, d:block, m:0 auto));
                position: relative;
                top: -0.41rem;
            }
        }
        .btn {
            @include box((fs:0.24rem, w:3rem, h:0.6rem, bdr:0.3rem, m:0 auto, ta:center, lh:0.6rem, c:#999, bg:#e5e5e5));
            a {
                @include box((d:block, w:100%, h:100%, c:#fff, bdr:0.3rem));
                box-shadow: 0 0.04rem 0.2rem rgba(236, 105, 0, 0.43);
                background: linear-gradient(to right, #ff6944, #ffa655);
            }
        }
    }

    .section1 {
        padding-bottom: 0.7rem;
        .meeting {
            text-align: center;
            img {
                width: 2.25rem;
                margin-bottom: 0.4rem;
            }
        }
    }

    .section2 {
        @include box((p:0 0.2rem 0.55rem));
        ul {
            width: 100%;
            height: 0.81rem;
            li {
                @include box((w:33.33%, fl:left, ta:center, fs:0.36rem, c:#222));
                p {
                    @include box((fs:0.48rem, lh:0.3rem));
                    span {
                        font-size: 0.2rem;
                    }
                    em {
                        font-size: 0.2rem;
                        color: #999;
                    }
                }
            }
        }
    }

    .section3 {
        @include box((ta:center,));
        padding-bottom:0.7rem;
        ul {
            @include box((w:100%));
            li {
                width: 100%;
                float: left;
                .img {
                    @include box((w:4.65rem, h:2.29rem, m:0 auto 0.6rem));
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    position: relative;
                    img {
                        width: 1.1rem;
                        @include position((p:absolute, t:-0.31rem, r:-0.2rem));
                        display: none
                    }
                }
                &.active {
                    .img {
                        img {
                            display: block;
                        }
                    }
                }
                &:first-child, &:nth-child(2) {
                    width: 50%;
                    .img {
                        @include box((w:2.57rem, h:2.29rem, m:0 auto 0.6rem));
                    }
                }
            }
            &:after {
                content: '';
                display: block;
                width: 0;
                height: 0;
                clear: both;
            }
        }

    }

    .section4 {
        @include box((p:0 0.23rem 0.7rem));
        margin-bottom: 0rem;
        p{
            @include box((p:0.2rem 0.27rem 0,fs:0.24rem,c:#666,lh:0.42rem))
        }
    }

</style>