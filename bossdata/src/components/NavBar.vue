<template>
    <div class="navigation_bar" v-if="isShow">
        <div class="nav_container">
            <div class="item_container">
                <div class="item" v-for="(item,index) in navigationList" :key="index" :active="item.active" @click="()=>routerPush(item.url,index)">
                    <span :class="item.icon"></span>
                    <span class="name" v-text="item.name" ></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"NavigationBar",
        data:function () {
            return {
                navigationList:[
                    // {id:1,name:"首页",icon:"icon-home"},
                    {id:2,name:"未还款",icon:"icon-credit-card",url:'/',active:true},
                    {id:3,name:"提前还款",icon:"icon-coin-yen",url:'/prepayment',active:false}
                    ]
            }
        },
        computed:{
            isShow:function () {
                let uid = JSON.parse(localStorage.uid);
                if(uid && uid === "18605719479"){
                    return true
                } else {
                    return false
                }

            }
        },
        methods:{
          routerPush(url){
              this.$router.push(url)
              this.navigationList = this.navigationList.map(item=>{
                  if(item.url===url){
                      item.active = true
                  } else {
                      item.active = false
                  }
                  return item
              })
          }
        },
        created(){
            let url = location.pathname;
            this.navigationList = this.navigationList.map(item=>{
                if(item.url===url){
                    item.active = true
                } else {
                    item.active = false
                }
                return item
            })
        }
    }
</script>

<style lang="scss" scoped>
    .navigation_bar{
        position: absolute;
        bottom: 0;
        width: 100vw;
        /*border-top: 1px solid #e5e5e5;*/
        box-shadow: 0px 0 6px 0px #bbb8b8;;
        .nav_container{
            width: 100%;
            .item_container{
                display: flex;
                width: 100%;
                justify-content: space-around;
                .item[active=true]{
                    span{
                        color: #4992EC;
                    }
                }
                .item{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 0.1rem;
                    span[class^="icon-"]{
                        font-size: 0.6rem;
                    }
                    span{
                        font-size: 0.14rem;
                        margin-top: 0.04rem;
                        color: #555555;
                    }
                }
            }
        }
    }
</style>
