<template>
    <div>
        <div class="no_lists" v-if="!recordList.length">
            <div></div>
            <p>你已经领先其他人一步了！</p>
        </div>
        <p class="title"><span>投资人/时间</span><label>金额(元)</label></p>
        <div class="investor_record">
            <Scroll :getInitData="getData"
                    :getPos="getPos"
                    :loadOver="loadOver"
                    v-show="recordList.length">
                <ul>
                    <li v-for="(item,index) in recordList">
                        <p>
                            <span v-text="item.realName"></span>
                            <label v-text="item.money.toLocaleString()"></label>
                        </p>
                        <p v-text="item.addTime"></p>
                    </li>
                </ul>
            </Scroll>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    import Scroll from '@/component/Scroll'

    export default {
        name: 'RecordLists',
        props: ['getPos'],
        data(){
            return {
                bid: this.$route.params.bid,//tender id
                productType: this.$route.params.productType,
                recordList: [],
                pageNum: 1,
                numPerPage: 10,
                loadOver: false,
            }
        },
        methods: {
            async getData(flag){
                if (flag) {
                    this.pageNum = 1
                } else {
                    this.pageNum++
                }
                const param = {
                    bid: this.$data.bid,
                    productType: this.productType,
                    numPerPage: this.numPerPage,
                    pageNum: this.pageNum
                }
                const data = await API.post(API.detailTenderList, param)
                if (data.recordList && data.recordList.length > 0) {
                    if (flag) {
                        this.recordList = data.recordList
                    } else {
                        this.recordList = this.recordList.concat(data.recordList)
                    }
                } else {
                    this.loadOver = true
                }
            },
        },
        components: {
            Scroll
        }
    }
</script>
<style lang="scss" scoped>
    .no_lists {
        @include box((p:2.6rem 0 0 0, m:0 auto));
        div {
            @include box((w:2.4rem, h:2.4rem, m:0 auto));
            @include bg_img('my/no_tender_lists.png')
        }
        p {
            @include box((fs:0.28rem, lh:0.4rem, ta:center, c:$black9))
        }
    }

    .container {
        position: relative;
        padding-top: 0.01rem;
        $beforeAfterH: 0.5rem;

        &:before {
            content: attr(up);
            @include position((p:absolute, l:0, t:- $beforeAfterH, z:10));
            @include box((w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH))
        }
        &:after {
            content: attr(down);
            @include position((p:absolute, l:0, b:- $beforeAfterH, z:10));
            @include box((d:block, w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH));
        }
    }
    .title {
        @include box((lh:1rem, fs:0.3rem, c:$black2, p:0 0.3rem,bg:$white));
        label {
            float: right;
        }
    }
    .investor_record {
        @include box((p:0 0.3rem, bg:$white));
        @include position((p:absolute, t:1rem, b:0,r:0,l:0));
        li {
            @include box((p:0.24rem 0));
            &:not(:last-child) {
                @include thin(bottom, #e5e5e5);
            }
            p:first-child {
                @include box((fs:0.28rem, c:$black5, lh:0.4rem));
                label {
                    float: right;
                }
            }
            p:nth-child(2) {
                @include box((fs:0.24rem, c:$black9, lh:0.34rem));
            }
        }
    }
</style>
