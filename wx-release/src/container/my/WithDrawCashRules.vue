<template>
    <div class="tx_wrap">
        <div class="tx_container">
            <h3>提现说明:</h3>
            <ol>
                <li style="color: #e31522;">
                    提现金额单笔不可低于100元，每日累计提现金额不得超过100万元；
                </li>
                <li style="color: #e31522;">
                    当日充值的资金，下一工作日银行清算后方可申请提现（当日可进行投资）；
                </li>
                <li class="tx_sxf">
                    每个用户每月可享受<span style="color: red;">3次免费提现机会</span>，超出部分需收取手续费，详见下表：
                    <table>
                        <tbody>
                        <tr>
                            <td>提现金额</td>
                            <td>手续费</td>
                        </tr>
                        <tr>
                            <td>0~5万元（含）</td>
                            <td>2元/笔</td>
                        </tr>
                        <tr>
                            <td>5~10万元（含）</td>
                            <td>3元/笔</td>
                        </tr>
                        <tr>
                            <td>10~50万元（含）</td>
                            <td>4元/笔</td>
                        </tr>
                        <tr>
                            <td>50~100万元（含）</td>
                            <td>5元/笔</td>
                        </tr>
                        </tbody>
                    </table>
                </li>
                <li>
                    为了您的资金安全，请确保提现银行账号的姓名和您进行实名验证的姓名一致；
                </li>
                <li>
                    请确保您输入的是正确的储蓄卡账号，而非信用卡账号；
                </li>
                <li>
                    当日21：00前申请提现当日到账，21:00之后申请提现延迟至次日到账，不区分双休及节假日。（实际到账时间需根据提现银行的处理机制而定）。
                    <!-- 确认提现后，将在1个工作日(国家节假日除外)之内将钱转入绑定的银行账户内。到账时间参考下表：&nbsp;（实际到账时间需根据提现银行的处理机制而定）
                    <div class="user_rzxmnei" style="margin-bottom:0.2rem;margin-top: 0.2rem;">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                            <tr style="color:#444;">
                                <th scope="col">提现日</th>
                                <th scope="col">
                                    申请提现时间
                                </th>
                                <th scope="col">
                                    提现到账时间
                                </th>
                            </tr>
                            <tr>
                                <td rowspan="2">周一至周五</td>
                                <td>16:00之前</td>
                                <td>当日到账</td>
                            </tr>
                            <tr>

                                <td>16:00以后</td>
                                <td>下一个工作日到账</td>
                            </tr>
                            <tr>
                                <td>周六、周日</td>
                                <td>全天</td>
                                <td>下一个工作日到账</td>
                            </tr>
                            <tr>
                                <td>法定节假日</td>
                                <td>全天</td>
                                <td>下一个工作日到账</td>
                            </tr>
                            </tbody>
                        </table>
                    </div> -->
                </li>
                <li>
                    提现过程遇到问题，请联系客服<span
                        style="color: #e31522;text-decoration:underline;">400-655-8858(9:00-22:00).</span>
                </li>
                <li>最终解释权在法律范围内归人众金服所有。</li>
            </ol>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'test',
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    body {
        font: 400 14px/1.5 "microsoft yahei", Helvetica;
        font-variant: normal;
        background: #f3f3f3;
    }

    .tx_wrap {
        max-width: 720px;
        margin: 0 auto;
        width: 100%;
        padding-bottom: 0.5rem;
    }

    .tx_container ol li {
        list-style-type: decimal;
        font-size: 0.22rem;
        line-height: 2;
        text-align: justify;
    }

    .user_rzxmnei table td {
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .user_rzxmnei table th {
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .user_rzxmnei table {
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        text-align: center;
    }

    .tx_sxf table {
        border-collapse: collapse;
        width: 4.60rem;
        margin: 0 auto;
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
    }

    .tx_sxf table td {
        text-align: center;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        width: 50%;
    }

    .tx_sxf {
        padding-bottom: 0.15rem;
    }

    .tx_container {
        padding-bottom: 0.2rem;
    }

    .tx_container h3 {
        padding-top: 0.2rem;
        padding-left: 0.2rem;
        letter-spacing: 0.05rem;
    }

    ol {
        margin-left: 0.5rem;
        padding-right: 0.2rem;
    }
</style>
