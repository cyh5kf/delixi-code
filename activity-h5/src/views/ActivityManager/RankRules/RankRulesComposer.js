import React from 'react';
import { message } from 'antd';
import _ from 'underscore';
import RankRulesView from './RankRulesView';
import { getRankInfoRequest, getProductsRequest, getRedpackCouponListRequest, getTaskListRequest, saveRankFormRequest } from 'api/ActivityApi';

export default class RankRulesComposer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false, // 页面加载状态
            rankInfo: null, // 排行榜信息数据
            products: null, // 标的类型数据
            isOpenRewardDialog: false, // 是否打开奖励规则弹窗
            rewardOptionsData: [],  //奖励规则option选项
            fetching: false, // 规则弹窗搜索加载效果
            rankFormData: {}, // 整个排行榜表单提交数据
            submitLoading: false,  // 表单提交按钮loading状态
            isSubmitForm: false,
            rewardRuleType: null, // 当前选中的奖励规则类型，如红包，加息券，任务，谢谢惠顾
            rewardFormIndex: null, // 当前修改数据位于总数据的具体位置
            rewardOutArray: [   // 奖励规则总数据
                {rewardList:[
                    { 
                        reward_type: '1'
                    }
                ]}
            ],
            send_reward_type: "" // 发送奖励方式 0 系统发放 1线下发放
        }
        this.lastFetchId = 0;
        this.fetchBonusRules = _.debounce(this.fetchBonusRules, 800);
        this.fetchRewardRules = _.debounce(this.fetchRewardRules, 800);
    }

    componentDidMount() {
        this.handleQueryRankInfo();
    }

    // 修改发送奖励方式
    onChangeSendRewardType = (value) => {
        this.setState({ send_reward_type: value });
    }

    // 更新奖励规则部分总体数据
    handleChangeRewardOutArray = (rewardOutArray) => {
        this.setState({ rewardOutArray });
    }

    // 打开关闭奖励规则弹窗
    handleToggleRewardDialog = (isOpen, type, index)=> {
        
        this.setState({
            isOpenRewardDialog: isOpen,
            rewardRuleType: type,
            rewardFormIndex: index
        });

        if(isOpen) {
            this.clearRewardDialogData();
        }
    };

    // 请求排行榜信息数据
    handleQueryRankInfo = async() => {
        const activityWidgetId = this.props.match.params.id;
        this.setState({loading: true});
        const response = await Promise.all([getRankInfoRequest({activityWidgetId: activityWidgetId}), getProductsRequest()]);
        this.setState({loading: false});
        const rankInfoList = response[0].data;
        const productsList = response[1].data.data;
        if(response[0].data.error_code === 0 && response[1].data.error_code === 0) {
            const { id = "0", type, rank_type, start_time, end_time,  limit_novice, limit_transfer, limit_product_id, tender_start_day, tender_end_day, num, version = "0", send_reward_type = "0" } = rankInfoList.rules.base;
            this.setState({
                rankInfo: rankInfoList,
                products: productsList,
                send_reward_type,
                rankFormData: {
                    activityWidgetId,
                    id,
                    version
                }
            });
        }
    }

    // 请求奖励规则数据
    fetchRewardRules = async(selectValue, RewardType) => {
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ fetching: true });
        const redPackData = {
            type: RewardType,
            page: 1,
            pageSize: 20,
            name: selectValue
        }
        const taskData = {
            page: 1,
            pageSize: 20,
            name: selectValue
        }
        const response = RewardType === '3'? await getTaskListRequest(taskData): await getRedpackCouponListRequest(redPackData);
        if(response.status === 200 && response.data.error_code === 0) {
            if (fetchId !== this.lastFetchId) { 
                return;
            }
            let rewardOptionsData = {};
            if(RewardType === '3') {
                rewardOptionsData = response.data.data.data.map(item => ({
                    id: item.id,
                    name: item.name,
                    reward_name: item.reward_name,
                    reward_value: item.reward_value
                }));
            } else {
                rewardOptionsData = response.data.data.map(item => ({
                    id: item.id,
                    name: item.name,
                    reward_name: item.reward_name,
                    reward_value: item.reward_value
                }));
            }
            
            this.setState({
                rewardOptionsData,
                fetching: false
             });
        }
    }

    // 清除奖励规则弹窗数据
    clearRewardDialogData = () => {
        this.setState({
            rewardOptionsData: []
        });
    }

    // 第一部分表单提交
    handleRankTopFormSubmit = (value) => {
        let { rankFormData } = this.state;
        Object.assign(rankFormData, value);
        this.setState({ rankFormData });
    }

    // 奖励表单提交
    handleRewardFormSubmit = async(value) => {
        let { rankFormData } = this.state;
        rankFormData.reward = value;
        this.setState({ rankFormData, submitLoading: true });
        const response = await saveRankFormRequest(rankFormData);
        this.setState({submitLoading: false});
        if(response.status === 200 && response.data.error_code === 0) {
            message.success('保存成功');
            setTimeout(function() {
                location.reload(true);
            }, 800);
        } else {
            message.error("保存失败");
        }
    }

    render() {
        return (
            <RankRulesView actions={this} store={this.state} />
        );
    }
}
