<template>
    <div class="wrap">
        <div style="position: fixed;height: 0.9rem;overflow: scroll;width:100%;z-index:10;">
            <div class="nav">
                <div v-for="(item,i) in nav"
                     :key="i"
                     :class="i === index ? 'checked':''"
                     @click="index = i"
                     v-text="item"></div>
            </div>
        </div>
        <!--组织信息-->
        <div v-show="index === 0" style="margin-top:0.9rem">
            <ul class="new_zzry">
                <li style="width: 2.07rem;padding-top: 0.6rem">
                    <img src="https://images.51rz.com/images/rebuild/honor/honor1.jpg" alt="">
                    <h3>公安部三级备案</h3>
                </li>
                <li>
                    <img src="https://images.51rz.com/images/pc/message/app/honor02.png" alt="">
                    <h3>营业执照</h3>
                </li>
                <li>
                    <img src="https://images.51rz.com/images/pc/message/app/honor03.png" alt="">
                    <h3>ICP许可证</h3>
                </li>
            </ul>
            <ul class="list">
                <li>
                    <span class="title">全称及简称：</span>
                    <span class="content">浙江人众金融服务股份有限公司（简称：人众金服）</span>
                </li>
                <li>
                    <span class="title">统一社会信用代码：</span>
                    <span class="content">91330000064189906G</span>
                </li>
                <li>
                    <span class="title">公司注册资本：</span>
                    <span class="content">6945万元</span>
                </li>
                <li>
                    <span class="title">实缴注册资本：</span>
                    <span class="content">6945万元</span>
                </li>
                <li>
                    <span class="title">法定代表人：</span>
                    <span class="content">李敏</span>
                </li>
                <li>
                    <span class="title">成立日期：</span>
                    <span class="content">2013年03月28日</span>
                </li>
                <li>
                    <span class="title">公司经营期限：</span>
                    <span class="content">2013年03月28日至长期</span>
                </li>
                <li>
                    <span class="title">公司经营状态：</span>
                    <span class="content">开业</span>
                </li>
                <li>
                    <span class="title">注册地址：</span>
                    <span class="content">浙江省杭州市西湖区学院路28-38号1幢德力西大厦1号楼2501室</span>
                </li>
                <li>
                    <span class="title">经营地址：</span>
                    <span class="content">浙江省杭州市西湖区学院路28-38号1幢德力西大厦1号楼2501室</span>
                </li>
                <li style="border-bottom: 0.01rem solid rgba(255,255,255,0.12)">
                    <span class="title">经营范围：</span>
                    <span class="content">投融资信息咨询服务，科技项目中介服务，软件技术咨询，信息服务，以服务外包方式从事票据中介服务（不含承兑等银行核心业务），接受金融机构委托从事金融技术外包、业务流程外包，实业投资，资产管理，投资管理，财务咨询。</span>
                </li>
                <li style="border:none">
                    <br/><span>股东信息：</span>
                    <p style="text-align: center;margin: 0.3rem 0">股权结构</p>
                    <div class="bg_gq"></div>
                </li>
                <li style="border:none">
                    <br/><span>组织架构：</span><br/><br/>
                    <div class="bg_jg"></div>
                </li>
                <li style="padding: 0 0.24rem;border:none">
                    <p style="padding: 0.4rem 0">从业人员概况：</p>
                    截止到2018年2月28日，信息如下：<br/>
                    1. 正式人员：135人<br/>
                    2.劳务派遣和临时聘用人员：3<br/>
                    3.年龄分布：<br/>
                    <div class="bg_xl age"></div>
                    4.学历分布：<br/><br/>
                    <div class="bg_xl education"></div>
                </li>
                <li><span class="title">分支机构全称：</span><span class="content">无</span></li>
                <li><span class="title">分支机构所在地：</span><span class="content">无</span></li>
                <li><span class="title">分支机构成立时间：</span><span class="content">无</span></li>
                <li><span class="title">分支机构负责人：</span><span class="content">无</span></li>
                <li><span class="title">分支机构联系电话：</span><span class="content">无</span></li>
                <li><span class="title">分支机构投诉电话：</span><span class="content">无</span></li>
                <li><span class="title">分支机构员工人数：</span><span class="content">无</span></li>
                <li>
                    <span class="title" style="border-right:0.01rem solid rgba(255,255,255,0.12);">与保险机构、担保机构等各类涉及个体网络借贷业务相关的第三方机构合作情况：</span>
                    <span class="content" style="border-left:0">无</span>
                </li>
                <li>
                    <span style="margin-top:6rem" class="title">从业机构主要人员简介：</span>
                    <span class="content">董事长兼法人：李敏<br/>中南民族大学法学硕士，资深执业律师。2008年在上海首融律师事务所担任律师期间，涉入银行票据业务和不良资产处置，积累了丰富的投融资经验。2013年起毅然投身互联网金融创新行业，创办浙江人众金融服务股份有限公司，带领团队研发出“互联网+供应链金融”服务模型，被业内誉为国内供应链金融领域新锐领军人物和实战专家，人众金服亦发展成为国内领先和专业的供应链金融平台。<br/><br/>总经理：薛刚<br/>现任人众金服CEO，负责公司整体的管理工作。毕业于杭州电子科技大学，曾先后于浙江核新同花顺网络信息股份有限公司担任营销总监，杭州鑫合汇网络科技有限公司担任市场总监，杭州金投行金融资产服务有限公司旗下国资平台担任集团总助，并于 2013年参与国内知名平台鑫合汇的创建，在业内享有良好口碑，在互联网金融领域拥有丰富的实战经验和管理经验。<br/><br/>副总经理：李卫兵<br/>现任人众金服COO，负责平台整体的运营工作。毕业于东华理工大学，具有10年以上的互联网从业经验，曾在杭州投融界网络信息有限公司、深圳大赢家网络有限公司等知名企业担任运营总监，尤其擅长推广渠道的优化和产品体验的改进升级。<br/><br/>财务负责人：刘帅<br/>中共党员，现任人众金服财务总监，毕业于江西财经大学会计学专业，10余年财务管理及资金运营从业经验，曾先后供职于大型企业集团及互联网金融公司，对全面预算管理、资金结算、税务筹划方面有着丰富的管理经验。
