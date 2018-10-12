<template>
    <div>
        <div :style="css" class="phone_get" v-show="phone_state" v-text="phone_text" @click="get_phone">
            获取验证码
        </div>
        <div :style="css" class="phone_wait" v-show="!phone_state">
            <span v-text="`${phone_time}秒`"></span>后重新获取
        </div>
    </div>
</template>
<script>
    export default {
        name: 'sendCode',
        props: ['click','css'],
        data() {
            return {
                phone_state: true,
                phone_time: 60,
                phone_text: '获取验证码',
            }
        },
        methods: {
            //获取短信验证码
            get_phone() {
                this.click(() => {
                    this.phone_state = !this.phone_state
                    this.change_time()
                })
            },
            change_time() {
                let time = this.phone_time
                setTimeout(() => {
                    if(time > 1){
                        time -= 1
                        this.phone_time = time
                        this.change_time()
                    }else{
                        this.phone_state = !this.phone_state
                        this.phone_text = '重新获取'
                        this.phone_time = 60
                    }
                },1000)
            },
        }
    }
</script>
<style lang="scss" scoped>
    .phone_get{
        @include box((c:$blue,w:2.4rem));
    }
    .phone_wait{
        @include box((c:#3F3F3F,w:2.4rem));
        span{
            @include box((c:#FF9B09));
        }
    }
</style>