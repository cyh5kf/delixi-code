<template>
    <div ref="bs" class="wrap">
        <div ref="wrap" class="container" up="下拉刷新" down="上拉加载">
            <div ref="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default {
        name: 'scroll',
        props: ['getInitData','loadOver','refresh','getPos'],
        data() {
            return {
                page: 1,
                numPerPage: 10,
                scroll: ''
            }
        },
        async mounted() {
            const {
                bs,
                wrap,
                content,
            } = this.$refs
            await this.getInitData(true)
            this.$nextTick(() => {
                content.style.minHeight = (bs.getBoundingClientRect().height+2)+'px'
                const scroll = this.scroll = new BScroll(bs, {
                    click: true,
                    preventDefault:true
                })
                let diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                scroll.on('touchend', async (pos) => {
                    if(this.getPos) this.getPos(pos)
                    if (pos.y > 50) {
                        wrap.setAttribute('up', '刷新中')
                        await this.getInitData(true)
                        this.$nextTick(() => {
                            wrap.setAttribute('up', '下拉刷新')
                            scroll.scrollTo(0, 0)
                        })
                    }
                    if (diff - pos.y > 50) {
                        if(!this.loadOver){
                            wrap.setAttribute('down', '上拉加载')
                            await this.getInitData(false)
                        }else{
                            wrap.setAttribute('down', '已全部加载')
                        }
                    }
                    this.$nextTick(() => {
                        scroll.refresh()
                        diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                    })
                })
            })
        },
        watch: {
            refresh(cur,old) {
                this.scroll.refresh()
                this.scroll.scrollTo(0,0)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        overflow: hidden;height: 100%;position: relative;top:0;
        .container {
            width: 100%;
            $beforeAfterH: 0.5rem;
            &:before {
                content: attr(up);
                @include position((p:absolute, l:0, t:- $beforeAfterH, z:10));
                @include box((w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH))
            }
            &:after {
                content: attr(down);
                @include box((d:block, w:100%, h:$beforeAfterH, ta:center, lh:$beforeAfterH));
                position: absolute;
            }
        }
    }
</style>