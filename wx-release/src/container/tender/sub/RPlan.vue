<template>
    <div>
        <div class="container">
            <div class="box1">
                <p>
                    R计划是人众金服推出的一款本息自动复投、到期自动退出的智能投顾产品。经由出借人授权，平台通过智能投标计划将投资人加入的投资资金自动分配到借款标的中，从而提高投资人资金利用效率，并通过分散投资降低风险。</p>
            </div>
            <div class="box2"><img src="https://images.51rz.com/images/app/Rjihua/R_qd02.png"/></div>
            <div class="box3">
                <h3>组合投资，分散风险</h3>
                <p>R计划投资于一系列产品组合中，计划资金分散于不同项目，让投资风险分散，风险降低。</p>
            </div>
            <div class="box4">
                <h3 style="text-align:right;">自动复投，操作便捷</h3>
                <p style="float:right;">R计划系统为出借人实现分散投标,持有期内回款本息自动复投，投标范围更广，操作更便捷。</p>
            </div>
            <div class="box5">
                <h3>定期投资，收益稳健</h3>
                <p>R计划是为出借人提供本息自动循环出借计划，分散投资，到期自动退出，提高资金利用效率并降低风险，让您收益稳健，出借更安心。</p>
            </div>
            <div class="box6">
                <button class="btn" onclick="window.location.href='/tender' ">加入R计划</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'RPlan',
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .container {
        max-width: 750px;
        margin: 0 auto
    }

    .box1 {
        width: 100%;
        background: url(https://images.51rz.com/images/app/Rjihua/R_qd01.png) no-repeat;
        height: 6.67rem;
    }

    .box1 p {
        width: 100%;
        padding: 4rem 0.6rem 0 0.6rem;
        font-size: 0.3rem;
        color: #333;
        line-height: 0.45rem;
        box-sizing: border-box;
    }

    .box2 {
        width: 100%;
        text-align: center;
    }

    .box2 img {
        width: 3.78rem;
        height: 0.67rem;
        display: inline-block;
    }

    .box3 {
        width: 100%;
        background: url(https://images.51rz.com/images/app/Rjihua/R_qd03.png) no-repeat;
        height: 2.22rem;
    }

    .box3 h3, .box4 h3, .box5 h3 {
        width: 100%;
        font-size: 0.3rem;
        color: #3e505e;
    }

    .box3 p, .box4 p, .box5 p {
        font-size: 0.28rem;
        color: #666;
        width: 4rem;
        padding-top: 0.1rem;
        line-height: 0.4rem;
    }

    .box4 {
        width: 100%;
        background: url(https://images.51rz.com/images/app/Rjihua/R_qd04.png) no-repeat;
        height: 2.22rem;
    }

    .box5 {
        width: 100%;
        background: url(https://images.51rz.com/images/app/Rjihua/R_qd05.png) no-repeat;
        height: 3rem;
    }

    .box1, .box2, .box3, .box4, .box5 {
        background-size: 100% 100%;
    }

    .box2, .box3, .box4, .box5 {
        margin-top: 0.3rem;
        padding: 0 0.3rem;
        box-sizing: border-box;
    }

    .box6 {
        width: 100%;
        text-align: center;
        margin-bottom: 0.5rem;
    }

    .btn {
        width: 4.05rem;
        height: 0.9rem;
        background: #ffd90d;
        border-radius: 3rem;
        font-size: 0.3rem;
        color: #fff;
        outline: none;
        border-bottom: 0.1rem solid #fd8100 !important;
        box-shadow: 0 0.1rem 0.2rem #999;
        border: none;
    }

</style>
