<template>
    <div >
        <div class="no_lists" v-if="!recordList.length">
            <div></div>
            <p>无账单记录</p>
        </div>
        <div class="wraper">
            <Scroll :getInitData="getData" :loadOver="loadOver" v-show="recordList.length">
                <div class="month" v-for="(item,index) in recordList">
                    <p class="title" v-text="item.dateShow"></p>
                    <router-link :key="index" v-for="(data,index) in item.logArr"
                                 tag="div"
                                 :to="`/my/billDetail/${data.id}/${data.moneyStr}`"
                                 class="list">
                        <div class="box">
                            <div>
                                <p>
                                    <span class="type" v-text="data.typeName"></span>
                                    <span class="remark" v-text="data.remark"></span>
                                </p>
                                <p class="date" v-text="data.creatDate"></p>
                            </div>
                            <div class="money" v-text="data.moneyStr"></div>
                        </div>
                    </router-link>
                </div>
            </Scroll>
        </div>

    </div>
</template>
<script>
    import API from '@/api'
    import Scroll from '@/component/Scroll'
    export default {
        name: 'bill',
        data() {
            return {
                numPerPage: 12,
                pageNum: 1,
                loadOver: false,
                recordList: []
            }
        },
        methods: {
            async getData(flag) {
                if (flag) {
                    this.pageNum = 1
                } else {
                    this.pageNum++
                }
                const param = {
                    type: 'all',
                    numPerPage: this.numPerPage,
                    pageNum: this.pageNum
                }
                const data = await API.post(API.findAccountLogs, param)
                if (data.recordList && data.recordList.length > 0) {
                    if (flag) {
                        this.recordList = data.recordList
                    } else {
                        this.recordList = this.recordList.concat(data.recordList)
                    }
                } else {
                    this.loadOver = true
                }
            }
        },
        components: {
            Scroll
        }
    }
</script>
<style lang="scss" scoped>
    .wraper{
        overflow: hidden;width: 100%;
        @include position((p:absolute, t:0, b:0));
    }

    .no_lists {
        @include box((m:2.6rem auto));
        div {
            @include box((w:2.4rem, h:2.4rem, m:0 auto));
            @include bg_img('my/empty_my_zhangdan.png')
        }
        p {
            @include box((fs:0.28rem, lh:0.4rem, ta:center, c:$black9))
        }
    }

    .month {
        .title {
            @include box((c:$black3, fs:0.28rem, lh:0.68rem, m:0 0.3rem));
        }
        .list {
            @include box((bg:$white));
            &:not(:last-child) {
                .box {
                    @include thin(bottom, #ddd);
                }
            }
            .box {
                margin-left: 0.3rem;
                @include box((p:0.2rem 0, d:flex, fs:0.24rem, lh:0.34rem, h:1.2rem));
                div {
                    @include box((fx:1));
                    &:first-child{
                        @include box((fx:3));
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        p{
                            white-space:nowrap;
                            text-overflow:ellipsis;
                            overflow:hidden;
                        }
                    }
                }
                .money {
                    @include box((p:0 0.3rem, ta:right, fs:0.28rem, c:$black5));
                }
                .type {
                    @include box((c:$black2, fs:0.28rem));
                    margin-bottom: 0.1rem;
                }
                .date {
                    @include box((c:#ccc, p:0.1rem 0 0 0));
                }
                .remark {
                    @include box((c:$black9, m:0 0.1rem));
                }
            }
        }
    }
</style>