<template>
    <div>
        <Steps :current="2">
            <Step title="用户条件筛选"></Step>
            <Step title="用户检查确认"></Step>
            <Step title="填写推送内容"></Step>
        </Steps>

        <div class="clear40"></div>

        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <CheckboxGroup v-model="interest">
                <Row>
                    <Col span="3"><Checkbox label="方式一：红包"></Checkbox></Col>
                    <Col span="21">
                        <FormItem :label-width="150" label="红包名称" prop="red_name">
                            <Input style="width: 200px;" v-model="formValidate.red_name" placeholder="请输入红包名称"></Input>
                        </FormItem>
                        <FormItem :label-width="150" label="红包金额" prop="red_money">
                            <InputNumber style="width: 100px;" :min="0" v-model="formValidate.red_money" placeholder="请输入红包金额"></InputNumber>
                        </FormItem>
                        <FormItem :label-width="150" label="标的期限限制" prop="red_days_type">
                            <RadioGroup v-model="formValidate.red_days_type">
                                <Radio label="9">无天数限制</Radio>
                                <Radio label="1">天标</Radio>
                            </RadioGroup>
                            <FormItem prop="red_days_min">
                                <InputNumber style="width: 100px;" :min="0" v-model="formValidate.red_days_min" placeholder="请输入天数"></InputNumber>&nbsp;&nbsp;天及以上标的可用
                            </FormItem>
                        </FormItem>
                        <FormItem :label-width="150" label="最低投资限额" prop="red_min_tender">
                            最低&nbsp;&nbsp;<InputNumber style="width: 100px;" :min="0" v-model="formValidate.red_min_tender" placeholder="请输入金额"></InputNumber>&nbsp;&nbsp;元
                        </FormItem>
                        <FormItem :label-width="150" label="有效期">
                            <Row style="width: 445px;">
                                <Col span="11">
                                    <FormItem prop="red_begin_time">
                                        <DatePicker type="date" placeholder="开始时间" v-model="formValidate.red_begin_time"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <FormItem prop="red_end_time">
                                        <DatePicker type="date" placeholder="结束时间" v-model="formValidate.red_end_time"></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
                <div class="clear20"></div>
                <Row>
                    <Col span="3"><Checkbox label="方式二：加息券"></Checkbox></Col>
                    <Col span="21">
                        <FormItem :label-width="150" label="加息券名称" prop="rate_name">
                            <Input style="width: 200px;" v-model="formValidate.rate_name" placeholder="请输入加息券名称"></Input>
                        </FormItem>
                        <FormItem :label-width="150" label="加息券利率" prop="rate_rate">
                            <InputNumber style="width: 100px;" :min="0" v-model="formValidate.rate_rate" placeholder="请输入加息券利率"></InputNumber>
                        </FormItem>
                        <FormItem :label-width="150" label="标的期限限制" prop="rate_days_type">
                            <RadioGroup v-model="formValidate.rate_days_type" vertical>
                                <Row>
                                    <Col span="4"><Radio label="1">天标</Radio></Col>
                                    <Col span="8">
                                        <FormItem prop="rate_comp">
                                            <Select v-model="formValidate.rate_comp" style="width:100px;">
                                                <Option v-for="item in compareList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="7">
                                        <FormItem prop="rate_days">
                                            <InputNumber style="width: 100px;padding-right:20px;" :min="0" v-model="formValidate.rate_days" placeholder="请输入天数"></InputNumber>&nbsp;&nbsp;&nbsp;&nbsp;
                                        </FormItem>
                                    </Col>
                                    <Col span="5">
                                        &nbsp;&nbsp;&nbsp;&nbsp;天标可用
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="6"><Radio label="2">天标区间</Radio></Col>
                                    <Col span="7">
                                        <FormItem prop="rate_days_min">
                                            <InputNumber style="width: 100px;padding-right:20px;" :min="0" v-model="formValidate.rate_days_min" placeholder="请输入天数"></InputNumber>
                                        </FormItem>
                                    </Col>
                                    <Col span="4">
                                        &nbsp;&nbsp;天标至&nbsp;&nbsp;
                                    </Col>
                                    <Col span="7">
                                        <FormItem prop="rate_days_max">
                                            <InputNumber style="width: 100px;padding-right:20px;" :min="0" v-model="formValidate.rate_days_max" placeholder="请输入天数"></InputNumber>&nbsp;&nbsp;&nbsp;&nbsp;
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Radio label="9">无天数限制</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem :label-width="150" label="加息金额" prop="rate_money_type">
                            <RadioGroup style="width: 200px;" v-model="formValidate.rate_money_type" vertical>
                                <Row>
                                    <Col span="8"><Radio label="1">最多</Radio></Col>
                                    <Col span="16">
                                        <FormItem prop="rate_money_max">
                                            <InputNumber style="width: 100px;padding-right:20px;" :min="0" v-model="formValidate.rate_money_max" placeholder="请输入加息金额"></InputNumber>&nbsp;&nbsp;元
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Radio label="9">不限金额</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem :label-width="150" label="加息天数" prop="rate_rate_days_type">
                            <RadioGroup style="width: 200px;" v-model="formValidate.rate_rate_days_type" vertical>
                                <Row>
                                    <Col span="8"><Radio label="1">最多</Radio></Col>
                                    <Col span="16">
                                        <FormItem prop="rate_rate_days_max">
                                            <InputNumber style="width: 100px;padding-right:20px;" :min="0" v-model="formValidate.rate_rate_days_max" placeholder="请输入加息天数"></InputNumber>&nbsp;&nbsp;天
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Radio label="9">全程加息</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem :label-width="150" label="有效期">
                            <Row style="width: 445px;">
                                <Col span="11">
                                    <FormItem prop="rate_begin_time">
                                        <DatePicker type="date" placeholder="开始时间" v-model="formValidate.rate_begin_time"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <FormItem prop="rate_end_time">
                                        <DatePicker type="date" placeholder="结束时间" v-model="formValidate.rate_end_time"></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
                <div class="clear20"></div>
                <Row>
                    <Col span="3"><Checkbox label="方式三：短信"></Checkbox></Col>
                    <Col span="21">
                        <FormItem prop="sms_msg">
                            <Input v-model="formValidate.sms_msg" type="textarea" style="width: 500px;margin-left: 70px;" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入消息内容"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </CheckboxGroup>
        </Form>

        <div class="clear40"></div>

        <Row style="width: 800px;" type="flex" justify="center" :gutter="2">
            <Col span="4">
                <Button type="primary" size="large" @click="backLast">
                    <Icon type="chevron-left"></Icon>
                    上一步
                </Button>
            </Col>
            <Col span="4">
                <Button type="primary" :loading="pushLoading" size="large" @click="handleSubmit()">
                    <span v-if="!pushLoading">确定执行</span>
                    <span v-else>推送中...</span>
                </Button>
            </Col>
        </Row>
        

    </div>
