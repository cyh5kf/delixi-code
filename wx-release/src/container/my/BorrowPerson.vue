<template>
    <div class="wrap">
        <ul>
            <!--这里不做分页显示-->
            <BorrowPersonInfoCard class="borrowCard"
                                  v-for="(item ,i) in dataLists"
                                  :key="i"
                                  :cardData="item"
            />
        </ul>
    </div>
</template>
<script>
    import API from '@/api'
    import BorrowPersonInfoCard from '@/component/BorrowPersonInfoCard'
    import getParam from '@/lib/getParam'

    export default {
        name: 'BorrowPerson',
        data(){
            return {
                // bid:this.$route.params.tenderId,
                productType:getParam(window.location.href,'productType'),
                dataLists: [],
            }
        },
        created(){
            this.getInitData()
        },
        methods: {
            async getInitData(){
                const {
                    productType
                }=this.$data

                let param = {
                    productType,
                    pageNum:1,
                    numPerPage:50
                }
                const token=getParam(window.location.href,'token');
                const rPlan = getParam(window.location.href,'rPlan');
                const trxId = getParam(window.location.href,'trxId')||'';
                const tenderId = this.$route.params.tenderId || '';
                if(rPlan == 1) {
                    param.sid = trxId;
                } else {
                    param.bid = tenderId;
                }
                if(token){
                    param.token=token;
                }
                let obj = await API.get(API.borrowPersonInfo, param)
                this.dataLists = obj.recordList ||[]
            }
        },
        components:{
            BorrowPersonInfoCard
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        padding-top:0.3rem;
    }

</style>
