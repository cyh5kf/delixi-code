<template>
    <div class="wrap">
        <div class="card">
            <div class="apr">
                <div>
                    <p><span class="fs36">15</span>%</p>
                    <p>新手专享标</p>
                </div>
                <div>
                    <p><span class="fs36">1716</span>元</p>
                    <p>投资红包</p>
                </div>
                <div>
                    <p class="color"><span class="fs36">10</span>元</p>
                    <p>现金</p>
                </div>
            </div>
            <p class="tip">1716元红包已入账</p>
            <router-link to="/index" class="btn">立即投资</router-link>
            <div class="btn_text">温馨提示：市场有风险，出借需谨慎。</div>
        </div>
        <div class="rule">
            <p>-&nbsp;活动细则&nbsp;-</p>
            <p>1、10元现金属于受邀专属福利，自注册起30天内累计投资任意标满5000元即可获得;
            </p>
            <p>2、1716元红包仅限第一次注册人众金服的新用户专享，
                愿祝您投资一笔之力；
            </p>
            <p>3、红包由150元注册红包以及1566元任务红包组成，任务红包在
                您投资过程中获得。
            </p>
        </div>
        <a class="down" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.rd.rozo360"></a>
    </div>
</template>
<script>
    export default {
        name: 'success',
        data() {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        @include box((bg:#fff3d2,w:100%,h:100%,p:0.6rem 0.4rem));
        @include position((p:absolute,z:1));
    }
    .card{
        @include box((w:6.7rem,h:4.92rem,ta:center));
        @include bg_img('registerSuccess1_mar3.png');
        .apr{
            @include box((d:flex,p:0.6rem 0 0.78rem 0));
            div{
                @include box((fx:1,w:50%));
                p{
                    @include box((fs:0.26rem,c:#999));
                    &:first-child {
                        color: #222;
                    }
                    &.color {
                        @include box((c:#ff8746));
                    }
                    .fs36 {
                        font-size: 0.36rem;
                    }
                    span{
                        @include box((fs:0.72rem));
                    }
                }
            }
        }
    }
    .btn_text{
        width:100%;
        text-align:center;
        font-size:0.22rem;
        color:#555;
        display:inline-block;
        padding:0.1rem 0 0.1rem 0;
    }
    .tip{
        @include box((c:#ff7007,fs:0.28rem, h:0.9rem,lh:0.9rem));padding-left: 0.4rem;
    }
    .btn{
        @include box((d:block,w:5.9rem,bg:#ffa312,m:0 auto,c:#fff,fs:0.36rem,lh:0.8rem,ta:center,bdr:0.08rem));
    }
    .rule{
        @include box((c:#555,fs:0.24rem,lh:0.36rem));margin-top: 0.2rem;
        p:first-child{
            @include box((fs:0.3rem,ta:center, c:#222,lh:0.48rem));
        }
    }
    .down{
        @include box((w:100%,h:2rem));
        @include position((p:fixed,b:0,l:0,z:2));
        @include bg_img('registerSuccess2_mar3.png');
    }
</style>