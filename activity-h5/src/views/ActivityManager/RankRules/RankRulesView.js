import React from 'react';
import _ from 'underscore';
import moment from 'moment';
import { Form, Row, Col, Select, Switch, Card, Button, message, Spin, Checkbox } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import RankTopForm from './RankTopForm';
import RewardFormOuter from './RewardFormOuter';
import './RankRulesView.less';
import { getFormArray } from 'utils/utils';

const formatHM = 'HH:mm';
const formatYMD = 'YYYY-MM-DD HH:mm:ss';

export default class RankRulesView extends React.Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    // 第一部分表单提交
    handleRankTopFormSubmit = () => {
        const rankTopForm = this.refs['rankTopForm'];
        const { actions } = this.props;
        rankTopForm.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) {
                return;
            }
            let rankFormValue = fieldsValue;
            rankFormValue.startTime = moment(fieldsValue.startTime).format(formatYMD);
            rankFormValue.endTime = moment(fieldsValue.endTime).format(formatYMD);
            rankFormValue.limitNovice = fieldsValue.limitNovice? "1": "0";
            let limitProductIdStr = "";
            if(!fieldsValue.limitProductId) {
                limitProductIdStr = "";
            } else if (Array.isArray(fieldsValue.limitProductId)) {
                limitProductIdStr = fieldsValue.limitProductId.join(",");
            } else {
                limitProductIdStr = fieldsValue.limitProductId;
            }
            rankFormValue.limitProductId = limitProductIdStr;
            actions.handleRankTopFormSubmit(rankFormValue);
            this.handleRewardFormSubmit();
        });
    }

    // 奖励表单提交
    handleRewardFormSubmit = () => {
        const rewardForms = this.refs['rewardFormOuter'].refs;
        const { actions, store } = this.props;
        const { send_reward_type } = store;
        let rewardFormValue = [];
        let isError = false;
        for(let i in rewardForms) {
            rewardForms[i].validateFieldsAndScroll((err, fieldsValue) => {
                if (err) {
                    isError = true;
                    if(send_reward_type === "0") {
                        return false;
                    }
                }
                let dataObj = {};
                for(let key in fieldsValue) {
                    let str = key; // 原始key值字符串
                    let i = str.indexOf("-"); //下标
                    let keyObj = str.substring(0, i); // key值
                    let num = str.substring(i+1);  //序号
                    let value = fieldsValue[key]; //value值
                    if(dataObj[num]) {  // 格式化对象，变成{1: {}, 2: {}, ...}的格式
                        dataObj[num][keyObj] = value;
                    } else {
                        dataObj[num] = {}
                        dataObj[num][keyObj] = value;
                    }
                 }
                Object.keys(dataObj).forEach(function(i){  // 将对象转成数组  {1: {}, 2: {}, ...}  =》 [0: {}, 1: {}, ...]
                    dataObj[i].rewardMoney = !dataObj[i].rewardRuleCustom? 0: dataObj[i].rewardRuleCustom.rewardMoney;
                    dataObj[i].rewardName = !dataObj[i].rewardRuleCustom? "": dataObj[i].rewardRuleCustom.rewardName;
                    dataObj[i].rewardRuleId = !dataObj[i].rewardRuleCustom? "": dataObj[i].rewardRuleCustom.rewardRuleId;
                    dataObj[i].rewardType = dataObj[i].rewardTypeCustom.rewardType;
                    dataObj[i].rewardProbability = dataObj[i].rewardProbabilityCustom.rewardProbability;
                    delete dataObj[i].rewardRuleCustom;
                    delete dataObj[i].rewardTypeCustom;
                    delete dataObj[i].rewardProbabilityCustom;
                    const { rewardMoney, rewardName, rewardRuleId, rewardProbability, rewardType } = dataObj[i];
                    if(rewardType === "99") { // 校验奖励类型为谢谢惠顾相关选项是否为空
                        if( rewardProbability === undefined ) {
                            isError = true;
                        }
                    } else if(rewardType === '5' || rewardType === '6') { // 校验积分和金币相关选项是否为空
                        if( rewardMoney === undefined || rewardProbability === undefined ) {
                            isError = true;
                        }
                    } else {
                        if( rewardMoney === undefined || rewardName === undefined || rewardRuleId === undefined || rewardProbability === undefined ) {
                            isError = true;
                        }
                    }
                    
                    rewardFormValue.push(dataObj[i]);
                });
            });
        }
        isError = send_reward_type === "0"? isError: false;
        if(!isError) {
            actions.handleRewardFormSubmit(rewardFormValue);
        } else {
            message.error("请注意填写奖励规则，奖励数值，奖励名称以及概率值，不能为空！");
        }
        
    }

    // 整个页面表单总的提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.handleRankTopFormSubmit();
    }

    render() {
        const {store, actions} = this.props;
        const { loading, rankInfo, submitLoading, rankFormData } = store;
        const { limitNovice, limitTransfer } =rankFormData;
        const limitNoviceChecked = limitNovice === "0"? false: true;
        const limitTransferChecked = limitTransfer === "0"? false: true;

        return (
            <div className="rankRulesView">
                <Card loading={loading} >
                    <Spin tip="提交中..." spinning={submitLoading}>

                        { rankInfo && <RankTopForm ref="rankTopForm" actions={actions} store={store} /> }
                        
                        <div className="clear20"></div>

                        { rankInfo && <RewardFormOuter ref="rewardFormOuter" actions={actions} store={store} /> }

                        <div className="clear60"></div>

                        <div className="submitContent">
                            <Button type="primary" onClick={this.handleSubmit}  className="submitBtn" loading={submitLoading}>
                                保存
                            </Button>
                        </div>
                    </Spin>
                </Card>
            </div>
        );
    }
}