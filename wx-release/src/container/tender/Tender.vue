<template>
    <div>
        <!--<a href="http://10.1.14.31:8080/index.html">wind.name测试</a>-->
        <!--<p @click="loginOut" style="text-align:center;line-height:0.6rem;font-size:0.4rem">退出</p>-->
        <TabNav :navs="navs" :click="selectItem" :index="navIndex" class="navs" :gap="'0.3rem'"/>

        <!--精选 供应链 消费-->
        <div class="tender_wrap">
            <Scroll :getInitData="getInitialData" :loadOver="loadOver" :refresh="refresh">
                <!--<router-link v-show="navIndex==1" to="/tender/RPlan" class="Rbanner"></router-link>-->
                <!--可以购买的标的-->
                <div class="tender_ul">
                    <router-link v-if="item.status === 10||item.status === 1"
                                 :to="'/tender/detail/'+item.id+'/'+item.productType+'/'+item.category"
                                 :key="index"
                                 v-for="(item ,index) in cardData">
                        <TenderCard :card="item" :key="index"/>
                    </router-link>
                </div>
                <div v-show="navIndex" class="middle_title">仅展示近期20个已售罄产品</div>
                <!--已经售罄的标的-->
                <ul class="tender_ul disabled_ul">
                    <router-link v-if="item.scales >= 100"
                                 :to="'/tender/detail/'+item.id+'/'+item.productType+'/'+item.category"
                                 :key="index"
                                 v-for="(item,index ) in cardData">
                        <TenderCard :card="item" disabled="true"/>
                    </router-link>
                </ul>
            </Scroll>
        </div>
        <Menu_nav></Menu_nav>
    </div>
</template>
<script>
    import Menu_nav from '@/component/Menu'
    import TenderCard from '@/component/TenderCard'
    import TabNav from '@/component/TabNav'
    import API from '@/api'
    import Scroll from '@/component/Scroll'
//    window.name=JSON.stringify({uid:213123})
    export default {
        name: 'tender',
        data() {
            return {
                navIndex: 0,
                navs: [
                    {text: '精选'},
                    {text: 'R计划'},
                    {text: '众供宝'},
                    {text: '众消宝'},
                ],
                cardData: [],
                page: 1,
                numPerPage: 10,
                loadOver: false,
                refresh: true,
            }
        },
        methods: {
            selectItem(index){
                this.page = 1
                this.navIndex = index
                this.cardData = []
                this.loadOver = false
                this.getInitialData(true)
                this.refresh = !this.refresh  //刷新滚动条位置
            },
            async getInitialData(flag){//加载页面初始数据
                if (flag) {//刷新的时候 重置页码索引
                    this.page = 1
                    this.loadOver = false
                }else{
                    this.page += 1
                }
                const param = {
                    pageNum: this.page,
                    numPerPage: this.numPerPage,
                }
                if(this.navIndex !== 0) {
                    param.sellOut = 1   //包含已售罄
                }
                if (this.navIndex === 0) {//精选
                    param.productType = 0
                } else if (this.navIndex === 1) {//r计划
                    param.productType = 3
                } else if (this.navIndex === 2) {//众供宝
                    param.productType = 1
                } else if (this.navIndex === 3) {//众消宝
                    param.productType = 2
                }
                const data = await API.post(API.borrowList, param)
                if (data.recordList && data.recordList.length > 0) {
                    if (flag) {
                        this.cardData = data.recordList
                    } else {
                        this.cardData = this.cardData.concat(data.recordList)
                    }
                } else {
                    this.loadOver = true
                }
            }
        },
        components: {
            Menu_nav,
            TabNav,
            TenderCard,
            Scroll,
        }
    }
</script>
<style lang="scss" scoped>
    .navs {
        @include position((p:relative, z:11));
    }

    .Rbanner {
        @include box((w:7.5rem, h:1.2rem, d:block));
        @include bg_img('R_banner.png')
    }

    .tender_wrap {
        overflow: hidden;width: 100%;
        max-width: 7.5rem;
        @include position((p:absolute, t:0.9rem, b:1.16rem, z:10));
    }

    .tender_ul {
        @include box((p:0.2rem 0 0));
        a {
            @include box((d:block));
        }
        &.disabled_ul {
            padding-top: 0;
        }
    }

    .middle_title {
        @include box((fs:0.24rem, c:$black9, lh:0.8rem, ta:center));
        @include thin(all, transparent);
    }

</style>