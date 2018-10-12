<template>
    <div class="step1">
        <Row>
            <Col span="24" style="height:80px;text-align:left">
                <Steps :current="0">
                    <Step title="用户条件筛选" ></Step>
                    <Step title="用户检查确认"></Step>
                    <Step title="填写推送内容"></Step>
                </Steps>
            </Col>
        </Row> 
        <Row style="float:left;width:120px;display:inline-block;">
            <RadioGroup v-model="condition"  vertical>
                <Radio label="条件一"></Radio>
                <Radio label="条件二"></Radio>
                <Radio label="条件三"></Radio>
                <Radio label="条件四"></Radio>
                <!-- <Radio label="条件五"></Radio> -->
                <Radio label="条件六"></Radio>
                <!-- <Radio label="条件七"></Radio> -->
            </RadioGroup>
        </Row>
        <div style="float:left;display:inline-block;">
            <Row type="flex" justify="start">
                <Col>
                    <DatePicker  type="date" @on-change="handleChange" placeholder="请选择日期" style="width: 220px;margin-right: 20px;"></DatePicker>
                </Col>
                <Col>
                    <Select v-model="comp" style="width:80px;margin-right: 20px;">
                        <Option v-for="item in ConditionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <Select v-model="model2" style="width:100px">
                        <Option v-for="item in behavior" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
            </Row>
            <Row type="flex" justify="start" class="marginTop">
                <Col>
                    <DatePicker type="datetime" @on-change="changeStartTime" placeholder="请选择日期" style="width: 220px;margin-right: 20px;"></DatePicker>
                </Col>
                <Col>
                    <p class="text-light">至</p>
                </Col>
                <Col>
                    <DatePicker  type="datetime" @on-change="changeEndTime" placeholder="请选择日期" style="width: 220px;margin-left: 20px;"></DatePicker>
                </Col>
                <Col style="margin-left:20px;">
                    <Select v-model="model3" style="width:100px">
                        <Option v-for="item in behavior" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
            </Row>

            <Row type="flex" justify="start" class="marginTop">
                <Col>
                    <Select v-model="numberValue" style="width:150px;margin-right: 20px;">
                        <Option v-for="count in numberCount" :value="count.value" :key="count.value">{{ count.label }}</Option>
                    </Select>
                </Col>
                <Col style="margin-left: 10px">
                    <Input v-model="minDays" placeholder="" style="width: 80px;margin-right: 20px;"></Input>
                </Col>
                <Col>
                    <p class="line-height-16x">至</p>
                </Col>
                <Col>
                    <Input v-model="maxDays" placeholder="" style="width: 80px;margin-left: 20px;"></Input>
                </Col>
                <Col style="margin-left: 10px"><p class="line-height-16x">（元 / 次）</p></Col>
            </Row>
            <Row type="flex" justify="start" class="marginTop" >
                <Col>
                    <Select v-model="couponText" style="width:120px">
                        <Option v-for="list in coupon" :value="list.value" :key="list.value">{{ list.label }}</Option>
                    </Select>
                </Col>
                <Col style="margin-left:20px;">
                    <Input v-model="value" placeholder=""></Input>
                </Col>
                <Col style="margin-left: 10px;">
                    <p class="line-height-16x">天后过期</p>
                </Col>
            </Row>
            <!-- <Row type="flex" justify="start"  class="marginTop" >
                <Col>
                    <Select v-model="channelText" style="width:150px">
                        <Option v-for="list in channel" :value="list.value" :key="list.value">{{ list.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <p class="line-height-16x">渠道</p>
                </Col>
            </Row> -->
            <Row type="flex" justify="start" class="marginTop" >
                <Col>
                    <Upload
                        :on-success="uploadSuccess"
                        accept="text/plain"
                        action="/index.php?_url=/admin/import/upload">
                        <Button type="success" icon="ios-cloud-upload-outline">上传到服务器</Button>
                    </Upload>
                </Col>
                <Col style="margin-left: 10px;">
                    <p class="line-height-16x">提示：只能上传txt文件，且大小不超过2M</p>
                </Col>
                <Col style="margin-left: 10px;">
                    <a href="http://devh5.oss-cn-hangzhou.aliyuncs.com/images/backend/market/example.txt" download="example.txt">
                        <Button type="primary" size="large" icon="ios-download-outline">下载模板文件</Button>
                    </a>
                </Col>
            </Row>
            
            <Row class="marginTop" style="padding-bottom: 40px;">
                <Row style="width: 300px;margin: 0 auto 20px;" v-show="resultFlag">
                    <p class="getResultText">查询成功：{{result}}个用户达到此要求</p>
                </Row>
                <Button style="margin-right: 20px;" type="primary" :loading="queryLoading" @click="getInfo" size="large">
                    <span v-if="!queryLoading">查询</span>
                    <span v-else>查询中...</span>
                </Button>
                <Button type="primary" @click="step" size="large">下一步</Button>
            </Row>
        </div>
    </div>
</template>
<script>
import {stepOne,stepTwo,stepThree,stepFour,stepSix} from '../../api/step-one';
export default {
    data(){
        return {
            queryLoading: false,
            condition:'条件一',//默认选中条件一
            firstTime:'',//条件一时间
            twoTime1:'',
            twoTime2:'',
            minDays:'',
            maxDays:'',
            value:'',
            comp:'',
            ConditionList:[
                {
                    label:'之前',
                    value:'lt'
                },
                {
                    label:'当日',
                    value:'eq'
                },
                {
                    label:'之后',
                    value:'gt'
                }
            ],
            model1:'',
            model2:'',//条件一的开户，注册，登录
            behavior:[
                {
                    label:'注册',
                    value:'register'
                },
                {
                    label:'登录',
                    value:'login',
                },
                {
                    label:'开户',
                    value:'open'
                }
            ],
            model3:'',
            numberCount:[
                {
                    label:'投资次数',
                    value:'tender_time_count'
                },
                {
                    label:'投资金额',
                    value:'tender_money_count '
                },
                {
                    label:'充值次数',
                    value:'recharge_time_count'
                },
                {
                    label:'充值金额',
                    value:'recharge_money_count'
                },
                {
                    label:'提现次数',
                    value:'cash_time_count'
                },
                {
                    label:'提现金额',
                    value:'cash_money_count'
                },
                // {
                //     label:'回款金额',
                //     value:'repayment_money_count'
                // },
                // {
                //     label:'待收余额',
                //     value:'collection_money_count'
                // },
                {
                    label:'账户余额',
                    value:'account_money_count'
                },
            ],
            numberValue:'',
            couponText:'',
            coupon:[
                {
                    label:'红包',
                    value:'activity_red_count'
                },
                {
                    label:'加息券',
                    value:'activity_rate_count'
                }
            ],
            channelText:'',//渠道信息
            channel:[
                {
                    label:'qq',
                    value:'qq'
                },
                {
                    label:'360',
                    value:'360'
                },
                {
                    label:'baidu',
                    value:'baidu'
                },
                {
                    label:'fubaba',
                    value:'fubaba'
                }
            ],
            resultFlag:false,
            result:'',
            queryData:{},
            import_id:'',
        };
    },
    methods:{
        handleChange(data){
            this.firstTime = data;
        },
        changeStartTime(data){
            this.twoTime1 = data;
        },
        changeEndTime(data){
            this.twoTime2 = data;
        },
        checkedFirst(){//条件一校验
            if(this.firstTime.length <= 0){
                this.$Message.error('请输入查询日期！');
                return false;
            }
            if(this.comp.length <=0){
                this.$Message.error('请输入查询条件！');
                return false;
            }
            if(this.model2.length <= 0){
                this.$Message.error('请输入查询类型！');
                return false;
            }
            return true
        },
        checkedTwo(){//条件二校验
            if(this.twoTime1.length <= 0){
                this.$Message.error('请输入起始日期！');
                return false;
            }
            if(this.twoTime2.length <=0){
                this.$Message.error('请输入结束条件！');
                return false;
            }
            if(this.model3.length <= 0){
                this.$Message.error('请输入查询类型！');
                return false;
            }
            return true
        },
        checkedThree(){//条件三校验
            if(this.numberValue.length <= 0){
                this.$Message.error('请输入查询类型！');
                return false;
            }
            if(this.minDays.length <= 0){
                this.$Message.error('请输入天数！');
                return false;
            }
            if(this.maxDays.length <=0){
                this.$Message.error('请输入天数！');
                return false;
            }
            return true
        },
        checkedFour(){//条件四校验
            if(this.couponText.length <= 0){
                this.$Message.error('请输入查询类型！');
                return false;
            }
            if(this.value.length <=0){
                this.$Message.error('请输入天数！');
                return false;
            }
            return true
        },
        getFirstResult(){
            if(!this.checkedFirst()){
                return;
            }
            this.queryLoading = true;
            stepOne({comp:this.comp,behavior:this.model2,date:this.firstTime,type:'time_count'}).then((res) =>{
                this.queryLoading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.resultFlag = true;
                    this.result = data.total;
                }
            }).catch((err)=>{
                this.$Message.error(err);
            })
        },
        getTwoResult(){//条件二
            if(!this.checkedTwo()){
                return;
            }
            this.queryLoading = true;
            stepTwo({behavior:this.model3,begin_date:this.twoTime1,end_date:this.twoTime2,type:'time_count'}).then((res) =>{
                this.queryLoading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.resultFlag = true;
                    this.result = data.total;
                }
            }).catch((err)=>{
                this.$Message.error(err);
            })
        },
        getThreeResult(){//条件三
            if(!this.checkedThree()){
                return;
            }
            this.queryLoading = true;
            stepThree({begin_num:this.minDays,end_num:this.maxDays,type:this.numberValue}).then((res) =>{
                this.queryLoading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.resultFlag = true;
                    this.result = data.total;
                }
            }).catch((err)=>{
                this.$Message.error(err);
            })
        },
        getFourResult(){//条件四
            if(!this.checkedFour()){
                return;
            }
            this.queryLoading = true;
            stepFour({days:this.value,type:this.couponText}).then((res) =>{
                this.queryLoading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.resultFlag = true;
                    this.result = data.total;
                }
            }).catch((err)=>{
                this.$Message.error(err);
            })
        },
        getFiveResult(){//条件五

        },
        getSixResult(){//条件六
            this.queryLoading = true;
            const queryCondition = {
                type: 'import_user_count',
                import_id: this.import_id
            }
            stepSix(queryCondition).then((res) =>{
                this.queryLoading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.resultFlag = true;
                    this.result = data.total;
                }
            }).catch((err)=>{
                this.$Message.error(err);
            })
        },
        getInfo(){
            switch (this.condition){
                case '条件一':
                    this.getFirstResult();
                    break;
                case '条件二':
                    this.getTwoResult();
                    break;
                case '条件三':
                    this.getThreeResult();
                    break;
                case '条件四':
                    this.getFourResult();
                    break;
                case '条件五':
                    this.getFiveResult();
                    break;
                case '条件六':
                    this.getSixResult();
                    break;
            }
        },
        step(){
            switch (this.condition){
                case '条件一':
                    if(!this.checkedFirst()){
                        return;
                    }
                    this.queryData = {
                        comp:this.comp,
                        behavior:this.model2,
                        date:this.firstTime,
                        type:'time_page',
                        condition:this.condition
                    }
                    break;
                case '条件二':
                    if(!this.checkedTwo()){
                        return;
                    }
                    this.queryData.behavior = this.model3;
                    this.queryData.begin_date = this.twoTime1;
                    this.queryData.end_date = this.twoTime2;
                    this.queryData.type = 'time_page';
                    this.queryData.condition = this.condition;
                    break;
                case '条件三':
                    if(!this.checkedThree()){
                        return;
                    }
                    this.queryData.begin_num = this.minDays;
                    this.queryData.end_num = this.maxDays;
                    this.queryData.type = this.numberValue;
                    this.queryData.condition = this.condition;
                    break;
                case '条件四':
                    if(!this.checkedFour()){
                        return;
                    }
                    this.queryData.days = this.value;
                    this.queryData.type = this.couponText;
                    this.queryData.condition = this.condition;
                    break;
                case '条件六':
                    this.queryData.import_id = this.import_id;
                    this.queryData.type = 'import_user';
                    this.queryData.condition = this.condition;
                    break;
            }
            window.localStorage.setItem('queryData',JSON.stringify(this.queryData))
            this.$router.push('/home/part2');
        },
        uploadSuccess(response, file, fileList){
            if(response.code === 1){
                this.import_id = response.data.import_id;
            }

        }
    },
    created(){
        window.localStorage.setItem('queryData',{})
    }
};
</script>
<style lang="less" scoped>
    .step1{
        height: 500px;
        padding: 30px;
        text-align: center;
        .height{
            height: 32px;
            line-height: 32px;
            padding-left: 20px;
        }
        .marginTop{
            margin-top: 40px;
        }
        .text-light{
            line-height: 32px;
        }
        .line-height-16x{
            line-height: 32px;
        }
        .getResultText{
            height: 40px;
            line-height: 40px;
            color: #ffffff;
            background-color:#19be6b;
        }
        .ivu-radio-group-vertical .ivu-radio-wrapper{
            height: 72px;
            line-height: 32px;
        }
    }
</style>