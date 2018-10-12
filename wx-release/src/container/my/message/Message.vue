<template>
    <div class="wrap" :style="height">
        <router-link :to="item.to"
                     :key="index"
                     class="list" v-for="(item,index) in infos"
                     @click="item.click">
            <div :class="item.className"></div>
            <div>
                <p>
                    <span class="title" v-text="item.title"></span>
                    <span class="time" v-text="item.time"></span>
                </p>
                <p>
                    <span class="line_of_hide desc" v-text="item.desc"></span>
                    <span class="tip" v-if="!item.tip"></span>
                </p>
            </div>
        </router-link>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import API from '@/api'

    export default {
        name: '',
        data() {
            return {
                height: '',
                infos: [
                    {
                        className: 'message_system',
                        title: '',
                        desc: '',
                        time: '',
                        to: '/my/message/system',
                        tip: 0,
                        click: () => {
                        }
                    },
                    {
                        className: 'message_activity',
                        title: '',
                        desc: '',
                        time: '',
                        to: '/my/message/activity',
                        tip: 0,
                        id: null,
                        click: () => {
                            this.setMessageInfo(Object.assign(
                                {activeId: this.infos[1].id}, this.messageInfo
                            ))
                        }
                    },
                    {
                        className: 'message_notice',
                        title: '',
                        desc: '',
                        time: '',
                        to: '/my/message/notice',
                        tip: 0,
                        id: null,
                        click: () => {
                            this.setMessageInfo(Object.assign(
                                {gongGaoId: this.infos[2].id}, this.messageInfo
                            ))
                        }
                    },
                    {
                        className: 'message_media',
                        title: '',
                        desc: '',
                        time: '',
                        to: '/my/message/media',
                        tip: 0,
                        id: null,
                        click: () => {
                            this.setMessageInfo(Object.assign(
                                {newsId: this.infos[3].id}, this.messageInfo
                            ))
                        }
                    }
                ]
            }
        },
        methods: {
            ...mapActions([
                'setMessageInfo'
            ])
        },
        computed: {
            ...mapGetters([
                'info', 'messageInfo'
            ])
        },
        async created() {
            this.height = `height:${document.body.getBoundingClientRect().height}px`
            const param = {
                registerTime: this.info.createTimes
            }
            const obj = await API.get(API.getNoticeIndex, param)
            const {noticeIndex = {}, bannerIndex = {}, articleIndex = {}} = obj
            const {notice = {}, news = {}} = articleIndex
            //系统消息
            this.infos[0].title ='系统消息' || noticeIndex.title
            this.infos[0].desc = noticeIndex.title || ''
            this.infos[0].time = noticeIndex.createTimes || ''
            this.infos[0].tip = noticeIndex.status //status 0 有未读  1 无未读

            //精彩活动 默认有红点
            this.infos[1].title ='精彩活动' || bannerIndex.title
            this.infos[1].desc = bannerIndex.title || ''
            this.infos[1].time = bannerIndex.createTimes || ''
            this.infos[1].tip = bannerIndex.id != this.messageInfo.activeId//精彩活动的id发生变化
            this.infos[1].id = bannerIndex.id || 0
            //平台公告
            this.infos[2].title ='平台公告' || notice.title
            this.infos[2].desc = notice.subtitle || ''
            this.infos[2].time = notice.createTimes || ''
            this.infos[2].tip = notice.id != this.messageInfo.gongGaoId
            this.infos[2].id = notice.id || ''
            this.infos[2].to = `/my/message/notice?siteId=${notice.siteId}`

            //媒体介绍
            this.infos[3].title ='媒体介绍' || news.title
            this.infos[3].desc = news.subtitle || ''
            this.infos[3].time = news.createTimes || ''
            this.infos[3].tip = news.id != this.messageInfo.newsId
            this.infos[3].id = news.id || 0
            this.infos[3].to = `/my/message/media?siteId=${news.siteId}`
        }
    }
</script>
<style lang="scss" scoped>
    .wrap {
        @include box((bg:$white));
        padding-left: 0.3rem;
    }

    .list {
        @include box((p:0.4rem 0, d:flex));
        @include thin(bottom, #e5e5e5);
        div:nth-child(2) {
            @include box((w:100%, p:0 0.3rem));
        }
        p {
            @include box((d:flex));
            justify-content: space-between;
        }
        .title {
            @include box((fs:0.34rem, c:$black2));
        }
        .time {
            @include box((fs:0.2rem, lh:0.5rem, c:$black9));
        }
        .desc {
            @include box((d:block, w:4.75rem, fs:0.28rem, c:$black9));
        }
        .tip {
            @include box((d:block, w:0.36rem, h:0.36rem, lh:0.36rem, bdr:0.18rem, bg:$red, fs:0.22rem, c:$white, ta:center));
        }
    }

    @each $img in activity, media, notice, system {
        .message_#{$img} {
            @include bg_img('message_#{$img}.png');
            @include box((w:1rem, h:1rem));
        }
    }
</style>