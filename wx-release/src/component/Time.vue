<template>
    <div>
        <span class="b_g"><span>{{hour}}</span></span>
        <span class="spot">:</span>
        <span class="b_g"><span>{{minute}}</span></span>
        <span class="spot">:</span>
        <span class="b_g"><span>{{second}}</span></span>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                initping:800000
            }
        },
        mounted(){
            this.initping=parseInt(this.$props.ping/1000);
            this.runtime(this.initping);
        },
        props:["ping"],
        methods:{
            runtime(m){
                setInterval(()=>{
                    this.initping -=1;
                },1000)
            },
        },
        computed:{
            hour(){

                return parseInt(this.initping/3600)>=10?parseInt(this.initping/3600):"0"+parseInt(this.initping/3600);
            },
            minute(){
                return parseInt(this.initping%3600/60)>=10?parseInt(this.initping%3600/60):"0"+parseInt(this.initping%3600/60);
            },
            second(){
                return this.initping%60>=10?this.initping%60:"0"+this.initping%60;
            }
        }
    }
</script>

<style scoped lang="scss">
div {
    @include box((h:0.24rem,m:0 0 0 .1rem,fs:0))
}
.spot {
    @include box((d:inline-block, w:0.1rem, fs:0.2rem, lh:0.24rem,m:0,p:0, ta:center));
    color: #ff9b09;
}
.b_g {
    background-color: #ff9b09;
    @include box(( h:0.24rem, c:#fff,fs:0.2rem,w:0.32rem,ta:center));
    span {
        @include box((d:inline-block,w:0.32rem))
    }
}
</style>