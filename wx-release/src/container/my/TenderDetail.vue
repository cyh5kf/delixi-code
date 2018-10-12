<template>
    <div class="wrap">
        <div class="no_lists" v-if="!dataLists.length">
            <div class="empty"></div>
            <p >标的集结号已经吹响，正在呼唤你来赚钱</p>
            <router-link class="jump_tender" to="/tender">马上投资</router-link>
        </div>
        <Scroll :getInitData="getInitData" :loadOver="loadOver">
            <div class="container">
                <ul class="detailWraper" v-for="(item,i) in dataLists" :key="i">
                    <li><label>标的名称</label><span v-text="item.bName"></span></li>
                    <li><label>投资金额</label><span v-text="item.money"></span></li>
                    <li><label>投资期限</label><span v-text="item.timeLimit"></span></li>
                    <li><label>年化利率</label><span v-text="item.apr+'%'"></span></li>
                    <li>
                        <label>协议</label>
                        <router-link v-for="(protocol,index) in item.protocolDtos||[]"
                                     tag="strong"
                                     :key="index"
                                     :to="protocolUrl(protocol,item)"
                        >
                            <i class="protocol" v-text="protocolName(protocol.name)">借款协议</i>
                        </router-link>
                    </li>
                </ul>
            </div>
        </Scroll>
    </div>
</template>
<script>
    import API from '@/api'
    import Scroll from '@/component/Scroll'
    import getParam from '@/lib/getParam'

    export default {
        name: 'TenderDetail',
        data() {
            return {
                tenderId: getParam(window.location.href,'tenderId'),//投资记录ID
                bigBorrowId: getParam(window.location.href,'bigBorrowId'),//大标ID
                status: getParam(window.location.href,'status'),//
                productType: getParam(window.location.href,'productType'),
                numPerPage: 10,
                pageNum: 1,
                totalPage: 0,
                loadOver: false,
                dataLists:[

                ]
            }
        },
        mounted() {

        },
        methods: {
            protocolName(name){
                if(name.search('借款协议-')==0){
                    return '借款协议'
                }else{
                    return name
                }
            },
            protocolUrl(protocol,activeTender){
                const {
                    productType
                }=this.$data

                return `/my/protocol?protocolId=${protocol.id}&tenderId=${activeTender.tId}&productType=${productType}&isBig=${activeTender.isBig?1:0}`
            },
            async getInitData(flag){
                if (flag) {
                    this.pageNum = 1
                } else {
                    this.pageNum++
                }
                const {
                    tenderId,
                    bigBorrowId,
                    status,
                    productType
                }=this.$data


                const param = {
                    tenderId,//投资记录ID
                    bid:bigBorrowId,//大标ID
                    numPerPage: this.numPerPage,
                    pageNum: this.pageNum,
                    productType
                }

                const obj = await API.post(API.myRChildTenderDetail,param)

                if (obj.recordList && obj.recordList.length > 0) {
                    if (flag) {
                        this.dataLists = obj.recordList
                    } else {
                        this.dataLists = this.dataLists.concat(obj.recordList)
                    }
                } else {
                    this.loadOver = true
                }
            }
        },
        computed: {

        },
        components: {
            Scroll
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        @include position((p:absolute,t:0,l:0,b:0,r:0));
    }
    .no_lists {
        @include box((p:2.6rem 0 0 0, m:0 auto));
        div {
            @include box((w:2.4rem, h:2.4rem, m:0 auto));
            &.empty{
                @include bg_img('my/no_my_tender_muji.png')
            }
        }
        p {
            @include box((fs:0.28rem, lh:0.4rem, ta:center, c:$black9))
        }
    }
    .jump_tender {
        @include box((d:block, w:3rem, h:0.88rem, lh:0.88rem, ta:center, fs:0.36rem, c:$red, bdr:0.44rem, m:0.9rem auto));
        @include thin(all, $red);
    }
    .container{
        @include box((p:0.3rem 0 0 0));
    }
    .detailWraper {
        @include box((m:0.3rem 0 0 0, bg:$white, p:0 0 0 0.3rem));
        li {
            @include box((lh:1rem, d:flex, p:0 0.3rem 0 0));
            &:not(:last-child) {
                @include thin(bottom, #E5E5E5);
            }
            label {
                flex: 1;
                @include box((fs:0.3rem, c:$black2));
            }
            span {
                flex: 1;
                text-align: right;
                @include box((fs:0.24rem, c:$black9));

            }
            strong{
                margin-left:0.3rem;
                font-weight: normal;
            }
            .protocol {
                @include box((c:$blue, fs:0.28rem, p:0 0.2rem, lh:0.48rem, d:inline-block, bdr:0.08rem));
                @include thin(top right bottom left, $blue);
            }
        }
    }
</style>
