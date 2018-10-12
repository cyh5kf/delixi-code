<template>
    <div class="menu">
        <div>
            <router-link to="/index" active-class="menu_checked">
                <div>
                    <p class="icon icon_index"></p>
                    <span>首页</span>
                </div>
            </router-link>
        </div>
        <div>
            <router-link to="/tender" active-class="menu_checked">
                <div>
                    <p class="icon icon_tender"></p>
                    <span>产品</span>
                </div>
            </router-link>
        </div>
        <div>
            <router-link to="/my/index" active-class="menu_checked">
                <div>
                    <p class="icon icon_my"></p>
                    <span>我的</span>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Menu'
    }
</script>
<style lang="scss" scoped>
    .menu {
        max-width: 720px;border-top: 1px solid #E5E5E5;
        @include box((bg:#fff,d:flex,m:auto));
        @include position((p:fixed,r:0,b:0,l:0,z:10));
        div{
            @include box((fx:1,ta:center,c:#999));
        }
        span {
            @include box((d:block,fs:0.14rem,m:0.04rem 0));
        }
        .icon_index{
            /*@include bg_img('menu_index.png');*/
           @include bg_img('menu_index_xc.png');
        }
        .icon_tender{
            //@include bg_img('menu_tender.png');
            @include bg_img('menu_tender_xc.png');
        }
        .icon_my{
            //@include bg_img('menu_my.png');
            @include bg_img('menu_my_xc.png');
        }
    }
    .icon{
        @include box((w:0.54rem,h:0.54rem,m:0.14rem auto 0,d:block));
    }
    .menu_checked{
        span{color: #ff6058;}
        .icon_index{
            /*<!--@include bg_img('menu_index_check.png');-->*/
            @include bg_img('menu_index_check_xc.png');
        }
        .icon_tender{
            //@include bg_img('menu_tender_check.png');
            @include bg_img('menu_tender_check_xc.png');
        }
        .icon_my{
            //@include bg_img('menu_my_check.png');
            @include bg_img('menu_my_check_xc.png');
        }
    }
</style>