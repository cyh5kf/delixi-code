<template>
    <ul class="tabNav">
        <div v-for="(nav,index) in navs">
            <li v-if="!nav.href"
                v-text="nav.text"
                :style="{margin: `0 ${gap}` || 0}"
                :class='{active: index == activeIndex}'
                @click="selectNav(index)"></li>
            <router-link tag="li"
                         v-if="nav.href"
                         v-text="nav.text"
                         :key="index"
                         :to="nav.href"
                         :style="{margin: `0 ${gap}` || 0}"
                         :class='{active: index == activeIndex}'
                         @click="selectNav(index)"></router-link>
        </div>
    </ul>
</template>
<script>
    export default {
        name: 'TabNav',
        data(){
            return {
                activeIndex: this.$props.index || 0
            }
        },
        props: ['navs', 'index', 'click','gap'],//gap ：间隙
        methods: {
            selectNav(index) {
                this.activeIndex = index
                this.click(index)
            }
        },
        watch: {
            index(n,o){//当外部主动更改了index的时候需要动态设置active状态
                this.activeIndex = n
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tabNav {
        @include box((w:7.5rem, d:flex, h:0.88rem, bg:$white));
        @include thin('bottom', #E3E3E3);
        >div{
            flex: 1;
        }
        li {
            @include box((h:100%, ta:center, lh:0.88rem, fs:0.28rem, c:$black9));
            &.active {
                @include box((c:$red));
                border-bottom: 0.04rem solid $red;
            }
        }
    }
</style>