</span>
                </li>
            </ul>
        </div>
        <!--财务信息-->
        <div v-show="index === 1" style="margin-top:0.9rem">
            <ul class="list">
                <li>
                    <span class="title">重要融资与负债信息:</span>
                    <span class="content">杭州立元宸皓投资合伙企业（有限合伙）5000万  股份占比10.0072%</span>
                </li>
                <li>
                    <span class="title">重点环节审计结果：</span>
                    <span class="content">会计师事务所审计出具中</span>
                </li>
                <li style="border-bottom:0.01rem solid rgba(255,255,255,0.12)">
                    <span class="title">合规性审查报告：</span>
                    <span class="content">律师事务所审查出具中</span>
                </li>
                <li style="border:none">
                    <span>财务审计报告</span>
                    <span></span>
                </li>
                <li style="border:none" class="sj-pic-box">
                    <div class="sj-pic">
                        <a href="https://images.51rz.com/images/rebuild/audit/balance.png"><img
                                src="https://images.51rz.com/images/rebuild/audit/balance.png"/></a>
                        <small>资产负债表</small>
                    </div>
                    <div class="sj-pic">
                        <a href="https://images.51rz.com/images/rebuild/audit/profit.png"><img
                                src="https://images.51rz.com/images/rebuild/audit/profit.png"/></a>
                        <small>利润表</small>
                    </div>
                    <div class="sj-pic">
                        <a href="https://images.51rz.com/images/rebuild/audit/cashflow.png"><img
                                src="https://images.51rz.com/images/rebuild/audit/cashflow.png"/></a>
                        <small>现金流量表</small>
                    </div>
                    <div class="sj-pic">
                        <a href="https://images.51rz.com/images/rebuild/audit/audit1.png"><img
                                src="https://images.51rz.com/images/rebuild/audit/audit1.png"/></a>
                        <small>审计报告书_审计意见1</small>
                    </div>
                    <div class="sj-pic">
                        <a href="https://images.51rz.com/images/rebuild/audit/audit2.png"><img
                                src="https://images.51rz.com/images/rebuild/audit/audit2.png"/></a>
                        <small>审计报告书_审计意见2</small>
                    </div>
                </li>
            </ul>
        </div>
        <!--平台信息-->
        <div v-show="index === 2" style="margin-top:0.9rem">
            <ul class="list flex">
                <li>
                    <p class="title">网站或平台地址</p>
                    <span class="content">https://www.51rz.com</span>
                </li>
                <li>
                    <p class="title">平台上线运营时间</p>
                    <span class="content">2013年4月27日正式上线运营</span>
                </li>
                <li>
                    <p class="title">咨询、投诉、举报联系电话、电子邮箱、通讯地址</p>
                    <span class="content">客服电话：400-655-8858<br/>联系电话：0571-56583188<br/>电子邮箱：server@51rz.com<br/>通讯地址：杭州市学院路28号德力西大厦1号楼25层</span>
                </li>
                <li><p class="title">注册协议模板</p>
                    <a class="content" href="/registerAgreement" style="color: #fff">注册协议</a>
                </li>
                <li>
                    <p class="title" style="height:2.49rem;line-height:2.49rem;">平台APP应用</p>
                    <span class="content" style="padding:0.5rem 0 0.5rem 0.3rem"><img
                            src="https://images.51rz.com/images/pc/message/app/erm01.png" style="width:1.49rem"/></span>
                </li>
                <li>
                    <p class="title" style="height:2.49rem;line-height:2.49rem;">公众号</p>
                    <span style="padding:0.5rem 0 0.5rem 0.3rem" class="content"><img
                            src="https://images.51rz.com/images/pc/message/app/erm02.png" style="width:1.49rem"/></span>
                </li>
                <li>
                    <p class="title">微博</p>
                    <span class="content">人众金服官微：http://weibo.com/51RZjf</span>
                </li>
            </ul>
        </div>
        <!--重大事项信息-->
        <div v-show="index === 3" style="margin-top:0.9rem">
            <ul class="list">
                <li><span class="title"
                          style="border-right:0.01rem solid rgba(255,255,255,0.12)">减资、合并、分立、解散或者申请破产：</span><span
                        class="content" style="border:0">无</span></li>
                <li><span class="title" style="border-right:0.01rem solid rgba(255,255,255,0.12)">破产程序：</span><span
                        class="content" style="border:0">无</span></li>
                <li><span class="title" style="border-right:0.01rem solid rgba(255,255,255,0.12)">停业、整顿、关闭：</span><span
                        style="border:0" class="content">无</span></li>
                <li><span style="border-right:0.01rem solid rgba(255,255,255,0.12)"
                          class="title">从业机构受到刑事处罚：</span><span style="border:0" class="content">无</span></li>
                <li><span class="title"
                          style="border-right:0.01rem solid rgba(255,255,255,0.12)">从业机构受到重大行政处罚的情况描述：</span><span
                        class="content" style="border:0">无</span></li>
                <li><span style="border-right:0.01rem solid rgba(255,255,255,0.12)" class="title">公司法定代表人、持股 5%以上的股东、实际控制人、主要负责人、董事、监事、高级管理人员的变更信息：</span>
                    <span style="border:0" class="content">无变更（更新日期：<span v-text="updateDate"></span>）</span></li>
                <li><span style="border-right:0.01rem solid rgba(255,255,255,0.12)" class="title">法定代表人、持股5%以上的股东、实际控制人、主要负责人、
                    董事、监事、高级管理人员涉及的重大诉讼、仲裁：</span>
                    <span class="content" style="border:0">无（更新日期：<span v-text="updateDate"></span>）</span></li>
                <li><span style="border-right:0.01rem solid rgba(255,255,255,0.12)"
                          class="title">主要或全部业务陷入停顿：</span><span class="content" style="border:0">无</span></li>
                <li><span style="border-right:0.01rem solid rgba(255,255,255,0.12)"
                          class="title">欺诈、损害出借人利益等其他重大事项：</span><span class="content" style="border:0">无</span></li>
            </ul>
        </div>
        <!--备案信息-->
        <div v-show="index === 4" style="margin-top:0.9rem">
            <ul class="list">
                <li>
                    <span style="border-right:0.01rem solid rgba(255,255,255,0.12)" class="title">备案登记地方金融监管部门：</span>
                    <span class="content" style="border:0">登记备案进行中</span>
                </li>
                <li>
                    <span style="border-right:0.01rem solid rgba(255,255,255,0.12)" class="title">备案登记时间：</span>
                    <span class="content" style="border:0">登记备案进行中</span>
                </li>
                <li>
                    <span style="border-right:0.01rem solid rgba(255,255,255,0.12)" class="title">备案登记编号：</span>
                    <span class="content" style="border:0">登记备案进行中</span>
                </li>
                <li>
                    <span style="border-right:0.01rem solid rgba(255,255,255,0.12)" class="title">电信业务经营许可信息：</span>
                    <span class="content" style="border:0">浙ICP备13009823号-1</span>
                </li>

                <li>
                    <span style="border-right:0.01rem solid rgba(255,255,255,0.12)"  class="title">资金存管信息：<br/><br/><br/></span>
                    <span class="content" style="border:0">名称：北京银行<br/>签约时间：2017年3月<br/>全量业务上线时间：2017年4月24号</span>
                </li>
                <li>
                    <span style="border-right:0.01rem solid rgba(255,255,255,0.12)"  class="title">网站备案图标及编号：</span>
                    <span class="content" style="border:0">公安备案号：<a style="color: #fff" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602002203">33010602002203</a></span>
                </li>
                <li>
                    <span style="border-right:0.01rem solid rgba(255,255,255,0.12)"  class="title">信息安全测评认证信息：</span>
                    <span class="content" style="border:0">认证机构：中华人民共和国公安部</span>
                </li>
                <li>
                    <span class="title">认证结果：</span>
                    <span style="padding:0.2rem 0 0.6rem 0.3rem" class="content">信息系统安全等级保护备案证明（三级）<br/><a
                            href="https://images.51rz.com/images/rebuild/honor/honor1.jpg" target="_blank"><img
                            src="https://images.51rz.com/images/rebuild/honor/honor1.jpg" style="width:3.52rem;"/></a></span>
                </li>
                <li>
                    <span class="title">风险管理架构：</span>
                    <span class="content" style="padding:0.3rem 0;width:4.55rem"><img
                            style="height:4.43rem;display:block;margin:0 auto"
                            src="https://images.51rz.com/images/rebuild/info/riskControl.png"/></span>
                </li>
                <li>
                    <span class="title">风险评估流程：</span>
                    <span class="content" style="padding:0.3rem 0;width:4.55rem"><img
                            style="height:5.56rem;display:block;margin:0 auto"
                            src="https://images.51rz.com/images/rebuild/info/riskProgress.png"/></span>
                </li>
                <li>
                    <span style="border-right:0.01rem solid rgba(255,255,255,0.12)"  class="title">风险预警管理：<br/><br/><br/></span>
                    <span class="content" style="border:0;width:4.55rem">通过控制商户商流、物流、资金流、信息流四大数据交叉管控，通过动态监控商户业务规模、财务数据、资产质量、舆情监控等情况，实施风险预警，考虑暂停发行或停止合作。</span>
                </li>
                <li>
                    <span style="border-right:0.01rem solid rgba(255,255,255,0.12)"  class="title">催收方式：<br/><br/><br/></span>
                    <span class="content" style="border:0;width:4.55rem">短信：根据不同标的，到期前和逾期后进行不同频次的短信提醒。<br/>电话：根据不同标的，到期前和逾期后进行不同频次的电话提醒还款或催促还款。<br/>委托外部机构：根据借款人情况，决定是否委托给专业合法的第三方催收机构进行催收。
