<template>
    <div class="wraper">
        <Scroll :getInitData="getInitData"
                :loadOver="loadOver">
            <MessageCard v-for="(item,i) in dataLists" :key="i"
                         :cardData="item"
                         :timeKey="'createTimes'"
                         :titleKey="'title'"
                         :contentKey="'content'"
                         :imgKey="'picPath'"
            >
                <!--<a class="footer" :href="'/my/message/detail/'+item.id" slot="footer">-->
                    <!--查看详情-->
                <!--</a>-->
            </MessageCard>
        </Scroll>
    </div>
</template>

<script>
    import MessageCard from '@/component/MessageCard'
    import Scroll from '@/component/Scroll'
    import API from '@/api'

    export default {
        name: 'system',
        data(){
            return {
                numPerPage: 10,
                pageNum: 1,
                totalPage: 0,
                loadOver: false,
                dataLists: []
            }
        },
        mounted() {
            this.read()
        },
        methods: {
            async getInitData(flag){
                if (flag) {
                    this.pageNum = 1
                } else {
                    this.pageNum++
                }

                let param = {
                    siteId: 3,
                    numPerPage: this.numPerPage,
                    pageNum: this.pageNum
                }
                let obj = await API.get(API.getNoticeList, param)

                if (obj.recordList && obj.recordList.length > 0) {
                    if (flag) {
                        this.dataLists = obj.recordList
                    } else {
                        this.dataLists = this.dataLists.concat(obj.recordList)
                    }
                } else {
                    this.loadOver = true
                }
            },
            async read() {
                await API.get(API.readNotice)
            }
        },
        components: {
            MessageCard,
            Scroll
        }
    }
</script>
<style lang="scss" scoped>
    .wraper{
        overflow: hidden;width: 100%;
        @include position((p:absolute, t:0, b:0));
    }
</style>
