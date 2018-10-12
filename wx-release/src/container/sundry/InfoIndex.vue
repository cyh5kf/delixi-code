<template>
    <div class="wrap">
        <router-link tag="div" v-for="(item,index) in list"
                     v-text="item.name"
                     :key="index"
                     :to="item.href"
                     :class="`infoIndex${index}`">
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'infoIndex',
        data() {
            return {
                list: [
                    {
                        name: '信披承诺',
                        href: '/infoPromise',
                    },
                    {
                        name: '机构信息',
                        href: '/infoList',
                    },
                    {
                        name: '业务模式',
                        href: '/infoModel',
                    },
                    {
                        name: '安全保障',
                        href: '/infoSafety',
                    },
                    {
                        name: '荣誉资质',
                        href: '/infoHonor',
                    },
                    {
                        name: '平台数据',
                        href: '/infoData',
                    },
                ]
            }
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        @include box((c:#fff,fs:0.48rem,lh:3rem,ta:center));
    }
    @each $url in 0,1,2,3,4,5 {
        .infoIndex#{$url}{
            @include bg_img('infoIndex#{$url}.png');
            @include box((w:100%,h:3rem));
        }
    }
</style>