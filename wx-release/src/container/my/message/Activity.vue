<template>
    <div>
        <a v-for="(activity,i) in dataLists"
           class="card"
           :href="`${activity.linkurl}?uid=${info.uid}`">
            <div class="wraper">
                <img :src="activity.imgUrl" class="activityImg"/>
                <div class="footer">
                    <h5 :class="titleClass(activity)" v-text="activity.title"></h5>
                    <p class="timeText" v-text="timeText(activity)"></p>
                    <label class="statusText" :class="statusClass(activity)" v-text="statusText(activity)"></label>
                </div>
            </div>
        </a>
    </div>
</template>
<script>
    import MessageCard from '@/component/MessageCard'
    import Scroll from '@/component/Scroll'
    import {mapGetters, mapActions} from 'vuex'
    import API from '@/api'
    import dateFormat from '@/lib/dateFormat'

    export default {
        name: 'Activity',
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
            this.getInitData()
        },
        methods: {
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
                let obj = await API.get(API.getNoticeBannerList,param)
                if (obj && obj.length > 0) {
                    if (flag) {
                        this.dataLists = obj
                    } else {
                        this.dataLists = this.dataLists.concat(obj)
                    }
                } else {
                    this.loadOver = true
                }
            },
            titleClass(activity){
                if(activity.downDate){
                    return new Date(activity.downDate)>new Date()?'disabled':''
                }
            },
            timeLeft(lastTime){
                let sec = lastTime
                let _formatStr = ""
                if (sec <= 0) {
                    _formatStr = ''
                } else {
                    let _day = Math.floor(sec / (24 * 3600)) || 0
                    let _hour = Math.floor((sec % (24 * 3600)) / 3600) || 0
                    let _min = Math.floor((sec % 3600) / 60) || 0
                    let _sec = Math.floor(sec % 60) || 0
                    _formatStr = `${_day}天${_hour}小时${_min}分`
//                    setTimeout(() => {
//                        lastTime = sec - 1
//                    }, 1000*60)
                }

                return _formatStr
            },
            timeText(activity){
                if(!activity.downDate){
                    return '长期活动'
                }else{
                    if(!activity.endSecond){//活动已结束
                        return '已结束'
                    }else{
                        return `距结束还有 ${this.timeLeft(activity.endSecond)}`
                    }
                }
            },
            statusText(activity){
                return !activity.downDate || activity.endSecond ? '进行中' : '已结束'
            },
            statusClass(activity){
                return !activity.downDate || activity.endSecond ? '' :  'disabled'
            }
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        components: {
            MessageCard,
            Scroll
        }
    }
</script>
<style lang="scss" scoped>
    .card{
        @include box((p:0.3rem 0.3rem 0 0.3rem,d:block));
        .wraper{
            @include box((bg:$white));
            .activityImg{
                @include box((w:100%,d:block));
                min-height:2.9rem;
            }
            .footer{
                @include box((p:0.2rem 0 0.2rem 0.3rem));
                position: relative;
                h5{
                    @include box((lh:0.4rem,fs:0.28rem,m:0 0 0.1rem 0));
                    font-weight: normal;
                    &.disabled{
                        @include box((c:$black9))
                    }
                }

                .timeText{
                    @include box((c:$black9,fs:0.2rem,lh:0.28rem,p:0 0 0 0.3rem));
                    position: relative;
                    &:before{
                        content:'';
                        @include box((d:block,w:0.24rem,h:0.24rem));
                        @include position((p:absolute,l:0,t:50%));
                        transform:translateY(-50%);
                        @include bg_img('my/activity_clock.png');
                    }
                    &.disabled{
                        &:before{
                            @include bg_img('my/activity_clock_disabled.png');
                        }
                    }
                }
                .statusText{
                    @include box((d:block,w:1rem,h:0.4rem,lh:0.4rem,fs:0.2rem,c:$white,ta:center));
                    @include position((p:absolute,r:0,t:50%));
                    transform:translateY(-50%);
                    @include bg_img('my/activity_label_yes.png');
                    &.disabled{
                        @include bg_img('my/activity_label_no.png');
                    }
                }
            }
        }
    }
</style>
