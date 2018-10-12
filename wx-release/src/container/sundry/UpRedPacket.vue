<template>
    <div>
        <!--优惠券 -->
        <div class="wrap" v-if="!getOver">
            <div class="cardItem"
                 v-for="(item,index) in list"
                 :class="[{
                 active:isActive(item.status),
                 lock:isLock(item.status),
                 jiaxi:item.couponType==2}]">
                <div class="left_money" v-if="item.couponType==1">
                    <span v-text="item.amount||0"></span>元
                    <p >红包</p>
                </div>
                <div class="left_money" v-if="item.couponType==2">
                    <span v-text="item.upApr||0"></span>%
                    <p>加息券</p>
                </div>

                <div class="cont">
                    <h4 v-text="item.name"></h4>
                    <p v-text="moneyLimitText(item)"></p>
                    <p v-text="tenderLimitText(item)"></p>
                    <label v-text="getDescText(item)"></label>
                </div>

                <p class="right_mes">
                <span @click="tender(item.status)"
                      v-html="rightText(item.status)"></span>
                </p>
                <span class="dashline before"></span>
                <span class="dashline after"></span>
            </div>
        </div>
        <div class="getOverBg" v-if="getOver">
            <a href="/my/redPacket" class="getOver" v-if="getOver">
            </a>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    import getParam from '@/lib/getParam'
    export default {
        name: 'upRedPacket',
        data() {
            return {
                list: [],
                getOver: false,
            }
        },
        methods: {
            isActive(status) {//可用
                return status == 0
            },
            isLock(status) {//可用 但未激活
                return status == 2 || status == 7
            },
            fullNum(num) {
                return num < 10 ? '0'+ num : num
            },
            formatTime(startTime,endTime) {
                return Math.ceil((endTime - startTime)/(1000*60*60*24))
            },
            async getInitData() {
                const obj = await API.get(API.upRedPacket,{token:getParam(window.location.href,'token')})
                if(obj.oldUser) {
                    this.getOver = true
                }else {
                    this.list = obj.recordList
                }
            },
            moneyLimitText(item) {//红包使用金额限制文本

                const {
                    couponType,
                    minInterval,
                    useDate=0,
                    rateAmount=0,
                } = item

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
            tenderLimitText(item) {//标的限制文本
                // signLimit  0.等于 1.大于 2.大于等于 3.小于 4.小于等于 5 区间
                const {
                    signLimit,
                    useTimeLimit=0,
                    userLimitInterval,
                } = item

                const redPacketconfig = [
                    `限投资${useTimeLimit}天产品`,
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
            getDescText(item) {
                const {
                    status,
                    sourceType,
                    tenderTimes,
                    startTime,
                    endTime,
                } = item
                let text = ''
                if(sourceType === 1) {
                    text = `注册即送(${this.formatTime(startTime,endTime)}天有效)`
                }else if(sourceType === 6) {
                    if(status === 0) {
                        text = `已激活(${this.formatTime(startTime,endTime)}天有效)`
                    }else {
                        text = `第${tenderTimes}次投资成功后激活`
                    }
                }
                return text
            },
            rightText(status){
                let text = ''
                switch (status) {
                    case 0:
                        text = '立<br>即<br>使<br>用'
                        break
                    case 1:
                        text = '已<br>使<br>用'
                        break
                    case 2:
                    case 7:
                        text = '待<br>激<br>活'
                        break
                    case 3:
                        text = '已<br>过<br>期'
                        break
                }
                return text
            },
            tender(status) {
                if(status===0) {
                    window.location.href = '/tender'
                }
            }
        },
        mounted() {
            this.getInitData()
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        @include box((p:0.3rem));
    }
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
    .getOverBg{
        @include position((p:absolute,t:0,l:0));
        @include box((w:100%,h:100%,bg:#fdca7e));
    }
    .getOver{
        @include bg_img('packetBg.png');
        @include box((d:block,w:100%,h:12rem));
    }
</style>