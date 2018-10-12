<template>
    <div class="wraper" v-html="html"></div>
</template>
<script>
    import API from '@/api'

    export default {
        name: 'Protocol',
        data(){
            return {
                protocolId: this.$route.params.protocolId,
                html: '',
                signPosList:[],//电子签章
            }
        },
        async created(){
            const param = {
                protocol: this.$data.protocolId
            }
            let obj = await API.post(API.getProtocol, param)
            this.$data.html = obj.content
            this.$nextTick(()=>{
                (this.$data.signPosList||[]).forEach((signImg,i)=>{
                    const {
                        type,
                        sealData
                    }=signImg
                    const singNameDom = window.document.getElementsByClassName('type'+type+'_name')[0]
                    if(singNameDom){
                        const oldStyle=singNameDom.getAttribute('style')||''
                        singNameDom.setAttribute('style',oldStyle+'position:relative')
                        const img=document.createElement('img')
                        img.setAttribute('src','data:image/png;base64,'+signImg.sealData)
                        img.setAttribute('style','position:absolute;width:1.6rem;top:-0.5rem;left:0.5rem')
                        singNameDom.appendChild(img)
                    }
                })
                const signWraper=document.getElementsByClassName('signWraper')[0]//签名的最外层
                const day=document.getElementsByClassName('day')[0]//只有一个日期的外包层

                if(signWraper){//清除多余的&nbsp 避免样式影响
                    const html=signWraper.innerHTML.replace(/\&nbsp;/g,'')
                    const oldStyle=signWraper.getAttribute('style')||''
                    signWraper.setAttribute('style',oldStyle+';display:table;width:100%;')
                    signWraper.innerHTML=html
                }

                const dayDom=document.getElementsByClassName('day')[0]//只有一个日期的外包层
                const lefts=document.getElementsByClassName('left')||[]//左边的签名
                const rights=document.getElementsByClassName('right')||[]//右边的签名

                for(let i=0;i<lefts.length;i++){
                    const dom=lefts[i]
                    const trimHtml=dom.innerHTML.replace(/\&nbsp;/g,'')
                    const oldStyle=dom.getAttribute('style')||''
                    dom.setAttribute('style',oldStyle+';display:block;width:47%;float:left')
                    dom.innerHTML=trimHtml
                }
                for(let i=0;i<rights.length;i++){
                    const dom=rights[i]
                    const trimHtml=dom.innerHTML.replace(/\&nbsp;/g,'')
                    const oldStyle=dom.getAttribute('style')||''
                    dom.setAttribute('style',oldStyle+';display:block;width:47%;float:right')
                    dom.innerHTML=trimHtml
                }
                if(dayDom){
                    dayDom.setAttribute('style','margin:0.45rem 0 0 2.5rem')
                }
            })
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .wraper{
        >div{
            width:100% !important;
        }
    }
</style>
