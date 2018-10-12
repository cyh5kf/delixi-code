<!--红包加息券card
props :
status 0 可用 1 历史不可用

cardData:
status   0.可使用 1.已使用(历史红包） 2.未启用, 3.已过期

couponType        required           1:红包 2：加息券
cardData    required           加息券数据
clickType   no-required        select ：点击后选取
circleBg    no-required        圆环的背景颜色 white
-->
<template>
    <!--优惠券 -->
    <div class="cardItem" :class="[circleBg,{active:isActive(),lock:isLock(),jiaxi:couponType==2}]">
        <div class="left_money" v-if="couponType==1">
            <span v-text="cardData.up||0"></span>元
            <p >红包</p>
        </div>
        <div class="left_money" v-if="couponType==2">
            <span v-text="cardData.up||0"></span>%
            <p >加息券</p>
        </div>

        <div class="cont">
            <h4 v-text="cardData.name"></h4>
            <p v-text="moneyLimitText"></p>
            <p v-text="tenderLimitText"></p>
            <label v-if="cardData.status!=2">有效期：<span v-text="formatTime(cardData.endTimes)"></span></label>
            <label v-if="cardData.status==2 ">激活时间：<span v-text="formatTime(cardData.startTimes)"></span></label>
        </div>

        <p class="right_mes">
            <span v-if="clickType!='select'" v-html="rightText"></span>
            <slot v-if="clickType=='select'"></slot>
        </p>
        <span class="dashline before"></span>
        <span v-if="clickType!='select'" class="dashline after"></span>
    </div>
</template>
<script>
    export default {
        name: 'RedPacketCard',
        props:['cardData','status','couponType','clickType','circleBg'],
        methods: {
            isActive() {//可用
                return this.status == 0 && this.cardData.status == 0
            },
            isLock() {//可用 但未激活
                return this.status == 0 && this.cardData.status == 2
            },
            fullNum(num) {
                return num < 10 ? '0'+ num : num
            },
            formatTime(timeStamp) {
                const time = new Date(timeStamp)
                const year = time.getFullYear()
                const month = this.fullNum(time.getMonth()+1)
                const date = this.fullNum(time.getDate())
                return `${year}.${month}.${date}`
            }
        },
        computed: {
            moneyLimitText() {//红包使用金额限制文本
                const {
                    couponType,
                    minInterval,
                    useDate=0,
                    maxInterval,
                    rateAmount=0,
                } = this.cardData

                if(couponType==1) {//红包
                    if(!!minInterval) {
                        return `投资满${minInterval}元可用`
                    }else{
                        return '不限起投金额'
                    }
                }else if(couponType==2) {//加息券
                    const config=[
                        `最高加息本金${rateAmount}元，加息${useDate}天`,
                        `全额加息，加息${useDate}天`,
                        `最高加息本金${rateAmount}元`,
                        `全额加息`
                    ]
                    if(!!useDate){
                        return !!rateAmount ? config[0] : config[1]
                    }else{
                        return !!rateAmount ? config[2] : config[3]
                    }
                }
            },
            tenderLimitText() {//标的限制文本
                // signLimit  0.等于 1.大于 2.大于等于 3.小于 4.小于等于 5 区间
                const {
                    signLimit,
                    useTimeLimit=0,
                    userLimitInterval,
                } = this.cardData

                const redPacketconfig = [
                    `限投资${useTimeLimit}天标的`,
                    `${useTimeLimit}天以上标的可用`,
                    `${useTimeLimit}天及以上标的可用`,
                    `${useTimeLimit}天以下标的可用`,
                    `${useTimeLimit}天及以下标的可用`,
                    `${useTimeLimit}天至${userLimitInterval}天标的可用`,
                    '任意标的可用',
                ]
                if(!(useTimeLimit*1)) {
                    return redPacketconfig[6]
                }else{
                    return redPacketconfig[signLimit]
                }
            },
            rightText(){
                if(this.status == 0)  {//可使用
                    return this.cardData.status == 0?'立<br>即<br>使<br>用' : '待<br>激<br>活'
                }else if(this.status == 1){//历史优惠券   不可用
                    return this.cardData.status == 3?'已<br>过<br>期' : '已<br>使<br>用'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .cardItem{
        $LeftSize:2.1rem;
        $rightSize:0.86rem;
        $radioSize:0.32rem;
        $radioToLeft:1.6rem;
        @include box((bg:$white,p:0.24rem 0,m:0 0 0.3rem 0));
        @include thin(top right bottom left,#E5E5E5);
        position: relative;
        &:before,&:after{
            content:'';
            @include box((d:block,w:$radioSize,h:$radioSize / 2,bg:#F6F6F6,bdr:50%));
        }
        &.white{
            &:before,&:after{
                @include box((bg:$white));
            }
        }
        &:before{
            @include box((bdr:0  0 $radioSize / 2 $radioSize / 2));
            @include position((p:absolute,l:$radioToLeft,t: -0.02rem));
            @include thin(bottom right left,#E5E5E5);
        }
        &:after{
            @include box((bdr:$radioSize / 2 $radioSize / 2 0  0 ));
            @include position((p:absolute,l:$radioToLeft,b: -0.02rem));
            @include thin(top right left,#E5E5E5);
        }
        .dashline {
            @include box((w:0.02rem,d:block));
            @include position((p:absolute,t:0.3rem,b:0.3rem));
            /**@include bg_img('my_redCard_line.png');**/
            border-left:1px dashed #e5e5e5;
            &.before{
                left:$radioToLeft + $radioSize / 2
            }
            &.after{
                right:0.8rem;
            }
        }
        .left_money{
            @include box((w:$LeftSize,ta:center,fs:0.26rem,c:$gray));
            @include position((p:absolute,t:50%,l:0));
            @include prefix(transform,translateY(-50%));
            span{
                @include box((fs:0.6rem));
            }
            p{
                @include box((c:#ccc,fs:0.24rem));
            }
        }
        .cont{
            @include box((m:0.24rem $rightSize 0.24rem $LeftSize));
            h4{
                @include box((lh:0.4rem,fs:0.28rem,c:$gray,m:0 0 0.06rem 0));
            }
            p{
                @include box((lh:0.36rem,fs:0.24rem,c:$gray));
            }
            label{
                @include box((d:block,m:0.3rem 0 0 0,lh:0.33rem,fs:0.24rem,c:$gray));
            }
        }
        .right_mes{
            @include box((w:0.8rem,ta:center,fs:0.26rem,c:$gray));
            @include position((p:absolute,t:50%,r:0));
            @include prefix(transform,translateY(-50%));
        }
        &.active{
            .left_money,.right_mes{
                @include box((c:$yellow));
            }
            .left_money p{
                @include box((c:$black5));
            }
            .cont{
                h4{
                    color:$black2;
                }
                p{
                    color:$black5;
                }
                label{
                    color:$black9;
                }
            }
        }
        &.lock{
            .left_money,.right_mes{
                color:#FFCD84 ;
            }
            .left_money p{
                @include box((c:$black9));
            }
            .cont{
                h4,p,label{
                    color:$black9;
                }
            }
        }
        &.jiaxi.active{
            .left_money,.right_mes{
                @include box((c:$blue));
            }
        }
        &.jiaxi.lock{
            .left_money,.right_mes{
                color:#9FC3FF ;
            }
        }
    }

</style>