import React from 'react';
import { message } from 'antd';
import _ from 'underscore';
import PackRulesView from './PackRulesView';
import { getPackInfoRequest, getProductsRequest, getRedpackCouponListRequest, getTaskListRequest, savePackFormRequest } from 'api/ActivityApi';

export default class PackRulesComposer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false, // 页面加载状态
            packInfo: null, // 拆礼包信息数据
            products: null, // 标的类型数据
            limitProductId: [], // 选中的标的类型
            isOpenBonusDialog: false, // 是否打开额外奖励规则弹窗
            isOpenRewardDialog: false, // 是否打开奖励规则弹窗
            bonusOptionsData: [],  // 额外奖励规则option选项
            bonusSelectValue: [],  // 额外奖励规则多选值
            rewardOptionsData: [],  //奖励规则option选项
            fetching: false, // 规则弹窗搜索加载效果
            packsFormData: {}, // 整个拆礼包表单提交数据
            submitLoading: false,  // 表单提交按钮loading状态
            isSubmitForm: false,
            rewardRuleType: null, // 当前选中的奖励规则类型，如红包，加息券，任务，谢谢惠顾
            rewardFormIndex: null, // 当前修改数据位于总数据的具体位置
            reward_times: [ // 奖励规则根据次数的数据
                {rewardList:[
                    {
                        reward_type: '1'
                    }
                ]}
            ],
            reward_package: [ // 奖励规则根据礼包的数据
                {rewardList:[
                    {
                        reward_type: '1'
                    }
                ]}
            ],
            currentDialogType: '' // 当前弹窗属于根据次数模块还是根据礼包模块
        }
        this.lastFetchId = 0;
        this.fetchBonusRules = _.debounce(this.fetchBonusRules, 800);
        this.fetchRewardRules = _.debounce(this.fetchRewardRules, 800);
    }

    componentDidMount() {
        this.handleQueryPackInfo();
    }
    
    // 更新奖励规则部分总体数据
    handleChangeRewardArray = (rewardArray, rewardType) => {
        if(rewardType === 'times') { // 按次数数据
            this.setState({ reward_times: rewardArray });
        } else if(rewardType === 'package') { // 按礼包数据
            this.setState({ reward_package: rewardArray });
        }
        
    }

    // 打开关闭额外奖励规则弹窗
    handleToggleBonusDialog = (isOpen)=> {
        this.setState({isOpenBonusDialog: isOpen});
        if(isOpen) {
            this.clearBonusDialogData();
        }
    };

    // 打开关闭奖励规则弹窗
    handleToggleRewardDialog = (isOpen, type, index, currentDialogType)=> {
        
        this.setState({
            isOpenRewardDialog: isOpen,
            rewardRuleType: type,
            rewardFormIndex: index,
            currentDialogType
        });

        if(isOpen) {
            this.clearRewardDialogData();
        }
    };

    // 请求拆礼包信息数据
    handleQueryPackInfo = async() => {
        const activityWidgetId = this.props.match.params.id;
        this.setState({loading: true});
        const response = await Promise.all([getPackInfoRequest({activityWidgetId: activityWidgetId}), getProductsRequest()]);
        this.setState({loading: false});
        const packInfoList = response[0].data;
        const productsList = response[1].data.data;
        if(response[0].data.error_code === 0 && response[1].data.error_code === 0) {
            const { id = "0", bonus = "0", limit_novice = "0", limit_transfer = "0", limit_product_id, open_number = "0", version = "0", reward_type = "1" } = packInfoList.rules.base;
            this.setState({
                packInfo: packInfoList,
                products: productsList,
                limitProductId: limit_product_id,
                packsFormData: {
                    activityWidgetId,
                    id,
                    bonus,
                    limitNovice: limit_novice,
                    limitTransfer: limit_transfer,
                    openNumber: open_number,
                    version,
                    reward_type
                }
            });
        }
    }

    // 请求额外奖励规则数据
    fetchBonusRules = async(selectValue, RewardType) => {
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ fetching: true });
        const dataObj = {
            type: RewardType,
            page: 1,
            pageSize: 20,
            name: selectValue
        }
        const response = await getRedpackCouponListRequest(dataObj);
        if(response.status === 200 && response.data.error_code === 0) {
            if (fetchId !== this.lastFetchId) { 
                return;
            }
            const bonusOptionsData = response.data.data.map(item => ({
                id: item.id,
                name: item.name
            }));
            this.setState({
                bonusOptionsData,
                fetching: false
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

    // 改变额外奖励规则弹窗select值
    handleChangeBonusSelect = (bonusSelectValue) => {
        this.setState({
            bonusSelectValue
        });
    }

    // 清除额外奖励规则弹窗数据
    clearBonusDialogData = () => {
        this.setState({
            bonusSelectValue: [],
            bonusOptionsData: []
        });
    }

    // 清除奖励规则弹窗数据
    clearRewardDialogData = () => {
        this.setState({
            rewardOptionsData: []
        });
    }

    // 修改额外奖励是否开启
    onChangeBonusSwitch = (checked) => {
        let { packsFormData } = this.state;
        packsFormData.bonus = !checked? "0": "1";
        this.setState({ packsFormData });
    }

    // 修改限投标的多选框
    onChangeLimit = (checkedValue, type) => {
        let { packsFormData } = this.state;
        if(type === "limitNovice") {
            packsFormData.limitNovice = !checkedValue? "0": "1";
        } else if(type === "limitTransfer") {
            packsFormData.limitTransfer = !checkedValue? "0": "1";
        }
        this.setState({ packsFormData });
    }

    // 修改任务礼包个数
    onChangeOpenNumber = (value) => {
        let { packsFormData } = this.state;
        packsFormData.openNumber = value;
        this.setState({ packsFormData });
    }

    // 修改奖励类型单选框值
    onChangeRwardType = (value) => {
        let { packsFormData } = this.state;
        packsFormData.reward_type = value;
        this.setState({ packsFormData });
    }

    // 礼包个数和开启条件表单提交
    handlePacksFormSubmit = (value) => {
        let { packsFormData } = this.state;
        packsFormData.packs = value;
        this.setState({ packsFormData });
    }

    // 限投标的表单提交
    handlelimitProductFormSubmit = (value) => {
        let { packsFormData } = this.state;
        packsFormData.limitProductId = value;
        this.setState({ packsFormData });
    }

    // 额外奖励表单提交
    handleBonusRewardFormSubmit = (value) => {
        let { packsFormData } = this.state;
        if(value) {
            packsFormData.bonusReward = value;
        }
        this.setState({ packsFormData });
    }

    // 奖励表单提交
    handleRewardFormSubmit = async(value) => {
        let { packsFormData } = this.state;
        packsFormData.reward = value;
        this.setState({ packsFormData, submitLoading: true });
        const response = await savePackFormRequest(packsFormData);
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
            <PackRulesView actions={this} store={this.state} />
        );
    }
}
