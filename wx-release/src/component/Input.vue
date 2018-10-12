<template>
    <div class="input">
        <input ref="inp"
               :value="value"
               :maxlength="maxlength||16"
               :type="type"
               :placeholder="ph"
               @input="onBlur"
               @focus="onFocus"
               :readonly="readonly"/>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'input',
        props: ['ph','type','value','readonly','click','maxlength'],
        methods: {
            onBlur() {
                if(this.click) this.click(false)
                this.$emit('msg',this.$refs.inp.value)
            },
            onFocus() {
                if(this.click) this.click(true)
            }
        },
    }
</script>
<style lang="scss" scoped>

</style>