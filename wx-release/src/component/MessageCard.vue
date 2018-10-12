<!--cardData包含字段：
required:
@timeKey        获取时间对应的字段名称
@titleKey       获取标题对应的字段名称
@contentKey     获取内容对应的字段名称
@imgKey         获取图片对应的字段名称


slot：
@section  显示中间内容区域
@footer   显示底部footer跳转
-->

<template>
    <div class="card">
        <label class="time" v-text="cardData[timeKey||'time']">2017-06-25 11:24</label>
        <div class="content">
            <header v-text="cardData[titleKey||'title']"></header>
            <section v-text="cardData[contentKey||'subtitle']"></section>
            <section>
                <img :src="cardData[imgKey||'picPath']" >
            </section>
            <slot name="section"></slot>
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'MessageCard',
        props: ['cardData','timeKey','titleKey','contentKey','imgKey']
    }
</script>
<style lang="scss" scoped>
    .card {
        @include box((m:0 0.3rem,p:0.6rem 0 0 0));
        .time{
            @include box((lh:0.36rem,d:block,m:0 auto 0.3rem,bg:#e5e5e5,c:$white,fs:0.24rem,bdr:0.18rem,ta:center));
            max-width:2.8rem;
        }
        .content{
            @include box((bdr:0.08rem,bg:$white));
            @include thin(all,#e5e5e5);
            header,.header{
                @include box((p:0.3rem 0.3rem 0.4rem 0.3rem,lh:0.44rem,fs:0.32rem,c:$black2));
                font-weight: normal;
            }
            section,.section{
                @include box((p:0 0.3rem 0.3rem 0.3rem,fs:0.28rem,lh:0.44rem,c:$black5));
                img{
                    width:100%;
                }
            }
            footer,.footer{
                @include box((d:block,lh:0.7rem,p:0 0.3rem,c:$black5));
                @include thin(top,#e5e5e5);
                position: relative;
                &:after{
                    content:'';
                    @include box((d:block,w:0.3rem,h:0.3rem));
                    @include bg_img('icon_arrow_right.png');
                    @include position((p:absolute,t:0.2rem,r:0.3rem));
                }
            }
        }
    }
</style>
