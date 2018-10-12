<template>
    <div>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'Index',
    }
</script>
<style lang="scss" scoped>

</style>