</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    export default {
        name: 'infoList',
        data() {
            return {
                nav: ['组织信息', '财务信息', '平台信息', '重大事项信息', '备案信息'],
                index: 0,
                updateDate: ''
            }
        },
        methods: {
            getDate(time) {
                const date = new Date(time)
                if (date.getDate() >= 5) {
                    return `${date.getFullYear()}.${date.getMonth() + 1}.5`
                } else {
                    if (date.getMonth() === 0) {
                        return `${date.getFullYear() - 1}.12.5`
                    } else {
                        return `${date.getFullYear()}.${date.getMonth()}.5`
                    }
                }
            }
        },
        async mounted() {
            const time = await API.get(API.nowDate)
            this.updateDate = this.getDate(time)
        }
    }
</script>
<style lang="scss" scoped>
    .wrap {
        @include position((p:absolute));
        @include bg_img('infoPublicBg.jpg');
        @include box((w:100%, c:#fff, fs:0.24rem));
        min-height: 100%;
        overflow-x: scroll;
        background-size: 100% 100%;
    }

    .nav {
        position: absolute;
        z-index: 10;
        @include box((w:10.4rem, lh:0.88rem, p:0 0.2rem, d:flex, bg:#355cb8, ta:center));
        div {
            @include box((fx:1, p:0 0.2rem));
        }
        .checked {
            border-bottom: 0.02rem solid #fff;
        }
    }

    .new_zzry {
        padding: 0.3rem 0.2rem 0 0.2rem;
    }

    .new_zzry li {
        position: relative;
        display: inline-block;
        width: 1.41rem;
        text-align: center;
        margin: 0 0 0 0.3rem;
    }

    .new_zzry li img {
        width: 100%;
    }

    .new_zzry li h3 {
        font-size: 0.24rem;
        line-height: 0.44rem;
    }

    .list {
        margin-top: 0.4rem;
        padding: 0.2rem;
    }

    .list li {
        line-height: 0.44rem;
        border: 0.01rem solid rgba(255, 255, 255, 0.12);
        border-bottom: 0;
        &:last-child {
            border-bottom: 0.01rem solid rgba(255, 255, 255, 0.12);
        }
        &:after {
            content: '';
            width: 0;
            height: 0;
            clear: both;
            display: block;
        }
    }

    .bg_jg {
        @include bg_img(('info_jg1.png'));
        background-size:100% 100%;
        height: 3.5rem;
    }

    .bg_gq {
        @include bg_img(('info_gq.png'));
        width: 6.02rem;
        height: 5.08rem;
        margin: auto;
    }

    .bg_xl {
        height: 3.2rem;
    }
    .bg_xl.age{
        background:url('https://images.51rz.com/images/rebuild/honor/age_wx.png') left/contain no-repeat;
    }
    .bg_xl.education{
        background:url('https://images.51rz.com/images/rebuild/honor/education_wx.png') left/contain no-repeat;
    }

    .sj-pic-box {
        display: -webkit-flex;
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        -webkit-flex: 1;
        padding-top: 0.3rem;
    }

    .sj-pic {
        width: 33%;
        text-align: center;
        display: inline-block;
    }

    .sj-pic img {
        width: 2.04rem;
        height: 2.9rem;
        box-shadow: 0 0 0.2rem #f1f1f1;
    }

    .sj-pic small {
        display: inline-block;
        margin: 0.3rem auto;
    }

    .flex {
        p {
            display: inline-block;
            width: 2.25rem;
        }
    }

    .title, .content {
        display: block;
        float: left;
    }

    .title {
        width: 2.35rem;
        padding-right: 0.16rem;
        text-align: right;
        min-height: 0.5rem;
        line-height: 0.5rem;
    }

    .content {
        border-left: 0.01rem solid rgba(255, 255, 255, 0.12);
        width: 4.27rem;
        min-height: 0.5rem;
        padding-left: 0.3rem;
    }
</style>
