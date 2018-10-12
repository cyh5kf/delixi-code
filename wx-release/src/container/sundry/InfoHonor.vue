<template>
    <div class="wrap">
        <p class="title">—— 资质证书 ——</p>
        <ul class="honor">
            <li>
                <div>
                    <img src="https://images.51rz.com/images/rebuild/honor/honor1.jpg" alt="">
                </div>
                <div>
                    <img style="width: 50%;height: 100%;"
                         src="https://images.51rz.com/images/pc/message/app/honor02.png" alt="">
                </div>
            </li>
            <li>
                <div>
                    <img style="width: 50%;height: 100%;"
                         src="https://images.51rz.com/images/pc/message/app/honor03.png" alt="">
                </div>
                <div style="opacity: 0;"></div>
            </li>
        </ul>
        <p class="title">—— 荣誉证书 ——</p>
        <div>
            <ul class="honor">
                <li>
                    <div>
                        <img src="https://images.51rz.com/images/pc/message/app/h01.png" alt="">
                    </div>
                    <div>
                        <img src="https://images.51rz.com/images/pc/message/app/h02.png" alt="">
                    </div>
                </li>
                <li>
                    <div>
                        <img src="https://images.51rz.com/images/pc/message/app/h03.png" alt="">
                    </div>
                    <div>
                        <img src="https://images.51rz.com/images/pc/message/app/h04.png" alt="">
                    </div>
                </li>
                <li>
                    <div style="padding:0">
                        <img src="https://images.51rz.com/images/rebuild/wx/img/h05.png" alt="">
                    </div>
                    <div>
                        <img src="https://images.51rz.com/images/pc/message/app/h06.png" alt="">
                    </div>
                </li>
                <li>
                    <div style="padding:0">
                        <img src="https://images.51rz.com/images/rebuild/wx/img/h07.png" alt="">
                    </div>
                    <div style="padding:0">
                        <img src="https://images.51rz.com/images/rebuild/wx/img/h08.png" alt="">
                    </div>
                </li>
                <li>
                    <div>
                        <img style="width: 50%;height: 100%;"
                             src="https://images.51rz.com/images/pc/message/app/h09.png" alt="">
                    </div>
                    <div style="padding:0">
                        <img
                             src="https://images.51rz.com/images/rebuild/wx/img/h10.png" alt="">
                    </div>
                </li>
                <li>
                    <div style="padding:0">
                        <img src="https://images.51rz.com/images/rebuild/wx/img/h11.png" alt="">
                    </div>
                    <div style="padding:0">
                        <img src="https://images.51rz.com/images/rebuild/wx/img/h12.png" alt="">
                    </div>
                </li>
                <li>
                    <div style="padding:0">
                        <img src="https://images.51rz.com/images/rebuild/wx/img/h13.png" alt="">
                    </div>
                    <div style="padding:0">
                        <img src="https://images.51rz.com/images/rebuild/wx/img/h14.png" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'infoHonor',
        data() {
            return {}
        },
        methods: {},
        computed: {},
        components: {}
    }
</script>
<style lang="scss" scoped>
    .wrap {
        @include position((p:absolute));
        @include bg_img('infoPublicBg.jpg');
        @include box((w:100%, c:#fff, fs:0.24rem, p: 0.6rem));
        min-height: 100%;
        overflow: scroll;
    }

    .title {
        @include box((fs:0.3rem, ta:center, m:0.6rem 0));
    }

    .honor {
        li {
            @include box((d:flex));
            div {
                @include box((fx:1, w:2.8rem, h:2.8rem, p:0.35rem 0, ta:center));
                @include thin(all, #D7A55E);
                margin-left: 0.25rem;
                margin-bottom: 0.35rem;
                img {
                    @include box((w:100%));
                }
            }
        }
    }
</style>