</template>

<script>
import { activityPushRequest } from '../../api/partApi3';
import localStorage from '../../store/localstorage';
import moment from 'moment';

const formatDate = 'YYYY-MM-DD';

    export default {
        data () {
            return {
                pushLoading: false,
                interest: [], // checkbox数组
                formValidate: {
                    red_name: '', // 红包名称
                    red_money: 0, // 红包金额
                    red_days_type: '',  // 标的限制类型(1:天标大于days_min天可用,9:无天数限制)
                    red_days_min: 0,  // 标的期限限制(最小天数)
                    red_min_tender: 0, // 最低投资限额
                    red_begin_time: '', // 活动启用(开始)时间
                    red_end_time: '',  // 活动结束时间

                    rate_name: '', // 加息券名称
                    rate_rate: 0, // 加息利率(1代表1%,1.5代表1.5%)
                    rate_days_type: '', // 标的限制类型(1:天标大于days_min天可用, 2:天标区间 days_min—days_max ,9:无天数限制)
                    rate_comp: '', // 	比较字符
                    rate_days: 0, // 天数
                    rate_days_min: 0, // 标的期限限制(最小天数)
                    rate_days_max: 0, // 标的期限限制(最大天数)
                    rate_money_type: '', // 加息金额类型( 1:加息金额最多rate_money_max元, 9:不限加息金额)
                    rate_money_max: 0, // 加息金额
                    rate_rate_days_type: '', // 加息天数类型( 1:加息天数最多rate_days_max天, 9:不限加息天数)
                    rate_rate_days_max: 0, // 加息天数
                    rate_begin_time: '', // 活动启用(开始)时间
                    rate_end_time: '', // 活动结束时间
                    sms_msg: '' // 短信内容
                },
                ruleValidate: {}, // 校验规则
                compareList: [ // 比较内容
                    {
                        value: 'gt',
                        label: '大于'
                    },
                    {
                        value: 'egt',
                        label: '大于等于'
                    },
                    {
                        value: 'eq',
                        label: '等于'
                    },
                    {
                        value: 'lt',
                        label: '小于'
                    },
                    {
                        value: 'elt',
                        label: '小于等于'
                    }
                ],
            };
        },
        watch: {
            interest: function(newInterest) {
                this.ruleValidate = {};
                for(let item of newInterest) {
                    if(item === "方式一：红包") {
                        this.ruleValidate = Object.assign(this.ruleValidate, {
                            red_name: [
                                { required: true, message: '红包名称不能为空', trigger: 'blur' }
                            ],
                            red_money: [
                                { required: true, type: "number", min: 0, message: '红包金额不能为空', trigger: 'blur' }
                            ],
                            red_days_type: [
                                { required: true, message: '标的限制类型不能为空', trigger: 'change' }
                            ],
                            red_days_min: [
                                { required: true, type: "number", min: 0, message: '标的期限限制不能为空', trigger: 'blur' }
                            ],
                            red_min_tender: [
                                { required: true, type: "number", min: 0, message: '最低投资限额不能为空', trigger: 'blur' }
                            ],
                            red_begin_time: [
                                { required: true, type:"date", message: '活动开始时间不能为空', trigger: 'change' }
                            ],
                            red_end_time: [
                                { required: true, type:"date", message: '活动结束时间不能为空', trigger: 'change' }
                            ]
                        })
                    } else if(item === "方式二：加息券") {
                        this.ruleValidate = Object.assign(this.ruleValidate, {
                            rate_name: [
                                { required: true, message: '加息券名称不能为空', trigger: 'blur' }
                            ],
                            rate_rate: [
                                { required: true, type: "number", min: 0, message: '加息利率不能为空', trigger: 'blur' }
                            ],
                            rate_days_type: [
                                { required: true, message: '标的限制类型不能为空', trigger: 'change' }
                            ],
                            rate_days: [
                                { required: true, type: "number", min: 0, message: '天数不能为空' }
                            ],
                            rate_days_min: [
                                { required: true, type: "number", min: 0, message: '标的期限限制不能为空', trigger: 'blur' }
                            ],
                            rate_days_max: [
                                { required: true, type: "number", min: 0, message: '标的期限限制不能为空', trigger: 'blur' }
                            ],
                            rate_money_type: [
                                { required: true, message: '加息金额类型不能为空', trigger: 'change' }
                            ],
                            rate_money_max: [
                                { required: true, type: "number", min: 0, message: '加息金额不能为空', trigger: 'blur' }
                            ],
                            rate_rate_days_type: [
                                { required: true, message: '加息天数类型不能为空', trigger: 'change' }
                            ],
                            rate_rate_days_max: [
                                { required: true, type: "number", min: 0, message: '加息天数不能为空', trigger: 'blur' }
                            ],
                            rate_begin_time: [
                                { required: true, type:"date", message: '活动开始时间不能为空', trigger: 'change' }
                            ],
                            rate_end_time: [
                                { required: true, type:"date", message: '活动结束时间不能为空', trigger: 'change' }
                            ]
                        })
                        
                    } else if(item === "方式三：短信") {
                        this.ruleValidate = Object.assign(this.ruleValidate, {
                            sms_msg: [
                                { required: true, message: '短信内容不能为空', trigger: 'blur' }
                            ]
                        })
                    }
                }
            },

            rate_days_type(newValue) {
                if(newValue === "1") {
                    this.ruleValidate.rate_comp = [{ required: true, message: '比较类型不能为空', trigger: 'change' }];
                } else {
                    delete this.ruleValidate.rate_comp;
                }
            }
            
        },
        computed: {
            rate_days_type() {
                return this.formValidate.rate_days_type;
            }
        },
        mounted() {
            // 刷新页面从本地存储中读取数据
            const formData = JSON.parse(localStorage.getPart3FormData());
            const interest = JSON.parse(localStorage.getInterest());
            if(!!interest) {
                this.interest = interest;
            }
            if(!!formData) {
                if(!!formData.red) {
                    this.formValidate.red_name = formData.red.name;
                    this.formValidate.red_money = formData.red.money;
                    this.formValidate.red_days_type = formData.red.days_type;
                    this.formValidate.red_days_min = formData.red.days_min;
                    this.formValidate.red_min_tender = formData.red.min_tender;
                    this.formValidate.red_begin_time = new Date(moment(formData.red.begin_time).valueOf());
                    this.formValidate.red_end_time = new Date(moment(formData.red.end_time).valueOf());
                }
                if(!!formData.rate) {
                    this.formValidate.rate_name = formData.rate.name;
                    this.formValidate.rate_rate = formData.rate.rate;
                    this.formValidate.rate_days_type = formData.rate.days_type;
                    this.formValidate.rate_comp = formData.rate.comp;
                    this.formValidate.rate_days = formData.rate.days;
                    this.formValidate.rate_days_min = formData.rate.days_min;
                    this.formValidate.rate_days_max = formData.rate.days_max;
                    this.formValidate.rate_money_type = formData.rate.rate_money_type;
                    this.formValidate.rate_money_max = formData.rate.rate_money_max;
                    this.formValidate.rate_rate_days_type = formData.rate.rate_days_type;
                    this.formValidate.rate_rate_days_max = formData.rate.rate_days_max;
                    this.formValidate.rate_begin_time = new Date(moment(formData.rate.begin_time).valueOf());
                    this.formValidate.rate_end_time = new Date(moment(formData.rate.end_time).valueOf());
                }
                if(!!formData.sms) {
                    this.formValidate.sms_msg = formData.sms.msg;
                }
            }
        },
        methods: {
            handleSubmit () {
                // 校验checkbox，至少填写一个
                const interest = this.interest;
                if(interest.length === 0) {
                    this.$Message.error('请勾选方式，至少选择一个！');
                    return;
                }

                const formData = this.formValidate;
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        const user_ids = JSON.parse(localStorage.getUserId());
                        const queue = JSON.parse(localStorage.getQueue());
                        const pushType = this.$router.currentRoute.query.pushType;
                        let requestData = {};
                        // 判断是选中推送还是全部推送，传入不同的参数
                        if(pushType === 'checkedPush') {
                            if(!user_ids) {
                                this.$Message.error('缺少选中用户ID！');
                                return;
                            }
                            requestData.user_ids = user_ids;
                        } else if (pushType === 'allPush') {
                            const queue_length = Object.keys(queue);
                            if(queue_length === 0) {
                                this.$Message.error('缺少查询参数！');
                                return;
                            }
                            requestData.queue = queue;
                        }

                        // 根据多选框选中的值来传入不同的参数
                        for(let item of interest) {
                            if(item === "方式一：红包") {
                                requestData.red = {
                                    name: formData.red_name,
                                    money: formData.red_money, 
                                    days_type: formData.red_days_type,
                                    days_min: formData.red_days_min,
                                    min_tender: formData.red_min_tender,
                                    begin_time: moment(formData.red_begin_time).format(formatDate),
                                    end_time: moment(formData.red_end_time).format(formatDate)
                                }
                            } else if(item === "方式二：加息券") {
                                requestData.rate = {
                                    name: formData.rate_name,
                                    rate: formData.rate_rate,
                                    days_type: formData.rate_days_type,
                                    comp: formData.rate_comp,
                                    days: formData.rate_days,
                                    days_min: formData.rate_days_min,
                                    days_max: formData.rate_days_max,
                                    rate_money_type: formData.rate_money_type,
                                    rate_money_max: formData.rate_money_max,
                                    rate_days_type: formData.rate_rate_days_type,
                                    rate_days_max: formData.rate_rate_days_max,
                                    begin_time: moment(formData.rate_begin_time).format(formatDate),
                                    end_time: moment(formData.rate_end_time).format(formatDate)
                                }
                            } else if(item === "方式三：短信") {
                                requestData.sms = {
                                    msg: formData.sms_msg
                                }
                            }
                        }
                        this.pushLoading = true;
                        activityPushRequest(requestData).then((response) => {
                            this.pushLoading = false;
                            if(response.status === 200 && response.data.code === 1) {
                                localStorage.setInterest(JSON.stringify(interest));
                                localStorage.setPart3FormData(JSON.stringify(requestData));
                                this.$Message.success('提交成功!');
                            } else {
                                this.$Message.success(response.data.msg);
                            }
                        })
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },

            backLast () {
                this.$router.push('/home/part2');
            }
        }
    };
</script>

<style lang="less" scoped>

</style>