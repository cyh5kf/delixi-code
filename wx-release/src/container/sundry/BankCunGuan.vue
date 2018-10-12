<template>
    <div style="background: #fff">
        <div class="banner"></div>
        <div class="content">
            <div class="box">
                <p class="app_title app_bg">
                    <strong>什么是银行存管系统？</strong>
                </p>
                <p class="app_text">
                    人众金服接入银行存管后，您所有的资金交易都将在银行体系内运转，实现平台与资金完全隔离。您在银行有专门的独立存管子账户，平台无法直接触碰您的资金。接入存管后，依旧由第三方支付机构提供支付通道服务。</p>
            </div>

            <!-- <div class="box1">
                <p class="app_title app_bg1">
                    <strong>银行存管的安全性</strong>
                </p>
                <p class="app_text">
                    存管的核心原理是将平台和用户资金进行隔离，用户的资金不再进入平台控制的账户，借款人和出借人之间的交易发生在双方的银行账户之间，平台无法触碰用户资金。银行存管成功上线是人众金服在安全与合规化建设中一次里程碑式的重大升级。
                </p>
            </div> -->
            <div class="box1" style="padding-bottom:0.8rem">
                <p class="app_title1">
                    <strong>存管上线期间常见问题</strong>
                </p>
                <dl class="cg_qa">
                    <dt>
                        <i>1</i>
                        <strong>是否需要开个存管银行的银行卡进行绑定？</strong>
                    </dt>
                    <dd>不需要，直接用现有的银行卡即可。</dd>
                    <dt>
                        <i>2</i>
                        <strong>存管上线后是否需要在存管银行注册一个电子账户等完成存管对接？</strong>
                    </dt>
                    <dd>不需要，人众金服平台为您实现平稳存管过渡，不需要再另外开设存管银行账户。凡是在平台发生过投资行为的用户，在进行系统升级时，已自动开通银行存管账户，若未能自动开通，用户可自行开通。</dd>
                    <dt>
                        <i>3</i>
                        <strong>用户的存管账户属于虚拟账户还是个人账户？</strong>
                    </dt>
                    <dd>属于虚拟电子账户，金融存管的通用做法都是如此，基金、证券也是这样处理。</dd>
                    <dt>
                        <i>4</i>
                        <strong>提现到账时间有变化吗？</strong>
                    </dt>
                    <dd>当日21：00前申请提现当日到账，21:00之后申请提现延迟至次日到账，不区分双休及节假日。（具体到账时间以银行为准）。当日充值的资金次日银行清算后方可申请提现，当日可进行投资。
                        <!--工作日16点前申请提现，当日出账；工作日16点后申请提现，下个工作日出账；非工作日申请提现，下个工作日到账（具体到账时间以银行为准）。当日充值的资金次日银行清算后方可申请提现，当日可进行投资。
                        <span>例如，小明通过活动获得100元红包（投资10000元，投资3月标及以上可使用），在银行存管上线前，小明在使用该红包时只需投资9900元即可，在银行存管上线后，小明在使用该红包时，需要投资10000元，投资成功后该红包将会自动返还至小明的账户余额。</span>-->
                    </dd>
                    <dt>
                        <i>5</i>
                        <strong>系统升级以后，计息方式、起息时间、回款方式有何改变？</strong>
                    </dt>
                    <dd>
                        <p><b>计息方式：</b><big>月标计息方式为按月付息到期还本，天标计息方式为到期还本付息；</big></p>
                        <p><b>起息时间：</b><big>满标起息,标的发布后，在标的详情内会显示一个募集周期（一般为7-15天，具体以标的详情内显示为准），若募集周期结束后仍未满标，则流标；流标后，期间使用的红包、加息券退还用户账户。</big>
                        </p>
                        <p><b>回款方式：</b><big>标的到期当日上午10点开始按照满标时间统一回款，回款金额当日内到达用户现金账户。</big></p>
                    </dd>
                    <dt>
                        <i>6</i>
                        <strong>系统升级后，红包能否使用？</strong>
                    </dt>
                    <dd>可以使用，成功投资标的后红包金额到账。银行存管上线后，平台原有红包的使用方式将由抵扣型变为满返型。<br/>
                        <span>例如，小明通过活动获得100元红包（投资10000元，投资3月标及以上可使用），在银行存管上线前，小明在使用红包时只需投资9900元即可，在银行存管上线后，小明在使用该红包时，需要投资10000元，投资成功后该红包将会自动返还至小明的账户余额。</span>
                    </dd>
                    <dt>
                        <i>7</i>
                        <strong>系统升级后，还有哪些影响投资的改动？</strong>
                    </dt>
                    <dd>为了保障您的资金安全，平台每日定于23：55至次日0：05之间存管银行进行每日例行清算。清算期间，无法进行投资、充值、提现等操作。</dd>
                </dl>
                <img src="https://images.51rz.com/images/rebuild/wx/img/cg_pic5.png"
                     style="width:5.53rem;height:0.61rem;margin-top:0.5rem;"/>
            </div>

        </div>
    </div>

