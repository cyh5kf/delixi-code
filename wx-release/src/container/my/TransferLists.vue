<template>
    <div class="wraper">
        <div class="no_lists" v-if="!recordList.length">
            <div></div>
            <p>暂无转让！</p>
        </div>
        <Scroll v-show="recordList.length"
                class="transfer_ul"
                :getInitData="getInitData"
                :loadOver="loadOver">
            <div v-for="(item,index) in recordList" :key="index" class="transfer_item">
                <p class="title">
                    <span :class="{black9:item.status===3}" v-text="item.bondName">众**0000号</span>
                    <label class="normal" v-if="item.remainsDays">剩余<i v-text="item.remainsDays"></i>天可转让</label>
                    <router-link class="btn" tag="label" :to="'/my/transfer/'+item.tenderId+'/'+item.bondId"
                                 v-if="transferStatus(item)==1">转让
                    </router-link>
                    <label class="btn" v-if="transferStatus(item)==2" @click="openCancelTransferBtn(item)">取消转让</label>
                    <label class="black9" v-if="transferStatus(item)==3">已转让</label>
                </p>
                <div class="content" :class="{has_zhuan_rang:transferStatus(item)==3}">
                    <p><span>投资本金</span><label v-text="item.soldCapital">00,000</label></p>
                    <p><span>预期年化</span><label :class="{red:transferStatus(item)!=3}"
                                               v-text="item.bondApr+'%'">0%</label></p>
                    <p><span>投标时间</span><label v-text="item.tenderTime">2017-00-00</label></p>
                    <p><span>到期时间</span><label v-text="item.repaymentTime">2017-00-00</label></p>
                    <p><span>持有时间</span><label v-text="item.holdDays+'天'">00天</label></p>
                </div>
            </div>
        </Scroll>
        <ConfirmDialog :show="showCancelTransferDialog"
                       :title="'提示'"
                       :text="'您确定要取消当前转让？'"
                       :close="closeCancelTransfer"
                       :confirm="cancelTransfer"
        />
    </div>
</template>
<script>
    import Scroll from '@/component/Scroll'
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'
    import dateFormat from '@/lib/dateFormat'
    import ConfirmDialog from '@/component/ConfirmDialog'

    export default {
        name: 'TransferLists',
        data() {
            return {
                numPerPage: 10,
                pageNum: 1,
                totalPage: 0,
                loadOver: false,
                recordList: [//status 0 不可转让 1 可转让 2 转让中 3 已转让
                ],
                activeItem: null,//当前激活的转让标
                showCancelTransferDialog: false,//显示取消转让的确认弹框
            }
        },
        mounted() {

        },
        methods: {
            ...mapActions([
                'showMsg',
            ]),
            async getInitData(flag){
                if (flag) {
                    this.pageNum = 1
                } else {
                    this.pageNum++
                }

                let param = {
                    numPerPage: this.numPerPage,
                    pageNum: this.pageNum
                }

                let obj = await API.post(API.myTransferLists, param)

                if (obj.recordList && obj.recordList.length > 0) {
                    if (flag) {
                        this.recordList = obj.recordList
                    } else {
                        this.recordList = this.recordList.concat(obj.recordList)
                    }
                } else {
                    this.loadOver = true
                }
            },
            closeCancelTransfer(){
                this.$data.showCancelTransferDialog = false
            },
            openCancelTransferBtn(item){//这里需要有一个确认弹框
                this.$data.showCancelTransferDialog = true
                this.$data.activeItem = item
            },
            async cancelTransfer(){
                const item = this.$data.activeItem

                const param = {
                    uid: this.info.uid,
                    bondId: item.bondId,//债权标id
                }
                this.$data.showCancelTransferDialog = false
                let obj = await API.post(API.cancelTransfer, param)
                if (obj) {//取消转让成功
                    this.showMsg('取消转让成功')
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                }
            },
            transferStatus(item){ //status 0 不可转让 1 可转让 2 转让中 3 已转让

                const {
                    remainsDays, //剩余？天可转让（等于0时显示转让或取消转让按钮）
                    status,      //债权状态 1：显示取消转让按钮 3：已转让
                } = item
                if (remainsDays == 0) {//可转让 或可取消
                    if (status == 1) {//可取消
                        return 2
                    } else if (status == 3) {//已转让
                        return 3
                    } else {
                        return 1
                    }
                } else {//还未到可转让时间
                    return 0
                }
            }
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        components: {
            Scroll,
            ConfirmDialog
        }
    }
</script>
<style lang="scss" scoped>
    .wraper{
        overflow: hidden;width: 100%;
        @include position((p:absolute, t:0, b:0));
    }
    .no_lists {
        @include box((p:2.6rem 0 0 0, m:0 auto));
        div {
            @include box((w:2.4rem, h:2.4rem, m:0 auto));
            @include bg_img('my/no_my_transfer.png')
        }
        p {
            @include box((fs:0.28rem, lh:0.4rem, ta:center, c:$black9))
        }
    }

    .transfer_ul {
        .transfer_item {
            @include box((p:0.2rem 0 0 0));
            .title {
                @include box((bg:$white, h:1rem, p:0 0.3rem 0 0.3rem));
                @include thin(bottom, #E5E5E5);
                span {
                    @include box((lh:1rem, fs:0.3rem, c:$black2));
                    &.black9 {
                        color: $black9
                    }
                }
                label {
                    @include box((lh:0.48rem, fs:0.28rem, p:0 0.2rem, fl:right, m:0.26rem 0));
                    i {
                        color: $red;
                    }
                    &.btn {
                        @include box((c:$blue, bdr:0.1rem));
                        @include thin(all, $blue);
                    }
                }
            }
            .content {
                @include box((bg:$white, p:0.1rem 0.3rem 0.1rem 0.3rem));
                p {
                    @include box((lh:0.37rem, fs:0.26rem, m:0.1rem 0));
                    span {
                        @include box((c:$black9));
                    }
                    label {
                        @include box((c:$black5, fl:right));
                        &.red {
                            @include box((c:$red));
                        }
                    }
                }
                &.has_zhuan_rang {
                    p {
                        label {
                            @include box((c:$black9));
                        }
                    }
                }
            }
        }
    }


</style>

