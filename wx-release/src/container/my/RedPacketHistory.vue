<template>
    <div class="dataLists">
        <RedPacketCard v-for="(item,i) in dataLists" :cardData="item" :type="type" :key="i"/>
    </div>
</template>
<script>
    import RedPacketCard from '@/component/RedPacketCard'

    export default {
        name: 'RedPacket',
        data() {
            return {
                type: this.$route.params.type,//0:红包  1：j加息
                dataLists: [
                    {
                        status: 2
                    },
                    {
                        status: 2
                    },
                    {
                        status: 2
                    },
                ]
            }
        },
        mounted() {

        },
        methods: {},
        created() {

        },
        computed: {},
        components: {
            RedPacketCard
        }
    }
</script>
<style lang="scss" scoped>

</style>