</template>
<script>
    export default {
        name: 'BankCunGuan',

    }
</script>
<style lang="scss" scoped>
    body {
        background: #fff !important;
    }

    .banner {
        width: 100%;
        height: 2.39rem;
        background: url(https://images.51rz.com/images/pc/cgsx/app_banner.png) no-repeat center top;
        text-align: center;
        font-size: 0.22rem;
        line-height: 0.36rem;
        color: #fff;
        background-size: contain;
    }

    .banner h2 {
        font-size: 0.3rem;
        font-weight: bold;
        padding: 0.4rem 0 0.3rem 0;
    }

    .content {
        width: 100%;
    }

    .box {
        width: 100%;
        background: url(https://images.51rz.com/images/pc/cg/app_bg.png);
        padding: 0.3rem 0.4rem;
        text-align: center;
    }

    .box p {
        width: 100%;
        text-align: center;
    }

    .box, .box1 p strong {
        font-size: 0.3rem;
        color: #333;
        font-weight: 500;
    }

    .app_title {
        width: 100%;
        height: 3.4rem;
    }

    .app_title1 {
        width: 100%;
    }

    .app_title strong, .app_title1 strong {
        font-weight: 500;
    }

    .app_bg {
        background: url(https://images.51rz.com/images/pc/cg/app_cg01.png) no-repeat center top;
        background-size: contain;
    }

    .app_bg1 {
        background: url(https://images.51rz.com/images/pc/cg/app_cg02.png) no-repeat center top;
        background-size: contain;
    }

    .app_bg2 {
        background: url(https://images.51rz.com/images/pc/cg/app_cg03.png) no-repeat center top;
        background-size: contain;
    }

    .app_text {
        width: 100%;
        padding-top: 0.2rem;
        font-size: 0.2rem;
        line-height: 0.35rem;
        text-align: left !important;
    }

    .box1 {
        width: 100%;
        padding: 0.3rem 0.4rem;
        text-align: center;
    }

    .cg_qa {
        width: 100%;
        text-align: left;
    }

    .cg_qa dt {
        width: 100%;
        display: inline-block;
        margin-top: 0.35rem;
    }

    .cg_qa dt i {
        width: 0.3rem;
        height: 0.3rem;
        margin-top: 0.03rem;
        float: left;
        font-style: normal;
        text-align: center;
        font-size: 0.16rem;
        color: #fff;
        background: #4589c9;
        border-radius: 1rem;
        line-height: 0.3rem;
    }

    .cg_qa dt strong {
        width: 6.3rem;
        float: left;
        font-size: 0.2rem;
        font-weight: 500;
        color: #333;
        padding-left: 0.1rem;
    }

    .cg_qa dd {
        width: 100%;
        font-size: 0.2rem;
        color: #666;
        padding-left: 0.4rem;
    }

    .cg_qa dd p {
        float: left;
        width: 100%;
    }

    .cg_qa dd span {
        font-size: 0.18rem;
        color: #4589c9;
        width: 100%;
    }

    .cg_qa dd b {
        float: left;
        font-size: 0.18rem;
        font-weight: 500;
    }

    .cg_qa dd big {
        width: 5rem;
        float: left;
        font-size: 0.18rem;
    }
</style>