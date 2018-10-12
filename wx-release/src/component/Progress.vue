<template>
    <div>
        <!--个人中心的投资进度-->
        <ul v-if="from === 'myTenterLists'" class="myTenterLists_ul">
            <li v-for="(item,i) in listData"
                :class="{active:item.isHighlight,unreach:!item.isCheck}" :key="i">
                <h3 v-if="item.content" >
                    <span v-text="item.content"></span>
                    <span v-if="item.interest">
                        <span v-if="item.amount" v-text="'本金'+item.amount"></span>
                        <span v-if="item.interest" v-text="'利息'+item.interest.toLocaleString()"></span>
                    </span>
                </h3>
                <p class="title_desc" v-if="item.supplyExplain" v-text="item.supplyExplain"></p>
                <p class="time" v-if="item.happenTime" >
                    {{item.happenTime}}
                    <a v-if="item.borrowRateOfProgressDto && item.borrowRateOfProgressDto.length" @click="onClickDetail(item)">查看详情>></a>
                </p>
            </li>
        </ul>
        <!--标的详情的投资进度-->
        <ul v-if="from === 'buy'" class="tender_detail_ul">
            <li v-for="(item,i) in listData"
                :class="{active:i==activeIndex && item.show,unreach:!item.show}" :key="i">
                <p class="time" v-text="item.time"></p>
                <span class="icon"></span>
                <h3 v-if="item.name" v-text="item.name"></h3>
                <p class="title_desc" v-if="item.desc" v-text="item.desc"></p>
            </li>
            <div class="vertical-line"></div>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'Progress',
        props:['listData','from','onClickDetail'],
        computed: {
            activeIndex() {
                let activeIndex = 0   //设置当前的激活态的索引
                this.listData.forEach((item,index) => {
                    if(item.show) activeIndex = index
                })
                return activeIndex
            }
        }
    }
</script>
<style lang="scss" scoped>
    $green: #8CBE37;

    .tender_detail_ul {
        $Line_l: -0.5rem;
        @include box((m:0 0 0 2.02rem));
        position: relative;

        .vertical-line {
            @include box((w: 1px, h: 5.4rem, bg:#E5E5E5));
            position: absolute;
            top: 0.1rem;
            left: 1.73rem;
            z-index: 0;
        }

        li {
            @include box((m:0 0 0.36rem 0));
            min-height:0.7rem;
            position: relative;
            h3 {
                @include box((lh:0.37rem, fs:0.26rem, c:$black5, fw:normal, m:0 0 0 0.45rem, p:0 0.3rem 0 0, fl: left));
                position: relative;
            }
            .icon {
                $size: 0.12rem;
                content: '';
                margin-top: 0.1rem;
                @include box((d:block, w:$size, h:$size, bg:#E5E5E5, bdr:50%));
                position: absolute;
                left: 1.68rem;
                top: 0;
                z-index: 1;
            }
            .title_desc {
                @include box((fs:0.2rem, c:$black9, m:0.07rem 0 0 0, fl: left));
            }
            .time {
                @include box((w: 1.73rem, h: 0.26rem, c:$black9, fs:0.26rem, fl: left));
                a{
                    @include box((c:$blue));
                }
            }
            &.active {
                h3 {
                    @include box((c:$green));
                }

                .icon {
                    @include box((bg:$white));
                    box-shadow: 0 0 0 0.08rem $green;
                }
            }
            &.unreach {
                h3 {
                    @include box((c:#ccc));
                }
                .time {
                    @include box((c:#ccc));
                }
            }
        }
    }

    .myTenterLists_ul {
        $Line_l: -0.5rem;
        @include box((m:0 0 0 1.2rem));
        position: relative;
        &:before {
            content: '';
            @include box((d:block, w:0.01rem, bg:#E5E5E5));
            @include position((p:absolute, l:$Line_l, t:0.18rem, b:0.18rem));
        }
        li {
            @include box((m:0 0 0.36rem 0));
            min-height:0.7rem;
            h3 {
                @include box((lh:0.37rem, fs:0.26rem, c:$black5, fw:normal,p:0 0.3rem 0 0));
                position: relative;
                &:before {
                    $size: 0.12rem;
                    content: '';
                    @include box((d:block, w:$size, h:$size, bg:#E5E5E5, bdr:50%, m:- $size /2 0));
                    @include position((p:absolute, t:50%, l:$Line_l - $size / 2));
                }
            }
            .title_desc {
                @include box((fs:0.2rem, c:$black9, m:0.07rem 0 0 0));
            }
            .time {
                @include box((c:$black9, fs:0.26rem, m:0.07rem 0 0 0));
                a{
                    @include box((c:$blue));
                }
            }
            &.active {
                h3 {
                    @include box((c:$green));
                    &:before {
                        @include box((bg:$white));
                        box-shadow: 0 0 0 0.08rem $green;
                    }
                }
            }
            &.unreach {
                h3 {
                    @include box((c:#ccc));
                }
                .time {
                    @include box((c:#ccc));
                }
            }
        }
    }
</style>